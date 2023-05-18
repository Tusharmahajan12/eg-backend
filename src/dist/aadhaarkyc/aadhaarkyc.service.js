"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AadhaarkycService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
let AadhaarkycService = class AadhaarkycService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async sendAadhaarOtp(aadhaar_id) {
        const rrn = await this.getRRN();
        let data = JSON.stringify({
            AUAKUAParameters: {
                LAT: '17.494568',
                LONG: '78.392056',
                DEVMACID: '11:22:33:44:55',
                DEVID: 'F0178BF2AA61380FBFF0',
                CONSENT: 'Y',
                SHRC: 'Y',
                VER: '2.5',
                SERTYPE: '09',
                ENV: '2',
                CH: '0',
                AADHAARID: aadhaar_id,
                SLK: 'LIPCR-SYMQL-KOXVX-WVJZR',
                RRN: rrn,
                REF: 'FROMSAMPLE',
                UDC: '',
            },
            PIDXml: '',
            Environment: '0',
        });
        console.log(data);
        const url = process.env.AADHAAR_URL + '/api/Aadhaar/GenerateOTP';
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
    }
    async verifyAadhaarOtp(aadhaar_id, aadhaar_otp, aadhaar_txn) {
        const rrn = await this.getRRN();
        let data = JSON.stringify({
            AUAKUAParameters: {
                LAT: '17.494568',
                LONG: '78.392056',
                DEVMACID: '11:22:33:44:55',
                DEVID: 'F0178BF2AA61380FBFF0',
                CONSENT: 'Y',
                SHRC: 'Y',
                VER: '2.5',
                SERTYPE: '02',
                ENV: '2',
                OTP: aadhaar_otp,
                AADHAARID: aadhaar_id,
                SLK: 'LIPCR-SYMQL-KOXVX-WVJZR',
                RRN: rrn,
                TXN: aadhaar_txn,
                REF: 'FROMSAMPLE',
                UDC: '',
            },
            PIDXml: '',
            Environment: '0',
        });
        const url = process.env.AADHAAR_URL + '/api/Aadhaar/AUTHWithOTP';
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        let response_text = null;
        try {
            const observable = this.httpService.post(url, data, config);
            const promise = observable.toPromise();
            const response = await promise;
            response_text = response.data;
        }
        catch (e) {
            response_text = { error: e };
        }
    }
    async getRRN() {
        let length = 20;
        let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var result = '';
        for (var i = length; i > 0; --i)
            result += chars[Math.floor(Math.random() * chars.length)];
        let timestamp = Math.floor(Date.now() / 1000).toString();
        result += timestamp;
        return result;
    }
};
AadhaarkycService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], AadhaarkycService);
exports.AadhaarkycService = AadhaarkycService;
//# sourceMappingURL=aadhaarkyc.service.js.map