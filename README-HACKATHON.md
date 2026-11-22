# OromiaSTEM LearnChain

**Explore. Experiment. Learn. Verify.**

OromiaSTEM is an offline-first, mobile-friendly science learning platform designed around the needs of Ethiopian secondary-school students. This hackathon submission combines its interactive science laboratory with a Solana-based learning-achievement proof prototype.

## What is in this archive

- `index.html`, `css/`, `js/`, `www/`, `assets/`, `icons/`: the OromiaSTEM web/PWA application and its interactive learning labs.
- `blockchain/`: an Anchor program and JavaScript client helper for recording a non-personal achievement-code hash on Solana.
- `README.md`, `README-ANDROID.md`: original application and Android build notes.
- `SUBMISSION-NOTES.md`: honest feature status, demo flow, limitations, and final submission checklist.

## Run the learning application

The web app is static. From this directory, start a local static server and open the served page. For example, with Python installed:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in a browser. For Android, follow `README-ANDROID.md` and the included GitHub Actions workflow.

## Solana component status

The Anchor program and client helper are included as source code. They are **not yet deployed or verified on Devnet**, and the program ID in `blockchain/Anchor.toml` and `blockchain/programs/learning_achievement/src/lib.rs` is a placeholder. Do not claim a confirmed on-chain transaction or deployed contract until you generate a program keypair, synchronize the ID, build, test, deploy to Devnet, and verify a transaction.

The helper uses the browser Web Crypto API to hash fixed achievement codes. It must never receive a student's name, email, school, grade, score, location, or other personal data. Wallet use must remain optional; lessons and simulations should work without a wallet or network connection.

## Before public submission

Read `SUBMISSION-NOTES.md`, replace any placeholder contact details if needed, confirm the event's required submission format, and upload this archive only if the organizers accept source-code ZIP submissions. Include a demo video or live URL separately if requested.
