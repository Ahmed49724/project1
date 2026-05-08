'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { AlertCircle, CheckCircle2, Eye, EyeOff, Loader2, Lock, Mail, UserRound } from 'lucide-react'
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client'
import { loginAdult } from '@/features/auth/api'
import { useAuthStore } from '@/features/auth/store'
import { ApiError } from '@/lib/api/client'
import styles from './AdultLoginForm.module.css'

type AuthMode = 'signin' | 'signup'
type Status = 'idle' | 'loading-google' | 'loading-email' | 'success'
const supabaseConfigError = 'Supabase غير مفعّل بعد. أضف مفاتيح NEXT_PUBLIC_SUPABASE_URL و NEXT_PUBLIC_SUPABASE_ANON_KEY.'

function errorMessage(error: unknown) {
  if (error instanceof ApiError) return error.message
  if (error instanceof Error) return error.message
  return 'حدث خطأ غير متوقع. حاول مرة أخرى.'
}

export function AdultLoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setAuth } = useAuthStore()
  const supabase = createClient()

  const [authMode, setAuthMode] = useState<AuthMode>('signin')
  const [status, setStatus] = useState<Status>('idle')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(searchParams.get('error') ?? (isSupabaseConfigured ? null : supabaseConfigError))
  const [notice, setNotice] = useState<string | null>(null)

  const exchangeInProgress = useRef(false)

  const completePlatformLogin = useCallback(async (supabaseToken: string) => {
    if (exchangeInProgress.current) return
    exchangeInProgress.current = true
    setError(null)

    try {
      const { user, token } = await loginAdult(supabaseToken)
      setAuth(user, token)
      router.replace(user.role === 'teacher' ? '/teacher' : '/dashboard')
    } catch (err) {
      exchangeInProgress.current = false
      setStatus('idle')
      setError(errorMessage(err))
    }
  }, [router, setAuth])

  useEffect(() => {
    if (!isSupabaseConfigured) {
      return
    }

    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.access_token) {
        setStatus('loading-email')
        void completePlatformLogin(data.session.access_token)
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && session?.access_token) {
          setStatus('loading-email')
          await completePlatformLogin(session.access_token)
        }
      },
    )

    return () => subscription.unsubscribe()
  }, [completePlatformLogin, supabase.auth])

  async function handleGoogleLogin() {
    if (!isSupabaseConfigured) return
    setStatus('loading-google')
    setError(null)
    setNotice(null)

    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/login`,
        queryParams: { access_type: 'offline', prompt: 'consent' },
      },
    })

    if (oauthError) {
      setStatus('idle')
      setError(oauthError.message)
    }
  }

  async function handleEmailAuth(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!isSupabaseConfigured) return
    setStatus('loading-email')
    setError(null)
    setNotice(null)

    const cleanEmail = email.trim().toLowerCase()
    const cleanName = fullName.trim()

    if (authMode === 'signup' && cleanName.length < 2) {
      setStatus('idle')
      setError('اكتب اسم ولي الأمر أو المدرس.')
      return
    }

    if (password.length < 8) {
      setStatus('idle')
      setError('كلمة المرور يجب أن تكون 8 أحرف على الأقل.')
      return
    }

    if (authMode === 'signin') {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      })

      if (signInError) {
        setStatus('idle')
        setError(signInError.message)
        return
      }

      if (data.session?.access_token) {
        await completePlatformLogin(data.session.access_token)
      }
      return
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: cleanEmail,
      password,
      options: {
        data: {
          role: 'parent',
          full_name: cleanName,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/login`,
      },
    })

    if (signUpError) {
      setStatus('idle')
      setError(signUpError.message)
      return
    }

    if (data.session?.access_token) {
      await completePlatformLogin(data.session.access_token)
      return
    }

    setStatus('success')
    setNotice('تم إنشاء الحساب. افتح بريدك واضغط رابط التأكيد لتفعيل الدخول.')
  }

  const isBusy = status === 'loading-google' || status === 'loading-email'

  return (
    <section className={styles.card} aria-label="تسجيل الدخول إلى جامع">
      <div className={styles.modeSwitch} role="tablist" aria-label="نوع العملية">
        <button
          type="button"
          role="tab"
          aria-selected={authMode === 'signin'}
          className={authMode === 'signin' ? styles.modeActive : styles.modeButton}
          onClick={() => { setAuthMode('signin'); setError(null); setNotice(null) }}
        >
          تسجيل الدخول
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={authMode === 'signup'}
          className={authMode === 'signup' ? styles.modeActive : styles.modeButton}
          onClick={() => { setAuthMode('signup'); setError(null); setNotice(null) }}
        >
          إنشاء حساب
        </button>
      </div>

      <div className={styles.headingBlock}>
        <p className={styles.eyebrow}>اشتراك شهري للعائلات والمعلمين</p>
        <h1>{authMode === 'signin' ? 'أهلا بعودتك إلى جامع' : 'ابدأ حساب جامع'}</h1>
        <p>
          دخول آمن للوالدين والمعلمين، وبعدها يمكنك إدارة الطلاب والاشتراك الشهري من لوحة التحكم.
        </p>
      </div>

      {error && (
        <div className={styles.error} role="alert">
          <AlertCircle size={18} aria-hidden />
          <span>{error}</span>
        </div>
      )}

      {notice && (
        <div className={styles.notice} role="status">
          <CheckCircle2 size={18} aria-hidden />
          <span>{notice}</span>
        </div>
      )}

      <button
        type="button"
        className={styles.googleButton}
        onClick={handleGoogleLogin}
        disabled={isBusy || !isSupabaseConfigured}
      >
        {status === 'loading-google' ? <Loader2 className={styles.spin} size={18} aria-hidden /> : <span className={styles.googleMark}>G</span>}
        المتابعة بحساب Google
      </button>

      <div className={styles.divider}><span /> أو بالبريد الإلكتروني <span /></div>

      <form className={styles.form} onSubmit={handleEmailAuth} noValidate>
        {authMode === 'signup' && (
          <label className={styles.field}>
            <span>الاسم</span>
            <div className={styles.inputWrap}>
              <UserRound size={18} aria-hidden />
              <input
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                autoComplete="name"
                placeholder="مثال: Ahmed Ali"
                disabled={isBusy}
              />
            </div>
          </label>
        )}

        <label className={styles.field}>
          <span>البريد الإلكتروني</span>
          <div className={styles.inputWrap}>
            <Mail size={18} aria-hidden />
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              placeholder="you@example.com"
              disabled={isBusy}
              required
              dir="ltr"
            />
          </div>
        </label>

        <label className={styles.field}>
          <span>كلمة المرور</span>
          <div className={styles.inputWrap}>
            <Lock size={18} aria-hidden />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete={authMode === 'signin' ? 'current-password' : 'new-password'}
              placeholder="8 أحرف على الأقل"
              disabled={isBusy}
              required
              dir="ltr"
            />
            <button
              type="button"
              className={styles.eyeButton}
              aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
              onClick={() => setShowPassword((value) => !value)}
            >
              {showPassword ? <EyeOff size={18} aria-hidden /> : <Eye size={18} aria-hidden />}
            </button>
          </div>
        </label>

        <button
          type="submit"
          className={styles.primaryButton}
          disabled={isBusy || !email.trim() || !password || !isSupabaseConfigured}
        >
          {status === 'loading-email' && <Loader2 className={styles.spin} size={18} aria-hidden />}
          {authMode === 'signin' ? 'دخول بالبريد' : 'إنشاء الحساب'}
        </button>
      </form>

      <p className={styles.studentLink}>
        طالب؟ استخدم <a href="/login/student">كود الطالب</a>
      </p>
    </section>
  )
}
