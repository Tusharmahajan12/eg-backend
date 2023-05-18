"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryGeneratorService = void 0;
const common_1 = require("@nestjs/common");
let QueryGeneratorService = class QueryGeneratorService {
    constructor() {
        this.isEmptyObject = (obj) => obj.constructor.name === 'Object' && Object.keys(obj).length > 0;
        this.objectConvert = (obj, fun) => {
            if (this.isEmptyObject(obj)) {
                return Object.entries(obj).map(fun);
            }
            return [];
        };
        this.getParam = (keys) => {
            let str = '';
            keys.forEach((e, index) => {
                str += `${e}${keys.length > index + 1 ? '\n' : ''}`;
            });
            return str;
        };
    }
    create(tName, item, onlyFields = [], fields = []) {
        let tableName = `insert_${tName}_one`;
        const keys = Object.keys(item);
        const getObjStr = (item, type = '') => {
            let str = 'object: {';
            let strArr = [];
            keys.forEach((e, index) => {
                if (e !== 'id' && (onlyFields.length < 1 || onlyFields.includes(e))) {
                    strArr = [...strArr, `${e}:"${item[e]}"`];
                }
            });
            str += strArr.join();
            str += `}`;
            return str;
        };
        return `mutation MyQuery {
      ${tableName}(${getObjStr(item)}) {
        ${this.getParam(fields && fields.length > 0 ? fields : onlyFields ? onlyFields : keys)}
      }
    }
    `;
    }
    update(id, tName, item, onlyFields = [], fields = []) {
        let tableName = `update_${tName}`;
        const keys = Object.keys(item);
        const getObjStr = (item, type = '') => {
            let str = `where: {id: {_eq: ${id}}}, _set: {`;
            let strArr = [];
            keys.forEach((e, index) => {
                if (e !== 'id' && (onlyFields.length < 1 || onlyFields.includes(e))) {
                    strArr = [...strArr, `${e}:"${item[e]}"`];
                }
            });
            str += strArr.join();
            str += `}`;
            return str;
        };
        return `mutation MyQuery {
      ${tableName}(${getObjStr(item)}) {
        affected_rows
        returning {
            ${this.getParam(fields && fields.length > 0
            ? fields
            : onlyFields
                ? onlyFields
                : keys)}
        }
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
        return `mutation MyQuery {
      ${tableName}(${getObjStr(item, 'obj')}) {
        ${!((item === null || item === void 0 ? void 0 : item.id) && update)
            ? this.getParam(fields && fields.length > 0
                ? fields
                : onlyFields
                    ? [...onlyFields, 'id']
                    : keys)
            : 'affected_rows'}
      }
    }
    `;
    }
    query(tableName, onlyFields = [], request = { filters: {}, page: '0', limit: '0' }) {
        const getObjStr = (request) => {
            const { filters, page, limit, order_by } = request;
            let str = '';
            if ((limit && limit != '0') ||
                (filters && Object.keys(filters).length > 0) ||
                (order_by && Object.keys(order_by).length > 0)) {
                str += '(';
                let paramArr = [];
                if (filters && Object.keys(filters).length > 0) {
                    let filterStr = `where: {`;
                    let strArr = Object.keys(filters).map((e) => {
                        if (this.isEmptyObject(filters[e])) {
                            let data = this.objectConvert(filters[e], ([key, val]) => {
                                return `${key}: "${val}"`;
                            });
                            return `${e}:{${data.join(',')}}`;
                        }
                        else if (filters && filters[e] != '') {
                            return `${e}:{_eq:"${filters[e]}"}`;
                        }
                    });
                    filterStr += strArr.join();
                    filterStr += `}`;
                    paramArr = [...paramArr, filterStr];
                }
                if (limit) {
                    let offset = 0;
                    if (page > 1 && limit) {
                        offset = parseInt(limit) * (page - 1);
                    }
                    paramArr = [...paramArr, `limit: ${limit}, offset: "${offset}"`];
                }
                if (order_by && Object.keys(order_by).length > 0) {
                    let data = this.objectConvert(order_by, ([key, val]) => {
                        return `${key}: ${val}`;
                    });
                    paramArr = [...paramArr, `order_by: {${data.join(',')}}`];
                }
                str += paramArr.join(', ');
                str += ')';
            }
            return str;
        };
        return `query MyQuery {
      ${tableName}_aggregate${getObjStr(request)} {
        aggregate {
          count
        }
      }
      ${tableName}${getObjStr(request)} {
        ${this.getParam(onlyFields)}
      }
    }
    `;
    }
    findOne(id, tName, onlyFields = []) {
        return `query MyQuery {
        ${tName}_by_pk(id: ${id}) {
            ${this.getParam(onlyFields)}
      }
    }
    `;
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
        return `mutation MyQuery {
      ${tableName}(objects: ${getObjStr(items, 'obj')}) {
        returning {${this.getParam(fields ? fields : onlyFields ? [...onlyFields, 'id'] : returnkeys)}}
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
};
QueryGeneratorService = __decorate([
    (0, common_1.Injectable)()
], QueryGeneratorService);
exports.QueryGeneratorService = QueryGeneratorService;
//# sourceMappingURL=queryGenerator.service.js.map