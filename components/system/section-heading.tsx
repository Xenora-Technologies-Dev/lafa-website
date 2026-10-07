import { Body } from '@/components/system/type';
import { cn } from '@/lib/utils';

export function SectionHeading({
  eyebrow,
  title,
  lede,
  as = 'h2',
  className,
  id,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  id?: string;
}) {
  const Tag = as;
  const headingClass = as === 'h1' ? 'ds-h1' : as === 'h3' ? 'ds-h3' : 'ds-h2';
  return (
    <header className={cn('max-w-3xl', className)}>
      {eyebrow ? <p className="ds-label">{eyebrow}</p> : null}
      <Tag id={id} className={cn(headingClass, eyebrow && 'mt-3')}>{title}</Tag>
      {lede ? <Body className="mt-5 max-w-2xl text-[1.125rem] text-stone">{lede}</Body> : null}
    </header>
  );
}
