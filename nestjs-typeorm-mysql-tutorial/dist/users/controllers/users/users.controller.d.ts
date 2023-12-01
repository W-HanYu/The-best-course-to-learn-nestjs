import { CreateUserDto } from 'src/users/dtos/CreateUserDto.dto';
import { UsersService } from 'src/users/services/users/users.service';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    getUsers(): Promise<import("../../typeorm/entities/User").User[]>;
    createUser(createUserDto: CreateUserDto): void;
}
