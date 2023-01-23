import { Injectable } from '@nestjs/common';
import { Will } from './entities/will.entity';
import { CreateWillDto } from './dto/create-will.dto';
import { Vault } from './entities/vault.entity';
import { CreateVaultDto } from './dto/create-vault-password.dto';
import { Tx } from './entities/tx.entity';

@Injectable()
export class AppService {
  // Will
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
    },
  ];

  getWills(): Will[] {
    return this.wills;
  }

  createWill(_will: CreateWillDto): Will {
    const newWill = {
      id: Date.now(),
      ..._will,
      isActive: false,
      isAssetsTransferred: false,
    };

    this.wills.push(newWill);
    return newWill;
  }

  activateWill(_ownerIcNumber: string): Will {
    const will: Will = this.wills.find(
      (will) => will.ownerIcNumber === _ownerIcNumber,
    );
    if (will) {
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
    fromPubKey: '',
    toPubKey: '',
    amount: '',
    gasLimit: '0x100000',
    gasPrice: '100',
  };

  transferAssets(
    _toPubKey: string,
    _fromPubKey: string,
    _fromPrivKey: string,
    _amount: number,
  ): Tx {
    this.tx.fromPubKey = _fromPubKey;
    this.tx.toPubKey = _toPubKey;
    this.tx.amount = _amount.toString();

    return this.tx;
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
