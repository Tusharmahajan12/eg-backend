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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadFileController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const upload_file_service_1 = require("./upload-file.service");
let UploadFileController = class UploadFileController {
    constructor(uploadFileService) {
        this.uploadFileService = uploadFileService;
    }
    async addFile(file, id, document_type, request, response) {
        console.log("upload-file", file);
        console.log("document_type", document_type);
        await this.uploadFileService.addFile(file, id, document_type, response);
    }
    async getFileUrl(id, request, response) {
        console.log("get-file id", id);
        await this.uploadFileService.getFile(id, response);
    }
};
__decorate([
    (0, common_1.Post)('/:id/upload-file'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)('document_type')),
    __param(3, (0, common_1.Res)()),
    __param(4, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, String, Object, Object]),
    __metadata("design:returntype", Promise)
], UploadFileController.prototype, "addFile", null);
__decorate([
    (0, common_1.Get)('/:id/get-file'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], UploadFileController.prototype, "getFileUrl", null);
UploadFileController = __decorate([
    (0, common_1.Controller)('uploadFile'),
    __metadata("design:paramtypes", [upload_file_service_1.UploadFileService])
], UploadFileController);
exports.UploadFileController = UploadFileController;
//# sourceMappingURL=upload-file.controller.js.map