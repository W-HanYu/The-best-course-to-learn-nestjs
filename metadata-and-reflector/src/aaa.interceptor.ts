import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AaaInterceptor implements NestInterceptor {
  @Inject(Reflector)
  private reflector: Reflector;

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Interceptor');
    console.log(this.reflector.get('roles', context.getHandler()));
    console.log(this.reflector.get('roles', context.getClass()));

    console.log(
      'getAll',
      this.reflector.getAll('roles', [
        context.getClass(),
        context.getHandler(),
      ]),
    );

    console.log(
      'getAllAndMerge',
      this.reflector.getAllAndMerge('roles', [
        context.getClass(),
        context.getHandler(),
      ]),
    );

    console.log(
      'getAllAndOverride',
      this.reflector.getAllAndOverride('roles', [
        context.getClass(),
        context.getHandler(),
      ]),
    );
    return next.handle();
  }
}
