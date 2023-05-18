import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
export declare class HasuraService {
    private configService;
    private readonly httpService;
    constructor(configService: ConfigService, httpService: HttpService);
    postData(query: any): Promise<any>;
}
