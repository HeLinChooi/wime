import { expect } from "chai";
import { ethers } from "hardhat";

describe("Will", async function () {
  const _clientPubKey = "0xcd3B766CCDd6AE721141F452C550Ca635964ce71";
  const _beneficiaryPubKey = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
  const _beneficiaryDistribution = "100";

  it("Should return beneficiary pubKey", async () => {
    const Will = await ethers.getContractFactory("Will");
    const will = await Will.deploy(
      _clientPubKey,
      _beneficiaryPubKey,
      _beneficiaryDistribution
    );
    const beneficiary = await will.getBeneficiary();
    expect(beneficiary).to.equal(_beneficiaryPubKey);
  });

  it("Should transfer assets to beneficiary", async () => {
    // console.log(ethers)
    // const signer = await ethers.getSigner();
    // console.log('signer', signer);
    const Will = await ethers.getContractFactory("Will");
    const will = await Will.deploy(
      _clientPubKey,
      _beneficiaryPubKey,
      _beneficiaryDistribution
    );
    const isDistributed = await will.distributeAssets();
    expect(isDistributed).to.equal(true);
  });
});
