import { HttpService } from '@nestjs/axios';
import { QueryGeneratorService } from 'src/helper/queryGenerator.service';
export declare class HasuraService {
    private readonly httpService;
    qgService: QueryGeneratorService;
    url: string;
    constructor(httpService: HttpService, qgService: QueryGeneratorService);
    findAll(tableName: String, filters?: Object): Promise<any>;
    getAll(tableName: String, onlyFields?: any, request?: any): Promise<any>;
    getOne(id: number, tableName: String, onlyFields?: any): Promise<any>;
    create(tableName: String, item: Object, onlyFields?: any, fields?: any): Promise<any>;
    update(id: number, tableName: String, item: Object, onlyFields?: any, fields?: any): Promise<any>;
    delete(tableName: String, item: Object, onlyFields?: any): Promise<any>;
    q(tableName: String, item: Object, onlyFields?: any, update?: boolean, fields?: any): Promise<any>;
    qM(tableName: String, item: any, fields: any, onlyFields?: any): Promise<any>;
    getResponce: ({ data, errors }: any, tableName: any, response?: string) => any;
}
