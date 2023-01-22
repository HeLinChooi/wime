import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateWillDto } from './dto/create-will.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Will } from './entities/will.entity';

@ApiTags('wills')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiResponse({ status: 201, description: 'Will created' })
  @Post('create-will')
  createWill(@Body() createWillDto: CreateWillDto): Will {
    return this.appService.createWill(createWillDto);
  }

  @ApiResponse({ status: 200, description: 'Will list' })
  @Get('get-wills')
  getWills(): Will[] {
    return this.appService.getWills();
  }
}
