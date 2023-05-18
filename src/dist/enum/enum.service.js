"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
let EnumService = class EnumService {
    getEnumValue(key) {
        const readFile = fs.readFileSync('src/enum/enum.json');
        const data = JSON.parse(readFile.toString());
        let response = [];
        for (const item in data) {
            if (item === key) {
                response = data[key] ? data[key] : [];
            }
        }
        return {
            status: 200,
            data: response
        };
    }
};
EnumService = __decorate([
    (0, common_1.Injectable)()
], EnumService);
exports.EnumService = EnumService;
//# sourceMappingURL=enum.service.js.map