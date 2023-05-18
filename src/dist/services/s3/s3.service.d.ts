/// <reference types="multer" />
import { ConfigService } from '@nestjs/config';
export declare class S3Service {
    private configService;
    private region;
    private s3;
    constructor(configService: ConfigService);
    uploadFile(file: Express.Multer.File, key: string): Promise<string>;
    getFileUrl(key: string): Promise<string>;
}
