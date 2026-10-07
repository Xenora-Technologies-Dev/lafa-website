import ImageKit from 'imagekit';
import { imageKitConfigured } from '@/lib/db';

export function getImageKit() {
  if (!imageKitConfigured()) return null;
  return new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY || '',
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || '',
  });
}

export async function removeStoredImage(fileId?: string | null) {
  if (!fileId) return;
  const imagekit = getImageKit();
  if (!imagekit) return;
  try {
    await imagekit.deleteFile(fileId);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`ImageKit file could not be deleted (${message}).`);
  }
}
