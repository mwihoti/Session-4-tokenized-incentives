// Deploys IncentiveToken with your emission cap (Solvency Rule 2: immutable budget).
// Run:  npx hardhat run scripts/deploy.js --network fuji
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const cap = process.env.EMISSION_CAP || hre.ethers.parseUnits("10000000", 18).toString();

  console.log("Deploying as issuer:", deployer.address);
  console.log("Emission cap (the budget, forever):", cap);

  const token = await hre.ethers.deployContract("IncentiveToken", [cap]);
  await token.waitForDeployment();
  console.log("IncentiveToken ->", token.target);

  fs.writeFileSync("deployments.json", JSON.stringify({
    network: hre.network.name,
    issuer: deployer.address,
    IncentiveToken: token.target,
    emissionCap: cap,
  }, null, 2));
  console.log("\nSaved to deployments.json — this address + your one-slide economy = Quest 4.");
}

main().catch((e) => { console.error(e); process.exitCode = 1; });
