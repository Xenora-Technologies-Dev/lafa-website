import { enquirySteps } from '@/lib/content';

export function EnquiryProcess({ title = 'How an enquiry works' }: { title?: string }) {
  return (
    <section>
      <h2 className="ds-h2">{title}</h2>
      <ol className="mt-8 grid gap-8 md:grid-cols-3">
        {enquirySteps.map((step, index) => (
          <li key={step.title} className="border-t border-gold pt-5">
            <span className="ds-h2 text-gold-deep">{String(index + 1).padStart(2, '0')}</span>
            <h3 className="ds-h3 mt-3">{step.title}</h3>
            <p className="ds-small mt-2">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
