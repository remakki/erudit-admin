import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decodeJWT } from '@/lib/auth';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('auth-token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const user = decodeJWT(token);
  if (!user) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!login|_next|favicon.ico).*)'],
};
