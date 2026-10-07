import { cookies } from 'next/headers';
import { adminConfigured, cookieOptions, passwordMatches, SESSION_COOKIE, signSession } from '@/lib/auth';
import { assertSameOrigin, jsonError, jsonOk, readJson } from '@/lib/http';
import { clearLoginFailures, clientKey, loginLockStatus, registerLoginFailure } from '@/lib/rate-limit';

export const runtime = 'nodejs';

const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_LOCKOUT_MS = 15 * 60 * 1000;
const LOGIN_MAX_FAILURES = 5;

export async function POST(request: Request) {
  const originError = assertSameOrigin(request);
  if (originError) return originError;
  if (!adminConfigured()) return jsonError('Admin sign-in is not configured.', 503);

  const key = clientKey(request, 'admin-login');
  const locked = loginLockStatus(key);
  if (!locked.ok) {
    return jsonError(locked.message, 429);
  }

  const body = await readJson(request);
  const password = body && typeof body === 'object' && 'password' in body && typeof body.password === 'string' ? body.password : '';
  if (!(await passwordMatches(password))) {
    const failure = registerLoginFailure(key, {
      maxFailures: LOGIN_MAX_FAILURES,
      windowMs: LOGIN_WINDOW_MS,
      lockoutMs: LOGIN_LOCKOUT_MS,
    });
    await new Promise((resolve) => setTimeout(resolve, 400));
    if (!failure.ok) return jsonError(failure.message, 429);
    return jsonError('The password is not correct.', 401);
  }

  clearLoginFailures(key);
  const token = await signSession();
  (await cookies()).set(SESSION_COOKIE, token, cookieOptions());
  return jsonOk();
}