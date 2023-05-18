import { HttpService } from '@nestjs/axios';
export declare class AadhaarkycService {
    private httpService;
    constructor(httpService: HttpService);
    sendAadhaarOtp(aadhaar_id: string): Promise<void>;
    verifyAadhaarOtp(aadhaar_id: string, aadhaar_otp: string, aadhaar_txn: string): Promise<void>;
    private getRRN;
}
