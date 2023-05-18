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
exports.S3Service = void 0;
const common_1 = require("@nestjs/common");
const client_s3_1 = require("@aws-sdk/client-s3");
const config_1 = require("@nestjs/config");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
let S3Service = class S3Service {
    constructor(configService) {
        this.configService = configService;
        this.region = this.configService.get('S3_REGION');
        this.s3 = new client_s3_1.S3Client({
            region: this.region,
            credentials: {
                secretAccessKey: this.configService.get('SECRET_ACCESS_KEY'),
                accessKeyId: this.configService.get('ACCESS_KEY_ID')
            }
        });
    }
    async uploadFile(file, key) {
        console.log("inside upload file");
        const bucket = this.configService.get('S3_BUCKET');
        const expiresIn = this.configService.get('EXPIRES_IN');
        const input = {
            Body: file.buffer,
            Bucket: bucket,
            Key: key,
            ContentType: file.mimetype
        };
        console.log("input", input);
        try {
            const response = await this.s3.send(new client_s3_1.PutObjectCommand(input));
            console.log("response", response);
            if (response.$metadata.httpStatusCode === 200) {
                const client = this.s3;
                const command = new client_s3_1.GetObjectCommand({ Bucket: bucket, Key: key });
                return (0, s3_request_presigner_1.getSignedUrl)(client, command, { expiresIn: expiresIn });
            }
            throw new Error('File not saved to s3!');
        }
        catch (err) {
            console.log("uploadFile err", err);
        }
    }
    async getFileUrl(key) {
        console.log("inside getFileUrl");
        const bucket = this.configService.get('S3_BUCKET');
        const expiresIn = this.configService.get('EXPIRES_IN');
        try {
            const client = this.s3;
            const command = new client_s3_1.GetObjectCommand({ Bucket: bucket, Key: key });
            return (0, s3_request_presigner_1.getSignedUrl)(client, command, { expiresIn: expiresIn });
        }
        catch (err) {
            console.log("getFileUrl err", err);
        }
    }
};
S3Service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], S3Service);
exports.S3Service = S3Service;
//# sourceMappingURL=s3.service.js.map