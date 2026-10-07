import { refreshPublicContent } from '@/lib/catalogue';
import { databaseConfigured } from '@/lib/db';
import { assertAdmin, assertSameOrigin, jsonError, jsonOk, logError, postgresCode } from '@/lib/http';
import { categoryProductCount, deleteCategory, updateCategory } from '@/lib/queries';
import { parseCategory } from '@/lib/validators';

export const runtime = 'nodejs';

async function guard(request: Request) {
  return assertSameOrigin(request) || (await assertAdmin());
}

function blockedDelete(count: number) {
  const noun = count === 1 ? 'product' : 'products';
  return `This category still has ${count} ${noun}. Move or delete those products before deleting the category.`;
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const blocked = await guard(request);
  if (blocked) return blocked;
  if (!databaseConfigured()) return jsonError('Connect the Neon database before saving content.', 503);

  const { id } = await context.params;
  const parsed = parseCategory(await request.json().catch(() => null), false);
  if ('error' in parsed) return jsonError(parsed.error, 400);

  try {
    const saved = await updateCategory(id, parsed.data);
    if (!saved) return jsonError('That category was not found.', 404);
  } catch (error) {
    logError('category update', error);
    return jsonError('The category could not be saved.', 500);
  }
  refreshPublicContent();
  return jsonOk();
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const blocked = await guard(request);
  if (blocked) return blocked;
  if (!databaseConfigured()) return jsonError('Connect the Neon database before saving content.', 503);

  const { id } = await context.params;
  const count = await categoryProductCount(id);
  if (count > 0) return jsonError(blockedDelete(count), 409);

  try {
    const removed = await deleteCategory(id);
    if (!removed) return jsonError('That category was not found.', 404);
  } catch (error) {
    if (postgresCode(error) === '23503') return jsonError(blockedDelete(count), 409);
    logError('category delete', error);
    return jsonError('The category could not be deleted.', 500);
  }
  refreshPublicContent();
  return jsonOk();
}
