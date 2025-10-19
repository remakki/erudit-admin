import { cookies } from 'next/headers';

export interface User {
  id: number;
  username: string;
}

interface TokenPayload {
  id: number;
  username: string;
  exp: number;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  const response = await fetch(`${process.env.API_BASE_URL}/api/v1/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Login failed' }));
    throw new Error(error.message || 'Invalid credentials');
  }

  return await response.json();
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24,
    path: '/',
  });
}

export async function removeAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete('auth-token');
}

export async function getAuthToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get('auth-token')?.value;
}

function checkTokenExpiry(exp: number): boolean {
  const currentTime = Math.floor(Date.now() / 1000);
  return exp > currentTime;
}

export function decodeJWT(token: string): User | null {
  try {
    const payload: TokenPayload = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64url').toString()
    );
    if (!checkTokenExpiry(payload.exp)) {
      return null;
    }
    return {
      id: payload.id,
      username: payload.username,
    };
  } catch {
    return null;
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const token = await getAuthToken();
  if (!token) return null;

  const user = decodeJWT(token);
  if (!user) {
    await removeAuthCookie();
    return null;
  }

  return user;
}

export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return !!user;
}
