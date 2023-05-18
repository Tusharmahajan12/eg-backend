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
exports.AuthenticateController = void 0;
const common_1 = require("@nestjs/common");
const authenticate_service_1 = require("./authenticate.service");
let AuthenticateController = class AuthenticateController {
    constructor(authenticateService) {
        this.authenticateService = authenticateService;
    }
    sendOtp(mobileNo, response) {
        return this.authenticateService.sendOtp(mobileNo, response);
    }
    verifyOtp(req, response) {
        return this.authenticateService.verifyOtp(req, response);
    }
};
__decorate([
    (0, common_1.Get)('/otp-send'),
    __param(0, (0, common_1.Query)('mobileNo')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], AuthenticateController.prototype, "sendOtp", null);
__decorate([
    (0, common_1.Post)('/otp-verify'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthenticateController.prototype, "verifyOtp", null);
AuthenticateController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [authenticate_service_1.AuthenticateService])
], AuthenticateController);
exports.AuthenticateController = AuthenticateController;
//# sourceMappingURL=authenticate.controller.js.map