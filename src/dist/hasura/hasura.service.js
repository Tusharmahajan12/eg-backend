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
const rxjs_1 = require("rxjs");
const queryGenerator_service_1 = require("../helper/queryGenerator.service");
let HasuraService = class HasuraService {
    constructor(httpService, qgService) {
        this.httpService = httpService;
        this.qgService = qgService;
        this.url = process.env.HASURA_BASE_URL;
        this.getResponce = ({ data, errors }, tableName, response = 'table') => {
            let result = null;
            if (data) {
                if (data[`${tableName}_by_pk`]) {
                    result = data[`${tableName}_by_pk`];
                }
                else if (data[`insert_${tableName}_one`]) {
                    result = data[`insert_${tableName}_one`];
                }
                else if (data[`update_${tableName}`]) {
                    result = data[`update_${tableName}`];
                    if (result['returning'] && result['returning'][0]) {
                        result = result['returning'][0];
                    }
                }
                else if (data[`delete_${tableName}`]) {
                    result = data[`delete_${tableName}`];
                }
                else {
                    result = data[tableName];
                }
            }
            result = result ? result : errors ? errors[0] : {};
            if (response === 'data') {
                return result;
            }
            else {
                return { [tableName]: result };
            }
        };
    }
    async findAll(tableName, filters = {}) {
        let query = '';
        if (filters) {
            Object.keys(filters).forEach((e) => {
                if (filters[e] && filters[e] != '') {
                    query += `${e}:{_eq:"${filters[e]}"}`;
                }
            });
        }
        var data = {
            query: `query SearchUser {
        ${tableName}_aggregate(where:{${query}}) {
          aggregate {
            count
          }
        }
        ${tableName}(where:{${query}}) {
          mobile
          aadhar_token
        }}`,
        };
        return await (0, rxjs_1.lastValueFrom)(this.httpService
            .post(this.url, data, {
            headers: {
                'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
                'Content-Type': 'application/json',
            },
        })
            .pipe((0, rxjs_1.map)((res) => res.data)));
    }
    async getAll(tableName, onlyFields = [], request = { filters: {}, page: '0', limit: '0' }) {
        var _a, _b;
        const { data, errors } = await (0, rxjs_1.lastValueFrom)(this.httpService
            .post(this.url, {
            query: this.qgService.query(tableName, onlyFields, request),
        }, {
            headers: {
                'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
                'Content-Type': 'application/json',
            },
        })
            .pipe((0, rxjs_1.map)((res) => res.data)));
        let obj = { data: {} };
        if (!errors) {
            const { limit, page } = request;
            let mappedResponse = data === null || data === void 0 ? void 0 : data[`${tableName}`];
            if (limit) {
                const totalCount = (_b = (_a = data === null || data === void 0 ? void 0 : data[`${tableName}_aggregate`]) === null || _a === void 0 ? void 0 : _a.aggregate) === null || _b === void 0 ? void 0 : _b.count;
                const totalPages = limit ? Math.ceil(totalCount / limit) : 0;
                obj = Object.assign(Object.assign({}, obj), { totalCount: `${totalCount}`, limit: `${limit}`, currentPage: page ? `${page}` : '1', totalPages: `${totalPages}` });
            }
            obj = Object.assign(Object.assign({}, obj), { data: mappedResponse });
        }
        else {
            obj = { errors };
        }
        return Object.assign({ statusCode: 200, message: 'Ok.' }, obj);
    }
    async getOne(id, tableName, onlyFields = []) {
        return this.getResponce(await (0, rxjs_1.lastValueFrom)(this.httpService
            .post(this.url, {
            query: this.qgService.findOne(id, tableName, onlyFields),
        }, {
            headers: {
                'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
                'Content-Type': 'application/json',
            },
        })
            .pipe((0, rxjs_1.map)((res) => res.data))), tableName);
    }
    async create(tableName, item, onlyFields = [], fields = []) {
        return this.getResponce(await (0, rxjs_1.lastValueFrom)(this.httpService
            .post(this.url, {
            query: this.qgService.create(tableName, item, onlyFields, fields),
        }, {
            headers: {
                'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
                'Content-Type': 'application/json',
            },
        })
            .pipe((0, rxjs_1.map)((res) => res.data))), tableName);
    }
    async update(id, tableName, item, onlyFields = [], fields = []) {
        return this.getResponce(await (0, rxjs_1.lastValueFrom)(this.httpService
            .post(this.url, {
            query: this.qgService.update(id, tableName, item, onlyFields, fields),
        }, {
            headers: {
                'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
                'Content-Type': 'application/json',
            },
        })
            .pipe((0, rxjs_1.map)((res) => res.data))), tableName);
    }
    async delete(tableName, item, onlyFields = []) {
        return this.getResponce(await (0, rxjs_1.lastValueFrom)(this.httpService
            .post(this.url, {
            query: this.qgService.deleteQuery(tableName, item, onlyFields),
        }, {
            headers: {
                'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
                'Content-Type': 'application/json',
            },
        })
            .pipe((0, rxjs_1.map)((res) => res.data))), tableName);
    }
    async q(tableName, item, onlyFields = [], update = false, fields = []) {
        return this.getResponce(await (0, rxjs_1.lastValueFrom)(this.httpService
            .post(this.url, {
            query: this.qgService.mutation(tableName, item, onlyFields, update, fields),
        }, {
            headers: {
                'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
                'Content-Type': 'application/json',
            },
        })
            .pipe((0, rxjs_1.map)((res) => res.data))), tableName);
    }
    async qM(tableName, item, fields, onlyFields = []) {
        return this.getResponce(await (0, rxjs_1.lastValueFrom)(this.httpService
            .post(this.url, {
            query: this.qgService.queryMulti(tableName, item, fields, onlyFields),
        }, {
            headers: {
                'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
                'Content-Type': 'application/json',
            },
        })
            .pipe((0, rxjs_1.map)((res) => res.data))), tableName);
    }
};
HasuraService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        queryGenerator_service_1.QueryGeneratorService])
], HasuraService);
exports.HasuraService = HasuraService;
//# sourceMappingURL=hasura.service.js.map