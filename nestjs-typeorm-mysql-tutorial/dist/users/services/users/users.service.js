"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const User_1 = require("../../typeorm/entities/User");
const Profile_1 = require("../../typeorm/entities/Profile");
const Post_1 = require("../../typeorm/entities/Post");
let UsersService = class UsersService {
    constructor(userRepository, profileRepository, postRepository) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
        this.postRepository = postRepository;
    }
    findUsers() {
        return this.userRepository.find({ relations: ['profile', 'posts'] });
    }
    createUser(userDetails) {
        const newUser = this.userRepository.create({
            ...userDetails,
        });
        return this.userRepository.save(newUser);
    }
    updateUser(id, updateUserDetails) {
        return this.userRepository.update({ id }, { ...updateUserDetails });
    }
    deleteUser(id) {
        return this.userRepository.delete({ id });
    }
    async createUserProfile(id, createUserProfileDetails) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user)
            throw new common_1.HttpException('User not found. Cannot create Profile', common_1.HttpStatus.BAD_REQUEST);
        const newProfile = this.profileRepository.create(createUserProfileDetails);
        const savedProfile = await this.profileRepository.save(newProfile);
        user.profile = savedProfile;
        return this.userRepository.save(user);
    }
    async createUserPost(id, createUserPostDetails) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user)
            throw new common_1.HttpException('User not found. Cannot create Profile', common_1.HttpStatus.BAD_REQUEST);
        const newPost = this.postRepository.create({
            ...createUserPostDetails,
            user,
        });
        return this.postRepository.save(newPost);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(User_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(Profile_1.Profile)),
    __param(2, (0, typeorm_1.InjectRepository)(Post_1.Post)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map