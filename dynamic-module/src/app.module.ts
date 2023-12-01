import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BbbModule } from './bbb/bbb.module';
import { CccModule } from './ccc/ccc.module';

@Module({
  imports: [
    BbbModule.register({
      a: 1,
      b: 2,
    }),
    CccModule.register({
      aaa: 1,
      bbb: 'bbb',
    }),

    // CccModule.registerAsync({
    //   useFactory: async () => {
    //     await 111;
    //     return {
    //       aaa: 2,
    //       bbb: 'bbb',
    //     };
    //   },
    //   inject: [],
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
