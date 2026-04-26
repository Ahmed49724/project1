import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupabaseService {
  private readonly client: SupabaseClient;
  // Admin client uses service role key — bypasses RLS for server-side operations
  private readonly admin: SupabaseClient;

  constructor(private config: ConfigService) {
    const url = this.config.getOrThrow<string>('SUPABASE_URL');
    const anon = this.config.get<string>('SUPABASE_ANON_KEY', '');
    const serviceRole = this.config.get<string>('SUPABASE_SERVICE_ROLE_KEY', '');

    this.client = createClient(url, anon);
    this.admin   = createClient(url, serviceRole, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
  }

  /** Public Supabase client (uses anon key) */
  get db(): SupabaseClient { return this.client; }

  /** Admin Supabase client (uses service role key — server only!) */
  get adminDb(): SupabaseClient { return this.admin; }

  /** Verify a Supabase JWT and return the user, or null */
  async verifyToken(token: string) {
    const { data, error } = await this.admin.auth.getUser(token);
    if (error || !data.user) return null;
    return data.user;
  }
}
