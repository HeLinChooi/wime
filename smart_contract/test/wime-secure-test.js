const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("WimeSecure", async function () {
  it("Should return vault password", async function () {
    const WimeSecure = await ethers.getContractFactory("WimeSecure");
    const wimeSecure = await WimeSecure.deploy("testPassword");
    await wimeSecure.deployed();
    const vaultPassword = await wimeSecure.getVaultPassword();

    expect(vaultPassword).to.equal("testPassword");
  });

  it("Should return owner address", async function () {
    const WimeSecure = await ethers.getContractFactory("WimeSecure");
    const wimeSecure = await WimeSecure.deploy("testPassword");
    await wimeSecure.deployed();
    const ownerAddress = await wimeSecure.getOwnerAddress();

    expect(ownerAddress).to.equal("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
  });

  it("Should return vault password if all validators have authorized", async function () {
    const WimeSecure = await ethers.getContractFactory("WimeSecure");
    const wimeSecure = await WimeSecure.deploy("testPassword");
    await wimeSecure.deployed();
    const vaultPassword = await wimeSecure.requestVaultPassword();

    expect(vaultPassword).to.equal("testPassword");
  });

  it("Should return true", async function () {
    const WimeSecure = await ethers.getContractFactory("WimeSecure");
    const wimeSecure = await WimeSecure.deploy("testPassword");
    await wimeSecure.deployed();
    const vaultPassword = await wimeSecure.requestProof();

    expect(vaultPassword).to.equal(true);
  });
});
