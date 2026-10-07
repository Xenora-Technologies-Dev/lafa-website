import { cookies } from 'next/headers';
import { cookieOptions, SESSION_COOKIE } from '@/lib/auth';
import { jsonOk } from '@/lib/http';

export const runtime = 'nodejs';

export async function POST() {
  (await cookies()).set(SESSION_COOKIE, '', { ...cookieOptions(), maxAge: 0 });
  return jsonOk();
}
