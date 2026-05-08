import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import type { JameaRole } from '../common/decorators/roles.decorator';

export interface JwtPayload {
  sub: string;
  email?: string | null;
  role?: JameaRole;
  studentCode?: string;
}

const VALID_ROLES: JameaRole[] = ['parent', 'student', 'teacher', 'admin'];

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.getOrThrow<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    if (payload.role && !VALID_ROLES.includes(payload.role)) {
      throw new UnauthorizedException('Invalid role claim in token');
    }
    return payload;
  }
}
