import { useAuthStore } from '@/features/auth/store'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'

// ── Error type ───────────────────────────────────────────────────────────────

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

// ── Core fetch wrapper ───────────────────────────────────────────────────────

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

interface RequestOptions<TBody = unknown> {
  method?: HttpMethod
  body?: TBody
  /** Override or add headers on a per-request basis */
  headers?: Record<string, string>
  /** Pass true for endpoints that intentionally allow unauthenticated access */
  skipAuth?: boolean
}

async function request<TResponse, TBody = unknown>(
  path: string,
  options: RequestOptions<TBody> = {},
): Promise<TResponse> {
  const { method = 'GET', body, headers: extraHeaders = {}, skipAuth = false } = options

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...extraHeaders,
  }

  if (!skipAuth) {
    // getState() is synchronous — safe to call outside React render
    const token = useAuthStore.getState().token
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  // 204 No Content — return early before attempting JSON.parse
  if (response.status === 204) {
    return undefined as TResponse
  }

  let payload: unknown
  const contentType = response.headers.get('content-type') ?? ''

  if (contentType.includes('application/json')) {
    payload = await response.json()
  } else {
    payload = await response.text()
  }

  if (!response.ok) {
    const errBody = payload as Record<string, unknown>

    if (response.status === 401) {
      // Token expired or invalid — purge local session so the UI redirects
      useAuthStore.getState().clearAuth()
      throw new ApiError(401, 'UNAUTHORIZED', 'Session expired. Please log in again.')
    }

    if (response.status === 403) {
      throw new ApiError(403, 'FORBIDDEN', 'You do not have permission to perform this action.')
    }

    throw new ApiError(
      response.status,
      (errBody?.error as string) ?? 'API_ERROR',
      (errBody?.message as string) ?? `Request failed with status ${response.status}`,
    )
  }

  return payload as TResponse
}

// ── Convenience methods ───────────────────────────────────────────────────────

export const api = {
  get: <TRes>(path: string, opts?: Omit<RequestOptions, 'method' | 'body'>) =>
    request<TRes>(path, { ...opts, method: 'GET' }),

  post: <TRes, TBody = unknown>(path: string, body: TBody, opts?: Omit<RequestOptions<TBody>, 'method' | 'body'>) =>
    request<TRes, TBody>(path, { ...opts, method: 'POST', body }),

  put: <TRes, TBody = unknown>(path: string, body: TBody, opts?: Omit<RequestOptions<TBody>, 'method' | 'body'>) =>
    request<TRes, TBody>(path, { ...opts, method: 'PUT', body }),

  patch: <TRes, TBody = unknown>(path: string, body: TBody, opts?: Omit<RequestOptions<TBody>, 'method' | 'body'>) =>
    request<TRes, TBody>(path, { ...opts, method: 'PATCH', body }),

  delete: <TRes>(path: string, opts?: Omit<RequestOptions, 'method' | 'body'>) =>
    request<TRes>(path, { ...opts, method: 'DELETE' }),
}
