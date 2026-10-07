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

export const supplyNotes = [
  {
    title: 'Product and pack',
    text: 'Name the line, and the pack if you know it. If the exact item is not listed, name the category and the specification you need.',
  },
  {
    title: 'Volume',
    text: 'State the quantity for the shipment. The desk quotes against that volume, not against a published price.',
  },
  {
    title: 'Destination market',
    text: 'Say where the goods are going. Availability is checked for that trade. Nothing on this site is a standing offer.',
  },
  {
    title: 'Who is buying',
    text: 'Wholesalers, retail buyers, and hotel, restaurant, and catering procurement. This desk does not take consumer orders.',
  },
] as const;

export const enquirySteps = [
  {
    title: 'Name the product',
    text: 'Choose a category or open a listed product from the catalogue.',
  },
  {
    title: 'State the quantity',
    text: 'Tell us the pack, the market, and the volume you need.',
  },
  {
    title: 'We reply with availability',
    text: 'Price is quoted in the reply, not on this site. Nothing here is an order.',
  },
] as const;
