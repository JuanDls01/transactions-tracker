// This is an optional middleware to keep session alive, this will update the session expiry every time its called
import { auth } from '@/app/auth';
import { NextRequest, NextResponse } from 'next/server';

const authRoutes = ['/auth/login', '/auth/signup'];
const protectedRotues = ['/users', '/dashboard', '/transactions', '/transactions/new'];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isAuthenticationRoute = authRoutes.some((route) => path.includes(route));
  const isProtectedRoute = protectedRotues.some((route) => path.includes(route));

  // Authentication block
  const session = await auth();
  const isAuthenticated = !!session && !!session.user;

  // If user is already authenticated, redirect to the dashboard.
  if (isAuthenticationRoute) {
    if (isAuthenticated) return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  // Redirect to Home if the user is not authenticated
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  return NextResponse.next();
}

// Eclude content urls
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico).*)'],
};
