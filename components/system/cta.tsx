import Link from 'next/link';
import { WhatsAppMark } from '@/components/layout/whatsapp-mark';
import { Container } from '@/components/system/container';

type CtaAction = { href: string; label: string; external?: boolean };

function CtaLink({ action, className }: { action: CtaAction; className: string }) {
  const content = (
    <>
      {action.external || action.label.toLowerCase().includes('whatsapp') ? <WhatsAppMark className="size-4" /> : null}
      {action.label}
    </>
  );
  if (action.external) {
    return (
      <a href={action.href} className={className} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return (
    <Link href={action.href} className={className}>
      {content}
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
        <div className="flex w-full flex-col gap-3 min-[480px]:w-auto min-[480px]:flex-row min-[480px]:flex-wrap">
          <CtaLink action={action} className="ds-btn ds-btn-accent ds-button w-full min-[480px]:w-auto" />
          {secondary ? <CtaLink action={secondary} className="ds-btn ds-btn-wa ds-button w-full min-[480px]:w-auto" /> : null}
        </div>
      </Container>
    </section>
  );
}
