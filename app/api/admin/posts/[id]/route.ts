import { refreshPublicContent } from '@/lib/catalogue';
import { databaseConfigured } from '@/lib/db';
import { assertAdmin, assertSameOrigin, jsonError, jsonOk, logError } from '@/lib/http';
import { removeStoredImage } from '@/lib/imagekit';
import { deletePost, getAdminPost, postSlugTaken, updatePost } from '@/lib/queries';
import { parsePost } from '@/lib/validators';

export const runtime = 'nodejs';

async function guard(request: Request) {
  return assertSameOrigin(request) || (await assertAdmin());
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const blocked = await guard(request);
  if (blocked) return blocked;
  if (!databaseConfigured()) return jsonError('Connect the Neon database before saving content.', 503);

  const { id } = await context.params;
  const existing = await getAdminPost(id);
  if (!existing) return jsonError('That insight was not found.', 404);

  const parsed = parsePost(await request.json().catch(() => null));
  if ('error' in parsed) return jsonError(parsed.error, 400);
  if (await postSlugTaken(parsed.data.slug, id)) return jsonError('An insight already uses that slug.', 409);

  try {
    const saved = await updatePost(id, parsed.data);
    if (!saved) return jsonError('That insight was not found.', 404);
  } catch (error) {
    logError('post update', error);
    return jsonError('The insight could not be saved.', 500);
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
  const existing = await getAdminPost(id);
  if (!existing) return jsonError('That insight was not found.', 404);

  try {
    await deletePost(id);
  } catch (error) {
    logError('post delete', error);
    return jsonError('The insight could not be deleted.', 500);
  }
  await removeStoredImage(existing.imageFileId);
  refreshPublicContent();
  return jsonOk();
}
