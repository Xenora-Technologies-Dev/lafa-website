import { exportAvailabilityLabel, specificationValue } from '@/lib/products';
import type { Product } from '@/lib/products/types';

export function ProductSpecs({ product }: { product: Product }) {
  const rows = [
    { label: 'Origin', value: specificationValue(product.origin) },
    { label: 'Packaging', value: specificationValue(product.packaging) },
    { label: 'Availability', value: specificationValue(product.availability) },
    { label: 'Export availability', value: exportAvailabilityLabel(product.exportAvailable) },
  ];

  return (
    <dl className="ds-meta mt-8 sm:grid-cols-2">
      {rows.map((row) => (
        <div key={row.label}>
          <dt className="ds-meta-label">{row.label}</dt>
          <dd className="ds-meta-value">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
