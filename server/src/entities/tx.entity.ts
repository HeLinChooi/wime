import { ApiProperty } from '@nestjs/swagger';

export class Tx {
  @ApiProperty()
  contractAddress: string;

  @ApiProperty()
  toPubKey: string;

  @ApiProperty()
  fromPubKey: string;

  @ApiProperty()
  fromPrivKey: string;

  @ApiProperty()
  amount: string;

  @ApiProperty()
  gasLimit: string;

  @ApiProperty()
  gasPrice: string;
}
