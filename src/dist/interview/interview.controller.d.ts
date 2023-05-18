import { InterviewService } from './interview.service';
import { CreateInterviewDto } from './dto/create-interview.dto';
export declare class InterviewController {
    private readonly interviewService;
    constructor(interviewService: InterviewService);
    create(createInterviewDto: CreateInterviewDto): Promise<any>;
    findAll(request: Record<string, any>): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, request: Record<string, any>): Promise<any>;
    remove(id: string): Promise<any>;
}
