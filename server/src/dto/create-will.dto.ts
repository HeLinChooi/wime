import { ApiProperty } from '@nestjs/swagger';

export class CreateWillDto {
  @ApiProperty({
    description: 'Owner public key',
    type: 'string',
  })
  ownerPubKey: string;

  @ApiProperty({
    description: 'Owner identification number',
    type: 'string',
  })
  ownerIcNumber: string;

  @ApiProperty({
    description: 'Beneficiaries public keys and percentage cut',
  })
  beneficiaries: {
    beneficiaryPubKey: string;
    percentage: number;
  }[];

  @ApiProperty({
    description: 'Will active status. Is set to active when owner is deceased',
    type: 'boolean',
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Validators public keys',
  })
  validators: {
    validatorPubKey: string;
    isValidated: boolean;
  }[];
}
