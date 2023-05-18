import { AadhaarkycService } from './aadhaarkyc.service';
export declare class AadhaarkycController {
    private readonly aadhaarkycService;
    constructor(aadhaarkycService: AadhaarkycService);
    sendAadhaarOtp(aadhaarId: string): Promise<any>;
    verifyAadhaarOtp(aadhaarId: string, aadhaarOtp: string, aadhaarTxn: string): Promise<any>;
}
