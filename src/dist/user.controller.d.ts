import { HttpService } from '@nestjs/axios';
import { CreateUserDto } from './helper/dto/create-user.dto';
import { RegisterFacilitatorDto } from './helper/dto/register-facilitator.dto';
import { HasuraService } from './hasura/hasura.service';
import { UserService } from './user.service';
import { Response } from 'express';
export declare class UserController {
    private readonly httpService;
    hasuraService: HasuraService;
    userService: UserService;
    url: string;
    constructor(httpService: HttpService, hasuraService: HasuraService, userService: UserService);
    getQualifications(): Promise<{
        statusCode: number;
        message: string;
        data: any;
    }>;
    create(req: CreateUserDto): Promise<{
        statusCode: number;
        message: string;
        data: any;
    }>;
    update(id: number, req: Record<string, any>): Promise<{
        statusCode: number;
        message: string;
        data: any;
    }>;
    searchAttendance(request: Record<string, any>, req: any): Promise<{
        statusCode: number;
        message: string;
        totalCount: any;
        data: any;
        limit: any;
        currentPage: any;
        totalPages: string;
    }>;
    searchById(id: number): Promise<{
        statusCode: number;
        message: string;
        data: any;
    }>;
    isUserExist(req: Record<string, any>): Promise<{
        status: number;
        message: string;
        isUserExist: boolean;
    }>;
    updateUser(id: string, req: Record<string, any>): Promise<{
        statusCode: any;
        message: string;
        data: any;
    }>;
    login(username: string, password: string, response: Response): Promise<Response<any, Record<string, any>>>;
    ipUserInfo(request: Request): Promise<{
        status: any;
        data: any;
    }>;
    organizationInfo(id: string): Promise<{
        statusCode: number;
        message: string;
        data: any;
    }>;
    register(body: RegisterFacilitatorDto, request: Request): Promise<{
        status: any;
        message: string;
        data: {
            user: any;
            keycloak_id: any;
            username: string;
            password: any;
        };
    }>;
}
