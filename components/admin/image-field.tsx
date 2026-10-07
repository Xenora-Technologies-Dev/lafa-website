'use client';

import { useState } from 'react';

export function ImageField({
  folder,
  imageUrl,
  onChange,
}: {
  folder: 'products' | 'insights';
  imageUrl: string;
  onChange: (next: { imageUrl: string; imageFileId: string }) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  async function onFile(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    setError('');
    const body = new FormData();
    body.set('file', file);
    body.set('folder', folder);
    try {
      const response = await fetch('/api/admin/upload', { method: 'POST', body });
      const payload = (await response.json().catch(() => null)) as { url?: string; fileId?: string; error?: string } | null;
      if (!response.ok || !payload?.url || !payload.fileId) {
        setError(payload?.error || 'The image could not be uploaded.');
        return;
      }
      onChange({ imageUrl: payload.url, imageFileId: payload.fileId });
    } catch {
      setError('The image could not be uploaded.');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-3">
      {imageUrl ? (
        // Admin preview of an ImageKit URL. The public site uses next/image.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl} alt="" className="max-h-64 w-full bg-ivory object-contain" />
      ) : (
        <p className="border border-dashed border-line bg-ivory px-4 py-6 text-sm leading-6 text-stone">
          No photograph yet. The public page will show a placeholder marked “Photograph to follow”.
        </p>
      )}
      <div className="flex flex-wrap items-center gap-4">
        <label className="inline-flex h-9 cursor-pointer items-center border border-navy px-3 text-sm font-semibold text-navy">
          {uploading ? 'Uploading…' : 'Upload photograph'}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            disabled={uploading}
            onChange={(event) => {
              const file = event.target.files?.[0];
              event.currentTarget.value = '';
              void onFile(file);
            }}
          />
        </label>
        {imageUrl ? (
          <button type="button" className="text-sm text-stone underline" onClick={() => onChange({ imageUrl: '', imageFileId: '' })}>
            Remove photograph
          </button>
        ) : null}
      </div>
      {error ? <p className="text-sm text-[#8f2d2d]">{error}</p> : null}
    </div>
  );
}
