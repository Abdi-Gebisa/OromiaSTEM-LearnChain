# OromiaSTEM — Solana Learning Achievement Prototype

A privacy-conscious Solana integration concept for the existing OromiaSTEM learning platform. It lets a student optionally record a proof that a learning challenge was completed. The core learning experience remains free and works without a wallet.

## What is included

- **Anchor program:** creates one deterministic on-chain achievement record per wallet and achievement hash.
- **Browser-compatible client helper:** uses the Web Crypto API (not Node-only crypto) and Solana's PDA derivation.
- **Duplicate handling:** checks whether the record already exists before submitting a transaction.
- **Verification helper:** checks the Devnet account and fetches the decoded record.
- **Privacy-first data model:** stores only wallet public key, 32-byte achievement hash, and timestamp.

## Important status

This is a **source-code prototype**, not a deployed or audited production application. It has not been built against your local Solana/Anchor toolchain, deployed, or tested on Devnet in this environment. Do not describe an achievement as blockchain-verified until the transaction is confirmed on Devnet. Do not deploy to Mainnet or use real funds for this prototype.

The temporary program ID in `Anchor.toml` and `lib.rs` is the System Program address solely as a syntactically valid placeholder. It is **not** your program ID. Generate your own program keypair and run `anchor keys sync` before building.

## Privacy and student safety

Never put a student's name, email, phone number, school, grade, score, location, or other personal information on-chain. Hashing personal information does not make publishing it safe. The helper accepts only a fixed achievement code such as `PHYSICS_NEWTON_01`.

A wallet is optional. Students must still be able to open lessons, run simulations, and learn offline without connecting a wallet or paying transaction fees. The app should request a transaction only after its own trusted challenge-completion logic succeeds. This prototype does not independently prove that a student completed a lesson; it records a submitted claim from a wallet.

## Requirements

- Node.js 18 or newer and npm
- Rust toolchain
- Solana CLI
- Anchor CLI 0.30.x
- A Solana wallet configured for **Devnet** with test SOL only

Install tools using their official documentation. Never share your wallet recovery phrase or private key.

## Build and deploy to Devnet

1. Make a backup of the existing OromiaSTEM repository. Keep this integration on a separate Git branch.
2. Install Rust, Solana CLI, and Anchor 0.30.x.
3. From this project directory, generate a program keypair using the Anchor/Solana workflow, then run:

   ```bash
   anchor keys sync
   ```

   Confirm that the generated program ID is reflected in both `Anchor.toml` and `programs/learning_achievement/src/lib.rs`.
4. Build:

   ```bash
   anchor build
   ```
5. Copy the generated IDL from `target/idl/learning_achievement.json` into `client/src/idl/learning_achievement.json` if your frontend setup needs a local IDL file.
6. Run tests after configuring your Anchor test environment:

   ```bash
   anchor test
   ```
7. Only after a successful build and test, deploy to Devnet:

   ```bash
   solana config set --url devnet
   anchor deploy
   ```
8. Save the deployed program ID and transaction signatures. Verify records on a Solana Devnet explorer before claiming success.

Do not deploy to Mainnet.

## Client integration

Install the client dependencies from the `client` directory:

```bash
cd client
npm install
npm run check
```

The helpers in `client/src/achievement.js` expect an initialized Anchor `Program` using the generated IDL and a wallet provider connected to Devnet. Example:

```js
import { createAchievement, findAchievement } from "./achievement.js";

// Call only after OromiaSTEM has independently validated completion.
const result = await createAchievement(
  program,
  wallet.publicKey,
  "PHYSICS_NEWTON_01"
);

// Later, verify the record:
const verification = await findAchievement(
  program,
  wallet.publicKey,
  "PHYSICS_NEWTON_01"
);
```

Handle wallet rejection, insufficient Devnet test SOL, RPC errors, and offline status in the UI. Never block access to educational content when blockchain services are unavailable.

## Suggested demo flow

1. Student opens a Physics learning challenge without signing in.
2. OromiaSTEM validates completion locally or through its trusted learning backend.
3. Student may choose **Record achievement** and connect a wallet.
4. The client hashes a non-personal achievement code locally.
5. The student reviews and approves the Devnet transaction in their wallet.
6. OromiaSTEM shows **Recorded on Devnet** only after confirmed success.
7. A verifier can check the record using the wallet and achievement code.

## Limitations before competition or production use

- No deployed program ID or generated IDL is included.
- No wallet-connect UI is included; integrate with the wallet adapter already selected by the app.
- No backend challenge validation or anti-cheating system is included.
- No automated test suite or independent security audit has been completed.
- A wallet signature proves that the wallet submitted a hash; it does not by itself prove the educational work was completed.
- Devnet is a test network and may reset; records are not permanent credentials.

## Repository layout

```text
OromiaSTEM-Solana-Hackathon/
├── Anchor.toml
├── Cargo.toml
├── README.md
├── programs/
│   └── learning_achievement/
│       ├── Cargo.toml
│       └── src/lib.rs
├── client/
│   ├── package.json
│   └── src/achievement.js
├── tests/
└── docs/
```

## Project positioning

OromiaSTEM's differentiator is curriculum-aligned, low-bandwidth science learning for Ethiopian secondary students. Blockchain is an optional proof layer—not a replacement for simulations, teaching, offline access, or free learning.
