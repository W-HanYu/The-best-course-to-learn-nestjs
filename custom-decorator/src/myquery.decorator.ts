import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const MyQuery = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    return request.query[key];
  },
);
