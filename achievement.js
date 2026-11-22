import { PublicKey, SystemProgram } from "@solana/web3.js";

const encoder = new TextEncoder();
const DOMAIN = "oromiastem:learning-achievement:v1:";

/**
 * Hash a stable, non-personal achievement code (for example PHYSICS_NEWTON_01).
 * Do not pass a student's name, email, school, grade, score, or free-text profile.
 */
export async function hashAchievement(achievementCode) {
  if (typeof achievementCode !== "string" || !/^[A-Z0-9_-]{3,80}$/.test(achievementCode)) {
    throw new TypeError("Use a stable achievement code containing 3–80 uppercase letters, numbers, _ or -.");
  }
  if (!globalThis.crypto?.subtle) {
    throw new Error("Secure browser hashing is unavailable in this context. Use HTTPS or localhost.");
  }
  const digest = await globalThis.crypto.subtle.digest(
    "SHA-256",
    encoder.encode(DOMAIN + achievementCode)
  );
  return new Uint8Array(digest);
}

export function achievementAddress(programId, walletPublicKey, hashBytes) {
  if (!(walletPublicKey instanceof PublicKey)) throw new TypeError("A connected wallet public key is required.");
  if (!(hashBytes instanceof Uint8Array) || hashBytes.length !== 32) throw new TypeError("Expected a 32-byte SHA-256 hash.");
  const [address] = PublicKey.findProgramAddressSync(
    [encoder.encode("achievement"), walletPublicKey.toBytes(), hashBytes],
    new PublicKey(programId)
  );
  return address;
}

/** Record an achievement using an Anchor Program connected to Solana Devnet. */
export async function createAchievement(program, walletPublicKey, achievementCode) {
  if (!program?.methods?.createAchievement || !program?.provider?.connection) {
    throw new TypeError("Pass an initialized Anchor Program with a connected wallet provider.");
  }
  const hashBytes = await hashAchievement(achievementCode);
  const record = achievementAddress(program.programId, walletPublicKey, hashBytes);
  const existing = await program.provider.connection.getAccountInfo(record, "confirmed");
  if (existing) {
    return { alreadyRecorded: true, record, hashHex: toHex(hashBytes) };
  }
  const signature = await program.methods
    .createAchievement(Array.from(hashBytes))
    .accounts({
      achievement: record,
      authority: walletPublicKey,
      systemProgram: SystemProgram.programId,
    })
    .rpc({ commitment: "confirmed" });
  return { alreadyRecorded: false, record, signature, hashHex: toHex(hashBytes) };
}

/** Check the chain for a recorded achievement; network errors are allowed to surface. */
export async function findAchievement(program, walletPublicKey, achievementCode) {
  if (!program?.provider?.connection) throw new TypeError("An initialized Anchor Program is required.");
  const hashBytes = await hashAchievement(achievementCode);
  const record = achievementAddress(program.programId, walletPublicKey, hashBytes);
  const accountInfo = await program.provider.connection.getAccountInfo(record, "confirmed");
  if (!accountInfo) return { exists: false, record };
  const account = await program.account.achievementRecord.fetch(record, "confirmed");
  return { exists: true, record, account };
}

function toHex(bytes) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}
