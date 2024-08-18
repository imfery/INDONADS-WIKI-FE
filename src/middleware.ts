import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { isInvalidOrExpired, isJwtToken } from './utils';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accessTokenCookie = req.cookies.get('accessToken');
  const accessToken = accessTokenCookie?.value;

  if (accessToken) {
    if (!isJwtToken(accessToken) || isInvalidOrExpired(accessToken)) {
      if (pathname !== '/admin/login') {
        return NextResponse.redirect(new URL('/admin/login', req.url));
      }
    } else {
      if (pathname === '/admin/login' || pathname === '/admin/register') {
        return NextResponse.redirect(new URL('/admin', req.url));
      }
    }

    return NextResponse.next();
  }

  if (
    !accessToken &&
    pathname.startsWith('/admin') &&
    !['/admin/login', '/admin/register', '/admin/forgot-password'].includes(pathname)
  ) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  // Allow access to login, register, and forgot-password routes if no token
  return NextResponse.next();
}
