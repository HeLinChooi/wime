import { Injectable } from '@nestjs/common';
import { Will } from './entities/will.entity';
import { CreateWillDto } from './dto/create-will.dto';
import { Vault } from './entities/vault.entity';
import { CreateVaultDto } from './dto/create-vault-password.dto';

@Injectable()
export class AppService {
  // Will
  private wills: Will[] = [
    {
      id: 1,
      ownerPubKey: '0x1234567890',
      beneficiaries: [
        {
          beneficiaryPubKey: '0x123456789',
          percentage: 100,
        },
      ],
    },
  ];

  getWills(): Will[] {
    return this.wills;
  }

  createWill(will: CreateWillDto): Will {
    const newWill = {
      id: Date.now(),
      ...will,
    };

    this.wills.push(newWill);
    return newWill;
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

  createVault(vault: CreateVaultDto): Vault {
    const newVault = {
      id: Date.now(),
      ...vault,
    };

    this.vaults.push(newVault);
    return newVault;
  }
}
