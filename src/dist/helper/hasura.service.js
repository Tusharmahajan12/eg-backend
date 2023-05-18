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
let HasuraService = class HasuraService {
    constructor(httpService) {
        this.httpService = httpService;
        this.url = process.env.HASURA_BASE_URL;
        this.getAll = async (tableName, object = { filters: {}, page: 0, limit: 100 }) => {
            const { filters, page, limit } = object;
            let offset = 0;
            if (page > 1 && limit) {
                offset = parseInt(limit) * (page - 1);
            }
            let query = '';
            if (filters) {
                Object.keys(filters).forEach((e) => {
                    if (filters[e] && filters[e] != '') {
                        query += `${e}:{_eq:"${filters[e]}"}`;
                    }
                });
            }
            return this.getResponce(await (0, rxjs_1.lastValueFrom)(this.httpService
                .post(this.url, {}, {
                headers: {
                    'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
                    'Content-Type': 'application/json',
                },
            })
                .pipe((0, rxjs_1.map)((res) => res.data))), tableName);
        };
        this.getResponce = ({ data, errors }, tableName, response = 'table') => {
            let result = null;
            if (data) {
                if (data[`insert_${tableName}_one`]) {
                    result = data[`insert_${tableName}_one`];
                }
                else if (data[`update_${tableName}`]) {
                    result = data[`update_${tableName}`];
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
    queryMulti(tableName, items, onlyFields, fields = []) {
        let returnkeys = [];
        const getObjStr = (item, type = '') => {
            let str = '[';
            items.forEach((item, pindex) => {
                const keys = Object.keys(item);
                str += '{';
                keys.forEach((e, index) => {
                    if (!returnkeys.includes(e)) {
                        returnkeys = [...returnkeys, e];
                    }
                    if (onlyFields.length < 1 || onlyFields.includes(e)) {
                        if (type === 'obj') {
                            str += `${e}:"${item[e]}"${keys.length > index + 1 ? ',' : ''}`;
                        }
                        else {
                            str += `$${e}:String${keys.length > index + 1 ? ',' : ''}`;
                        }
                    }
                });
                str += `}${items.length > pindex + 1 ? ',' : ''}`;
            });
            return (str += ']');
        };
        const getParam = (keys) => {
            let str = '';
            keys.forEach((e, index) => {
                str += `${e}${keys.length > index + 1 ? '\n' : ''}`;
            });
            return str;
        };
        return `mutation MyQuery {
      ${tableName}(objects: ${getObjStr(items, 'obj')}) {
        returning {${getParam(fields ? fields : onlyFields ? [...onlyFields, 'id'] : returnkeys)}}
      }
    }
    `;
    }
    deleteQuery(tName, item, onlyFields = []) {
        let tableName = `delete_${tName}`;
        const keys = Object.keys(item);
        const getObjStr = (item, type = '') => {
            let str = ``;
            let strArr = [];
            keys.forEach((e) => {
                if (onlyFields.length < 1 || onlyFields.includes(e)) {
                    if (type === 'obj') {
                        strArr = [...strArr, `${e}:{_eq:"${item[e]}"}`];
                    }
                }
            });
            str += strArr.join();
            return str;
        };
        return `mutation DeleteQuery {
      ${tableName}(where: {${getObjStr(item, 'obj')}}) {
         affected_rows
      }
    }
    `;
    }
    async delete(tableName, item, onlyFields = []) {
        return this.getResponce(await (0, rxjs_1.lastValueFrom)(this.httpService
            .post(this.url, {
            query: this.deleteQuery(tableName, item, onlyFields),
        }, {
            headers: {
                'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
                'Content-Type': 'application/json',
            },
        })
            .pipe((0, rxjs_1.map)((res) => res.data))), tableName);
    }
    query(tableName, item, onlyFields = [], update = false, fields = []) {
        const keys = Object.keys(item);
        const getObjStr = (item, type = '') => {
            let str = 'object: {';
            if ((item === null || item === void 0 ? void 0 : item.id) && update) {
                str = `where: {id: {_eq: ${item === null || item === void 0 ? void 0 : item.id}}}, _set: {`;
            }
            let strArr = [];
            keys.forEach((e, index) => {
                if (e !== 'id' && (onlyFields.length < 1 || onlyFields.includes(e))) {
                    if (type === 'obj') {
                        strArr = [...strArr, `${e}:"${item[e]}"`];
                    }
                    else {
                        strArr = [...strArr, `${e}:String`];
                    }
                }
            });
            str += strArr.join();
            str += `}`;
            return str;
        };
        const getParam = (keys) => {
            let str = '';
            keys.forEach((e, index) => {
                str += `${e}${keys.length > index + 1 ? '\n' : ''}`;
            });
            return str;
        };
        return `query MyQuery {
      ${tableName}(${getObjStr(item, 'obj')}) {
        ${!((item === null || item === void 0 ? void 0 : item.id) && update)
            ? getParam(fields && fields.length > 0
                ? fields
                : onlyFields
                    ? [...onlyFields, 'id']
                    : keys)
            : 'affected_rows'}
      }
    }
    `;
    }
    mutation(tName, item, onlyFields = [], update = false, fields = []) {
        let tableName = `insert_${tName}_one`;
        if ((item === null || item === void 0 ? void 0 : item.id) && update) {
            tableName = `update_${tName}`;
        }
        const keys = Object.keys(item);
        const getObjStr = (item, type = '') => {
            let str = 'object: {';
            if ((item === null || item === void 0 ? void 0 : item.id) && update) {
                str = `where: {id: {_eq: ${item === null || item === void 0 ? void 0 : item.id}}}, _set: {`;
            }
            let strArr = [];
            keys.forEach((e, index) => {
                if (e !== 'id' && (onlyFields.length < 1 || onlyFields.includes(e))) {
                    if (type === 'obj') {
                        strArr = [...strArr, `${e}:"${item[e]}"`];
                    }
                    else {
                        strArr = [...strArr, `${e}:String`];
                    }
                }
            });
            str += strArr.join();
            str += `}`;
            return str;
        };
        const getParam = (keys) => {
            let str = '';
            keys.forEach((e, index) => {
                str += `${e}${keys.length > index + 1 ? '\n' : ''}`;
            });
            return str;
        };
        return `mutation MyQuery {
      ${tableName}(${getObjStr(item, 'obj')}) {
        ${!((item === null || item === void 0 ? void 0 : item.id) && update)
            ? getParam(fields && fields.length > 0
                ? fields
                : onlyFields
                    ? [...onlyFields, 'id']
                    : keys)
            : 'affected_rows'}
      }
    }
    `;
    }
    async q(tableName, item, onlyFields = [], update = false, fields = []) {
        return this.getResponce(await (0, rxjs_1.lastValueFrom)(this.httpService
            .post(this.url, {
            query: this.query(tableName, item, onlyFields, update, fields),
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
            query: this.queryMulti(tableName, item, fields, onlyFields),
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
    __metadata("design:paramtypes", [axios_1.HttpService])
], HasuraService);
exports.HasuraService = HasuraService;
//# sourceMappingURL=hasura.service.js.map