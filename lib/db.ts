import { neon } from '@neondatabase/serverless';

export function databaseConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

export function imageKitConfigured() {
  return Boolean(process.env.IMAGEKIT_PUBLIC_KEY && process.env.IMAGEKIT_PRIVATE_KEY && process.env.IMAGEKIT_URL_ENDPOINT);
}

export function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  return neon(url);
}
