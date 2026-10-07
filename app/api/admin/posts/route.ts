import { refreshPublicContent } from '@/lib/catalogue';
import { databaseConfigured } from '@/lib/db';
import { assertAdmin, assertSameOrigin, jsonError, jsonOk, logError } from '@/lib/http';
import { insertPost, postSlugTaken } from '@/lib/queries';
import { parsePost } from '@/lib/validators';

export const runtime = 'nodejs';

async function guard(request: Request) {
  return assertSameOrigin(request) || (await assertAdmin());
}

export async function POST(request: Request) {
  const blocked = await guard(request);
  if (blocked) return blocked;
  if (!databaseConfigured()) return jsonError('Connect the Neon database before saving content.', 503);

  const parsed = parsePost(await request.json().catch(() => null));
  if ('error' in parsed) return jsonError(parsed.error, 400);
  if (await postSlugTaken(parsed.data.slug)) return jsonError('An insight already uses that slug.', 409);

  const id = crypto.randomUUID();
  try {
    await insertPost(id, parsed.data);
  } catch (error) {
    logError('post create', error);
    return jsonError('The insight could not be saved.', 500);
  }
  refreshPublicContent();
  return jsonOk({ id });
}
