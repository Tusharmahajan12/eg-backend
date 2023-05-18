import { HttpService } from '@nestjs/axios';
export declare class GeolocationService {
    private readonly httpService;
    url: string;
    constructor(httpService: HttpService);
    findAll(tableName: String, filters?: Object): Promise<any>;
    states(): Promise<any>;
    districts(state: string): Promise<any>;
    blocks(district: string): Promise<any>;
    villages(block: string): Promise<any>;
}
