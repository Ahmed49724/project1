import { Suspense } from 'react'
import { LoginExperience } from '@/features/auth/components/LoginExperience'

export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <LoginExperience />
    </Suspense>
  )
}
