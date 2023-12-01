import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { DddService } from './ddd.service';

@Injectable()
export class CccService {
  constructor(
    @Inject(forwardRef(() => DddService)) private dddService: DddService,
  ) {}
  ccc() {
    return this.dddService.ccc() + 'eee';
  }
}
