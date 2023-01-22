import { Injectable } from '@nestjs/common';
import { Will } from './entities/will.entity';
import { CreateWillDto } from './dto/create-will.dto';

@Injectable()
export class AppService {
  // Will creation operation
  private wills: Will[] = [
    {
      id: 1,
      ownerPubKey: '0x1234567890',
      beneficiaries: [
        {
          beneficiaryPubKey: '0x123456789',
          percentage: 100,
        },
      ],
    },
  ];

  createWill(will: CreateWillDto): Will {
    const newWill = {
      id: Date.now(),
      ...will,
    };

    this.wills.push(newWill);
    return newWill;
  }

  getWills(): Will[] {
    return this.wills;
  }
}
