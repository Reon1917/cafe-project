import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import * as jwt from 'jsonwebtoken';

export async function middleware(request: NextRequest) {
  // Paths that require authentication
  const protectedPaths = ['/admin'];
  const path = request.nextUrl.pathname;

  if (protectedPaths.some(prefix => path.startsWith(prefix))) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET!);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
}; 