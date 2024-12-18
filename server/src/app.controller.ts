import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateWillDto } from './dto/create-will.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Will } from './entities/will.entity';
import { CreateVaultDto } from './dto/create-vault-password.dto';
import { Vault } from './entities/vault.entity';

@ApiTags('wills')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Will
  @ApiResponse({ status: 200, description: 'Will list' })
  @Get('get-wills')
  getWills(): Will[] {
    return this.appService.getWills();
  }

  @ApiResponse({ status: 201, description: 'Will created' })
  @Post('create-will')
  async createWill(@Body() createWillDto: CreateWillDto): Promise<Will> {
    return await this.appService.createWill(createWillDto);
  }

  @ApiResponse({ status: 201, description: 'Will activated' })
  @Post('activate-will')
  async activateWill(@Body() data: { ownerIcNumber: string }): Promise<Will> {
    return await this.appService.activateWill(data.ownerIcNumber);
  }

  @ApiResponse({ status: 201, description: 'Will validated' })
  @Post('validate-will')
  async validateWill(
    @Body() data: { ownerIcNumber: string; validatorPubKey: string },
  ): Promise<Will> {
    return this.appService.validateWill(
      data.ownerIcNumber,
      data.validatorPubKey,
    );
  }

  // Asset
  @ApiResponse({ status: 201, description: 'Asset transferred' })
  @Post('transfer-assets')
  transferAssets(
    @Body()
    data: {
      contractAddress: string;
      toPubKey: string;
      fromPubKey: string;
      fromPrivKey: string;
      amount: string;
    },
  ) {
    return this.appService.transferAssets(
      data.contractAddress,
      data.toPubKey,
      data.fromPubKey,
      data.fromPrivKey,
      data.amount,
    );
  }

  // Vault
  @ApiResponse({ status: 200, description: 'Vault list' })
  @Get('get-vaults')
  getVaults(): Vault[] {
    return this.appService.getVaults();
  }

  @ApiResponse({ status: 201, description: 'Vault created' })
  @Post('create-vault')
  createVaultPassword(@Body() createVaultDto: CreateVaultDto): Vault {
    return this.appService.createVault(createVaultDto);
  }
}
