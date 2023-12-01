import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CccService } from './ccc.service';

@Injectable()
export class DddService {
  constructor(
    @Inject(forwardRef(() => CccService)) private cccService: CccService,
  ) {}
  ccc() {
    return 'ccc';
  }

  eee() {
    return this.cccService.ccc() + 'eee';
  }
}
