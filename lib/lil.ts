/**
 * Lil by lafa is the non-food division: women's fashion.
 * Lines, copy, and campaign stills live here so the food catalogue and admin stay unchanged.
 * No prices. Copy does not describe the line as retail or wholesale.
 */

export type LilLine = {
  title: string;
  slug: string;
  image: string;
  alt: string;
  summary: string;
  notes: string;
};

export const lilBrand = {
  name: 'Lil by lafa',
  path: '/lil',
  logo: '/images/lil/lil-logo-transparent.webp',
  logoPng: '/images/lil/lil-logo-transparent.png',
  logoCream: '/images/lil/lil-logo-cream.png',
  ogImage: '/images/lil/lil-og-share-1200x630.jpg',
  texture: '/images/lil/lil-cream-plaster-texture.webp',
  fabric: '/images/lil/lil-cream-fabric-texture.webp',
  hero: '/images/lil/lil-hero-arch-walk.webp',
  heroMobile: '/images/lil/lil-hero-arch-walk-mobile.webp',
  heroAlt: 'Campaign image of a flowing champagne abaya and soft hijab beside a cream arched wall.',
  rail: '/images/lil/lil-wholesale-boutique-rail.webp',
  railAlt: 'Campaign image of abayas and dresses on a rail with kraft garment bags.',
} as const;

export const lilLines: readonly LilLine[] = [
  {
    title: 'Abayas',
    slug: 'abayas',
    image: '/images/lil/lil-abayas-brass-rail.webp',
    alt: 'Campaign image of black and sand abayas with gold-thread trim on a brass rail.',
    summary: 'Open and closed abayas in quiet colours, with fine gold-thread trim.',
    notes: 'Share the colour, length, and occasion. We confirm what can be arranged.',
  },
  {
    title: 'Modern Wear',
    slug: 'modern-wear',
    image: '/images/lil/lil-modern-wear-taupe-coord.webp',
    alt: 'Campaign image of a modest taupe and ivory co-ord set in a studio.',
    summary: 'Modest co-ords and tunics cut for the day, in taupe, ivory, and sand.',
    notes: 'Tell us the size and the set you have in mind. Fit is confirmed in the reply.',
  },
  {
    title: 'Maxi Dresses',
    slug: 'maxi-dresses',
    image: '/images/lil/lil-maxi-dresses-blush-floral.webp',
    alt: 'Campaign image of a long-sleeved blush and cream floral maxi dress.',
    summary: 'Long-sleeved maxi dresses in blush, cream, and soft floral prints.',
    notes: 'Name the print, sleeve, and length you prefer. Availability is confirmed on enquiry.',
  },
  {
    title: 'Accessories',
    slug: 'accessories',
    image: '/images/lil/lil-accessories-pearl-clutch.webp',
    alt: 'Campaign image of gold-tone pins, a pearl brooch, a clutch, and a silk scarf.',
    summary: 'Pins, brooches, scarves, and small bags finished in gold and pearl tones.',
    notes: 'Describe the piece. We reply with what is available to arrange.',
  },
  {
    title: 'Hijabs',
    slug: 'hijabs',
    image: '/images/lil/lil-hijabs-nude-flat-lay.webp',
    alt: 'Campaign image of folded chiffon and jersey hijabs in nude, blush, and gold.',
    summary: 'Chiffon and jersey hijabs in nudes, blush, and soft gold.',
    notes: 'Share the fabric and colour. We confirm the match in our reply.',
  },
  {
    title: 'Ethnic Wear',
    slug: 'ethnic-wear',
    image: '/images/lil/lil-ethnic-wear-gold-embroidery.webp',
    alt: 'Campaign image of gold embroidery on a kaftan or jalabiya.',
    summary: 'Embroidered kaftans and jalabiyas for celebrations and evening.',
    notes: 'Tell us the occasion and the embroidery you are looking for.',
  },
  {
    title: 'Night Wear',
    slug: 'night-wear',
    image: '/images/lil/lil-night-wear-champagne-satin.webp',
    alt: 'Campaign image of a champagne satin modest loungewear set in morning light.',
    summary: 'Modest satin lounge sets in champagne and cream.',
    notes: 'Share the size and shade. Details are confirmed when you enquire.',
  },
] as const;

export const lilLookbook = [
  {
    src: '/images/lil/lil-lookbook-eid-majlis.webp',
    alt: 'Campaign image with an Eid gathering mood in cream and gold.',
    title: 'Celebrations',
    text: 'A quieter palette for gatherings, with embroidery and drape kept in view.',
  },
  {
    src: '/images/lil/lil-lookbook-evening-satin.webp',
    alt: 'Campaign image of an evening satin abaya.',
    title: 'Evening',
    text: 'Satin and a longer line, for nights that ask for a softer shine.',
  },
  {
    src: '/images/lil/lil-lookbook-city-everyday.webp',
    alt: 'Campaign image of an everyday city look in modest tailoring.',
    title: 'City days',
    text: 'Tailored modest pieces for moving through the day.',
  },
] as const;

export const lilOccasions = [
  { title: 'Everyday', text: 'Modern wear and hijabs for daily dress.', href: '/lil/modern-wear' },
  { title: 'Eid and celebrations', text: 'Ethnic wear and abayas with a finer finish.', href: '/lil/ethnic-wear' },
  { title: 'Evening', text: 'Maxi dresses and satin lines.', href: '/lil/maxi-dresses' },
  { title: 'At home', text: 'Night wear in champagne and cream.', href: '/lil/night-wear' },
] as const;

export function lilPath(slug: string) {
  return `/lil/${slug}`;
}

export function getLilLine(slug: string) {
  return lilLines.find((line) => line.slug === slug) ?? null;
}
