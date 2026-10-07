import Link from 'next/link';
import { Container } from '@/components/system/container';

type CtaAction = { href: string; label: string; external?: boolean };

function CtaLink({ action, className }: { action: CtaAction; className: string }) {
  if (action.external) {
    return (
      <a href={action.href} className={className} target="_blank" rel="noopener noreferrer">
        {action.label}
      </a>
    );
  }
  return (
    <Link href={action.href} className={className}>
      {action.label}
    </Link>
  );
}

export function Cta({
  title,
  text,
  action,
  secondary,
}: {
  title: string;
  text?: string;
  action: CtaAction;
  secondary?: CtaAction;
}) {
  return (
    <section className="on-dark border-t border-gold bg-navy text-foam">
      <Container className="flex flex-col items-start gap-8 py-16 sm:py-20 lg:flex-row lg:items-end lg:justify-between lg:py-24">
        <div className="max-w-xl">
          <h2 className="ds-h2">{title}</h2>
          {text ? <p className="ds-body mt-4">{text}</p> : null}
        </div>
        <div className="flex flex-wrap gap-3">
          <CtaLink action={action} className="ds-btn ds-btn-accent ds-button" />
          {secondary ? <CtaLink action={secondary} className="ds-btn ds-btn-outline ds-button" /> : null}
        </div>
      </Container>
    </section>
  );
}
