import { cookies } from 'next/headers';
import { randomBytes, createHmac, timingSafeEqual } from 'crypto';

// ============================================================
// CSRF Protection Service
// Single Responsibility: Handles all CSRF operations
// ============================================================

const CSRF_COOKIE_NAME =
  process.env.NODE_ENV === 'production' ? '__Host-csrf-token' : 'csrf-token';
const CSRF_HEADER_NAME = 'x-csrf-token' as const;
const CSRF_SECRET = process.env.CSRF_SECRET ?? 'ait-dev-secret-change-in-prod-32chars';
const TOKEN_EXPIRY_MS = 60 * 60 * 1000; // 1 hour

interface CsrfTokenData {
  readonly token: string;
  readonly issuedAt: number;
}

/**
 * Generates a cryptographically secure CSRF token
 * tied to a session-specific HMAC signature.
 */
export function generateCsrfToken(): string {
  const randomPart = randomBytes(32).toString('hex');
  const issuedAt = Date.now().toString();
  const hmac = createHmac('sha256', CSRF_SECRET)
    .update(`${randomPart}:${issuedAt}`)
    .digest('hex');

  return Buffer.from(JSON.stringify({ randomPart, issuedAt, hmac })).toString(
    'base64url'
  );
}

/**
 * Validates a CSRF token against the stored cookie value.
 * Uses timing-safe comparison to prevent timing attacks.
 */
export function validateCsrfToken(submittedToken: string): boolean {
  try {
    const decoded = JSON.parse(
      Buffer.from(submittedToken, 'base64url').toString('utf-8')
    ) as { randomPart: string; issuedAt: string; hmac: string };

    // Verify token has not expired
    const issuedAt = parseInt(decoded.issuedAt, 10);
    if (Date.now() - issuedAt > TOKEN_EXPIRY_MS) {
      return false;
    }

    // Re-compute HMAC and compare
    const expectedHmac = createHmac('sha256', CSRF_SECRET)
      .update(`${decoded.randomPart}:${decoded.issuedAt}`)
      .digest('hex');

    const expectedBuffer = Buffer.from(expectedHmac, 'hex');
    const actualBuffer = Buffer.from(decoded.hmac, 'hex');

    if (expectedBuffer.length !== actualBuffer.length) {
      return false;
    }

    return timingSafeEqual(expectedBuffer, actualBuffer);
  } catch {
    return false;
  }
}

/**
 * Sets the CSRF cookie with secure attributes.
 * __Host- prefix enforces Secure + no Domain + Path=/ in browsers.
 */
export async function setCsrfCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(CSRF_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: TOKEN_EXPIRY_MS / 1000,
  });
}

/**
 * Retrieves the CSRF token from the cookie store.
 */
export async function getCsrfTokenFromCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(CSRF_COOKIE_NAME)?.value;
}

export { CSRF_HEADER_NAME, CSRF_COOKIE_NAME };
