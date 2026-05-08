import { api } from '@/lib/api/client'
import type { AuthUser, LoginResponse } from './types'

/**
 * Flow A — Parent / Teacher
 * Exchange a Supabase access_token for a platform JWT.
 */
export async function loginAdult(supabaseToken: string): Promise<{ user: AuthUser; token: string }> {
  const data = await api.post<LoginResponse, { token: string }>(
    '/auth/login',
    { token: supabaseToken },
    { skipAuth: true },
  )
  const user: AuthUser = {
    id:    data.user.id,
    email: data.user.email ?? null,
    role:  data.user.role,
  }
  return { user, token: data.access_token }
}

/**
 * Flow B — Student
 * Exchange a 6-character access code for a platform JWT.
 */
export async function loginStudent(code: string): Promise<{ user: AuthUser; token: string }> {
  const data = await api.post<LoginResponse, { code: string }>(
    '/auth/student-login',
    { code: code.toUpperCase().trim() },
    { skipAuth: true },
  )
  const user: AuthUser = {
    id:          data.user.id,
    email:       null,
    role:        'student',
    studentCode: code.toUpperCase().trim(),
  }
  return { user, token: data.access_token }
}
