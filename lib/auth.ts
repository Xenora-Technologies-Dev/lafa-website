export const SESSION_COOKIE = 'lafa_admin';
export const SESSION_MAX_AGE = 60 * 60 * 12;

function sessionSecret() {
  return process.env.ADMIN_AUTH_SECRET || process.env.ADMIN_SESSION_SECRET || '';
}

export function adminConfigured() {
  const password = process.env.ADMIN_PASSWORD || '';
  const secret = sessionSecret();
  return password.length >= 12 && secret.length >= 16;
}

function bytesToBase64Url(bytes: Uint8Array) {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function base64UrlToBytes(value: string) {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(value.length / 4) * 4, '=');
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return bytes;
}

async function importKey(secret: string) {
  return crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, [
    'sign',
  ]);
}

async function sign(secret: string, value: string) {
  const key = await importKey(secret);
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(value));
  return new Uint8Array(signature);
}

export async function signSession() {
  const secret = sessionSecret();
  if (!secret) throw new Error('ADMIN_AUTH_SECRET is not set');
  const payload = bytesToBase64Url(
    new TextEncoder().encode(JSON.stringify({ exp: Date.now() + SESSION_MAX_AGE * 1000, role: 'admin' })),
  );
  const signature = bytesToBase64Url(await sign(secret, payload));
  return `${payload}.${signature}`;
}

export async function verifySession(token: string | undefined) {
  const secret = sessionSecret();
  if (!secret || !token) return false;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;
  const expected = await sign(secret, payload);
  let actual: Uint8Array;
  try {
    actual = base64UrlToBytes(signature);
  } catch {
    return false;
  }
  if (actual.length !== expected.length) return false;
  let difference = 0;
  for (let index = 0; index < expected.length; index += 1) difference |= expected[index] ^ actual[index];
  if (difference !== 0) return false;
  try {
    const parsed = JSON.parse(new TextDecoder().decode(base64UrlToBytes(payload))) as { exp?: number; role?: string };
    return parsed.role === 'admin' && typeof parsed.exp === 'number' && parsed.exp > Date.now();
  } catch {
    return false;
  }
}

export async function passwordMatches(input: string) {
  const expected = process.env.ADMIN_PASSWORD || '';
  if (!expected || !input) return false;
  const digest = async (value: string) => new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value)));
  const actualHash = await digest(input);
  const expectedHash = await digest(expected);
  let difference = 0;
  for (let index = 0; index < actualHash.length; index += 1) difference |= actualHash[index] ^ expectedHash[index];
  return difference === 0;
}

export function cookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  };
}
