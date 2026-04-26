import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SupabaseService } from '../supabase/supabase.service';
import type { JwtPayload } from './jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private supabase: SupabaseService,
    private jwtService: JwtService,
  ) {}

  /**
   * Called after a Supabase Google OAuth login.
   * Verifies the Supabase access token, then issues our own short-lived JWT.
   */
  async loginWithSupabaseToken(supabaseToken: string) {
    const user = await this.supabase.verifyToken(supabaseToken);
    if (!user) throw new UnauthorizedException('Invalid Supabase token');

    const payload: JwtPayload = {
      sub:   user.id,
      email: user.email,
      role:  (user.user_metadata?.role as string) ?? 'parent',
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: { id: user.id, email: user.email, name: user.user_metadata?.full_name },
    };
  }

  /**
   * Student code login — looks up child by code in Supabase,
   * returns a short-lived JWT with role = 'student'.
   */
  async loginWithStudentCode(code: string) {
    const { data, error } = await this.supabase.adminDb
      .from('children')
      .select('id, display_name, parent_id, code')
      .eq('code', code.toUpperCase().trim())
      .single();

    if (error || !data) throw new UnauthorizedException('Invalid student code');

    const payload: JwtPayload = {
      sub:         data.id,
      role:        'student',
      studentCode: data.code,
    };

    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
      student: { id: data.id, name: data.display_name, code: data.code },
    };
  }
}
