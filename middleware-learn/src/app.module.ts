import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AaaMiddleware } from './aaa.middleware';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AaaMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.GET });

    consumer
      .apply(AaaMiddleware)
      .forRoutes({ path: 'word2', method: RequestMethod.GET });
  }
}
