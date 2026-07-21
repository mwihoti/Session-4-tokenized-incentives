// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";
import {IncentiveToken} from "../contracts/IncentiveToken.sol";

/// Foundry twin of test/IncentiveToken.test.js — same behaviours, Solidity-native.
/// Run:  forge test -vv
contract IncentiveTokenTest is Test {
    IncentiveToken token;
    address alice = address(0xA11CE);
    address shop = address(0x5709);
    uint256 constant U = 1e18;

    function setUp() public {
        token = new IncentiveToken(1000 * U); // this test contract = issuer
    }

    function test_CappedEmission() public {
        token.issueReward(alice, 900 * U, "purchase");
        vm.expectRevert(bytes("Budget exhausted"));
        token.issueReward(alice, 200 * U, "bonus");

        token.issueReward(alice, 100 * U, "bonus"); // exactly to the cap
        assertEq(token.totalEmitted(), 1000 * U);
        assertEq(token.remainingBudget(), 0);
    }

    function test_OnlyIssuerMints() public {
        vm.prank(alice);
        vm.expectRevert(bytes("Not issuer"));
        token.issueReward(alice, 1, "hack");
    }

    function test_BurnOnRedeem_LiveLiability() public {
        token.issueReward(alice, 500 * U, "purchase");
        vm.prank(alice);
        token.redeem(200 * U, "airtime-topup");
        assertEq(token.balanceOf(alice), 300 * U);
        assertEq(token.totalSupply(), 300 * U); // liability shrank with use
    }

    function test_ClosedLoop() public {
        token.issueReward(alice, 100 * U, "purchase");

        vm.prank(alice);
        vm.expectRevert(bytes("Closed-loop token"));
        token.transfer(shop, 10 * U);

        token.setMerchant(shop, true);
        vm.prank(alice);
        token.transfer(shop, 10 * U); // paying a merchant works
        assertEq(token.balanceOf(shop), 10 * U);
    }

    function test_MintBurnUnaffectedByLoop() public {
        token.issueReward(alice, 50 * U, "referral");
        vm.prank(alice);
        token.redeem(50 * U, "voucher");
        assertEq(token.totalSupply(), 0);
    }
}
