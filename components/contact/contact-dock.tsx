'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { WhatsAppMark } from '@/components/layout/whatsapp-mark';
import { emailHref, enquiryMessage, telHref, whatsappHrefFor, type EnquiryContext, type EnquiryDivision } from '@/lib/contact';
import { enquiryListSuffix, readEnquiryList } from '@/lib/enquiry-list';
import { MOTION_QUERY, gsap, useGSAP } from '@/lib/gsap';
import { OPEN_CONTACT_EVENT } from '@/lib/open-contact';
import { contactFacts, phoneLines } from '@/lib/site-facts';

function readPageContext(pathname: string): EnquiryContext {
  const node = document.querySelector<HTMLElement>('[data-enquiry-division], [data-enquiry-subject]');
  const divisionAttr = node?.dataset.enquiryDivision;
  const division: EnquiryDivision = divisionAttr === 'lil' || pathname.startsWith('/lil') ? 'lil' : 'food';
  const subject = node?.dataset.enquirySubject?.trim();
  return { division, subject: subject || undefined };
}

export function ContactDock() {
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [tucked, setTucked] = useState(false);
  const [raised, setRaised] = useState(false);
  const [message, setMessage] = useState(() => enquiryMessage({ division: 'food' }));

  useEffect(() => {
    setOpen(false);
    setMessage(enquiryMessage(readPageContext(pathname)));
  }, [pathname]);

  useEffect(() => {
    const footer = document.querySelector('footer');
    const observer = new IntersectionObserver(
      ([entry]) => setTucked(Boolean(entry?.isIntersecting && entry.intersectionRatio > 0.15)),
      { threshold: [0, 0.15, 0.4] },
    );
    if (footer) observer.observe(footer);

    const bar = document.querySelector('[data-mobile-enquiry]');
    const barObserver = new MutationObserver(() => {
      setRaised(Boolean(bar?.classList.contains('is-visible')));
    });
    if (bar) barObserver.observe(bar, { attributes: true, attributeFilter: ['class'] });

    return () => {
      observer.disconnect();
      barObserver.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    function onOpen(event: Event) {
      const detail = (event as CustomEvent<EnquiryContext>).detail;
      const base = detail?.division || detail?.subject ? detail : readPageContext(pathname);
      const list = enquiryListSuffix(readEnquiryList());
      setMessage(`${enquiryMessage(base)}${list}`);
      setOpen(true);
    }
    window.addEventListener(OPEN_CONTACT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CONTACT_EVENT, onOpen);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const button = buttonRef.current;
    panelRef.current?.querySelector<HTMLElement>('a, button')?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        button?.focus();
      }
    }

    function onPointer(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
      if (previous && previous !== button) previous.focus?.();
    };
  }, [open]);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_QUERY, () => {
      gsap.from('.wa-fab', { y: 18, opacity: 0, duration: 0.55, delay: 1.2, ease: 'back.out(1.7)' });
      try {
        if (window.sessionStorage.getItem('lafa-wa-pulse') !== '1') {
          gsap.fromTo(
            '.wa-fab-icon',
            { scale: 1 },
            { scale: 1.08, yoyo: true, repeat: 1, duration: 0.35, delay: 1.85, ease: 'sine.inOut' },
          );
          window.sessionStorage.setItem('lafa-wa-pulse', '1');
        }
      } catch {
        /* session storage can be blocked */
      }
    });
    return () => mm.revert();
  }, { scope: rootRef });

  useGSAP(() => {
    if (!open || !panelRef.current) return;
    const mm = gsap.matchMedia();
    mm.add(MOTION_QUERY, () => {
      gsap.from(panelRef.current, { y: 10, opacity: 0, duration: 0.28, ease: 'power2.out' });
    });
    return () => mm.revert();
  }, { scope: rootRef, dependencies: [open] });

  function toggle() {
    setOpen((value) => {
      const next = !value;
      if (next) {
        const list = enquiryListSuffix(readEnquiryList());
        setMessage(`${enquiryMessage(readPageContext(pathname))}${list}`);
      }
      return next;
    });
  }

  return (
    <div ref={rootRef} className={['wa-dock', tucked ? 'is-tucked' : '', raised ? 'is-raised' : ''].filter(Boolean).join(' ')}>
      {open ? (
        <div ref={panelRef} id={panelId} className="wa-panel" role="dialog" aria-label="Contact LAFA">
          <div className="flex items-start justify-between gap-3">
            <p className="ds-label">WhatsApp and call</p>
            <button type="button" className="ds-btn ds-btn-quiet ds-btn-sm ds-button" onClick={() => { setOpen(false); buttonRef.current?.focus(); }}>
              Close
            </button>
          </div>
          <ul className="mt-3 space-y-3">
            {phoneLines.map((line) => (
              <li key={line.e164} className="border-t border-line pt-3">
                <p className="text-sm font-semibold text-navy">{line.display}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <a href={whatsappHrefFor(line, message)} className="ds-btn ds-btn-wa ds-btn-sm ds-button" target="_blank" rel="noopener noreferrer">
                    <WhatsAppMark className="size-4" />
                    Chat on WhatsApp
                  </a>
                  <a href={telHref(line)} className="ds-btn ds-btn-outline ds-btn-sm ds-button">
                    Call
                  </a>
                </div>
              </li>
            ))}
          </ul>
          {contactFacts.email ? (
            <p className="ds-small mt-3">
              Email{' '}
              <a className="text-navy" href={emailHref()}>
                {contactFacts.email}
              </a>
            </p>
          ) : null}
        </div>
      ) : null}
      <button
        ref={buttonRef}
        type="button"
        className="wa-fab"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={toggle}
      >
        <span className="wa-fab-icon">
          <WhatsAppMark className="size-6" />
        </span>
        <span className="wa-fab-label">WhatsApp</span>
      </button>
    </div>
  );
}
