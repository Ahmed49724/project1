import type { Metadata } from 'next'
import { Suspense } from 'react'
import { LoginExperience } from '@/features/auth/components/LoginExperience'

export const metadata: Metadata = {
  title: 'Login | Jamea',
  description: 'Sign in or create a Jamea subscription account.',
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginExperience />
    </Suspense>
  )
}
