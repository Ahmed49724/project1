import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SupabaseService } from '../supabase/supabase.service';
import type { JameaRole } from '../common/decorators/roles.decorator';
import type { JwtPayload } from './jwt.strategy';

const VALID_ROLES: JameaRole[] = ['parent', 'student', 'teacher', 'admin'];

export interface LoginResponse {
  access_token: string;
  user: { id: string; email?: string | null; role: JameaRole; name?: string };
}

@Injectable()
export class AuthService {
  constructor(
    private supabase: SupabaseService,
    private jwtService: JwtService,
  ) {}

  async loginWithSupabaseToken(supabaseToken: string): Promise<LoginResponse> {
    const user = await this.supabase.verifyToken(supabaseToken);
    if (!user) throw new UnauthorizedException('Invalid Supabase token');

    const rawRole = (user.user_metadata?.role as string | undefined) ?? 'parent';
    if (!VALID_ROLES.includes(rawRole as JameaRole)) {
      throw new UnauthorizedException(`Unknown role: ${rawRole ?? '(none)'}`);
    }
    const role = rawRole as JameaRole;

    const payload: JwtPayload = { sub: user.id, email: user.email, role };

    return {
      access_token: this.jwtService.sign(payload),
      user: { id: user.id, email: user.email, role, name: user.user_metadata?.full_name as string | undefined },
    };
  }

  async loginWithStudentCode(code: string): Promise<LoginResponse> {
    const normalised = code.toUpperCase().trim();

    // Verify code via security-definer RPC (§6.4) — returns child_profile_id or null
    const { data: childId, error: rpcError } = await this.supabase.adminDb
      .rpc('verify_child_access_code', { plain_code: normalised });

    if (rpcError || !childId) {
      throw new UnauthorizedException('Invalid student code');
    }

    // Fetch display name from profiles table
    const { data: profile, error: profileError } = await this.supabase.adminDb
      .from('profiles')
      .select('id, display_name')
      .eq('id', childId as string)
      .single();

    if (profileError || !profile) {
      throw new UnauthorizedException('Student profile not found');
    }

    const payload: JwtPayload = {
      sub:         profile.id as string,
      role:        'student',
      studentCode: normalised,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: { id: profile.id as string, role: 'student', name: profile.display_name as string },
    };
  }
}
