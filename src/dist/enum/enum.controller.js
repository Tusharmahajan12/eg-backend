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
exports.EnumController = void 0;
const common_1 = require("@nestjs/common");
const enum_service_1 = require("./enum.service");
let EnumController = class EnumController {
    constructor(enumService) {
        this.enumService = enumService;
    }
    getEnumValue(key) {
        return this.enumService.getEnumValue(key);
    }
};
__decorate([
    (0, common_1.Get)('/enum_value_list'),
    __param(0, (0, common_1.Query)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EnumController.prototype, "getEnumValue", null);
EnumController = __decorate([
    (0, common_1.Controller)('enum'),
    __metadata("design:paramtypes", [enum_service_1.EnumService])
], EnumController);
exports.EnumController = EnumController;
//# sourceMappingURL=enum.controller.js.map