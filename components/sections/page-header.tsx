import { SectionHeading } from '@/components/system/section-heading';

export function PageHeader({ eyebrow, title, lede }: { eyebrow: string; title: string; lede?: string }) {
  return <SectionHeading as="h1" eyebrow={eyebrow} title={title} lede={lede} />;
}
