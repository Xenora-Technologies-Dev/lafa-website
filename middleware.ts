import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SESSION_COOKIE, verifySession } from '@/lib/auth';
import { safeAdminPath } from '@/lib/site';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminPage = pathname === '/admin' || pathname.startsWith('/admin/');
  const isAdminApi = pathname.startsWith('/api/admin');
  if (!isAdminPage && !isAdminApi) return NextResponse.next();

  if (pathname === '/api/admin/login' || pathname === '/api/admin/logout') return NextResponse.next();

  const ok = await verifySession(request.cookies.get(SESSION_COOKIE)?.value);

  if (isAdminApi) {
    if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return NextResponse.next();
  }

  const isLogin = pathname === '/admin/login';
  if (isLogin) {
    if (ok) return NextResponse.redirect(new URL('/admin', request.url));
    return NextResponse.next();
  }

  if (!ok) {
    const url = new URL('/admin/login', request.url);
    url.searchParams.set('next', safeAdminPath(pathname));
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*', '/api/admin/:path*'],
};
