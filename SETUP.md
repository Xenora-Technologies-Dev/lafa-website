# LAFA website setup

English-only B2B site for LAFA General Trading (Dubai). Do not invent phone numbers, emails, street addresses, secrets, certifications, or years in business.

## Prerequisites

- Node.js 20.19 or newer
- A Neon PostgreSQL project (free tier is fine)
- An ImageKit account if admin uploads are needed
- A Netlify site for production

## 1. Install and run locally

```bash
npm install
cp .env.example .env
npm run dev
```

Open http://localhost:3000/

Without `DATABASE_URL`, the public catalogue shows licensed category shells and **no products**. That is intentional.

## 2. Environment variables

Set these in `.env` locally and in **Netlify → Site configuration → Environment variables** for both builds and functions. Never commit real values.

| Name | Required for | Notes |
| --- | --- | --- |
| `DATABASE_URL` | Public catalogue products, insights, enquiries, admin desk | Neon **pooled** connection string |
| `IMAGEKIT_PUBLIC_KEY` | Admin image upload | |
| `IMAGEKIT_PRIVATE_KEY` | Admin image upload | Server only |
| `IMAGEKIT_URL_ENDPOINT` | Admin image upload | e.g. `https://ik.imagekit.io/your_id` |
| `ADMIN_PASSWORD` | `/admin/login` | At least 12 characters |
| `ADMIN_AUTH_SECRET` | Admin session cookie | At least 16 random characters |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, JSON-LD | Public origin, no trailing slash |
| `WHATSAPP_NUMBER` | Optional WhatsApp links | Digits only, no `+` |

`SITE_URL` is still read if `NEXT_PUBLIC_SITE_URL` is empty. Netlify’s own `URL` is used during Netlify builds when neither is set. `ADMIN_SESSION_SECRET` is still accepted by the auth code if `ADMIN_AUTH_SECRET` is empty; prefer `ADMIN_AUTH_SECRET`.

This project does **not** use Sanity. Do not add `SANITY_*` keys.

## 3. Neon database

1. Create a Neon project and copy the pooled connection string into `DATABASE_URL`.
2. From the repo root:

```bash
npm run db:setup
```

That applies `db/schema.sql` and inserts licensed categories from `data/categories.json` (ISIC 4630.01–.10 food wholesale plus 4690 general wholesale as secondary). Existing category rows are left unchanged on later runs.

3. Sign in at `/admin/login` and publish products. The public site reads published rows from Neon (cached ~60s).

## 4. Netlify deploy

- Build command: `npm run build` (see `netlify.toml`)
- Publish directory: `.next`
- Node: 20

Set every variable from `.env.example` in the Netlify UI for **Builds** and **Functions**.

After the first deploy that includes `public/__forms.html`, Netlify Forms should detect a form named `enquiry`. Turn on email notification only after LAFA names the inbox.

### Forms

- Static detection file: `public/__forms.html`
- Runtime posts from the contact page go to `/api/enquiries` (Neon) and, on the live host, to `/__forms.html` (Netlify Forms)
- Success is shown only when Neon stores the row or Netlify accepts the form post

## 5. Checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Licence alignment

Public food categories match the trade licence food codes (4630.01–.10). Grains/cereals and pulses/legumes are **not** seeded as catalogue categories. General wholesale (4690) stays secondary and is not mapped into a food “other” bucket.