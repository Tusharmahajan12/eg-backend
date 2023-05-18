import { Module } from '@nestjs/common';
import { AadhaarkycController } from './aadhaarkyc.controller';
import { AadhaarkycService } from './aadhaarkyc.service';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [AadhaarkycController],
  providers: [AadhaarkycService],
})
export class AadhaarkycModule {}
