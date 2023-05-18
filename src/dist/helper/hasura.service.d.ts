import { HttpService } from '@nestjs/axios';
export declare class HasuraService {
    private readonly httpService;
    url: string;
    constructor(httpService: HttpService);
    findAll(tableName: String, filters?: Object): Promise<any>;
    queryMulti(tableName: String, items: any, onlyFields: any, fields?: any): string;
    deleteQuery(tName: String, item: any, onlyFields?: any): string;
    delete(tableName: String, item: Object, onlyFields?: any): Promise<any>;
    query(tableName: String, item: any, onlyFields?: any, update?: boolean, fields?: any): string;
    mutation(tName: String, item: any, onlyFields?: any, update?: boolean, fields?: any): string;
    q(tableName: String, item: Object, onlyFields?: any, update?: boolean, fields?: any): Promise<any>;
    qM(tableName: String, item: any, fields: any, onlyFields?: any): Promise<any>;
    getAll: (tableName: String, object?: any) => Promise<any>;
    getResponce: ({ data, errors }: any, tableName: any, response?: string) => any;
}
