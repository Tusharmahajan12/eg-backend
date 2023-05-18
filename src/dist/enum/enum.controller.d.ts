import { EnumService } from './enum.service';
export declare class EnumController {
    private readonly enumService;
    constructor(enumService: EnumService);
    getEnumValue(key: string): {
        status: number;
        data: any[];
    };
}
