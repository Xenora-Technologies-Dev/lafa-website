export const buyers = [
  {
    title: 'Wholesalers',
    text: 'Distributors and trading companies buying for resale.',
  },
  {
    title: 'Retail',
    text: 'Supermarkets, groceries, and cash-and-carry buyers.',
  },
  {
    title: 'HORECA',
    text: 'Hotels, restaurants, and catering procurement.',
  },
] as const;

export const capabilities = [
  {
    title: 'Sourcing',
    text: 'Goods sought to a buyer’s specification and quantity.',
  },
  {
    title: 'Wholesale',
    text: 'Supply for resale. This is not a consumer shop.',
  },
  {
    title: 'Import & export',
    text: 'Food moved through Dubai for international trade.',
  },
  {
    title: 'Food first',
    text: 'General wholesale of non-food goods stays secondary.',
  },
] as const;

export const enquirySteps = [
  {
    title: 'Name the product',
    text: 'Choose a category, or open a listed product when one is published.',
  },
  {
    title: 'State the quantity',
    text: 'Tell us the pack, the market, and the volume you need.',
  },
  {
    title: 'We reply with availability',
    text: 'A response time is not promised here. Price is quoted in the reply, not on this site.',
  },
] as const;
