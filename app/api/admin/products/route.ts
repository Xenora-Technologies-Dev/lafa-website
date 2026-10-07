import { refreshPublicContent } from '@/lib/catalogue';
import { databaseConfigured } from '@/lib/db';
import { assertAdmin, assertSameOrigin, jsonError, jsonOk, logError } from '@/lib/http';
import { categoryExists, insertProduct, productSlugTaken } from '@/lib/queries';
import { parseProduct } from '@/lib/validators';

export const runtime = 'nodejs';

async function guard(request: Request) {
  return assertSameOrigin(request) || (await assertAdmin());
}

export async function POST(request: Request) {
  const blocked = await guard(request);
  if (blocked) return blocked;
  if (!databaseConfigured()) return jsonError('Connect the Neon database before saving content.', 503);

  const parsed = parseProduct(await request.json().catch(() => null));
  if ('error' in parsed) return jsonError(parsed.error, 400);
  if (!(await categoryExists(parsed.data.categoryId))) return jsonError('Choose a category that exists.', 400);
  if (await productSlugTaken(parsed.data.categoryId, parsed.data.slug)) {
    return jsonError('A product in this category already uses that slug.', 409);
  }

  const id = crypto.randomUUID();
  try {
    await insertProduct(id, parsed.data);
  } catch (error) {
    logError('product create', error);
    return jsonError('The product could not be saved.', 500);
  }
  refreshPublicContent();
  return jsonOk({ id });
}
