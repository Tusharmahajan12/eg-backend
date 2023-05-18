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
exports.HasuraService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let HasuraService = class HasuraService {
    constructor(configService, httpService) {
        this.configService = configService;
        this.httpService = httpService;
    }
    async postData(query) {
        const data = JSON.stringify(query);
        const url = this.configService.get('HASURA_BASE_URL');
        const config = {
            headers: {
                'x-hasura-admin-secret': this.configService.get('HASURA_SECRET_KEY'),
                'Content-Type': 'application/json'
            },
        };
        try {
            const observable = this.httpService.post(url, data, config);
            const promise = observable.toPromise();
            const response = await promise;
            return response.data;
        }
        catch (e) {
            console.log("post data error", e.message);
        }
    }
};
HasuraService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService, axios_1.HttpService])
], HasuraService);
exports.HasuraService = HasuraService;
//# sourceMappingURL=hasura.service.js.map