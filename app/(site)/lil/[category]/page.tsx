import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ContactLines } from '@/components/contact/contact-lines';
import { getLilLine, lilBrand, lilLines, lilPath } from '@/lib/lil';
import { pageMeta } from '@/lib/seo';

export function generateStaticParams() {
  return lilLines.map((line) => ({ category: line.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const line = getLilLine(category);
  if (!line) return { title: 'Lil by lafa' };
  return pageMeta({
    title: line.title,
    description: `${line.summary} Lil by lafa, Dubai. Enquire by WhatsApp, phone, or email.`,
    path: lilPath(line.slug),
    image: { url: lilBrand.ogImage, alt: 'Lil by lafa' },
  });
}

export default async function LilCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const line = getLilLine(category);
  if (!line) notFound();
  const others = lilLines.filter((item) => item.slug !== line.slug);

  return (
    <article data-enquiry-division="lil" data-enquiry-subject={line.title}>
      <header className="ds-container grid items-center gap-10 py-14 lg:grid-cols-2">
        <div>
          <p className="ds-label">
            <Link href="/lil">Lil by lafa</Link>
          </p>
          <h1 className="ds-display mt-4">{line.title}</h1>
          <p className="ds-body mt-5">{line.summary}</p>
          <p className="ds-small mt-4">{line.notes}</p>
        </div>
        <figure className="m-0">
          <div className="lil-frame relative aspect-[4/5]">
            <Image src={line.image} alt={line.alt} fill priority sizes="(min-width: 1024px) 36rem, 100vw" className="object-cover" />
          </div>
          <figcaption className="campaign-note mt-3">Campaign imagery</figcaption>
        </figure>
      </header>
      <section className="border-t border-[var(--lil-gold)] bg-white/35">
        <div className="ds-container grid gap-10 py-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)]">
          <div>
            <h2 className="ds-h2">Size and fabric</h2>
            <p className="ds-body mt-4">
              Tell us the size, the cloth if you know it, and the colour. We confirm what can be arranged. This page does not list a price.
            </p>
          </div>
          <ContactLines context={{ division: 'lil', subject: line.title }} />
        </div>
      </section>
      <section className="ds-container py-14" aria-labelledby="other-lines">
        <h2 id="other-lines" className="ds-h3">Other lines</h2>
        <ul className="mt-6 flex flex-wrap gap-3">
          {others.map((item) => (
            <li key={item.slug}>
              <Link href={lilPath(item.slug)} className="inline-flex rounded-full border border-[var(--lil-gold)] px-4 py-2 text-sm">
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
