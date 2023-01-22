import { ApiProperty } from '@nestjs/swagger';

export class CreateWillDto {
  @ApiProperty({
    description: 'Owner public key',
    type: 'string',
  })
  ownerPubKey: string;

  description: 'Beneficiaries public keys and percentage cut';
  @ApiProperty({})
  beneficiaries: {
    beneficiaryPubKey: string;
    percentage: number;
  }[];
}
