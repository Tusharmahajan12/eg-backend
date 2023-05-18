/// <reference types="multer" />
import { Response } from 'express';
import { HasuraService } from 'src/services/hasura/hasura.service';
import { S3Service } from 'src/services/s3/s3.service';
export declare class UploadFileService {
    private readonly s3Service;
    private readonly hasuraService;
    constructor(s3Service: S3Service, hasuraService: HasuraService);
    addFile(file: Express.Multer.File, id: number, document_type: string, response: Response): Promise<Response<any, Record<string, any>>>;
    getFile(id: string, response: Response): Promise<Response<any, Record<string, any>>>;
}
