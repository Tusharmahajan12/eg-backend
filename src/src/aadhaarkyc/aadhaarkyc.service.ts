import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AadhaarkycService {
  constructor(private httpService: HttpService) {}

  public async sendAadhaarOtp(aadhaar_id: string) {
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
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }
  public async verifyAadhaarOtp(
    aadhaar_id: string,
    aadhaar_otp: string,
    aadhaar_txn: string,
  ) {
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
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    let response_text = null;
    try {
      const observable = this.httpService.post(url, data, config);
      const promise = observable.toPromise();
      const response = await promise;
      //console.log(JSON.stringify(response.data));
      response_text = response.data;
    } catch (e) {
      //console.log(e);
      response_text = { error: e };
    }
  }
  private async getRRN() {
    let length = 20;
    let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    let timestamp = Math.floor(Date.now() / 1000).toString();
    result += timestamp;
    return result;
  }
}
