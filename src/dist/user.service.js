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
exports.UserService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const jwt_decode_1 = require("jwt-decode");
const userHelper_service_1 = require("./helper/userHelper.service");
const hasura_service_1 = require("./hasura/hasura.service");
let UserService = class UserService {
    constructor(httpService, helper, hasuraService) {
        this.httpService = httpService;
        this.helper = helper;
        this.hasuraService = hasuraService;
        this.url = process.env.HASURA_BASE_URL;
    }
    async update(userId, request, tableName) {
        try {
            var axios = require('axios');
            const userDataSchema = request;
            let userData = request;
            let query = '';
            Object.keys(userData).forEach((e) => {
                if (userData[e] &&
                    userData[e] != '' &&
                    Object.keys(userDataSchema).includes(e)) {
                    query += `${e}: "${userData[e]}", `;
                }
            });
            var data = {
                query: `mutation update($id:Int) {
            update_${tableName}(where: {id: {_eq: $id}}, _set: {${query}}) {
                affected_rows
            }
        }`,
                variables: {
                    id: userId,
                },
            };
            var config = {
                method: 'post',
                url: this.url,
                headers: {
                    'Content-Type': 'application/json',
                    'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
                },
                data: data,
            };
            const response = await axios(config);
            const result = response.data.data;
            if (response.data.data) {
                return {
                    statusCode: response.status,
                    message: `${tableName} details updated !`,
                    data: result,
                };
            }
            else {
                return {
                    statusCode: 400,
                    message: `Erorr while updating ${tableName} !`,
                    data: response.data,
                };
            }
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FORBIDDEN,
                error: `Erorr while updating ${tableName} !`,
            }, common_1.HttpStatus.FORBIDDEN, {
                cause: error,
            });
        }
    }
    async login(username, password, response) {
        var axios = require('axios');
        var loginData = {
            username: username,
            password: password,
            grant_type: 'password',
            client_id: 'hasura',
        };
        var configData = {
            method: 'post',
            url: `${process.env.KEYCLOAK_URL}/realms/eg-sso/protocol/openid-connect/token`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: loginData,
        };
        try {
            const res = await axios(configData);
            if (res) {
                return response.status(200).send({
                    success: true,
                    status: 'Authenticated',
                    message: 'LOGGEDIN_SUCCESSFULLY',
                    data: res.data,
                });
            }
            else {
                console.log('inside else');
            }
        }
        catch (err) {
            console.log('login api err', err);
            return response.status(401).send({
                success: false,
                status: 'Unauthorized',
                message: 'INVALID_USERNAME_PASSWORD_MESSAGE',
                data: null,
            });
        }
    }
    async ipUserInfo(request) {
        var _a, _b, _c;
        const authToken = (_a = request === null || request === void 0 ? void 0 : request.headers) === null || _a === void 0 ? void 0 : _a.authorization;
        const decoded = (0, jwt_decode_1.default)(authToken);
        let keycloak_id = decoded.sub;
        var axios = require('axios');
        var queryData = {
            query: `query GetUserDetails($keycloak_id:uuid) {
          users(where: {keycloak_id: {_eq: $keycloak_id}}) {
            id
            first_name
            last_name
            gender
            email_id
            dob
            district_id
            created_by
            lat
            long
            mobile
            password
            aadhar_token
            address
            block_id
            block_village_id
            keycloak_id
            state_id
            updated_by
            profile_url
            program_users {
              id
              organisation_id
              academic_year_id
              program_id
              role_id
              status
              user_id
            }
            core_faciltator {
              created_by
              device_ownership
              device_type
              id
              pan_no
              refreere
              sourcing_channel
              updated_by
              user_id
            }
            experience {
              user_id
              start_year
              end_year
              experience_in_years
              context
              context_id
              created_by
              description
              id
              institution
              organization
              role_title
              updated_by
              type
            }
            program_faciltators {
              availability
              created_by
              has_social_work_exp
              id
              police_verification_done
              program_id
              social_background_verified_by_neighbours
              updated_by
              user_id
              village_knowledge_test
              status
              form_step_number
            }
            qualifications {
              created_by
              end_year
              id
              institution
              qualification_master_id
              start_year
              updated_by
              user_id
              qualification_master {
                context
                context_id
                created_by
                id
                name
                type
                updated_by
              }
            }
            interviews {
              id
              owner_user_id
              end_date_time
              comment
              created_at
              created_by
              start_date_time
              status
              title
              updated_at
              updated_by
              user_id
              location_type
              location
              owner {
                first_name
                last_name
                id
              }
            }
            events {
              context
              context_id
              created_by
              end_date
              end_time
              id
              location
              location_type
              start_date
              start_time
              updated_by
              user_id
            }
            documents(order_by: {id: desc}){
              id
              user_id
              name
              doument_type
              document_sub_type
            }
          }
        }`,
            variables: { keycloak_id: keycloak_id },
        };
        var configData = {
            method: 'post',
            url: this.url,
            headers: {
                'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
                'Content-Type': 'application/json',
            },
            data: queryData,
        };
        const response = await axios(configData);
        return {
            status: response === null || response === void 0 ? void 0 : response.status,
            data: (_c = (_b = response === null || response === void 0 ? void 0 : response.data) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.users[0],
        };
    }
    async register(body, request) {
        var _a, _b;
        const axios = require('axios');
        const password = body === null || body === void 0 ? void 0 : body.mobile;
        let username = `${body.first_name}`;
        if (body === null || body === void 0 ? void 0 : body.last_name) {
            username += `_${body.last_name.charAt(0)}`;
        }
        username += `_${body.mobile}`;
        const data_to_create_user = {
            enabled: 'true',
            firstName: body === null || body === void 0 ? void 0 : body.first_name,
            lastName: body === null || body === void 0 ? void 0 : body.last_name,
            username: username.toLowerCase(),
            email: body === null || body === void 0 ? void 0 : body.email_id,
            credentials: [
                {
                    type: 'password',
                    value: password,
                    temporary: false,
                },
            ],
            groups: ['facilitators'],
        };
        const adminResult = await this.helper.getAdminKeycloakToken();
        if ((_a = adminResult === null || adminResult === void 0 ? void 0 : adminResult.data) === null || _a === void 0 ? void 0 : _a.access_token) {
            var config = {
                method: 'post',
                url: `${process.env.KEYCLOAK_URL}/admin/realms/eg-sso/users`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${(_b = adminResult === null || adminResult === void 0 ? void 0 : adminResult.data) === null || _b === void 0 ? void 0 : _b.access_token}`,
                },
                data: data_to_create_user,
            };
            try {
                const { headers, status } = await axios(config);
                if (headers.location) {
                    const split = headers.location.split('/');
                    const keycloak_id = split[split.length - 1];
                    body.keycloak_id = keycloak_id;
                    const result = await this.newCreate(body);
                    return {
                        status,
                        message: 'User created successfully',
                        data: {
                            user: result === null || result === void 0 ? void 0 : result.data,
                            keycloak_id: keycloak_id,
                            username: username,
                            password: password,
                        },
                    };
                }
                else {
                    throw new common_1.BadRequestException('Error while generating admin token !');
                }
            }
            catch (e) {
                throw new common_1.HttpException(e.message, common_1.HttpStatus.CONFLICT, {
                    cause: e,
                });
            }
        }
        else {
            throw new common_1.BadRequestException('Error while creating user !');
        }
    }
    async newCreate(req) {
        var _a;
        const tableName = 'users';
        const newR = await this.hasuraService.q(tableName, req, [
            'first_name',
            'last_name',
            'mobile',
            'email_id',
            'keycloak_id',
        ]);
        const user_id = (_a = newR[tableName]) === null || _a === void 0 ? void 0 : _a.id;
        if (user_id) {
            await this.hasuraService.q(`program_faciltators`, Object.assign(Object.assign({}, req), { user_id }), [
                'parent_ip',
                'user_id',
            ]);
        }
        return await this.userById(user_id);
    }
    async create(req, update = false) {
        var _a, _b, _c, _d, _e, _f;
        let i = 0, response = [];
        let objKey = Object.keys(req);
        const userArr = [
            'first_name',
            'last_name',
            'email_id',
            'gender',
            'dob',
            'address',
            'aadhar_token',
            'keycloak_id',
            'profile_url',
            'block',
            'district',
            'state',
            'village',
        ];
        let user_id = (req === null || req === void 0 ? void 0 : req.id) ? req === null || req === void 0 ? void 0 : req.id : null;
        const keyExist = userArr.filter((e) => objKey.includes(e));
        if (keyExist.length > 0) {
            const tableName = 'users';
            const newR = await this.hasuraService.q(tableName, req, userArr, update);
            user_id = ((_a = newR[tableName]) === null || _a === void 0 ? void 0 : _a.id) ? (_b = newR[tableName]) === null || _b === void 0 ? void 0 : _b.id : user_id;
            response[i++] = newR;
        }
        if (user_id) {
            const cFArr = [
                'pan_no',
                'device_type',
                'device_ownership',
                'sourcing_channel',
                'refreere',
                'user_id',
            ];
            const cFkeyExist = cFArr.filter((e) => objKey.includes(e));
            if (cFkeyExist.length > 0) {
                response[i++] = await this.hasuraService.q('core_faciltators', Object.assign(Object.assign({}, req), { id: ((_c = req === null || req === void 0 ? void 0 : req.core_faciltators) === null || _c === void 0 ? void 0 : _c.id) ? (_d = req === null || req === void 0 ? void 0 : req.core_faciltators) === null || _d === void 0 ? void 0 : _d.id : null, user_id }), cFArr, update);
            }
            const pFArr = [
                'availability',
                'program_id',
                'parent_ip',
                'has_social_work_exp',
                'social_background_verified_by_neighbours',
                'village_knowledge_test',
                'police_verification_done',
                'user_id',
                'form_step_number',
                'status',
            ];
            const pFkeyExist = pFArr.filter((e) => objKey.includes(e));
            if (pFkeyExist.length > 0) {
                response[i++] = await this.hasuraService.q('program_faciltators', Object.assign(Object.assign({}, req), { id: ((_e = req === null || req === void 0 ? void 0 : req.program_faciltators) === null || _e === void 0 ? void 0 : _e.id)
                        ? (_f = req === null || req === void 0 ? void 0 : req.program_faciltators) === null || _f === void 0 ? void 0 : _f.id
                        : null, status: 'lead', user_id: user_id }), pFArr, update);
            }
            const fillKeys = ['qualification', 'degree'];
            const qkeyExist = fillKeys.filter((e) => objKey.includes(e));
            if (qkeyExist.length > 0) {
                await this.hasuraService.delete('qualifications', {
                    user_id,
                });
                response[i++] = await Promise.all(fillKeys
                    .map(async (e) => req[e]
                    ? await this.hasuraService.q('qualifications', {
                        qualification_master_id: req[e],
                        user_id,
                    }, ['qualification_master_id', 'user_id'])
                    : null)
                    .filter((e) => e));
            }
            if (req['experience']) {
                await this.hasuraService.delete('experience', {
                    user_id,
                    type: 'experience',
                });
                await Promise.all(req['experience'].map(async (e) => this.hasuraService.q('experience', Object.assign(Object.assign({}, e), { type: 'experience', user_id }), [
                    'type',
                    'description',
                    'user_id',
                    'role_title',
                    'organization',
                    'institution',
                    'start_year',
                    'end_year',
                    'experience_in_years',
                ]), update));
            }
            if (req['vo_experience']) {
                await this.hasuraService.delete('experience', {
                    user_id,
                    type: 'vo_experience',
                });
                await Promise.all(req['vo_experience'].map(async (e) => this.hasuraService.q('experience', Object.assign(Object.assign({}, e), { type: 'vo_experience', user_id }), [
                    'type',
                    'description',
                    'user_id',
                    'role_title',
                    'organization',
                    'institution',
                    'start_year',
                    'end_year',
                    'experience_in_years',
                ]), update));
            }
        }
        return this.userById(user_id);
    }
    async organizationInfo(id) {
        var _a;
        const data = {
            query: `query MyQuery {
        organisations_by_pk(id:"${id}") {
          address
          contact_person
          gst_no
          mobile
          id
          name
        }
      }
      `,
        };
        const response = await (0, rxjs_1.lastValueFrom)(this.httpService
            .post(this.url, data, {
            headers: {
                'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
                'Content-Type': 'application/json',
            },
        })
            .pipe((0, rxjs_1.map)((res) => res.data)));
        let result = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.organisations_by_pk;
        const mappedResponse = result;
        return {
            statusCode: 200,
            message: 'Ok.',
            data: mappedResponse,
        };
    }
    async userById(id) {
        var _a;
        var data = {
            query: `query searchById {        
        users_by_pk(id: ${id}) {
          first_name
          id
          last_name
          dob
          aadhar_token
          address
          block_id
          block_village_id
          created_by
          district_id
          email_id
          gender
          lat
          long
          mobile
          password
          state_id
          updated_by
          profile_url
          state
          district
          block
          village
          grampanchayat
          program_users {
            id
            organisation_id
            academic_year_id
            program_id
            role_id
            status
            user_id
          }
          core_faciltator {
            created_by
            device_ownership
            device_type
            id
            pan_no
            refreere
            sourcing_channel
            updated_by
            user_id
          }
          experience {
            description
            end_year
            experience_in_years
            institution
            start_year
            organization
            role_title
            user_id
            type
          }
          program_faciltators {
            parent_ip
            availability
            has_social_work_exp
            id
            police_verification_done
            program_id
            social_background_verified_by_neighbours
            user_id
            village_knowledge_test
            status
            form_step_number
            created_by
            updated_by
          }
          qualifications {
            created_by
            end_year
            id
            institution
            qualification_master_id
            start_year
            updated_by
            user_id
            qualification_master {
              context
              context_id
              created_by
              id
              name
              type
              updated_by
            }
          }
          interviews {
            id
            owner_user_id
            end_date_time
            comment
            created_at
            created_by
            start_date_time
            status
            title
            updated_at
            updated_by
            user_id
            location_type
            location
            owner {
              first_name
              last_name
              id
            }
          }
          events {
            context
            context_id
            created_by
            end_date
            end_time
            id
            location
            location_type
            start_date
            start_time
            updated_by
            user_id
          }
          documents(order_by: {id: desc}){
            id
            user_id
            name
            doument_type
            document_sub_type
          }
        }}`,
        };
        const response = await (0, rxjs_1.lastValueFrom)(this.httpService
            .post(this.url, data, {
            headers: {
                'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
                'Content-Type': 'application/json',
            },
        })
            .pipe((0, rxjs_1.map)((res) => res.data)));
        let result = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.users_by_pk;
        if ((result === null || result === void 0 ? void 0 : result.program_faciltators) && (result === null || result === void 0 ? void 0 : result.program_faciltators[0])) {
            result.program_faciltators = result.program_faciltators[0];
        }
        else {
            result = Object.assign(Object.assign({}, result), { program_faciltators: {} });
        }
        let mappedResponse = result;
        if (result === null || result === void 0 ? void 0 : result.experience) {
            mappedResponse = Object.assign(Object.assign({}, mappedResponse), { ['experience']: result === null || result === void 0 ? void 0 : result.experience.filter((e) => e.type == 'experience') });
            mappedResponse = Object.assign(Object.assign({}, mappedResponse), { ['vo_experience']: result === null || result === void 0 ? void 0 : result.experience.filter((e) => e.type == 'vo_experience') });
        }
        return {
            statusCode: 200,
            message: 'Ok.',
            data: mappedResponse,
        };
    }
    async list(request, req) {
        var _a, _b, _c, _d, _e, _f;
        const { filters } = request;
        const page = request.page ? request.page : '1';
        const limit = (request === null || request === void 0 ? void 0 : request.limit) ? request === null || request === void 0 ? void 0 : request.limit : '10';
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
        const user = await this.ipUserInfo(req);
        query += `program_faciltators: {id: {_is_null: false}, parent_ip: {_eq: "${(_b = (_a = user === null || user === void 0 ? void 0 : user.data) === null || _a === void 0 ? void 0 : _a.program_users[0]) === null || _b === void 0 ? void 0 : _b.organisation_id}"}}`;
        var data = {
            query: `query SearchAttendance($limit:Int, $offset:Int) {
        users_aggregate(where:{${query}}) {
          aggregate {
            count
          }
        }
        users(where:{${query}}, limit: $limit, offset: $offset, order_by: {created_at: desc}) {
          first_name
          id
          last_name
          dob
          aadhar_token
          address
          block_id
          block_village_id
          created_by
          district_id
          email_id
          gender
          lat
          long
          mobile
          password
          state_id
          updated_by
          profile_url
          program_users {
            id
            organisation_id
            academic_year_id
            program_id
            role_id
            status
            user_id
          }
          core_faciltator {
            created_by
            device_ownership
            device_type
            id
            pan_no
            refreere
            sourcing_channel
            updated_by
            user_id
          }
          experience {
            description
            end_year
            experience_in_years
            institution
            start_year
            organization
            role_title
            user_id
            type
          }
          program_faciltators {
            parent_ip
            availability
            has_social_work_exp
            id
            police_verification_done
            program_id
            social_background_verified_by_neighbours
            user_id
            village_knowledge_test
            status
            form_step_number
            created_by
            updated_by
          }
          qualifications {
            created_by
            end_year
            id
            institution
            qualification_master_id
            start_year
            updated_by
            user_id
            qualification_master {
              context
              context_id
              created_by
              id
              name
              type
              updated_by
            }
          }
          interviews {
            id
            owner_user_id
            end_date_time
            comment
            created_at
            created_by
            start_date_time
            status
            title
            updated_at
            updated_by
            user_id
            location_type
            location
            owner {
              first_name
              last_name
              id
            }
          }
          events {
            context
            context_id
            created_by
            end_date
            end_time
            id
            location
            location_type
            start_date
            start_time
            updated_by
            user_id
          }
          documents(order_by: {id: desc}){
            id
            user_id
            name
            doument_type
            document_sub_type
          }
        }}`,
            variables: {
                limit: parseInt(limit),
                offset: offset,
            },
        };
        const response = await (0, rxjs_1.lastValueFrom)(this.httpService
            .post(this.url, data, {
            headers: {
                'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
                'Content-Type': 'application/json',
            },
        })
            .pipe((0, rxjs_1.map)((res) => res.data)));
        let result = (_c = response === null || response === void 0 ? void 0 : response.data) === null || _c === void 0 ? void 0 : _c.users;
        let mappedResponse = result;
        const count = (_f = (_e = (_d = response === null || response === void 0 ? void 0 : response.data) === null || _d === void 0 ? void 0 : _d.users_aggregate) === null || _e === void 0 ? void 0 : _e.aggregate) === null || _f === void 0 ? void 0 : _f.count;
        const totalPages = Math.ceil(count / limit);
        return {
            statusCode: 200,
            message: 'Ok.',
            totalCount: count,
            data: mappedResponse === null || mappedResponse === void 0 ? void 0 : mappedResponse.map((e) => {
                var _a;
                return (Object.assign(Object.assign({}, e), { ['program_faciltators']: (_a = e === null || e === void 0 ? void 0 : e['program_faciltators']) === null || _a === void 0 ? void 0 : _a[0] }));
            }),
            limit,
            currentPage: page,
            totalPages: `${totalPages}`,
        };
    }
    async isUserExist(req) {
        const tableName = 'users';
        const data_exist = await this.hasuraService.findAll(tableName, req);
        let response = data_exist.data.users;
        if (response.length > 0) {
            return {
                status: 422,
                message: 'User exist',
                isUserExist: true,
            };
        }
        else {
            return {
                status: 200,
                message: 'User not exist',
                isUserExist: false,
            };
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        userHelper_service_1.UserHelperService,
        hasura_service_1.HasuraService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map