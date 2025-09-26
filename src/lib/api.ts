import { getAccessToken, getRefreshToken, setTokens, clearTokens } from './auth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

async function refreshTokenOnce(): Promise<boolean> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;
  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });
  if (!res.ok) return false;
  const data = await res.json();
  if (data?.success && data.token && data.refreshToken) {
    setTokens({ accessToken: data.token, refreshToken: data.refreshToken });
    return true;
  }
  return false;
}

export async function apiFetch<T = any>(path: string, init: RequestInit = {}, retry = true): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(init.headers || {}),
  };
  const token = getAccessToken();
  if (token) (headers as any).Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, { ...init, headers });
  if (res.status === 401 && retry) {
    const ok = await refreshTokenOnce();
    if (ok) return apiFetch<T>(path, init, false);
  }
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return (await res.json()) as T;
}

export const AuthAPI = {
  async register(payload: { name: string; email: string; password: string }) {
    const res = await apiFetch<{ success: boolean; token: string; refreshToken: string; user: any }>(
      '/auth/register',
      { method: 'POST', body: JSON.stringify(payload) },
      false
    );
    setTokens({ accessToken: res.token, refreshToken: res.refreshToken });
    return res.user;
  },
  async login(payload: { email: string; password: string }) {
    const res = await apiFetch<{ success: boolean; token: string; refreshToken: string; user: any }>(
      '/auth/login',
      { method: 'POST', body: JSON.stringify(payload) },
      false
    );
    setTokens({ accessToken: res.token, refreshToken: res.refreshToken });
    return res.user;
  },
  async me() {
    const res = await apiFetch<{ success: boolean; user: any }>('/auth/me');
    return res.user;
  },
  async logout() {
    try {
      await apiFetch('/auth/logout', { method: 'POST' });
    } catch {
      /* ignore */
    }
    clearTokens();
  },
};

export const AnalyticsAPI = {
  async platform() {
    const res = await apiFetch<{ success: boolean; data: any }>('/analytics/platform');
    return res.data;
  },
};

