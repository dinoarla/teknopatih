import { NextResponse, type NextRequest } from 'next/server';

// ============================================================
// Middleware — Edge Runtime compatible CSRF token generation
// Uses Web Crypto API (available in Edge), NOT Node.js crypto
// ============================================================

const IS_PROD = process.env.NODE_ENV === 'production';
// __Host- prefix requires Secure flag + no Domain — only valid in prod (HTTPS)
const CSRF_COOKIE = IS_PROD ? '__Host-csrf-token' : 'csrf-token';
const ONE_HOUR = 60 * 60;

function generateEdgeToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('');
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const existing = request.cookies.get(CSRF_COOKIE);

  if (!existing?.value) {
    const token = generateEdgeToken();
    response.cookies.set(CSRF_COOKIE, token, {
      httpOnly: true,
      secure: IS_PROD,
      sameSite: 'strict',
      path: '/',
      maxAge: ONE_HOUR,
    });
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
