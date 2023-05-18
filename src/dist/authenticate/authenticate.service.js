"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateService = void 0;
const common_1 = require("@nestjs/common");
const crypto = require("crypto");
let AuthenticateService = class AuthenticateService {
    async sendOtp(mobileNo, response) {
        console.log("mobileNo", mobileNo);
        const otp = Math.floor(100000 + Math.random() * 900000);
        const ttl = 5 * 60 * 1000;
        const expires = Date.now() + ttl;
        const data = `${mobileNo}.${otp}.${expires}`;
        const smsKey = "13893kjefbekbkb";
        const hash = crypto
            .createHmac("sha256", smsKey)
            .update(data)
            .digest("hex");
        const fullhash = `${hash}.${expires}`;
        console.log("fullhash", fullhash);
        console.log("otp", otp);
        const mobileNoStr = mobileNo.toString();
        if (otp && fullhash) {
            return response.status(200).json({
                statusCode: 200,
                success: true,
                message: `Otp successfully sent to XXXXXX${mobileNoStr.substring(6)}`,
                data: { hash: fullhash }
            });
        }
        else {
            return response.status(400).json({
                statusCode: 400,
                success: false,
                message: 'Unable to send OTP!',
                data: null
            });
        }
    }
    async verifyOtp(req, response) {
        const mobileNo = req.mobileNo;
        const hash = req.hash;
        const otp = req.otp;
        let [hashValue, expires] = hash.split(".");
        let now = Date.now();
        if (now > parseInt(expires)) {
            return response.status(400).json({
                statusCode: 400,
                success: false,
                message: 'Timeout please try again',
                result: null
            });
        }
        const data = `${mobileNo}.${otp}.${expires}`;
        const smsKey = "13893kjefbekbkb";
        const newCalculatedHash = crypto
            .createHmac("sha256", smsKey)
            .update(data)
            .digest("hex");
        if (newCalculatedHash === hashValue) {
            return response.status(200).json({
                statusCode: 200,
                success: true,
                message: 'OTP verified successfully!',
                data: null
            });
        }
        else {
            return response.status(400).json({
                statusCode: 400,
                success: false,
                message: 'Incorrect OTP',
                data: null
            });
        }
    }
    async sendOtpService(mobileNo, otp) {
    }
};
AuthenticateService = __decorate([
    (0, common_1.Injectable)()
], AuthenticateService);
exports.AuthenticateService = AuthenticateService;
//# sourceMappingURL=authenticate.service.js.map