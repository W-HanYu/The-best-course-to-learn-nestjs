import { Injectable } from '@nestjs/common';

@Injectable()
export class Lib1Service {
  lib1() {
    return 'lib1';
  }
}
