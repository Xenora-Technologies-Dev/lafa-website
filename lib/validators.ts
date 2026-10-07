import { fromDatetimeLocal } from '@/lib/site';
import { isSlug, slugify } from '@/lib/slug';
import type { CategoryInput, EnquiryInput, PostInput, ProductInput } from '@/lib/types';

export type ParseResult<T> = { data: T } | { error: string };

function record(input: unknown) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null;
  return input as Record<string, unknown>;
}

function text(value: unknown, max: number) {
  if (typeof value !== 'string') return '';
  return value.replace(/\s+/g, ' ').trim().slice(0, max);
}

function block(value: unknown, max: number) {
  if (typeof value !== 'string') return '';
  return value.replace(/\r\n/g, '\n').trim().slice(0, max);
}

function optional(value: string) {
  return value ? value : null;
}

function flag(value: unknown) {
  return value === true || value === 'true' || value === 'on';
}

export function parseEnquiry(input: unknown): ParseResult<EnquiryInput> {
  const body = record(input);
  if (!body) return { error: 'The enquiry could not be read.' };
  if (text(body['bot-field'], 200)) return { data: honeypot() };

  const name = text(body.name, 120);
  const company = text(body.company, 160);
  const email = text(body.email, 200).toLowerCase();
  const message = block(body.message, 4000);
  if (!name || !company || !email || !message) return { error: 'Name, company, email, and message are required.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: 'Enter a valid email address.' };

  return {
    data: {
      name,
      company,
      email,
      phone: optional(text(body.phone, 40)),
      market: optional(text(body.market, 80)),
      interest: optional(text(body.interest, 200)),
      message,
    },
  };
}

function honeypot(): EnquiryInput {
  return {
    name: '',
    company: '',
    email: '',
    phone: null,
    market: null,
    interest: null,
    message: '',
  };
}

export function isHoneypot(input: EnquiryInput) {
  return !input.name && !input.email && !input.message;
}

export function parseProduct(input: unknown): ParseResult<ProductInput> {
  const body = record(input);
  if (!body) return { error: 'The product could not be read.' };
  const name = text(body.name, 160);
  const slug = (text(body.slug, 80) || slugify(name)).replace(/^-+|-+$/g, '');
  const description = block(body.description, 5000);
  const categoryId = text(body.categoryId, 80);
  if (!name || !description || !categoryId) return { error: 'Name, description, and category are required.' };
  if (!isSlug(slug)) return { error: 'Use a slug of lowercase letters, numbers, and hyphens.' };
  return {
    data: {
      name,
      slug,
      description,
      imageUrl: optional(text(body.imageUrl, 500)),
      imageFileId: optional(text(body.imageFileId, 120)),
      packSize: optional(text(body.packSize, 80)),
      origin: optional(text(body.origin, 80)),
      categoryId,
      published: flag(body.published),
    },
  };
}

export function parsePost(input: unknown): ParseResult<PostInput> {
  const body = record(input);
  if (!body) return { error: 'The insight could not be read.' };
  const title = text(body.title, 180);
  const slug = (text(body.slug, 80) || slugify(title)).replace(/^-+|-+$/g, '');
  const excerpt = block(body.excerpt, 280);
  const content = block(body.body, 20000);
  const published = flag(body.published);
  if (!title || !excerpt || !content) return { error: 'Title, excerpt, and body are required.' };
  if (excerpt.length > 280) return { error: 'Keep the excerpt to 280 characters.' };
  if (!isSlug(slug)) return { error: 'Use a slug of lowercase letters, numbers, and hyphens.' };
  const publishedAt = fromDatetimeLocal(typeof body.publishedAt === 'string' ? body.publishedAt : '');
  if (typeof body.publishedAt === 'string' && body.publishedAt.trim() && !publishedAt) {
    return { error: 'The date could not be read.' };
  }
  return {
    data: {
      title,
      slug,
      excerpt,
      body: content,
      imageUrl: optional(text(body.imageUrl, 500)),
      imageFileId: optional(text(body.imageFileId, 120)),
      publishedAt: publishedAt || (published ? new Date().toISOString() : null),
      published,
    },
  };
}

export function parseCategory(input: unknown, withSlug: boolean): ParseResult<CategoryInput> {
  const body = record(input);
  if (!body) return { error: 'The category could not be read.' };
  const title = text(body.title, 120);
  const slug = (text(body.slug, 80) || slugify(title)).replace(/^-+|-+$/g, '');
  const description = block(body.description, 600);
  const sortOrder = Number(body.sortOrder);
  const weight = body.weight === 'secondary' ? 'secondary' : body.weight === 'primary' ? 'primary' : '';
  if (!title || !description) return { error: 'Title and description are required.' };
  if (!Number.isInteger(sortOrder) || sortOrder < 0 || sortOrder > 999) {
    return { error: 'Sort order must be a whole number from 0 to 999.' };
  }
  if (!weight) return { error: 'Choose a primary or secondary weight.' };
  if (withSlug && !isSlug(slug)) return { error: 'Use a slug of lowercase letters, numbers, and hyphens.' };
  return {
    data: {
      title,
      slug,
      description,
      sortOrder,
      weight,
      licenceCode: optional(text(body.licenceCode, 20)),
    },
  };
}
