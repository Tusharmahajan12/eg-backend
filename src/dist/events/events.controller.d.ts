import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    create(createEventDto: CreateEventDto): Promise<any>;
    findAll(request: Record<string, any>): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, request: Record<string, any>): Promise<any>;
    remove(id: string): Promise<any>;
}
