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
exports.UploadFileService = void 0;
const common_1 = require("@nestjs/common");
const hasura_service_1 = require("../services/hasura/hasura.service");
const s3_service_1 = require("../services/s3/s3.service");
let UploadFileService = class UploadFileService {
    constructor(s3Service, hasuraService) {
        this.s3Service = s3Service;
        this.hasuraService = hasuraService;
    }
    async addFile(file, id, document_type, response) {
        const originalName = file.originalname.split(" ").join("").toLowerCase();
        const [name, fileType] = originalName.split(".");
        let key = `${name}${Date.now()}.${fileType}`;
        console.log("key", key);
        const fileUrl = await this.s3Service.uploadFile(file, key);
        console.log("fileUrl", fileUrl);
        if (fileUrl) {
            console.log("name 27", name);
            let query = {
                query: `mutation MyMutation {
                    insert_documents(objects: {name: "${key}", path: "/user/docs", provider: "s3", updated_by: "${id}", user_id: "${id}", doument_type: "${document_type}", document_sub_type: "${document_type}", created_by: "${id}"}) {
                      affected_rows
                      returning {
                        id
                        doument_type
                        document_sub_type
                        path
                        name
                        user_id
                        updated_by
                        provider
                        created_by
                        context_id
                        context
                      }
                    }
                  }`
            };
            const res = await this.hasuraService.postData(query);
            console.log("hasuraService", res);
            if (res) {
                return response.status(200).send({
                    success: true,
                    status: 'Success',
                    message: 'File uploaded successfully!',
                    data: { key: key, fileUrl: fileUrl, data: res.data }
                });
            }
            else {
                return response.status(200).send({
                    success: false,
                    status: 'Success',
                    message: 'Unable to update documents db',
                    data: null
                });
            }
        }
        else {
            return response.status(200).send({
                success: false,
                status: 'Success',
                message: 'Unable to upload file',
                data: null
            });
        }
    }
    async getFile(id, response) {
        const key = id;
        const fileUrl = await this.s3Service.getFileUrl(key);
        console.log("fileUrl", fileUrl);
        if (fileUrl) {
            return response.status(200).send({
                success: true,
                status: 'Success',
                message: 'File url fethed successfully!',
                data: { key: key, fileUrl: fileUrl }
            });
        }
        else {
            return response.status(200).send({
                success: false,
                status: 'Success',
                message: 'Unable to get file',
                data: null
            });
        }
    }
};
UploadFileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [s3_service_1.S3Service, hasura_service_1.HasuraService])
], UploadFileService);
exports.UploadFileService = UploadFileService;
//# sourceMappingURL=upload-file.service.js.map