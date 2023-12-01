import {
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  Post,
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { LoginUserDto } from './dto/user-login.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  @InjectEntityManager()
  private entityManager: EntityManager;

  async initData() {
    const user1 = new User();
    user1.username = '涛涛';
    user1.password = 'aaaaaa';

    const user2 = new User();
    user2.username = '楠楠';
    user2.password = 'bbbbbb';

    await this.entityManager.save([user1, user2]);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.entityManager.findOne(User, {
      where: {
        username: loginUserDto.username,
      },
    });

    if (!user) {
      throw new HttpException('The user is not exist', HttpStatus.ACCEPTED);
    }

    if (user.password !== loginUserDto.password) {
      throw new HttpException(
        'The password is error,please again',
        HttpStatus.ACCEPTED,
      );
    }

    return user;
  }

  async findUserById(userId: number) {
    return await this.entityManager.findOne(User, {
      where: {
        id: userId,
      },
    });
  }
}
