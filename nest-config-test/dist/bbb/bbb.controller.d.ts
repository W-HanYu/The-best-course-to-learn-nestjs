import { BbbService } from './bbb.service';
import { CreateBbbDto } from './dto/create-bbb.dto';
import { UpdateBbbDto } from './dto/update-bbb.dto';
export declare class BbbController {
    private readonly bbbService;
    constructor(bbbService: BbbService);
    private configService;
    create(createBbbDto: CreateBbbDto): string;
    findAll(): {
        ccc: any;
        ddd: any;
    };
    findOne(id: string): string;
    update(id: string, updateBbbDto: UpdateBbbDto): string;
    remove(id: string): string;
}
