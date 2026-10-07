import { refreshPublicContent } from '@/lib/catalogue';
import { databaseConfigured } from '@/lib/db';
import { assertAdmin, assertSameOrigin, jsonError, jsonOk, logError } from '@/lib/http';
import { removeStoredImage } from '@/lib/imagekit';
import { categoryExists, deleteProduct, getAdminProduct, productSlugTaken, updateProduct } from '@/lib/queries';
import { parseProduct } from '@/lib/validators';

export const runtime = 'nodejs';

async function guard(request: Request) {
  return assertSameOrigin(request) || (await assertAdmin());
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const blocked = await guard(request);
  if (blocked) return blocked;
  if (!databaseConfigured()) return jsonError('Connect the Neon database before saving content.', 503);

  const { id } = await context.params;
  const existing = await getAdminProduct(id);
  if (!existing) return jsonError('That product was not found.', 404);

  const parsed = parseProduct(await request.json().catch(() => null));
  if ('error' in parsed) return jsonError(parsed.error, 400);
  if (!(await categoryExists(parsed.data.categoryId))) return jsonError('Choose a category that exists.', 400);
  if (await productSlugTaken(parsed.data.categoryId, parsed.data.slug, id)) {
    return jsonError('A product in this category already uses that slug.', 409);
  }

  try {
    const saved = await updateProduct(id, parsed.data);
    if (!saved) return jsonError('That product was not found.', 404);
  } catch (error) {
    logError('product update', error);
    return jsonError('The product could not be saved.', 500);
  }

  if (existing.imageFileId && existing.imageFileId !== parsed.data.imageFileId) {
    await removeStoredImage(existing.imageFileId);
  }
  refreshPublicContent();
  return jsonOk();
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const blocked = await guard(request);
  if (blocked) return blocked;
  if (!databaseConfigured()) return jsonError('Connect the Neon database before saving content.', 503);

  const { id } = await context.params;
  const existing = await getAdminProduct(id);
  if (!existing) return jsonError('That product was not found.', 404);

  try {
    await deleteProduct(id);
  } catch (error) {
    logError('product delete', error);
    return jsonError('The product could not be deleted.', 500);
  }
  await removeStoredImage(existing.imageFileId);
  refreshPublicContent();
  return jsonOk();
}
