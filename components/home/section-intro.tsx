import { GoldRule } from '@/components/motion/reveal';

export function SectionIntro({
  index,
  eyebrow,
  title,
  lede,
  id,
  onDark = false,
}: {
  index?: string;
  eyebrow?: string;
  title: string;
  lede?: string;
  id?: string;
  onDark?: boolean;
}) {
  return (
    <header className={onDark ? 'on-dark max-w-3xl' : 'max-w-3xl'}>
      {index || eyebrow ? (
        <p className="ds-label">
          {index ? <span className="me-3">{index}</span> : null}
          {eyebrow}
        </p>
      ) : null}
      <GoldRule />
      <h2 id={id} className="ds-h2 mt-4">
        {title}
      </h2>
      {lede ? <p className="ds-body mt-4 max-w-2xl">{lede}</p> : null}
    </header>
  );
}
