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
exports.InterviewService = void 0;
const common_1 = require("@nestjs/common");
const hasura_service_1 = require("../hasura/hasura.service");
let InterviewService = class InterviewService {
    constructor(hasuraService) {
        this.hasuraService = hasuraService;
        this.table = 'interviews';
        this.fillable = [
            'title',
            'user_id',
            'owner_user_id',
            'start_date_time',
            'end_date_time',
            'comment',
            'status',
            'created_by',
            'updated_by',
            'created_at',
            'updated_at',
            'location_type',
            'location',
        ];
        this.returnFields = [
            'id',
            'title',
            'user_id',
            'owner_user_id',
            'start_date_time',
            'end_date_time',
            'comment',
            'status',
            'created_by',
            'updated_by',
            'created_at',
            'updated_at',
            'location_type',
            'location',
        ];
    }
    create(req) {
        return this.hasuraService.create(this.table, req, this.returnFields);
    }
    findAll(request) {
        return this.hasuraService.getAll(this.table, this.returnFields, request);
    }
    findOne(id) {
        return this.hasuraService.getOne(+id, this.table, this.returnFields);
    }
    update(id, req) {
        return this.hasuraService.update(+id, this.table, req, this.returnFields);
    }
    remove(id) {
        return this.hasuraService.delete(this.table, { id: +id });
    }
};
InterviewService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [hasura_service_1.HasuraService])
], InterviewService);
exports.InterviewService = InterviewService;
//# sourceMappingURL=interview.service.js.map