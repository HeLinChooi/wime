import { ApiProperty } from '@nestjs/swagger';

export class CreateVaultDto {
  @ApiProperty({
    description:
      'The public key of the owner of the vault (financial institution)',
    example: '0x1234567890',
    type: 'string',
  })
  ownerPubKey: string;

  @ApiProperty({
    description: "The password of the client's vault",
    example: '123456',
    type: 'string',
  })
  vaultPassword: string;
}
