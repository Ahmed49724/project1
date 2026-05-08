import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/** Protects a route — requires a valid platform Bearer JWT */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = any>(err: any, user: any, _info: any): TUser {
    if (err || !user) throw new UnauthorizedException('Invalid or missing token');
    return user as TUser;
  }
}
