import { GeolocationService } from './geolocation.service';
export declare class GeolocationController {
    private geolocationService;
    constructor(geolocationService: GeolocationService);
    states(request: Record<string, any>): Promise<{
        statusCode: number;
        message: string;
        totalCount: any;
        data: any;
    }>;
    districts(name: string, state_id: string, request: Record<string, any>): Promise<{
        statusCode: number;
        message: string;
        totalCount: any;
        data: any;
    }>;
    blocks(name: string, request: Record<string, any>): Promise<{
        statusCode: number;
        message: string;
        totalCount: any;
        data: any;
    }>;
    villages(name: string, request: Record<string, any>): Promise<{
        statusCode: number;
        message: string;
        totalCount: any;
        data: any;
    }>;
}
