import { Controller, Get, Next, Response } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    console.log('hello');
    return this.appService.getHello();
  }

  @Get('hello2')
  getHello2(): string {
    console.log('hello2');
    return this.appService.getHello();
  }

  @Get('word1')
  getWords1(): string {
    console.log('word1');
    return this.appService.getHello();
  }

  @Get('word2')
  getWords2(): string {
    console.log('word2');
    return this.appService.getHello();
  }

  @Get('aaa')
  all(@Next() next, @Response({ passthrough: true }) response) {
    // next();
    return 'next ';
  }
}
