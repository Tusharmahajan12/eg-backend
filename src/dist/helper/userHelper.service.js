"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserHelperService = void 0;
const common_1 = require("@nestjs/common");
let UserHelperService = class UserHelperService {
    generateRandomPassword() {
        var length = 8, charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', password_value = '';
        for (var i = 0, n = charset.length; i < length; ++i) {
            password_value += charset.charAt(Math.floor(Math.random() * n));
        }
        return password_value;
    }
    async getAdminKeycloakToken() {
        var axios = require('axios');
        var data = {
            username: 'admin',
            client_id: 'admin-cli',
            grant_type: 'client_credentials',
            password: process.env.KEYCLOAK_ADMIN_PASSWORD,
            client_secret: process.env.KEYCLOAK_ADMIN_CLI_CLIENT_SECRET,
        };
        var config = {
            method: 'post',
            url: `${process.env.KEYCLOAK_URL}/realms/master/protocol/openid-connect/token`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: data,
        };
        return axios(config);
    }
};
UserHelperService = __decorate([
    (0, common_1.Injectable)()
], UserHelperService);
exports.UserHelperService = UserHelperService;
//# sourceMappingURL=userHelper.service.js.map