import { NextResponse } from 'next/server';
import { readSession } from '@/lib/current-session';

export function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export function jsonOk(data: Record<string, unknown> = {}) {
  return NextResponse.json({ ok: true, ...data });
}

export async function assertAdmin() {
  if (!(await readSession())) return jsonError('Unauthorized', 401);
  return null;
}

export function assertSameOrigin(request: Request) {
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  if (!origin || !host) return jsonError('Forbidden', 403);
  try {
    if (new URL(origin).host !== host) return jsonError('Forbidden', 403);
  } catch {
    return jsonError('Forbidden', 403);
  }
  return null;
}

export async function readJson(request: Request) {
  try {
    return (await request.json()) as unknown;
  } catch {
    return null;
  }
}

export function postgresCode(error: unknown) {
  if (typeof error === 'object' && error && 'code' in error && typeof error.code === 'string') return error.code;
  return '';
}

export function logError(scope: string, error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`${scope}: ${message}`);
}
