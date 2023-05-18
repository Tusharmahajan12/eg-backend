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
exports.UserController = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const create_user_dto_1 = require("./helper/dto/create-user.dto");
const register_facilitator_dto_1 = require("./helper/dto/register-facilitator.dto");
const hasura_service_1 = require("./hasura/hasura.service");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(httpService, hasuraService, userService) {
        this.httpService = httpService;
        this.hasuraService = hasuraService;
        this.userService = userService;
        this.url = process.env.HASURA_BASE_URL;
    }
    async getQualifications() {
        const data = await (0, rxjs_1.lastValueFrom)(this.httpService
            .post(this.url, {
            query: `query MyQuery {
              qualification_masters {
                id
                name
                type
              }
            }`,
        }, {
            headers: {
                'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
                'Content-Type': 'application/json',
            },
        })
            .pipe((0, rxjs_1.map)((res) => res.data)));
        return {
            statusCode: 200,
            message: 'Ok.',
            data: this.hasuraService.getResponce(data, 'qualification_masters', 'data'),
        };
    }
    async create(req) {
        return this.userService.create(req);
    }
    async update(id, req) {
        return this.userService.create(Object.assign(Object.assign({}, req), { id: id }), true);
    }
    async searchAttendance(request, req) {
        return this.userService.list(request, req);
    }
    async searchById(id) {
        return this.userService.userById(id);
    }
    async isUserExist(req) {
        return this.userService.isUserExist(req);
    }
    async updateUser(id, req) {
        return this.userService.update(id, req, 'program_faciltators');
    }
    login(username, password, response) {
        return this.userService.login(username, password, response);
    }
    ipUserInfo(request) {
        return this.userService.ipUserInfo(request);
    }
    organizationInfo(id) {
        return this.userService.organizationInfo(id);
    }
    async register(body, request) {
        return this.userService.register(body, request);
    }
};
__decorate([
    (0, common_1.Get)('/qualification'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getQualifications", null);
__decorate([
    (0, common_1.Post)('/create'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('/update/:id'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('/list'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "searchAttendance", null);
__decorate([
    (0, common_1.Get)('/info/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "searchById", null);
__decorate([
    (0, common_1.Post)('/is_user_exist'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "isUserExist", null);
__decorate([
    (0, common_1.Put)('update_facilitator/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Query)('username')),
    __param(1, (0, common_1.Query)('password')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('/ip_user_info'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "ipUserInfo", null);
__decorate([
    (0, common_1.Get)('/organization/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "organizationInfo", null);
__decorate([
    (0, common_1.Post)('/register'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_facilitator_dto_1.RegisterFacilitatorDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
UserController = __decorate([
    (0, common_1.Controller)('/users'),
    __metadata("design:paramtypes", [axios_1.HttpService,
        hasura_service_1.HasuraService,
        user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map