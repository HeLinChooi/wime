import { ApiProperty } from '@nestjs/swagger';

export class Vault {
  @ApiProperty()
  id: number;
  @ApiProperty()
  ownerPubKey: string;
  @ApiProperty()
  vaultPassword: string;
}
