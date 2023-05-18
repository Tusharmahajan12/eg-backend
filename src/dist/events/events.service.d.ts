import { HasuraService } from 'src/hasura/hasura.service';
export declare class EventsService {
    private readonly hasuraService;
    table: string;
    fillable: string[];
    returnFields: string[];
    constructor(hasuraService: HasuraService);
    create(req: any): Promise<any>;
    findAll(request: any): Promise<any>;
    findOne(id: number): Promise<any>;
    update(id: number, req: any): Promise<any>;
    remove(id: number): Promise<any>;
}
