# Hackathon Submission Notes

## Project summary

OromiaSTEM LearnChain is an educational technology prototype focused on making science practical and accessible. It combines interactive Physics and other science labs with a proposed optional Solana proof layer for learning achievements. The learning experience remains the primary product; blockchain is an optional verification mechanism, not a requirement for using the app.

## Intended demonstration

1. Open the OromiaSTEM site and enter the Physics Laboratory.
2. Select an experiment, adjust its variables, run/pause/step the simulation, and inspect the live graph and measurement readout.
3. Explain the learning-achievement design: a stable non-personal code (for example `PHYSICS_NEWTON_01`) is hashed locally.
4. Show the Anchor program and client helper in `blockchain/`.
5. Clearly state that Devnet deployment and transaction verification are still pending unless you have completed and independently checked those steps before presenting.

## Current implementation status

- Interactive learning application source: included.
- Offline/PWA assets and service worker: included.
- Android/Capacitor configuration and CI workflow: included.
- Anchor achievement-record program source: included.
- Browser-side achievement hashing and PDA/client helper: included.
- Wallet connection UI inside the learning application: not integrated in this archive.
- Program ID: placeholder; must be replaced with a generated program ID.
- Anchor build/test: not run in this environment.
- Devnet deployment: not performed.
- Confirmed on-chain achievement transaction: none supplied.

Do not represent any pending item as completed. A prototype that is accurately described is stronger than an unsupported claim.

## Privacy and safety

Never publish student personal information or personal scores on-chain. Do not hash personal information and assume it is anonymous. Only use fixed, non-personal achievement codes. Never share wallet recovery phrases or private keys. For a student demonstration, use Devnet/test SOL only and involve a trusted adult if account-age or wallet requirements apply.

## Final event checklist

- [ ] Check the hackathon dashboard for the exact submission deadline, accepted file types, and required fields.
- [ ] Confirm whether a ZIP is accepted or whether a GitHub repository/demo URL is required.
- [ ] Test the web application on a phone and desktop browser.
- [ ] Test offline behavior after the app has been loaded once.
- [ ] If claiming blockchain functionality, generate/sync the program ID, run Anchor build and tests, deploy to Devnet, and verify a real transaction on a Devnet explorer.
- [ ] Record a short screen demonstration showing only features that actually work.
- [ ] Remove private keys, wallet files, `.env` files, personal student data, and local build artifacts before uploading.
- [ ] Keep a backup of the exact ZIP and the Git commit submitted.

## Short pitch

OromiaSTEM LearnChain helps secondary-school students learn science through interactive, curriculum-oriented simulations designed for accessible devices and low-connectivity settings. Its optional Solana achievement layer is designed to let learners verify a non-personal proof of a completed challenge, while keeping learning free and usable without a wallet.
