import { Repository } from 'typeorm';
import { User } from 'src/users/typeorm/entities/User';
import { Profile } from 'src/users/typeorm/entities/Profile';
import { Post } from 'src/users/typeorm/entities/Post';
import { CreateUserParams, CreateUserPostParams, CreateUserProfileParams, UpdateUserParams } from 'src/utils/types';
export declare class UsersService {
    private userRepository;
    private profileRepository;
    private postRepository;
    constructor(userRepository: Repository<User>, profileRepository: Repository<Profile>, postRepository: Repository<Post>);
    findUsers(): Promise<User[]>;
    createUser(userDetails: CreateUserParams): Promise<User>;
    updateUser(id: number, updateUserDetails: UpdateUserParams): Promise<import("typeorm").UpdateResult>;
    deleteUser(id: number): Promise<import("typeorm").DeleteResult>;
    createUserProfile(id: number, createUserProfileDetails: CreateUserProfileParams): Promise<User>;
    createUserPost(id: number, createUserPostDetails: CreateUserPostParams): Promise<Post>;
}
