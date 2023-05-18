import { HttpService } from '@nestjs/axios';
import { UserHelperService } from './helper/userHelper.service';
import { HasuraService } from './hasura/hasura.service';
import { Response } from 'express';
export declare class UserService {
    private readonly httpService;
    private helper;
    private hasuraService;
    url: string;
    constructor(httpService: HttpService, helper: UserHelperService, hasuraService: HasuraService);
    update(userId: string, request: any, tableName: String): Promise<{
        statusCode: any;
        message: string;
        data: any;
    }>;
    login(username: string, password: string, response: Response): Promise<Response<any, Record<string, any>>>;
    ipUserInfo(request: any): Promise<{
        status: any;
        data: any;
    }>;
    register(body: any, request: any): Promise<{
        status: any;
        message: string;
        data: {
            user: any;
            keycloak_id: any;
            username: string;
            password: any;
        };
    }>;
    newCreate(req: any): Promise<{
        statusCode: number;
        message: string;
        data: any;
    }>;
    create(req: any, update?: boolean): Promise<{
        statusCode: number;
        message: string;
        data: any;
    }>;
    organizationInfo(id: any): Promise<{
        statusCode: number;
        message: string;
        data: any;
    }>;
    userById(id: any): Promise<{
        statusCode: number;
        message: string;
        data: any;
    }>;
    list(request: any, req: any): Promise<{
        statusCode: number;
        message: string;
        totalCount: any;
        data: any;
        limit: any;
        currentPage: any;
        totalPages: string;
    }>;
    isUserExist(req: any): Promise<{
        status: number;
        message: string;
        isUserExist: boolean;
    }>;
}
