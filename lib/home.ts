/**
 * Campaign stills for the food division.
 * These are generated campaign images, not photographs of LAFA stock or premises.
 * Product records from Neon or ImageKit still take priority when a remote URL is set.
 */

export const foodMedia = {
  hero: '/images/food/food-hero-port-golden-hour.webp',
  heroMobile: '/images/food/food-hero-port-golden-hour-mobile.webp',
  heroAlt: 'Campaign image of a port at golden hour, with containers beside calm water.',
  warehouse: '/images/food/food-warehouse-distribution.webp',
  warehouseAlt: 'Campaign image of a food distribution warehouse interior.',
  portAerial: '/images/food/food-port-export-aerial.webp',
  portAerialAlt: 'Campaign image of an aerial view of a container port.',
  sourcing: '/images/food/food-sourcing-quality-check.webp',
  sourcingAlt: 'Campaign image of a quality check on sourced food goods.',
  container: '/images/food/food-import-container-loading.webp',
  containerAlt: 'Campaign image of a container being loaded for shipment.',
} as const;

/** Local photographs kept for older references. New layouts use `foodMedia`. */
export const homeMedia = {
  hero: {
    src: foodMedia.hero,
    alt: foodMedia.heroAlt,
  },
  trade: {
    src: foodMedia.portAerial,
    alt: foodMedia.portAerialAlt,
  },
} as const;

export const introductionFacts = [
  { label: 'Base', value: 'Dubai, United Arab Emirates' },
  { label: 'Food', value: 'Sourcing, supply, import, and export' },
  { label: 'Fashion', value: 'Lil by lafa' },
  { label: 'Pricing', value: 'Quoted on enquiry' },
] as const;
