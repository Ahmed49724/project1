export type JameaRole = 'parent' | 'student' | 'teacher' | 'admin'

export interface AuthUser {
  id: string
  email: string | null
  role: JameaRole
  studentCode?: string
}

// Normalised shape returned by POST /auth/login AND /auth/student-login
export interface LoginResponse {
  access_token: string
  user: {
    id: string
    email?: string | null
    role: JameaRole
    name?: string | null
  }
}

// Keep legacy aliases so existing imports don't break while migrating
export type AdultLoginResponse   = LoginResponse
export type StudentLoginResponse = LoginResponse
