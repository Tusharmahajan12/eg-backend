/// <reference types="multer" />
import { Request, Response } from 'express';
import { UploadFileService } from './upload-file.service';
export declare class UploadFileController {
    private readonly uploadFileService;
    constructor(uploadFileService: UploadFileService);
    addFile(file: Express.Multer.File, id: number, document_type: string, request: Request, response: Response): Promise<void>;
    getFileUrl(id: string, request: Request, response: Response): Promise<void>;
}
