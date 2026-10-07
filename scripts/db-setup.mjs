import { existsSync, readFileSync } from 'node:fs';
import { neon } from '@neondatabase/serverless';

function loadDotEnv(path) {
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const index = trimmed.indexOf('=');
    if (index === -1) continue;
    const key = trimmed.slice(0, index).trim();
    let value = trimmed.slice(index + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

function statements(sql) {
  return sql
    .split(';')
    .map((part) => part.trim())
    .filter((part) => /^(CREATE|INSERT|ALTER)\b/i.test(part.replace(/^(?:--[^\n]*\n|\s)+/, '')));
}

loadDotEnv('.env');
loadDotEnv('.env.local');

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error('DATABASE_URL is not set. Add the Neon connection string to .env and run this again.');
  process.exit(1);
}

const sql = neon(databaseUrl);
const schema = readFileSync(new URL('../db/schema.sql', import.meta.url), 'utf8');

for (const statement of statements(schema)) {
  await sql.query(statement);
}

const categories = JSON.parse(readFileSync(new URL('../data/categories.json', import.meta.url), 'utf8'));

for (const category of categories) {
  if (category.weight !== 'primary' && category.weight !== 'secondary') {
    throw new Error(`Category ${category.slug} has an invalid weight.`);
  }
  await sql.query(
    `INSERT INTO categories (id, title, slug, description, sort_order, weight, licence_code)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     ON CONFLICT (slug) DO NOTHING`,
    [
      category.id,
      category.title,
      category.slug,
      category.description,
      category.sortOrder,
      category.weight,
      category.licenceCode ?? null,
    ],
  );
}

console.log(`Database ready. ${categories.length} licensed categories are present (existing rows were left unchanged).`);
