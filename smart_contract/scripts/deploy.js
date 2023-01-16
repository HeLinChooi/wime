// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const _vaultPassword = "testPassword";
const _ownerPubKey = "0xdd2fd4581271e230360230f9337d5c0430bf44c0";
const _clientPubKey = "0xcd3b766ccdd6ae721141f452c550ca635964ce71";
const _clientIcNumber = 1234567890;
const _validatorPubKey = "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199";
const _validatorIsAuthorized = true;

async function main() {
  const WimeSecure = await hre.ethers.getContractFactory("WimeSecure");
  const wimeSecure = await WimeSecure.deploy(
    _vaultPassword,
    _ownerPubKey,
    _clientPubKey,
    _clientIcNumber,
    _validatorPubKey,
    _validatorIsAuthorized
  );
  await wimeSecure.deployed();
  console.log("WimeSecure deployed to: " + wimeSecure.address);

  const _beneficiaryPubKey = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
  const _beneficiaryDistribution = "100";
  const Will = await ethers.getContractFactory("Will");
  const will = await Will.deploy(_beneficiaryPubKey, _beneficiaryDistribution);
  await will.deployed();
  console.log("Will deployed to: " + will.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
