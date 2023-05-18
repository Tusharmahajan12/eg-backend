"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadFileModule = void 0;
const common_1 = require("@nestjs/common");
const hasura_module_1 = require("../services/hasura/hasura.module");
const hasura_service_1 = require("../services/hasura/hasura.service");
const s3_module_1 = require("../services/s3/s3.module");
const s3_service_1 = require("../services/s3/s3.service");
const upload_file_controller_1 = require("./upload-file.controller");
const upload_file_service_1 = require("./upload-file.service");
let UploadFileModule = class UploadFileModule {
};
UploadFileModule = __decorate([
    (0, common_1.Module)({
        controllers: [upload_file_controller_1.UploadFileController],
        providers: [upload_file_service_1.UploadFileService, s3_service_1.S3Service, hasura_service_1.HasuraService],
        imports: [s3_module_1.S3Module, hasura_module_1.HasuraModule]
    })
], UploadFileModule);
exports.UploadFileModule = UploadFileModule;
//# sourceMappingURL=upload-file.module.js.map