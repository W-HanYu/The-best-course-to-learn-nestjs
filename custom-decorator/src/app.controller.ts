import {
  Controller,
  Get,
  ParseIntPipe,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AaaGuard } from './aaa.guard';
import { Aaa } from './aaa.decorator';
import { Bbb } from './bbb.decorator';
import { Ccc } from './ccc.decorator';
import { MyHeader } from './myheader.decorator';
import { MyQuery } from './myquery.decorator';
import { Ddd } from './ddd.decorator';

// @Controller()
// @Ddd()
@Ddd('eee', 'tao')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @SetMetadata('aaa', 'admin')
  @UseGuards(AaaGuard)
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('hello')
  @Aaa('admin')
  @UseGuards(AaaGuard)
  getHello2(): string {
    console.log('hello--');
    return this.appService.getHello();
  }

  @Bbb('hello2', 'admin')
  getHello3(): string {
    console.log('hello--2');
    return this.appService.getHello();
  }

  @Get('hello4')
  getHello4(@Ccc() c) {
    // c：参数装饰器的返回值就是参数的值。
    return c;
  }
  @Get('hello5')
  getHello5(@MyHeader('Accept') header1, @MyHeader('Accept') header2) {
    console.log('header1', header1);
    console.log('header2', header2);
  }

  @Get('hello6')
  getHello6(@MyQuery('aaa') aaa, @MyQuery('bbb') bbb) {
    console.log('aaa', aaa);
    console.log('bbb', bbb);
  }

  @Get('hello7')
  getHello7(
    @MyQuery('aaa', new ParseIntPipe()) aaa,
    @MyQuery('bbb', new ParseIntPipe()) bbb,
  ) {
    console.log('aaa', aaa + 1);
    console.log('bbb', bbb + 1);
  }
}
