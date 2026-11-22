# OromiaSTEM integration checklist

- [ ] Back up the current OromiaSTEM website and Android repository.
- [ ] Keep the Solana module on a separate branch.
- [ ] Generate a real program keypair; replace the temporary ID with `anchor keys sync`.
- [ ] Build with Anchor 0.30.x.
- [ ] Add and pass program/client tests on Devnet.
- [ ] Generate the IDL from the compiled program; do not invent or hand-edit it.
- [ ] Integrate an established Solana wallet adapter; never collect seed phrases.
- [ ] Keep wallet use optional and learning free.
- [ ] Ensure simulations and lessons work offline without blockchain access.
- [ ] Send only fixed, non-personal achievement codes to the hashing helper.
- [ ] Show confirmation only after the Devnet transaction is confirmed.
- [ ] Ask an experienced Solana/Anchor developer to review the program before any real deployment.
