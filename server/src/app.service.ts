import { Injectable } from '@nestjs/common';
import { Will } from './entities/will.entity';
import { CreateWillDto } from './dto/create-will.dto';
import { Vault } from './entities/vault.entity';
import { CreateVaultDto } from './dto/create-vault-password.dto';
import { Tx } from './entities/tx.entity';
import { ethers, ContractFactory } from 'ethers';
import { contractABI, contractByteCode } from './utils/constants';

declare global {
  interface Window {
    ethereum: any;
  }
}

@Injectable()
export class AppService {
  // Will smart contract
  // Sample initialized data
  private wills: Will[] = [
    {
      id: 1,
      ownerPubKey: '0x1234567890',
      ownerIcNumber: '1234567890',
      beneficiaries: [
        {
          beneficiaryPubKey: '0x123456789',
          percentage: 100,
        },
      ],
      isActive: false,
      isAssetsTransferred: false,
      validators: [
        {
          validatorPubKey: '0x123456789',
          isValidated: false,
        },
      ],
      contract: null,
    },
  ];

  getWills(): Will[] {
    return this.wills;
  }

  async createWill(_will: CreateWillDto): Promise<Will> {
    const provider = new ethers.providers.JsonRpcProvider(
      'http://127.0.0.1:8545',
    );
    const clientPrivKey =
      '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
    const _clientPubKey = '0xcd3b766ccdd6ae721141f452c550ca635964ce71';
    const _beneficiaryPubKey = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';
    const _beneficiaryDistribution = '100';
    const oneETH = 1;
    const wallet = new ethers.Wallet(clientPrivKey, provider);
    const account = wallet.connect(provider);
    const factory = new ContractFactory(contractABI, contractByteCode,account);

    // If your contract requires constructor args, you can specify them here
    const willContract = await factory.deploy(
      _clientPubKey,
      _beneficiaryPubKey,
      _beneficiaryDistribution,
      ethers.utils.parseEther(oneETH.toString()),
      { value: ethers.utils.parseEther(oneETH.toString()) },
    );

    console.log(willContract.address);
    console.log(willContract.deployTransaction);
    const newWill = {
      id: Date.now(),
      ..._will,
      isActive: false,
      isAssetsTransferred: false,
      contract: willContract
    };

    this.wills.push(newWill);
    return newWill;
  }

  async activateWill(_ownerIcNumber: string): Promise<Will> {
    const will: Will = this.wills.find(
      (will) => will.ownerIcNumber === _ownerIcNumber,
    );

    if (will && !will.isActive) {
      const transferAmountInETH = 2;
      const amount = ethers.utils.parseEther(transferAmountInETH.toString());
      await will.contract.distributeAssets(amount, {
        value: amount,
      });
      will.isActive = true;
    }
    return will;
  }

  validateWill(_ownerIcNumber: string, _validatorPubKey: string): Will {
    const will: Will = this.wills.find(
      (will) => will.ownerIcNumber === _ownerIcNumber,
    );
    if (will) {
      const validator = will.validators.find(
        (validator) => validator.validatorPubKey === _validatorPubKey,
      );
      if (validator) {
        validator.isValidated = true;
      }
    }
    return will;
  }

  // Asset
  private tx: Tx = {
    contractAddress: '',
    toPubKey: '',
    fromPubKey: '',
    fromPrivKey: '',
    amount: '',
    gasLimit: 'defaultValue',
    gasPrice: 'defaultValue',
  };

  transferAssets(
    _contractAddress: string,
    _toPubKey: string,
    _fromPubKey: string,
    _fromPrivKey: string,
    _amount: string,
  ): any {
    this.tx.contractAddress = _contractAddress;
    this.tx.fromPubKey = _fromPubKey;
    this.tx.fromPrivKey = _fromPrivKey;
    this.tx.toPubKey = _toPubKey;
    this.tx.amount = _amount;

    this.sendToken(this.tx);

    return {
      tx: this.tx,
    };
  }

  async sendToken(tx: Tx) {
    const provider = new ethers.providers.JsonRpcProvider(
      'http://127.0.0.1:8545',
    );
    console.log(tx);
    const wallet = new ethers.Wallet(tx.fromPrivKey, provider);
    // let walletSigner = wallet.connect(provider);

    provider.getGasPrice().then((currentGasPrice) => {
      const gasPrice = ethers.utils.hexlify(currentGasPrice).toString();
      tx.gasPrice = gasPrice;
    });

    const newTx = await wallet.sendTransaction({
      to: tx.toPubKey,
      value: ethers.utils.parseEther(tx.amount),
    });

    await newTx.wait();
    const senderBalance = await provider.getBalance(tx.fromPubKey);
    const recipientBalance = await provider.getBalance(tx.toPubKey);
    console.log(newTx);
  }

  // Vault
  private vaults: Vault[] = [
    {
      id: 1,
      ownerPubKey: '0x1234567890',
      vaultPassword: '123456',
    },
  ];

  getVaults(): Vault[] {
    return this.vaults;
  }

  createVault(_vault: CreateVaultDto): Vault {
    const newVault = {
      id: Date.now(),
      ..._vault,
    };

    this.vaults.push(newVault);
    return newVault;
  }
}
