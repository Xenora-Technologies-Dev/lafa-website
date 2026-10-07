'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { slugDraft, slugify } from '@/lib/slug';
import type { Category, CategoryWeight } from '@/lib/types';

export function CategoryManager({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [slugTouched, setSlugTouched] = useState(false);
  const [description, setDescription] = useState('');
  const [sortOrder, setSortOrder] = useState('12');
  const [weight, setWeight] = useState<CategoryWeight>('primary');
  const [licenceCode, setLicenceCode] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  async function createCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError('');
    setNotice('');
    const response = await fetch('/api/admin/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, slug, description, sortOrder: Number(sortOrder), weight, licenceCode }),
    });
    const body = (await response.json().catch(() => null)) as { error?: string } | null;
    setPending(false);
    if (!response.ok) {
      setError(body?.error || 'The category could not be saved.');
      return;
    }
    setTitle('');
    setSlug('');
    setSlugTouched(false);
    setDescription('');
    setLicenceCode('');
    setNotice('Category added.');
    router.refresh();
  }

  return (
    <div className="space-y-12">
      <ul className="space-y-6">
        {categories.map((category) => (
          <li key={category.id}>
            <CategoryEditor category={category} />
          </li>
        ))}
      </ul>
      <form className="max-w-2xl space-y-4 border border-line bg-white p-5" onSubmit={createCategory}>
        <h2 className="font-serif text-2xl text-navy">Add a category</h2>
        <p className="text-sm leading-6 text-stone">The slug is fixed after it is created, because it is part of the public URL.</p>
        <div className="space-y-2">
          <Label htmlFor="new-title">Title</Label>
          <Input
            id="new-title"
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
          <Label htmlFor="new-slug">Slug</Label>
          <Input
            id="new-slug"
            value={slug}
            required
            onChange={(event) => {
              setSlugTouched(true);
              setSlug(slugDraft(event.target.value));
            }}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="new-description">Description</Label>
          <Textarea id="new-description" value={description} required rows={3} onChange={(event) => setDescription(event.target.value)} />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="new-order">Sort order</Label>
            <Input id="new-order" inputMode="numeric" value={sortOrder} required onChange={(event) => setSortOrder(event.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-weight">Weight</Label>
            <select
              id="new-weight"
              value={weight}
              onChange={(event) => setWeight(event.target.value === 'secondary' ? 'secondary' : 'primary')}
              className="flex h-11 w-full rounded-sm border border-line bg-white px-3 text-sm"
            >
              <option value="primary">Primary (food)</option>
              <option value="secondary">Secondary</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-code">Licence code</Label>
            <Input id="new-code" value={licenceCode} onChange={(event) => setLicenceCode(event.target.value)} />
          </div>
        </div>
        <p className="text-xs leading-5 text-stone">The licence code is internal. It is not shown on the public site.</p>
        {error ? <p className="text-sm text-[#8f2d2d]">{error}</p> : null}
        {notice ? <p className="text-sm text-navy">{notice}</p> : null}
        <Button type="submit" disabled={pending}>
          {pending ? 'Saving…' : 'Add category'}
        </Button>
      </form>
    </div>
  );
}

function CategoryEditor({ category }: { category: Category }) {
  const router = useRouter();
  const [title, setTitle] = useState(category.title);
  const [description, setDescription] = useState(category.description);
  const [sortOrder, setSortOrder] = useState(String(category.sortOrder));
  const [weight, setWeight] = useState<CategoryWeight>(category.weight);
  const [licenceCode, setLicenceCode] = useState(category.licenceCode ?? '');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const blocked = category.productCount > 0;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError('');
    setNotice('');
    const response = await fetch(`/api/admin/categories/${category.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, sortOrder: Number(sortOrder), weight, licenceCode, slug: category.slug }),
    });
    const body = (await response.json().catch(() => null)) as { error?: string } | null;
    setPending(false);
    if (!response.ok) {
      setError(body?.error || 'The category could not be saved.');
      return;
    }
    setNotice('Saved.');
    router.refresh();
  }

  async function onDelete() {
    const noun = category.productCount === 1 ? 'product' : 'products';
    if (blocked) {
      window.alert(`This category still has ${category.productCount} ${noun}. Move or delete those products before deleting the category.`);
      return;
    }
    if (!window.confirm(`Delete ${category.title}? This cannot be undone.`)) return;
    setPending(true);
    setError('');
    const response = await fetch(`/api/admin/categories/${category.id}`, { method: 'DELETE' });
    const body = (await response.json().catch(() => null)) as { error?: string } | null;
    if (!response.ok) {
      setError(body?.error || 'The category could not be deleted.');
      setPending(false);
      return;
    }
    router.refresh();
  }

  return (
    <form className="grid gap-4 border border-line bg-white p-5" onSubmit={onSubmit}>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="font-serif text-2xl text-navy">{category.title}</h2>
        <p className="text-xs tracking-[0.14em] text-stone uppercase">/{category.slug}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`${category.id}-title`}>Title</Label>
          <Input id={`${category.id}-title`} value={title} required onChange={(event) => setTitle(event.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${category.id}-order`}>Sort order</Label>
          <Input id={`${category.id}-order`} inputMode="numeric" value={sortOrder} required onChange={(event) => setSortOrder(event.target.value)} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${category.id}-description`}>Description</Label>
        <Textarea id={`${category.id}-description`} value={description} required rows={3} onChange={(event) => setDescription(event.target.value)} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`${category.id}-weight`}>Weight</Label>
          <select
            id={`${category.id}-weight`}
            value={weight}
            onChange={(event) => setWeight(event.target.value === 'secondary' ? 'secondary' : 'primary')}
            className="flex h-11 w-full rounded-sm border border-line bg-white px-3 text-sm"
          >
            <option value="primary">Primary (food)</option>
            <option value="secondary">Secondary</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${category.id}-code`}>Licence code</Label>
          <Input id={`${category.id}-code`} value={licenceCode} onChange={(event) => setLicenceCode(event.target.value)} />
        </div>
      </div>
      <p className="text-xs text-stone">
        {category.productCount} {category.productCount === 1 ? 'product' : 'products'} in this category. The slug stays as {category.slug}.
      </p>
      {error ? <p className="text-sm text-[#8f2d2d]">{error}</p> : null}
      {notice ? <p className="text-sm text-navy">{notice}</p> : null}
      <div className="flex flex-wrap gap-3">
        <Button type="submit" size="sm" disabled={pending}>
          {pending ? 'Saving…' : 'Save category'}
        </Button>
        <Button type="button" size="sm" variant="destructive" disabled={pending || blocked} onClick={onDelete}>
          Delete
        </Button>
      </div>
    </form>
  );
}
