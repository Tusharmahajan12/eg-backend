import { Controller, Post, Body } from '@nestjs/common';
import { AadhaarkycService } from './aadhaarkyc.service';

@Controller('aadhaarkyc')
export class AadhaarkycController {
  constructor(private readonly aadhaarkycService: AadhaarkycService) {}

  @Post('otp')
  async sendAadhaarOtp(@Body('aadhaarId') aadhaarId: string): Promise<any> {
    const response = await this.aadhaarkycService.sendAadhaarOtp(aadhaarId);
    return response;
  }

  @Post('verify')
  async verifyAadhaarOtp(
    @Body('aadhaarId') aadhaarId: string,
    @Body('aadhaarOtp') aadhaarOtp: string,
    @Body('aadhaarTxn') aadhaarTxn: string,
  ): Promise<any> {
    const response = await this.aadhaarkycService.verifyAadhaarOtp(
      aadhaarId,
      aadhaarOtp,
      aadhaarTxn,
    );
    return response;
  }
}
