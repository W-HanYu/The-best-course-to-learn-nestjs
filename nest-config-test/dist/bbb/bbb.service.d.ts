import { CreateBbbDto } from './dto/create-bbb.dto';
import { UpdateBbbDto } from './dto/update-bbb.dto';
export declare class BbbService {
    create(createBbbDto: CreateBbbDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateBbbDto: UpdateBbbDto): string;
    remove(id: number): string;
}
