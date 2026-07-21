# Mini Hack Cohort 2 — Builder Contribution Guide
## Building Gamified Solutions for Businesses on Avalanche | Team1 Kenya | 2026
### Session 4 repo — Tokenized Incentives (`IncentiveToken.sol`)

This guide covers everything you need to complete Quest 4, submit your work, and stay on track through the Jam and Demo Day. Read it once, refer back whenever you are unsure what to do next.

If something is not clear, post in the Telegram group before you guess. A wrong submission costs you points and time.

---

## Table of contents

- [Before you start](#before-you-start)
- [How Cohort 2 submissions work](#how-cohort-2-submissions-work)
- [Weekly workflow — step by step](#weekly-workflow--step-by-step)
- [Session 4 — starter code, deliverable, and quests](#session-4--starter-code-deliverable-and-quests)
- [How to open a GitHub PR](#how-to-open-a-github-pr)
- [Grading rubric](#grading-rubric)
- [Late submission policy](#late-submission-policy)
- [Getting help](#getting-help)
- [Quick links](#quick-links)

---

## Before you start

Complete all of these before touching the code. If you have not done them yet, do them now before anything else.

- [ ] GitHub account at [github.com](https://github.com) using your real name
- [ ] Avalanche Builders Hub account at [build.avax.network/builders-hub](https://build.avax.network/builders-hub) — Quest 1 and a primary KPI
- [ ] Core Wallet installed from [core.app](https://core.app) and configured on Fuji testnet
- [ ] Fuji testnet AVAX claimed from [core.app/tools/testnet-faucet](https://core.app/tools/testnet-faucet)
- [ ] Quests 2 and 3 done (your LoyaltyPoints ledger + one mechanic deployed) — Session 4 builds on them
- [ ] **Fork this repo** to your personal GitHub account
- [ ] Clone your fork and run `npm install` then `npx hardhat compile` — verify it runs without errors
- [ ] Join the Telegram group: [t.me/avaxDAOAfrica](https://t.me/avaxDAOAfrica)

**Fuji testnet config:**

```
Network name:  Avalanche Fuji Testnet
RPC URL:       https://api.avax-test.network/ext/bc/C/rpc
Chain ID:      43113
Currency:      AVAX
Explorer:      https://testnet.snowtrace.io
```

---

## How Cohort 2 submissions work

Sessions run Tuesdays and Thursdays at 8:00 PM EAT on Google Meet. Every quest has two parts, both required:

**1. A GitHub pull request** — your actual code, on **your fork** of this repo, reviewed by the technical lead or a module lead.

**2. A quest submission** — evidence of your work on the cohort's quest platform (link posted in Telegram and the programme site): contract address, Snowtrace links, screenshots, your one-slide economy, and your GitHub PR link.

A PR without a quest submission is incomplete. A quest submission without a PR link is incomplete. **Quest 4 hard deadline: Tuesday, July 21 (today) — ideally before the Jam (Friday, July 24).** Reviews land within 48 hours.

---

## Weekly workflow — step by step

Follow this exact process. No deviations.

### Step 1 — Sync your fork with this template

```
git remote add upstream https://github.com/Talent-Index/Session-4-tokenized-incentives.git
# Only run the line above once — skip it afterwards

git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

### Step 2 — Create your session branch

Branch naming is mandatory. Use this exact format:

```
git checkout -b session-4-{your-github-handle}
```

Examples:

```
git checkout -b session-4-scotch
git checkout -b session-4-wanjiku
git checkout -b session-4-kipchoge
```

A PR with the wrong branch name is flagged immediately and sent back to you to fix.

### Step 3 — Do your work on that branch

Build your incentive token on your branch. Commit often. Write commit messages that describe what you actually did — not `fix` or `update`:

```
# Good commit messages
git commit -m "rename token to ChamaPoints, cap tuned to 5M per worked economy"
git commit -m "deploy IncentiveToken to Fuji — tx hash 0x..."
git commit -m "add test: exact-cap mint succeeds, cap+1 reverts"

# Bad commit messages
git commit -m "fix"
git commit -m "update"
git commit -m "wip"
```

Your commit history is visible to reviewers and contributes to your code quality score.

### Step 4 — Push your branch

```
git push origin session-4-{your-github-handle}
```

### Step 5 — Open a pull request

Open the PR from your session branch into the `main` branch of **your own fork** — not into the Talent-Index template repo.

**PR title format — mandatory:**

```
[Cohort 2 Session 4] Your Full Name - Deliverable title
```

Examples:

```
[Cohort 2 Session 4] Joseph Njoroge - ChamaPoints capped incentive token on Fuji
[Cohort 2 Session 4] Wanjiku Kamau - Closed-loop retail rewards token, 10M cap
```

Fill in every section of the PR description:

- What you built (and what you changed from the starter)
- What works / what does not work yet
- Your Snowtrace link — **required**
- Your one-slide economy (reward rate · redemption value · cap · worst-case cost) — **required, this is the Routledge/solvency test**
- Notes for the reviewer

### Step 6 — Post your PR link in Telegram

```
[Cohort 2 Session 4] PR submitted
https://github.com/YOUR-HANDLE/Session-4-tokenized-incentives/pull/N
```

### Step 7 — Complete your quest submission

Submit on the quest platform (link in Telegram): contract address + Snowtrace link, your one-slide economy, your fork URL, and your PR link — every field, no blanks. Only complete submissions count.

---

## Session 4 — starter code, deliverable, and quests

### Starter code

```
contracts/IncentiveToken.sol   The contract from the session deck (slides 9–12) + remainingBudget()
scripts/deploy.js              Hardhat deploy — reads EMISSION_CAP from .env
scripts/interact.js            Full solvency demo incl. the closed-loop rejection
script/Deploy.s.sol            Foundry deploy twin
test/IncentiveToken.test.js    Hardhat suite — the four solvency rules as tests
test/IncentiveToken.t.sol      Foundry twin of the same suite
COMMANDS.md                    Every command, in order, both toolkits
```

### Deliverable

**Your own incentive token, deployed to Fuji**, with a working earn flow AND redeem flow, an emission cap, and a defensible one-slide economy. Meaningful modifications expected — at minimum rename the token and tune the cap to *your* worked economy. Distinction-level: flip open-loop and defend the choice, or wire rewards to your Session 3 mechanics.

### Quest 4 checklist (points as posted on the quest form)

| Item | What to submit |
| --- | --- |
| Deployed token | Contract address + Snowtrace link on Fuji |
| Verified source | `npx hardhat verify ... <ADDRESS> <CAP>` — verified badge on Snowtrace |
| The economy | Your one-slide economy in the Duka Rewards shape — *"can it survive success?"* is graded |
| Working flows | Terminal output of a successful `issueReward` AND `redeem` (or `interact.js` run) |
| Your fork + PR | Fork URL and PR link, title format exact |

---

## How to open a GitHub PR

1. Push your branch: `git push origin session-4-{your-handle}`
2. Go to `github.com/YOUR-HANDLE/Session-4-tokenized-incentives`
3. Click **Compare and pull request** on the banner
4. Verify the base is `main` on **your own fork** — not on Talent-Index
5. Set the title: `[Cohort 2 Session 4] Your Name - Deliverable title`
6. Fill every section of the description
7. **Create pull request**, copy the URL, post it in Telegram

**If you open the PR against the wrong repo (Talent-Index instead of your fork):** close it immediately and open a new one from your fork's page.

---

## Grading rubric

| Criterion | Weight | Excellent | Good | Needs work |
| --- | --- | --- | --- | --- |
| Functionality | 35% | Earn + redeem + cap all work on Fuji | Core flows work | Partial or broken |
| Solvency thinking | 25% | Cap tied to a defensible worked economy | Cap set, economy sketched | Default cap, no economy |
| Code quality | 20% | Clean, commented, tests green both toolkits | Readable, Hardhat tests green | Hard to follow, no tests |
| Documentation | 10% | Fork README covers what/why/how + addresses | README present | Minimal docs |
| Verification | 10% | Source verified on Snowtrace | Deployed, unverified | Not deployed = not done |

**Grade bands:** Distinction 90–100 · Merit 75–89 · Pass 60–74 · Incomplete below 60.
Certificates require Pass or above AND presenting at Demo Day (Saturday, July 25).

---

## Late submission policy

| Timing | Consequence |
| --- | --- |
| On time (before the posted deadline) | Full points |
| Up to 48 hours late | Accepted with 20% penalty |
| Beyond 48 hours | Zero for that quest — you may still continue |
| Three consecutive zeros | Removal from the cohort without a certificate |

Genuine emergency? Message the technical lead on Telegram **before** the deadline. After it, late appeals are not considered.

---

## Getting help

**Post in Telegram first.** Include three things:

1. What you are trying to do
2. What you have already tried
3. The exact error message — the full text, not a paraphrase

**Office hours** run Thursdays 6:00–7:00 PM EAT before the main session — bring blockers there.

**Tag @scotch** only after posting in the group without a response in reasonable time. Do not DM the technical lead for general questions — post in the group so everyone benefits.

Common failures and one-line fixes: the 🚑 table at the bottom of [`COMMANDS.md`](./COMMANDS.md). *(Hint: "Budget exhausted" and "Closed-loop token" are the contract working, not breaking.)*

---

## Quick links

| Resource | Link |
| --- | --- |
| GitHub org | [github.com/Talent-Index](https://github.com/Talent-Index) |
| This template repo | [github.com/Talent-Index/Session-4-tokenized-incentives](https://github.com/Talent-Index/Session-4-tokenized-incentives) |
| Quest leaderboard | [minihacktracker.vercel.app](https://minihacktracker.vercel.app) |
| Telegram (primary) | [t.me/avaxDAOAfrica](https://t.me/avaxDAOAfrica) |
| Avalanche Builders Hub | [build.avax.network/builders-hub](https://build.avax.network/builders-hub) |
| Avalanche Academy | [academy.avax.network](https://academy.avax.network) |
| Fuji faucet | [core.app/tools/testnet-faucet](https://core.app/tools/testnet-faucet) |
| Fuji explorer | [testnet.snowtrace.io](https://testnet.snowtrace.io) |
| Core Wallet | [core.app](https://core.app) |
| Hardhat docs | [hardhat.org/docs](https://hardhat.org/docs) |
| Foundry docs | [book.getfoundry.sh](https://book.getfoundry.sh) |
| OpenZeppelin | [docs.openzeppelin.com/contracts](https://docs.openzeppelin.com/contracts) |
| Avalanche docs | [docs.avax.network](https://docs.avax.network) |

---

*Build with intent. Ship with pride.* **Team1 Kenya | Mini Hack Cohort 2 | 2026**
