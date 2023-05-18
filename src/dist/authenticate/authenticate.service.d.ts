export declare class AuthenticateService {
    sendOtp(mobileNo: any, response: any): Promise<any>;
    verifyOtp(req: any, response: any): Promise<any>;
    sendOtpService(mobileNo: any, otp: any): Promise<void>;
}
