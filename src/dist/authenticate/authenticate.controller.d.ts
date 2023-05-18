import { AuthenticateService } from './authenticate.service';
import { Response } from 'express';
export declare class AuthenticateController {
    authenticateService: AuthenticateService;
    constructor(authenticateService: AuthenticateService);
    sendOtp(mobileNo: Number, response: Response): Promise<any>;
    verifyOtp(req: Record<string, any>, response: Response): Promise<any>;
}
