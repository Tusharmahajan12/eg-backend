export declare class QueryGeneratorService {
    isEmptyObject: (obj: any) => boolean;
    objectConvert: (obj: any, fun: any) => unknown[];
    getParam: (keys: any) => string;
    create(tName: String, item: any, onlyFields?: any, fields?: any): string;
    update(id: number, tName: String, item: any, onlyFields?: any, fields?: any): string;
    mutation(tName: String, item: any, onlyFields?: any, update?: boolean, fields?: any): string;
    query(tableName: String, onlyFields?: any, request?: any): string;
    findOne(id: number, tName: String, onlyFields?: any): string;
    queryMulti(tableName: String, items: any, onlyFields: any, fields?: any): string;
    deleteQuery(tName: String, item: any, onlyFields?: any): string;
}
