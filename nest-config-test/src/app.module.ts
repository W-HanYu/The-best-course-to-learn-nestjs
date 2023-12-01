import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BbbModule } from './bbb/bbb.module';
import * as path from 'path';
import config from './config';
import config2 from './config2';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: [
      //   //前面的配置会覆盖后面的配置。
      //   path.join(process.cwd(), '.aaa.env'),
      //   path.join(process.cwd(), '.env'),
      // ],

      load: [config2, config],
    }),
    BbbModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
