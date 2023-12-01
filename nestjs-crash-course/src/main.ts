import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NextFunction, Request, Response } from 'express';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(function (req: Request, res: Response, next: NextFunction) {
    console.log('before', req.url);
    next();
    console.log('after');
  });

  /**
   * 启动全局路由守卫
   */
  // app.useGlobalGuards(new LoginGuard());

  /**
   * 全局启用，作用于全部 controller：
   */
  // app.useGlobalInterceptors(new TimeInterceptor());
  await app.listen(3000);
}
bootstrap();
