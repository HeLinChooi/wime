import { ApiProperty } from '@nestjs/swagger';

export class Tx {
  @ApiProperty()
  fromPubKey: string;

  @ApiProperty()
  toPubKey: string;

  @ApiProperty()
  amount: string;

  @ApiProperty()
  gasLimit: string;

  @ApiProperty()
  gasPrice: string;
}
