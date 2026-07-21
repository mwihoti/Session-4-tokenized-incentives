# COMMANDS.md — Every Command, In Order

Follow top to bottom. Each block says **what it does** before the command.
Hardhat is the guided track (sections 0–7); the Foundry track is section 8.

---

## 0 · Prerequisites (once per machine)

**Node.js 18+ (recommend 20 LTS) and Git:**
```bash
node -v
git --version
```
Missing/old Node? `nvm install 20 && nvm use 20`

> 🪟 **Windows:** do everything inside **WSL2 (Ubuntu)**.

---

## 1 · Get the code

**Fork first** (button on the repo page) — then clone *your* fork:
```bash
git clone https://github.com/<YOUR-USERNAME>/Session-4-tokenized-incentives.git
cd Session-4-tokenized-incentives
npm install
```
*Installs Hardhat, the toolbox, and OpenZeppelin — the audited ERC-20 we inherit from.*

---

## 2 · Configure your keys AND your budget

```bash
cp .env.example .env
```
**Edit `.env`** and set:
- `PRIVATE_KEY` — **TEST-ONLY** key, funded with Fuji AVAX (Builders Hub faucet at build.avax.network)
- `EMISSION_CAP` — **the Session 4 decision.** This is your marketing budget with 18 decimals
  (default = 10,000,000 tokens). Budget your fulfilment *first*, then set this.
  **It is immutable after deploy** — the chain enforces the CFO.

> ⚠️ Law: never a key that has held real funds; never commit `.env` (git-ignored).

---

## 3 · Compile & test locally (free — no network, no gas)

```bash
npx hardhat compile
```
*Compiles IncentiveToken against OpenZeppelin v5 — your typos die here, not on-chain.*

```bash
npx hardhat test
```
*Spins up a throwaway in-memory blockchain and tests the four solvency rules:*
- *the budget wall — minting past `emissionCap` reverts with "Budget exhausted"*
- *the issuer gate — only the business mints*
- *burn on redeem — `totalSupply()` shrinks with use: live liability*
- *the closed loop — transfer to a stranger reverts; paying an approved merchant works*

---

## 4 · Deploy to Fuji

```bash
npm run deploy:fuji
```
*Deploys IncentiveToken with your `EMISSION_CAP`, prints the address, saves `deployments.json`. That address + your one-slide economy = **Quest 4**.*

---

## 5 · Run the solvency story

```bash
npm run interact:fuji
```
*The full demo: issue 1500 DUKA for a "purchase" → try paying a stranger (**fails: "Closed-loop token"** — that's Rule 4 working) → approve them as a merchant → payment succeeds → redeem 200 for "airtime-topup" (burn) → prints the CFO dashboard: outstanding liability, lifetime emitted, remaining budget — all live, all on-chain.*

**See the receipts:** `https://testnet.snowtrace.io/address/<YOUR-TOKEN-ADDRESS>`

---

## 6 · Optional — verify the source on the explorer

*Publishes your source next to the bytecode — the gold standard of "deployed, not demoed." Note the constructor argument (your cap) must be passed:*
```bash
npx hardhat verify --network avalancheFujiTestnet <TOKEN-ADDRESS> <YOUR-EMISSION-CAP>
```

---

## 7 · Push your work to your fork (Quest 4 evidence)

```bash
git add .
git commit -m "Quest 4: my incentive token — capped, closed-loop, deployed to Fuji"
git push origin main
```
*(Publish your address in your fork's README rather than un-ignoring `deployments.json`.)*

---

## 8 · The Foundry track — same repo, second toolkit

**Install Foundry (once):**
```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

**Install the test library (once per clone):**
```bash
forge install foundry-rs/forge-std
```
*(Recent Foundry versions no longer create a submodule commit by default, so `--no-commit` is gone — if your `forge install --help` still shows `--commit`, you're on a newer version and this bare form is correct.)*
*(OpenZeppelin is already available — `foundry.toml` remaps `@openzeppelin/` to `node_modules`, so `npm install` covered it.)*

**Compile:**
```bash
forge build
```

**Run the Foundry suite** (Solidity twin of the Hardhat one — open `test/IncentiveToken.t.sol` and compare `vm.prank` / `vm.expectRevert` with the JS versions):
```bash
forge test -vv
```

**Deploy to Fuji** (reads the same `.env`):
```bash
source .env
forge script script/Deploy.s.sol --rpc-url fuji --broadcast
```

**Poke your token with cast:**
```bash
cast call <TOKEN> "totalSupply()(uint256)" --rpc-url $FUJI_RPC_URL
cast call <TOKEN> "remainingBudget()(uint256)" --rpc-url $FUJI_RPC_URL
cast send <TOKEN> "issueReward(address,uint256,string)" <CUSTOMER_0x> 100000000000000000000 "purchase" \
  --rpc-url $FUJI_RPC_URL --private-key $PRIVATE_KEY
cast send <TOKEN> "redeem(uint256,string)" 50000000000000000000 "airtime-topup" \
  --rpc-url $FUJI_RPC_URL --private-key $CUSTOMER_PK
```
*(Those long numbers are 100 and 50 with 18 decimals — cast speaks raw units.)*

**Which toolkit?** Either — identical concepts. Hardhat: JS workflow, npm one-liners. Foundry: speed, Solidity-native tests, and `cast`. Professionals know both; now so do you.

---

## 🚑 When things break — fast fixes

| Symptom | Fix |
|---|---|
| `Cannot find module '@openzeppelin/contracts...'` | Run `npm install` in the repo root |
| Foundry: `Source "@openzeppelin/..." not found` | You skipped `npm install` — OZ lives in node_modules (see foundry.toml remapping) |
| `Budget exhausted` on issueReward | Working as designed 🎉 — that's Rule 2. Check `remainingBudget()` |
| `Closed-loop token` on transfer | Also as designed — Rule 4. `setMerchant(addr, true)` first, or redeem instead |
| `insufficient funds for gas` | Faucet at build.avax.network; confirm the funded account matches `.env` |
| Verify fails with constructor mismatch | Pass the exact cap you deployed with: `npx hardhat verify ... <ADDRESS> <CAP>` |
| Deploy hangs / nonce errors | Wait ~30s, rerun |
| Windows weirdness | WSL2 |
| Still stuck | `STUCK` in session chat, or Discord tech channel with the exact error pasted |
