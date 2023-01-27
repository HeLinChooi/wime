import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

// Command to test: npx hardhat test --typecheck test/will-test.ts
describe("Will", async function () {
  const _ownerPubKey = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
  const _beneficiaryPubKey = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
  const _validatorOnePubKey = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC";
  const _validatorTwoPubKey = "0x90F79bf6EB2c4f870365E785982E1f101E93b906";
  const _beneficiaryDistribution = "100";

  const oneETH = 1;
  async function deployContractFixture() {
    // Get Ethereum external account
    const [owner, beneficiary, validator1, validator2] =
      await ethers.getSigners();

    // Get the contract factory
    const Will = await ethers.getContractFactory("Will");

    // Deploy the contract
    const will = await Will.deploy(
      _ownerPubKey,
      _beneficiaryPubKey,
      _beneficiaryDistribution,
      ethers.utils.parseEther(oneETH.toString()),
      [_validatorOnePubKey, _validatorTwoPubKey],
      { value: ethers.utils.parseEther(oneETH.toString()) }
    );

    const scBalance = await will.getBalance();
    console.log("scBalance", ethers.utils.formatEther(scBalance));

    return { will, owner, beneficiary, validator1, validator2 };
  }

  describe("Deployment", function () {
    it("Should return beneficiary pubKey", async () => {
      const { will } = await loadFixture(deployContractFixture);

      const beneficiary = await will.getBeneficiary();
      expect(beneficiary).to.equal(_beneficiaryPubKey);
    });
    it("Should return validators pubKey", async () => {
      const { will } = await loadFixture(deployContractFixture);

      const validators = await will.getValidators();
      // expect(validators).to.equal([_validatorOnePubKey]);
      expect(validators).to.include(_validatorOnePubKey);
    });
  });
  describe("Validate", function () {
    it("The validator that sign transaction on validate smart contract function should change it's state in smart contract to true", async () => {
      const { will, validator1 } = await loadFixture(deployContractFixture);

      // Sign and send the transaction to the validate() function using validator1
      const validateTx = await will.connect(validator1).validate();
      console.log("validateTx", validateTx);
      // wait for the transaction to be mined
      await validateTx.wait();
      // will.interface.functions["validate()"].name
      // const functionSignature = "validate()";
      // const contract = new ethers.Contract(will.address, will., ethers.provider);
      // const bytecode = contract.getSighash(functionSignature);
      // Get the value in the mapping for validator1's address
      const isAuthorized = await will.authorizedAddressesForMultiSig(
        validator1.address
      );

      // Use expect to check if the value is true
      expect(isAuthorized).to.be.true;
    });
  });
  describe("Assets Transfer", function () {
    it("Should not transfer assets to beneficiary because not all validators approved it", async () => {
      const { will, owner, beneficiary, validator1, validator2 } = await loadFixture(
        deployContractFixture
      );
      
      // Validator 1 approve the asset transfer
      const validateTx = await will.connect(validator1).validate({gasLimit: 55000});
      // Wait for the transaction to be mined
      await validateTx.wait();

      // Get the initial balance of the recipient
      const initialBalance = await ethers.provider.getBalance(
        beneficiary.address
      );

      const amount = ethers.utils.parseEther(oneETH.toString());
      await expect(will.distributeAssets(amount, {
        value: amount,
      })).to.be.revertedWith(
        "All validators have yet approve the assets transfer"
      );
    });

    it("Should transfer assets to beneficiary", async () => {
      const { will, owner, beneficiary, validator1, validator2 } = await loadFixture(
        deployContractFixture
      );
      
      // Validator 1 approve the asset transfer
      const validateTx = await will.connect(validator1).validate({gasLimit: 55000});
      // Wait for the transaction to be mined
      await validateTx.wait();
      // Validator 2 approve the asset transfer
      const validateTx2 = await will.connect(validator2).validate();
      // Wait for the transaction to be mined
      await validateTx2.wait();

      // Get the initial balance of the recipient
      const initialBalance = await ethers.provider.getBalance(
        beneficiary.address
      );

      const amount = ethers.utils.parseEther(oneETH.toString());
      await will.distributeAssets(amount, {
        value: amount,
      });

      // Get the final balance of the recipient
      const finalBalance = await ethers.provider.getBalance(
        beneficiary.address
      );

      // Calculate the difference between the initial and final balances
      const difference = finalBalance.sub(initialBalance);
      console.log("initialBalance", ethers.utils.formatEther(initialBalance));
      console.log("finalBalance", ethers.utils.formatEther(finalBalance));
      expect(difference).to.equal(amount);
    });
  });
});
