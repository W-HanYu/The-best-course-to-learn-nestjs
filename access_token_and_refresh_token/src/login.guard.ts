import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(JwtService)
  private jwtService: JwtService;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const authorization = request.headers.authorization;
    if (!authorization) {
      throw new UnauthorizedException(
        'The user is no login,please login before',
      );
    }

    try {
      const token = authorization.split(' ')[1];
      const data = this.jwtService.verify(token);

      return true;
    } catch (e) {
      throw new UnauthorizedException('token was exprired,please login again');
    }
  }
}
