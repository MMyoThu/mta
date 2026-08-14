const DEFAULT_API_BASE_URL = 'https://portfolio-lu8f.onrender.com/api'

const AUTH_STORAGE_KEYS = {
  accessToken: 'auth_access_token',
  refreshToken: 'auth_refresh_token',
  tokenType: 'auth_token_type',
  expiresInMs: 'auth_expires_in_ms',
  refreshExpiresInMs: 'auth_refresh_expires_in_ms',
} as const

type RequestOptions = RequestInit & {
  skipJsonContentType?: boolean
  skipAuth?: boolean
}

const getApiBaseUrl = () => {
  const configuredUrl = import.meta.env.VITE_API_BASE_URL?.trim()
  return configuredUrl ? configuredUrl.replace(/\/$/, '') : DEFAULT_API_BASE_URL
}

const getUrl = (path: string) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${getApiBaseUrl()}${normalizedPath}`
}

const parseResponseBody = async <T>(response: Response): Promise<T> => {
  if (response.status === 204) {
    return {} as T
  }

  const text = await response.text()
  if (!text) {
    return {} as T
  }

  return JSON.parse(text) as T
}

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const token = options.skipAuth ? null : getStoredAccessToken()
  const response = await fetch(getUrl(path), {
    headers: {
      ...(options.skipJsonContentType ? {} : { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {}),
    },
    ...options,
  })

  if (!response.ok) {
    const message = await response.text().catch(() => '')
    throw new Error(message || `Request failed with status ${response.status}`)
  }

  return parseResponseBody<T>(response)
}

export type ContactPayload = {
  name: string
  email: string
  subject: string
  message: string
}

export type ContactResponse = {
  message: string
}

export type LoginRequest = {
  username: string
  password: string
}

export type AuthTokens = {
  accessToken: string
  refreshToken: string
  tokenType: string
  expiresInMs: number
  refreshExpiresInMs: number
}

export type ApiResponse<T> = {
  success: boolean
  message: string
  data: T
}

export async function submitContactMessage(payload: ContactPayload) {
  return request<ContactResponse>('/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function login(payload: LoginRequest): Promise<ApiResponse<AuthTokens>> {
  return request<ApiResponse<AuthTokens>>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function persistAuthSession(response: ApiResponse<AuthTokens>) {
  if (!response.success || !response.data) {
    return false
  }

  localStorage.setItem(AUTH_STORAGE_KEYS.accessToken, response.data.accessToken)
  localStorage.setItem(AUTH_STORAGE_KEYS.refreshToken, response.data.refreshToken)
  localStorage.setItem(AUTH_STORAGE_KEYS.tokenType, response.data.tokenType)
  localStorage.setItem(AUTH_STORAGE_KEYS.expiresInMs, String(response.data.expiresInMs))
  localStorage.setItem(AUTH_STORAGE_KEYS.refreshExpiresInMs, String(response.data.refreshExpiresInMs))

  return true
}

export function clearAuthSession() {
  localStorage.removeItem(AUTH_STORAGE_KEYS.accessToken)
  localStorage.removeItem(AUTH_STORAGE_KEYS.refreshToken)
  localStorage.removeItem(AUTH_STORAGE_KEYS.tokenType)
  localStorage.removeItem(AUTH_STORAGE_KEYS.expiresInMs)
  localStorage.removeItem(AUTH_STORAGE_KEYS.refreshExpiresInMs)
}

export function getStoredAccessToken() {
  return localStorage.getItem(AUTH_STORAGE_KEYS.accessToken)
}
