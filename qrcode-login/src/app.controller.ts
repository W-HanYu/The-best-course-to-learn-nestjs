import {
  BadRequestException,
  Controller,
  Get,
  Headers,
  Inject,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { randomUUID } from 'crypto';
import * as qrcode from 'qrcode';
import { JwtService } from '@nestjs/jwt';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from './user/entities/user.entity';

const map = new Map<string, QrCodeInfo>();

interface QrCodeInfo {
  status:
    | 'noscan'
    | 'scan-wait-confirm'
    | 'scan-confirm'
    | 'scan-cancel'
    | 'expired';
  userInfo?: {
    userId: number;
  };
}
// noscan 未扫描
// scan-wait-confirm -已扫描，等待用户确认
// scan-confirm 已扫描，用户同意授权
// scan-cancel 已扫描，用户取消授权
// expired 已过期

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject(JwtService)
  private jwtService: JwtService;

  @InjectEntityManager()
  private entityManager: EntityManager;

  private users = [
    { id: 1, username: 'taotao', password: '111' },
    { id: 2, username: 'nannan', password: '222' },
  ];

  @Get('init-data')
  async initData() {
    await this.entityManager.save(User, {
      username: 'taotao',
      password: '111',
    });

    await this.entityManager.save(User, {
      username: 'nannan',
      password: '222',
    });

    return 'success';
  }

  @Get('login')
  async login(
    @Query('username') username: string,
    @Query('password') password: string,
  ) {
    const user = this.users.find((item) => item.username === username);

    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }
    if (user.password !== password) {
      throw new UnauthorizedException('密码错误');
    }

    return {
      token: await this.jwtService.sign({
        userId: user.id,
      }),
    };
  }

  @Get('userInfo')
  async userInfo(@Query('Authorization') auth: string) {
    try {
      const [, token] = auth.split(' ');
      const info = await this.jwtService.verify(token);
      const user = this.users.find((item) => item.id == info.userId);
      return user;
    } catch (e) {}
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('qrcode/generate')
  async generate() {
    const uuid = randomUUID();

    const data = await qrcode.toDataURL(
      `http://10.15.185.104:3000/pages/confirm.html?id=${uuid}`,
    );

    map.set(`qrcode_${uuid}`, {
      status: 'noscan',
    });

    return {
      qrcode_id: uuid,
      img: data,
    };
  }

  @Get('qrcode/check')
  async check(@Query('id') id: string) {
    return map.get(`qrcode_${id}`);
  }

  @Get('qrcode/scan')
  async scan(@Query('id') id: string) {
    const info = map.get(`qrcode_${id}`);
    if (!info) {
      throw new BadRequestException('二维码已过期');
    }
    info.status = 'scan-wait-confirm';
    return 'success';
  }

  @Get('qrcode/confirm')
  async confirm(
    @Query('id') id: string,
    @Headers('Authorization') auth: string,
  ) {
    let user;
    try {
      const [, token] = auth.split(' ');
      const info = await this.jwtService.verify(token);

      user = this.users.find((item) => item.id == info.userId);
    } catch (e) {
      throw new UnauthorizedException('token 过期，请重新登录');
    }

    const info = map.get(`qrcode_${id}`);
    if (!info) {
      throw new BadRequestException('二维码已过期');
    }
    info.status = 'scan-confirm';
    info.userInfo = user;
    return 'success';
  }

  @Get('qrcode/cancel')
  async cancel(@Query('id') id: string) {
    const info = map.get(`qrcode_${id}`);
    if (!info) {
      throw new BadRequestException('二维码已过期');
    }
    info.status = 'scan-cancel';
    return 'success';
  }
}
