import { databaseConfigured } from '@/lib/db';
import { assertSameOrigin, jsonError, jsonOk, logError } from '@/lib/http';
import { insertEnquiry } from '@/lib/queries';
import { clientKey, consumeRateLimit } from '@/lib/rate-limit';
import { isHoneypot, parseEnquiry } from '@/lib/validators';

export const runtime = 'nodejs';

const ENQUIRY_LIMIT = 5;
const ENQUIRY_WINDOW_MS = 10 * 60 * 1000;

export async function POST(request: Request) {
  const originError = assertSameOrigin(request);
  if (originError) return originError;
  const length = Number(request.headers.get('content-length') || 0);
  if (length > 32_000) return jsonError('The enquiry is too long.', 413);

  const limited = consumeRateLimit(clientKey(request, 'enquiry'), {
    limit: ENQUIRY_LIMIT,
    windowMs: ENQUIRY_WINDOW_MS,
    message: 'Too many enquiries from this network. Try again in a few minutes.',
  });
  if (!limited.ok) return jsonError(limited.message, 429);

  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return jsonError('The enquiry could not be read.', 400);
  }

  const parsed = parseEnquiry(input);
  if ('error' in parsed) return jsonError(parsed.error, 400);
  if (isHoneypot(parsed.data)) return jsonOk({ stored: true });

  if (!databaseConfigured()) return jsonOk({ stored: false, reason: 'database_not_configured' });

  try {
    await insertEnquiry(crypto.randomUUID(), parsed.data);
    return jsonOk({ stored: true });
  } catch (error) {
    logError('enquiry', error);
    return jsonError('The enquiry could not be stored.', 500);
  }
}