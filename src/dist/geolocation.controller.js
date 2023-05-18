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
exports.GeolocationController = void 0;
const common_1 = require("@nestjs/common");
const geolocation_service_1 = require("./geolocation.service");
let GeolocationController = class GeolocationController {
    constructor(geolocationService) {
        this.geolocationService = geolocationService;
    }
    async states(request) {
        var _a, _b;
        const { filters } = request;
        const tableName = 'address';
        const response = await this.geolocationService.states();
        let mappedResponse = response === null || response === void 0 ? void 0 : response.data[tableName];
        const count = (_b = (_a = response === null || response === void 0 ? void 0 : response.data[`${tableName}_aggregate`]) === null || _a === void 0 ? void 0 : _a.aggregate) === null || _b === void 0 ? void 0 : _b.count;
        return {
            statusCode: 200,
            message: 'Ok.',
            totalCount: count,
            data: mappedResponse,
        };
    }
    async districts(name, state_id, request) {
        var _a, _b;
        const tableName = 'address';
        const response = await this.geolocationService.districts(name);
        let mappedResponse = response === null || response === void 0 ? void 0 : response.data[tableName];
        const count = (_b = (_a = response === null || response === void 0 ? void 0 : response.data[`${tableName}_aggregate`]) === null || _a === void 0 ? void 0 : _a.aggregate) === null || _b === void 0 ? void 0 : _b.count;
        return {
            statusCode: 200,
            message: 'Ok.',
            totalCount: count,
            data: mappedResponse,
        };
    }
    async blocks(name, request) {
        var _a, _b;
        const tableName = 'address';
        const response = await this.geolocationService.blocks(name);
        let mappedResponse = response === null || response === void 0 ? void 0 : response.data[tableName];
        const count = (_b = (_a = response === null || response === void 0 ? void 0 : response.data[`${tableName}_aggregate`]) === null || _a === void 0 ? void 0 : _a.aggregate) === null || _b === void 0 ? void 0 : _b.count;
        return {
            statusCode: 200,
            message: 'Ok.',
            totalCount: count,
            data: mappedResponse,
        };
    }
    async villages(name, request) {
        var _a, _b;
        const tableName = 'address';
        const response = await this.geolocationService.villages(name);
        let mappedResponse = response === null || response === void 0 ? void 0 : response.data[tableName];
        const count = (_b = (_a = response === null || response === void 0 ? void 0 : response.data[`${tableName}_aggregate`]) === null || _a === void 0 ? void 0 : _a.aggregate) === null || _b === void 0 ? void 0 : _b.count;
        return {
            statusCode: 200,
            message: 'Ok.',
            totalCount: count,
            data: mappedResponse,
        };
    }
};
__decorate([
    (0, common_1.Post)('/states'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GeolocationController.prototype, "states", null);
__decorate([
    (0, common_1.Post)('/districts/:name'),
    __param(0, (0, common_1.Param)('name')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], GeolocationController.prototype, "districts", null);
__decorate([
    (0, common_1.Post)('/blocks/:name'),
    __param(0, (0, common_1.Param)('name')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GeolocationController.prototype, "blocks", null);
__decorate([
    (0, common_1.Post)('/villages/:name'),
    __param(0, (0, common_1.Param)('name')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GeolocationController.prototype, "villages", null);
GeolocationController = __decorate([
    (0, common_1.Controller)('/locationmaster'),
    __metadata("design:paramtypes", [geolocation_service_1.GeolocationService])
], GeolocationController);
exports.GeolocationController = GeolocationController;
//# sourceMappingURL=geolocation.controller.js.map