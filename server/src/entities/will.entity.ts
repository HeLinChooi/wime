import { ApiProperty } from '@nestjs/swagger';

export class Will {
  @ApiProperty()
  id: number;
  @ApiProperty()
  ownerPubKey: string;
  @ApiProperty()
  beneficiaries: {
    beneficiaryPubKey: string;
    percentage: number;
  }[];
}
