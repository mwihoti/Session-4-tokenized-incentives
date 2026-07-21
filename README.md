# Session 4 — Tokenized Incentives: A Solvent, Closed-Loop Reward Token

**Road to Mini Hack · Cohort 2 — Building Gamified Solutions for Businesses · team1 Kenya**

One contract, four solvency rules, both toolkits. `IncentiveToken.sol` is a real ERC-20 (OpenZeppelin v5) that upgrades Session 2's points mapping into the shared language of the ecosystem — **with its budget written into the constructor, immutable, forever.**

| The four solvency rules | Where it lives in the code |
|---|---|
| 1 · **Budget-backed** — every token is a claim on something real | You set `EMISSION_CAP` *after* budgeting fulfilment |
| 2 · **Capped emission** — the marketing budget, on-chain | `uint256 public immutable emissionCap` + the `require` in `issueReward` |
| 3 · **Sinks that work** — usage makes the system healthier | `_burn` on `redeem`: `totalSupply()` == live outstanding liability |
| 4 · **Value from the product, not the token** | The closed-loop `_update` override + the `merchant` list |

This is the contract from tonight's deck, slides 9–12, verbatim — plus one helper view, `remainingBudget()`, for your CFO dashboard.

> 📖 **Every command, in order: [`COMMANDS.md`](./COMMANDS.md)** — Hardhat track first, Foundry track in section 8.
> 🤝 **The full builder guide — workflow, PR format, grading, deadlines: [`CONTRIBUTING_GUIDE.md`](./CONTRIBUTING_GUIDE.md)**

---

## Quick start (Hardhat track, 5 minutes)

**1 — Fork this repo**, then clone *your* fork:
```bash
git clone https://github.com/<YOUR-USERNAME>/Session-4-tokenized-incentives.git
cd Session-4-tokenized-incentives
npm install
```

**2 — Configure:**
```bash
cp .env.example .env
```
Set `PRIVATE_KEY` (**TEST-ONLY**, faucet-funded) and — the Session 4 decision — `EMISSION_CAP`: **budget your fulfilment first, then set the cap.** It is immutable after deploy. That's the point.

**3 — Prove it locally (free):**
```bash
npx hardhat test
```
The suite tests all four solvency rules: the budget wall, the issuer gate, burn-on-redeem liability, and the closed loop (stranger transfer reverts; merchant payment works).

**4 — Deploy to Fuji:**
```bash
npm run deploy:fuji
```

**5 — Run the solvency story end-to-end:**
```bash
npm run interact:fuji
```
Watch it: reward issued → transfer to a stranger **fails** ("Closed-loop token") → merchant approved → payment works → redemption burns → and the CFO dashboard prints live: **outstanding liability, lifetime emitted, remaining budget** — every number verifiable by any client or auditor.

**Foundry instead?** Section 8 of `COMMANDS.md` — same contract, same `.env`, `forge test` and `forge script`.

---

## Repository layout

```
contracts/IncentiveToken.sol   The contract — deck slides 9–12, verbatim + remainingBudget()
scripts/deploy.js              Hardhat deploy (reads EMISSION_CAP)
scripts/interact.js            The full solvency demo, incl. the closed-loop rejection
script/Deploy.s.sol            Foundry deploy twin
test/IncentiveToken.test.js    Hardhat suite — the four rules as tests
test/IncentiveToken.t.sol      Foundry twin of the same suite
hardhat.config.js              Fuji + Snowtrace verification pre-configured
foundry.toml                   Foundry config (OZ remapped to node_modules)
COMMANDS.md                    Every command, in order, both toolkits
CONTRIBUTING_GUIDE.md          The builder guide: workflow, PR format, grading, deadlines
```

## Quest 4 — The Incentive Token

Deploy **your** incentive token to Fuji with a working earn flow AND redeem flow, then submit via Plug and Play:

1. Contract address + explorer link (verify it: gold standard)
2. **Your one-slide economy** — the Duka Rewards shape from the deck: reward rate, redemption value, cap, worst-case cost, expected redemption. *"Can it survive success?"* is graded.
3. Your fork URL. First modifications worth making: rename the token from Duka (constructor's `ERC20("...", "...")` line), tune the cap to *your* worked economy, or flip it open-loop and defend the choice.

**This quest and your Jam project overlap by design — build once, use twice.** Hard deadline: Tuesday, July 21 (ideally before the Jam).

## The Jam is tomorrow night 🔥

Friday, July 17 · Blockchain Centre Nairobi · doors 7 PM · demos at dawn. This token + Session 3's mechanics + Session 2's ledger = your starting stack. **Deployed, not demoed.**

## Getting help

- `STUCK` in the session chat → mentor thread
- Discord tech channel · fast-fixes table at the bottom of `COMMANDS.md`

---

*team1 Kenya · Mini Hack Cohort 2 · Technical Lead: Scotch · [@AvaxAfrica](https://x.com/AvaxAfrica) · t.me/avaxDAOAfrica*
