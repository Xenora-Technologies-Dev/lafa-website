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
    title: 'Hospitality',
    text: 'Hotels, restaurants, and catering teams buying for their operations.',
  },
] as const;

export const capabilities = [
  {
    title: 'Sourcing',
    text: 'Goods located to the specification and quantity a buyer requires.',
  },
  {
    title: 'Wholesale',
    text: 'Supply arranged for businesses that purchase for resale or for their own operations.',
  },
  {
    title: 'Import',
    text: 'Goods brought into the United Arab Emirates for onward supply.',
  },
  {
    title: 'Export',
    text: 'Goods supplied from Dubai to buyers in other markets.',
  },
] as const;

export const enquirySteps = [
  {
    title: 'Name the goods',
    text: 'Tell us the product or category, and the pack size if you know it. If it is not listed, describe the specification you need.',
  },
  {
    title: 'State quantity and market',
    text: 'Share the volume and where the goods are required. We check availability for that shipment.',
  },
  {
    title: 'Receive a quotation',
    text: 'We reply with availability and price. A quotation follows our review of the enquiry.',
  },
] as const;
