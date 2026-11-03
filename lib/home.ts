/**
 * Local photographs in /public/images/home used across the public site.
 * ImageKit URLs can replace a src string later without changing components.
 */
export const homeMedia = {
  hero: {
    src: '/images/home/lafa-hero.jpg',
    alt: 'Rice, oil, spices, and citrus arranged for wholesale food trade.',
  },
  trade: {
    src: '/images/home/lafa-trade.jpg',
    alt: 'A cargo ship berthed beside stacked containers.',
  },
} as const;

export const introductionFacts = [
  { label: 'Base', value: 'Dubai, United Arab Emirates' },
  { label: 'Work', value: 'Sourcing, wholesale, import, and export' },
  { label: 'Range', value: 'Food wholesale and general trade' },
  { label: 'Buyers', value: 'Businesses, by enquiry' },
  { label: 'Pricing', value: 'Quoted on enquiry' },
] as const;
