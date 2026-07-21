const { expect } = require("chai");
const { ethers } = require("hardhat");

const u = (n) => ethers.parseUnits(String(n), 18);

describe("Session 4 — IncentiveToken (the four solvency rules)", function () {
  let issuer, alice, shop, token;

  beforeEach(async () => {
    [issuer, alice, shop] = await ethers.getSigners();
    token = await ethers.deployContract("IncentiveToken", [u(1000)]); // tiny cap for testing
  });

  it("Rule 2 — capped emission: the budget cannot be exceeded", async () => {
    await token.issueReward(alice.address, u(900), "purchase");
    await expect(token.issueReward(alice.address, u(200), "bonus"))
      .to.be.revertedWith("Budget exhausted");
    await token.issueReward(alice.address, u(100), "bonus"); // exactly to the cap: fine
    expect(await token.totalEmitted()).to.equal(u(1000));
    expect(await token.remainingBudget()).to.equal(0);
  });

  it("issuer gate: only the business mints rewards", async () => {
    await expect(token.connect(alice).issueReward(alice.address, u(1), "hack"))
      .to.be.revertedWith("Not issuer");
  });

  it("Rule 3 — burn on redeem: totalSupply is live liability", async () => {
    await token.issueReward(alice.address, u(500), "purchase");
    await expect(token.connect(alice).redeem(u(200), "airtime-topup"))
      .to.emit(token, "Redeemed").withArgs(alice.address, u(200), "airtime-topup");
    expect(await token.balanceOf(alice.address)).to.equal(u(300));
    expect(await token.totalSupply()).to.equal(u(300)); // liability shrank with use
  });

  it("redeem is self-service and overdraft-proof", async () => {
    await expect(token.connect(alice).redeem(u(1), "x")).to.be.reverted; // ERC20InsufficientBalance
  });

  it("Rule 4 — closed loop: no open trading, merchants OK", async () => {
    await token.issueReward(alice.address, u(100), "purchase");

    await expect(token.connect(alice).transfer(shop.address, u(10)))
      .to.be.revertedWith("Closed-loop token");

    await token.setMerchant(shop.address, true);
    await token.connect(alice).transfer(shop.address, u(10)); // paying a merchant works
    expect(await token.balanceOf(shop.address)).to.equal(u(10));

    // merchants can also settle back out
    await token.connect(shop).transfer(alice.address, u(5));
    expect(await token.balanceOf(alice.address)).to.equal(u(95));
  });

  it("mint and burn are unaffected by the closed loop", async () => {
    await token.issueReward(alice.address, u(50), "referral"); // mint: from == 0
    await token.connect(alice).redeem(u(50), "voucher");       // burn: to == 0
    expect(await token.totalSupply()).to.equal(0);
  });
});
