'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ImageField } from '@/components/admin/image-field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { slugDraft, slugify } from '@/lib/slug';
import type { Category, Product } from '@/lib/types';

export function ProductForm({ categories, product }: { categories: Category[]; product?: Product }) {
  const router = useRouter();
  const editing = Boolean(product);
  const [name, setName] = useState(product?.name ?? '');
  const [slug, setSlug] = useState(product?.slug ?? '');
  const [slugTouched, setSlugTouched] = useState(editing);
  const [description, setDescription] = useState(product?.description ?? '');
  const [packSize, setPackSize] = useState(product?.packSize ?? '');
  const [origin, setOrigin] = useState(product?.origin ?? '');
  const [categoryId, setCategoryId] = useState(product?.categoryId ?? categories[0]?.id ?? '');
  const [published, setPublished] = useState(product?.published ?? false);
  const [imageUrl, setImageUrl] = useState(product?.imageUrl ?? '');
  const [imageFileId, setImageFileId] = useState(product?.imageFileId ?? '');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError('');
    const payload = {
      name,
      slug,
      description,
      packSize,
      origin,
      categoryId,
      published,
      imageUrl,
      imageFileId,
    };
    const response = await fetch(editing ? `/api/admin/products/${product?.id}` : '/api/admin/products', {
      method: editing ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const body = (await response.json().catch(() => null)) as { error?: string } | null;
    if (!response.ok) {
      setError(body?.error || 'The product could not be saved.');
      setPending(false);
      return;
    }
    router.push('/admin/products');
    router.refresh();
  }

  return (
    <form className="max-w-2xl space-y-5" onSubmit={onSubmit}>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          required
          onChange={(event) => {
            const value = event.target.value;
            setName(value);
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
        <p className="text-xs leading-5 text-stone">Public URL: /products/{slug || 'slug'}. Changing it changes the link.</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <select
          id="category"
          value={categoryId}
          required
          onChange={(event) => setCategoryId(event.target.value)}
          className="flex h-11 w-full rounded-sm border border-line bg-white px-3 text-sm text-charcoal"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" value={description} required rows={6} onChange={(event) => setDescription(event.target.value)} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="pack">Pack size</Label>
          <Input id="pack" value={packSize} onChange={(event) => setPackSize(event.target.value)} placeholder="12 x 1 kg" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="origin">Origin</Label>
          <Input id="origin" value={origin} onChange={(event) => setOrigin(event.target.value)} placeholder="Country or region" />
        </div>
      </div>
      <ImageField
        folder="products"
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
      <p className="text-xs leading-5 text-stone">Drafts stay off the public site. A published product without a photograph shows a marked placeholder.</p>
      {error ? (
        <p className="text-sm text-[#8f2d2d]" role="alert">
          {error}
        </p>
      ) : null}
      <Button type="submit" disabled={pending || !categories.length}>
        {pending ? 'Saving…' : 'Save product'}
      </Button>
    </form>
  );
}
