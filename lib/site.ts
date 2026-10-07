import { contactFacts } from '@/lib/site-facts';

export const COMPANY = 'LAFA General Trading';

export const primaryNav = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/export', label: 'Export' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const;

export const footerNav = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/export', label: 'Export' },
  { href: '/about', label: 'About' },
  { href: '/insights', label: 'Insights' },
  { href: '/contact', label: 'Contact' },
] as const;

export { contactFacts };

export function siteOrigin() {
  const value = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || process.env.URL || '';
  return value.replace(/\/$/, '');
}

export function metadataBaseUrl() {
  try {
    return new URL(siteOrigin() || 'http://localhost:3000');
  } catch {
    return new URL('http://localhost:3000');
  }
}

export function pageTitle(topic: string) {
  return `${topic} | ${COMPANY}`;
}

export function formatDate(iso?: string | null) {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Dubai',
  }).format(date);
}

export function toDatetimeLocal(iso?: string | null) {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Dubai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? '';
  return `${get('year')}-${get('month')}-${get('day')}T${get('hour')}:${get('minute')}`;
}

export function fromDatetimeLocal(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const withOffset = trimmed.length === 16 ? `${trimmed}:00+04:00` : trimmed;
  const date = new Date(withOffset);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
}

export function safeAdminPath(value: string | undefined) {
  if (!value || !value.startsWith('/admin') || value.startsWith('//') || value.includes('\\') || value.includes('://')) {
    return '/admin';
  }
  if (value.startsWith('/admin/login')) return '/admin';
  return value;
}
