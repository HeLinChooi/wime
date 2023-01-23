import { ApiProperty } from '@nestjs/swagger';

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
  validators: {
    validatorPubKey: string;
    isValidated: boolean;
  }[];
}
