import { refreshPublicContent } from '@/lib/catalogue';
import { databaseConfigured } from '@/lib/db';
import { assertAdmin, assertSameOrigin, jsonError, jsonOk, logError } from '@/lib/http';
import { categorySlugTaken, insertCategory } from '@/lib/queries';
import { parseCategory } from '@/lib/validators';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const blocked = assertSameOrigin(request) || (await assertAdmin());
  if (blocked) return blocked;
  if (!databaseConfigured()) return jsonError('Connect the Neon database before saving content.', 503);

  const parsed = parseCategory(await request.json().catch(() => null), true);
  if ('error' in parsed) return jsonError(parsed.error, 400);
  if (await categorySlugTaken(parsed.data.slug)) return jsonError('A category already uses that slug.', 409);

  try {
    await insertCategory(crypto.randomUUID(), parsed.data);
  } catch (error) {
    logError('category create', error);
    return jsonError('The category could not be saved.', 500);
  }
  refreshPublicContent();
  return jsonOk();
}
