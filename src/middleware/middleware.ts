
import { parse } from 'cookie';
import { NextRequest,NextResponse } from 'next/server';

const SECRET = 'your-secret'; // Replace with your secret

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Paths to bypass authentication
  if (pathname === '/admin/login' || pathname === '/admin/register') {
    return NextResponse.next();
  }

  // Check if the path is under /admin/*
  if (pathname.startsWith('/admin')) {
    const cookies = parse(req.headers.get('cookie') || '');
    const token = cookies['accessToken']; // Adjust according to your cookie names

    if (!token) {
      // Redirect to login if no token is found
      const loginUrl = new URL('/admin/login', req.url);
      return NextResponse.redirect(loginUrl);
    }

    try {
      // Validate the token (you might want to do this in a more secure manner)
      // For example, you can verify the token using a JWT library or by making an API call
      const response = await fetch('http://localhost:5000/v1/auth/verify', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (response.ok) {
        return NextResponse.next();
      }
    } catch (error) {
      console.error('Token validation failed:', error);
    }

    // Redirect to login if token validation fails
    const loginUrl = new URL('/admin/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
