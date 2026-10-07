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

export const differentiators = [
  {
    title: 'Global sourcing',
    text: 'Food sought to the specification and quantity a buyer names.',
  },
  {
    title: 'Quality-focused supply',
    text: 'Product, pack, and origin are confirmed in the reply.',
  },
  {
    title: 'Reliable trade partnerships',
    text: 'Supply is arranged as a business relationship, enquiry by enquiry.',
  },
  {
    title: 'Market knowledge',
    text: 'A Dubai desk between origin markets and the buyers who need the goods.',
  },
  {
    title: 'Responsive service',
    text: 'Name the product and the volume. The desk takes it from there.',
  },
] as const;

export const introductionFacts = [
  { label: 'Base', value: 'Dubai, United Arab Emirates' },
  { label: 'Work', value: 'Sourcing, import, and export' },
  { label: 'Supply', value: 'Wholesale food' },
  { label: 'Buyers', value: 'Businesses, by enquiry' },
  { label: 'Pricing', value: 'Quoted on enquiry' },
] as const;
