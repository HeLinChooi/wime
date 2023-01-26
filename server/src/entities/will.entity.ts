import { ApiProperty } from '@nestjs/swagger';
import { Contract } from 'ethers';

export class Will {
  @ApiProperty()
  id: number;

  @ApiProperty()
  ownerIcNumber: string;

  @ApiProperty()
  ownerPubKey: string;

  @ApiProperty()
  beneficiaries: {
    beneficiaryPubKey: string;
    percentage: number;
  }[];

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  isAssetsTransferred: boolean;

  @ApiProperty()
  validators: {
    validatorPubKey: string;
    isValidated: boolean;
  }[];

  @ApiProperty()
  contract: Contract
}
