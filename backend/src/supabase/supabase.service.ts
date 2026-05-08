import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupabaseService {
  private readonly logger = new Logger(SupabaseService.name);
  private readonly client: SupabaseClient;
  private readonly admin: SupabaseClient;

  constructor(private config: ConfigService) {
    const url         = this.config.getOrThrow<string>('SUPABASE_URL');
    const anon        = this.config.getOrThrow<string>('SUPABASE_ANON_KEY');
    const serviceRole = this.config.getOrThrow<string>('SUPABASE_SERVICE_ROLE_KEY');

    this.client = createClient(url, anon);
    this.admin  = createClient(url, serviceRole, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
  }

  /** Public Supabase client (uses anon key) */
  get db(): SupabaseClient { return this.client; }

  /** Admin Supabase client (uses service-role key — server only) */
  get adminDb(): SupabaseClient { return this.admin; }

  /** Verify a Supabase JWT and return the Supabase User, or null */
  async verifyToken(token: string): Promise<User | null> {
    if (!token) return null;
    const { data, error } = await this.admin.auth.getUser(token);
    if (error) {
      this.logger.warn(`Token verification failed: ${error.message}`);
      return null;
    }
    return data.user ?? null;
  }
}
