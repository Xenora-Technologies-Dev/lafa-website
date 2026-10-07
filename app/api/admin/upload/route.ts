import { assertAdmin, assertSameOrigin, jsonError, jsonOk, logError } from '@/lib/http';
import { getImageKit } from '@/lib/imagekit';
import { slugify } from '@/lib/slug';

export const runtime = 'nodejs';

const MAX_BYTES = 5 * 1024 * 1024;

function matchesImage(bytes: Buffer, extension: string) {
  if (extension === 'jpg') return bytes.length > 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (extension === 'png') return bytes.length > 8 && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;
  if (extension === 'webp') {
    return bytes.length > 12 && bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP';
  }
  return false;
}
const extensions = new Map<string, string>([
  ['image/jpeg', 'jpg'],
  ['image/png', 'png'],
  ['image/webp', 'webp'],
  ['jpg', 'jpg'],
  ['jpeg', 'jpg'],
  ['png', 'png'],
  ['webp', 'webp'],
]);

export async function POST(request: Request) {
  const originError = assertSameOrigin(request);
  if (originError) return originError;
  const authError = await assertAdmin();
  if (authError) return authError;

  const imagekit = getImageKit();
  if (!imagekit) return jsonError('ImageKit is not configured.', 503);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return jsonError('The upload could not be read.', 400);
  }

  const file = form.get('file');
  if (!(file instanceof File)) return jsonError('Choose an image file.', 400);
  if (file.size <= 0 || file.size > MAX_BYTES) return jsonError('Use an image up to 5 MB.', 400);

  const fromType = extensions.get(file.type);
  const fromName = file.name.split('.').pop()?.toLowerCase() || '';
  const extension = fromType || extensions.get(fromName);
  if (!extension) return jsonError('Use a JPEG, PNG, or WebP image.', 400);

  const bytes = Buffer.from(await file.arrayBuffer());
  if (!matchesImage(bytes, extension)) return jsonError('Use a JPEG, PNG, or WebP image.', 400);

  const folder = form.get('folder') === 'insights' ? 'insights' : 'products';
  const base = slugify(file.name.replace(/\.[^.]+$/, '')) || 'image';

  try {
    const uploaded = await imagekit.upload({
      file: bytes.toString('base64'),
      fileName: `${base}.${extension}`,
      folder: `/lafa/${folder}`,
      useUniqueFileName: true,
    });
    return jsonOk({ url: uploaded.url, fileId: uploaded.fileId });
  } catch (error) {
    logError('upload', error);
    return jsonError('The image could not be uploaded.', 500);
  }
}
