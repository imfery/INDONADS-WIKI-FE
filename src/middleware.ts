import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('accessToken');


  if (token && (pathname === '/admin/login' || pathname === '/admin/register')) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  if (
    !token &&
    pathname.startsWith('/admin') &&
    pathname !== '/admin/login' &&
    pathname !== '/admin/register' &&
    pathname !== '/admin/forgot-password') {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  return NextResponse.next();
}