import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// Supabase redirects here after OAuth / magic-link flows.
// Exchanges the one-time code for a session, then hands off to the
// AdultLoginForm's onAuthStateChange listener (which calls our NestJS backend).
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code  = searchParams.get('code')
  const next  = searchParams.get('next') ?? '/login'
  const error = searchParams.get('error')

  if (error) {
    const description = searchParams.get('error_description') ?? 'OAuth error'
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(description)}`,
    )
  }

  if (code) {
    const supabase = await createClient()
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

    if (!exchangeError) {
      // Session is now set in cookies; redirect to login page where the
      // onAuthStateChange listener will fire SIGNED_IN and call our backend.
      return NextResponse.redirect(`${origin}${next}`)
    }

    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(exchangeError.message)}`,
    )
  }

  return NextResponse.redirect(`${origin}/login`)
}
