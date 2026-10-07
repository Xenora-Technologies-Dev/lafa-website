import { Breadcrumb, type Crumb } from '@/components/system/breadcrumb';
import { JsonLd } from '@/components/layout/json-ld';
import { siteOrigin } from '@/lib/site';

export type { Crumb };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const origin = siteOrigin();
  return (
    <>
      <Breadcrumb items={items} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            ...(item.path && origin ? { item: `${origin}${item.path}` } : {}),
          })),
        }}
      />
    </>
  );
}
