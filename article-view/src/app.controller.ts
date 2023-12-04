import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from './user/entities/user.entity';
import { Article } from './article/entities/article.entity';
import { LoginUserDto } from './user/dto/login-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @InjectEntityManager()
  private entityManager: EntityManager;

  @Get('init-data')
  async initData() {
    await this.entityManager.save(User, {
      username: 'taotao',
      password: '111111',
    });

    await this.entityManager.save(User, {
      username: 'nannan',
      password: '222222',
    });

    await this.entityManager.save(Article, {
      title: '基于 Axios 封装一个完美的双 token 无感刷新',
      content: `用户登录之后，会返回一个用户的标识，之后带上这个标识请求别的接口，就能识别出该用户。

      标识登录状态的方案有两种： session 和 jwt。
      `,
    });

    await this.entityManager.save(Article, {
      title: 'Three.js 手写跳一跳小游戏',
      content: `前几年，跳一跳小游戏火过一段时间。

      玩家从一个方块跳到下一个方块，如果没跳过去就算失败，跳过去了就会再出现下一个方块。`,
    });
    return 'done';
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.entityManager.findOne(User, {
      where: {
        username: loginUserDto.username,
      },
    });

    if (!user) {
      throw new BadRequestException('The user is not exist!');
    }

    if (user.password !== loginUserDto.password) {
      throw new BadRequestException('password is wrong');
    }

    return user;
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}