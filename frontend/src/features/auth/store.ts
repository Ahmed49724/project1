'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { AuthUser } from './types'

interface AuthState {
  user: AuthUser | null
  token: string | null
  isLoading: boolean
}

interface AuthActions {
  setAuth: (user: AuthUser, token: string) => void
  clearAuth: () => void
  setLoading: (loading: boolean) => void
}

const INITIAL_STATE: AuthState = {
  user: null,
  token: null,
  isLoading: false,
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,

      setAuth: (user, token) =>
        set({ user, token, isLoading: false }),

      clearAuth: () =>
        set({ user: null, token: null, isLoading: false }),

      setLoading: (isLoading) =>
        set({ isLoading }),
    }),
    {
      name: 'jamea-auth',
      storage: createJSONStorage(() => localStorage),
      // Only persist identity — do not persist transient loading state
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    },
  ),
)
