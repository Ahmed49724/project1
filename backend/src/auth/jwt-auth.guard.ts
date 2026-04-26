import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/** Protects a route — requires a valid Bearer JWT */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: Error, user: unknown) {
    if (err || !user) throw new UnauthorizedException('Invalid or missing token');
    return user;
  }
}
