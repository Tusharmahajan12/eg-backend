"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const geolocation_controller_1 = require("./geolocation.controller");
const geolocation_service_1 = require("./geolocation.service");
const user_controller_1 = require("./user.controller");
const config_1 = require("@nestjs/config");
const user_service_1 = require("./user.service");
const enum_module_1 = require("./enum/enum.module");
const authenticate_module_1 = require("./authenticate/authenticate.module");
const users_module_1 = require("./users/users.module");
const events_module_1 = require("./events/events.module");
const hasura_module_1 = require("./hasura/hasura.module");
const helper_module_1 = require("./helper/helper.module");
const interview_module_1 = require("./interview/interview.module");
const aadhaarkyc_module_1 = require("./aadhaarkyc/aadhaarkyc.module");
const s3_module_1 = require("./services/s3/s3.module");
const upload_file_module_1 = require("./upload-file/upload-file.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            Object.assign(Object.assign({}, axios_1.HttpModule.register({})), { global: true }),
            helper_module_1.HelperModule,
            enum_module_1.EnumModule,
            authenticate_module_1.AuthenticateModule,
            users_module_1.UsersModule,
            events_module_1.EventsModule,
            hasura_module_1.HasuraModule,
            interview_module_1.InterviewModule,
            aadhaarkyc_module_1.AadhaarkycModule,
            s3_module_1.S3Module,
            upload_file_module_1.UploadFileModule,
        ],
        controllers: [app_controller_1.AppController, user_controller_1.UserController, geolocation_controller_1.GeolocationController],
        providers: [app_service_1.AppService, geolocation_service_1.GeolocationService, user_service_1.UserService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map