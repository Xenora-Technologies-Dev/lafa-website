# LAFA General Trading

B2B website for LAFA General Trading, Dubai. English only. Food wholesale, sourcing, and import and export. No prices and no cart.

The public catalogue is enquiry-led. Phone, email, a street address, and social links stay off the pages until real values exist. Do not invent them, and do not invent years in business, premises, fleet, certifications, or client names.

For step-by-step Neon and Netlify setup, see [SETUP.md](./SETUP.md).

## Tech stack

- Next.js 15 App Router, React 19, TypeScript
- Tailwind CSS 4 and the design tokens in `app/globals.css`
- Shared UI in `components/system` (header, navigation, footer, type, cards, forms, states)
- Neon PostgreSQL through `@neondatabase/serverless` for the public catalogue, insights, enquiries, and the admin desk
- ImageKit for admin uploads
- Netlify, with route handlers deployed as serverless functions and Netlify Forms for enquiry backup

No Supabase, Firebase, Sanity, or VPS. The chosen services have free tiers. A production deploy spends Netlify build credits. Do not add a webhook that rebuilds the site on every content save.

## Folder structure

```text
app/                  routes, metadata, sitemap, robots
  (site)/             public pages
  admin/              unlisted catalogue desk
  api/                enquiry intake and admin mutations
components/
  system/             design-system components
  products/           catalogue listing, cards, specs
  home/               homepage sections
  layout/             site header, footer, breadcrumbs
  ui/                 button, input, textarea, label, badge
lib/
  products/           public catalogue types, category meta, Neon repository
  seo.ts              title, description, canonical, Open Graph, Twitter
data/categories.json  licensed categories for the Neon seed
db/schema.sql         Neon schema
scripts/db-setup.mjs  applies the schema and seeds categories
public/__forms.html   static Netlify Forms detection form
public/images/home/   category and home photographs
public/logo.png       supplied lockup, used unchanged
```

## Routes

| URL | Purpose |
| --- | --- |
| `/` | Home |
| `/about` | Company |
| `/export` | Export enquiries |
| `/products` | Full catalogue, search, and pagination |
| `/products/dairy` | One licensed category |
| `/products/red-lentils` | One product (when published in Neon) |
| `/insights`, `/insights/[slug]` | Published notes, when Neon has them |
| `/contact` | Wholesale enquiry |
| `/admin` | Catalogue desk. Not linked from the public site |
| `/blog` | Redirects to `/insights` |

Category and product addresses share `/products/[slug]`. A category slug renders the filtered list. A product slug renders the detail page. Older mock category addresses redirect to the licensed slug where a mapping exists.

## Local development

Node 20.19 or newer.

```bash
npm install
cp .env.example .env
npm run dev
```

Open http://localhost:3000/

```bash
npm run lint
npm run typecheck
npm run build
```

## Environment variables

Copy `.env.example` to `.env`. The site builds with every value empty. `.env` is gitignored. Set the same keys in Netlify for builds and functions.

| Name | Purpose |
| --- | --- |
| `DATABASE_URL` | Neon pooled connection string |
| `IMAGEKIT_PUBLIC_KEY` | ImageKit public key |
| `IMAGEKIT_PRIVATE_KEY` | ImageKit private key. Server only |
| `IMAGEKIT_URL_ENDPOINT` | `https://ik.imagekit.io/your_id` |
| `ADMIN_PASSWORD` | Admin password, at least 12 characters |
| `ADMIN_AUTH_SECRET` | Cookie signing secret, at least 16 characters |
| `NEXT_PUBLIC_SITE_URL` | Public origin, no trailing slash |
| `WHATSAPP_NUMBER` | International digits only, no plus sign |

`SITE_URL` is still read if `NEXT_PUBLIC_SITE_URL` is empty. Netlify's `URL` is used during its own build when the public origin is not set. Prefer `ADMIN_AUTH_SECRET` for the session secret.

Do not add Sanity project keys. This site does not use Sanity.

## Neon setup

1. Create a free Neon project and copy the **pooled** connection string into `DATABASE_URL`.
2. Run `npm run db:setup`. It creates `categories`, `products`, `posts`, and `enquiries`, then inserts the licensed categories from `data/categories.json`. Later runs do not overwrite existing category rows.
3. A category that still has products cannot be deleted. Category slugs in Neon stay fixed after creation.

The public food catalogue ships a curated static list in `data/products.json` with local images under `public/images/home`. Categories come from `data/categories.json` (licence food groups plus general wholesale). Insights seed posts live in `data/posts.json`.

If `DATABASE_URL` is set and Neon has published products, those replace the static product list. Otherwise the static catalogue keeps the public site complete without admin uploads or ImageKit.


## ImageKit setup

Set the three ImageKit variables. Uploads go to `POST /api/admin/upload` after an admin session. The browser never receives the private key. Files are stored under `/lafa/products` or `/lafa/insights`. JPEG, PNG, and WebP up to 5 MB are accepted, and the file signature is checked.

`next/image` is allowed to optimize `ik.imagekit.io`.

## How to add products

Sign in at `/admin/login` and use **Products**. Each product needs a unique slug within its category, a description, and a category from the licensed list. Leave pack size and origin empty until LAFA supplies them. Drafts stay off the public site.

The repository in `lib/products/repository.ts` is the only module the public pages call for catalogue data.

## How to replace catalogue images

Temporary photographs live in `public/images/home/`. Category cards use those paths until a product has its own ImageKit URL. The logo file `public/logo.png` is the supplied lockup. Do not crop, recolor, or redraw it. Use `BrandLogo`.

## Admin setup

Set `ADMIN_PASSWORD` and `ADMIN_AUTH_SECRET`, then open `/admin/login`. The session cookie is httpOnly, SameSite=Lax, and lasts 12 hours. `/admin` is `noindex` via response headers. Failed sign-in is delayed and rate-limited with lockout after repeated failures. Admin mutations and uploads require the cookie and a same-origin request.

## Netlify deployment

Free tier. Netlify detects Next.js and installs the OpenNext adapter. Do not pin `@netlify/plugin-nextjs`. Do not add an SPA fallback redirect.

- Build command: `npm run build`
- Publish directory: `.next`
- Node: 20, set in `netlify.toml`

Set every variable from `.env.example` for both builds and functions. Set `NEXT_PUBLIC_SITE_URL` to the public origin so canonical URLs, the sitemap, and JSON-LD name the live site.

`netlify.toml` sends security headers and `noindex` on `/admin`. `/blog` redirects to `/insights`.

Enquiries post to `POST /api/enquiries` (also rate-limited) and, on Netlify, to the form in `public/__forms.html` named `enquiry`. Success is shown only when Neon or Netlify accepts the submission. Notification email stays off until LAFA names the inbox.

## Catalogue behaviour

Draft products are omitted. Unknown product addresses return 404. Search with no matches and an empty category show an empty state. Without `DATABASE_URL`, no sample products are shown. Grains/cereals and pulses/legumes are not part of the licensed category seed. General wholesale stays secondary under licence 4690 and is not remapped to a food “other” category.