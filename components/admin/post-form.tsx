'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ImageField } from '@/components/admin/image-field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { slugDraft, slugify } from '@/lib/slug';
import { toDatetimeLocal } from '@/lib/site';
import type { Post } from '@/lib/types';

export function PostForm({ post }: { post?: Post }) {
  const router = useRouter();
  const editing = Boolean(post);
  const [title, setTitle] = useState(post?.title ?? '');
  const [slug, setSlug] = useState(post?.slug ?? '');
  const [slugTouched, setSlugTouched] = useState(editing);
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? '');
  const [body, setBody] = useState(post?.body ?? '');
  const [publishedAt, setPublishedAt] = useState(toDatetimeLocal(post?.publishedAt) || toDatetimeLocal(new Date().toISOString()));
  const [published, setPublished] = useState(post?.published ?? false);
  const [imageUrl, setImageUrl] = useState(post?.imageUrl ?? '');
  const [imageFileId, setImageFileId] = useState(post?.imageFileId ?? '');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError('');
    const response = await fetch(editing ? `/api/admin/posts/${post?.id}` : '/api/admin/posts', {
      method: editing ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, slug, excerpt, body, publishedAt, published, imageUrl, imageFileId }),
    });
    const payload = (await response.json().catch(() => null)) as { error?: string } | null;
    if (!response.ok) {
      setError(payload?.error || 'The insight could not be saved.');
      setPending(false);
      return;
    }
    router.push('/admin/insights');
    router.refresh();
  }

  return (
    <form className="max-w-2xl space-y-5" onSubmit={onSubmit}>
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          required
          onChange={(event) => {
            const value = event.target.value;
            setTitle(value);
            if (!slugTouched) setSlug(slugify(value));
          }}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          value={slug}
          required
          onChange={(event) => {
            setSlugTouched(true);
            setSlug(slugDraft(event.target.value));
          }}
        />
        <p className="text-xs leading-5 text-stone">Public URL: /insights/{slug || 'slug'}</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea id="excerpt" value={excerpt} required maxLength={280} rows={3} onChange={(event) => setExcerpt(event.target.value)} />
        <p className="text-xs text-stone">{excerpt.length}/280</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="body">Body</Label>
        <Textarea id="body" value={body} required rows={14} onChange={(event) => setBody(event.target.value)} />
        <p className="text-xs leading-5 text-stone">Markdown: paragraphs, ## headings, - lists, and [links](https://example.com).</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="date">Date, Dubai time</Label>
        <Input id="date" type="datetime-local" value={publishedAt} onChange={(event) => setPublishedAt(event.target.value)} />
      </div>
      <ImageField
        folder="insights"
        imageUrl={imageUrl}
        onChange={(next) => {
          setImageUrl(next.imageUrl);
          setImageFileId(next.imageFileId);
        }}
      />
      <label className="flex items-center gap-2 text-sm font-semibold text-navy">
        <input type="checkbox" checked={published} onChange={(event) => setPublished(event.target.checked)} />
        Published
      </label>
      {error ? (
        <p className="text-sm text-[#8f2d2d]" role="alert">
          {error}
        </p>
      ) : null}
      <Button type="submit" disabled={pending}>
        {pending ? 'Saving…' : 'Save insight'}
      </Button>
    </form>
  );
}
