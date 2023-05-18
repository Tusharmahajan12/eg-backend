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
exports.GeolocationService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let GeolocationService = class GeolocationService {
    constructor(httpService) {
        this.httpService = httpService;
        this.url = process.env.HASURA_BASE_URL;
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
            query: `query SearchAttendance {
        ${tableName}_aggregate(where:{${query}}) {
          aggregate {
            count
          }
        }
        ${tableName}(where:{${query}}) {
          id
          state_name
          state_cd
          district_name
          district_cd
          block_name
          grampanchayat_name
          village_ward_name
          udise_block_code
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
    async states() {
        var data = {
            query: `query MyQuery {
        address_aggregate(distinct_on: [state_name]) {
          aggregate {
            count
          }
        }
        address(distinct_on: [state_name]) {
          state_name
          state_cd
        }
      }`,
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
    async districts(state) {
        var data = {
            query: `query MyQuery {
        address_aggregate(distinct_on: [district_name], where: {state_name: {_eq: "${state}"}}) {
          aggregate {
            count
          }
        }
        address(distinct_on: [district_name], where: {state_name: {_eq: "${state}"}}) {
          district_cd
          district_name
        }
      }`,
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
    async blocks(district) {
        var data = {
            query: `query MyQuery {
        address_aggregate(distinct_on: [block_name], where: {district_name: {_eq: "${district}"}}) {
          aggregate {
            count
          }
        }
        address(distinct_on: [block_name], where: {district_name: {_eq: "${district}"}}) {
          block_name
        }
      }`,
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
    async villages(block) {
        var data = {
            query: `query MyQuery {
        address_aggregate(distinct_on: [village_ward_name], where: {block_name: {_eq: "${block}"}}) {
          aggregate {
            count
          }
        }
        address(distinct_on: [village_ward_name], where: {block_name: {_eq: "${block}"}}) {
          village_ward_name
        }
      }`,
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
};
GeolocationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], GeolocationService);
exports.GeolocationService = GeolocationService;
//# sourceMappingURL=geolocation.service.js.map