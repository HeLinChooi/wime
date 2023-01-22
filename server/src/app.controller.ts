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
  createWill(@Body() createWillDto: CreateWillDto): Will {
    return this.appService.createWill(createWillDto);
  }

  @ApiResponse({ status: 201, description: 'Will activated' })
  @Post('activate-will')
  activateWill(@Body() data: { ownerIcNumber: string }): Will {
    return this.appService.activateWill(data.ownerIcNumber);
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
