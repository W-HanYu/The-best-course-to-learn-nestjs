import { Controller, Get, Inject } from '@nestjs/common';
import {
  ASYNC_OPTIONS_TYPE,
  CccModuleOptions,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
} from './ccc.module-definition';

@Controller('ccc')
export class CccController {
  @Inject(MODULE_OPTIONS_TOKEN)
  private options: typeof ASYNC_OPTIONS_TYPE;

  @Get('')
  hello() {
    return this.options;
  }
}
