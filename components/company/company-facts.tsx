import { confirmedPlace, unconfirmedCompanyFacts } from '@/lib/site-facts';

const rows = [
  { label: 'Legal name', value: unconfirmedCompanyFacts.legalName },
  { label: 'Street address', value: unconfirmedCompanyFacts.streetAddress },
  { label: 'Trade licence', value: unconfirmedCompanyFacts.licenceNumber },
  { label: 'Hours', value: unconfirmedCompanyFacts.hours },
  { label: 'Place', value: `${confirmedPlace.locality}, ${confirmedPlace.country}` },
] as const;

export function CompanyFacts() {
  return (
    <section aria-labelledby="company-facts-title">
      <h2 id="company-facts-title" className="ds-h2">Company facts</h2>
      <p className="ds-small mt-3 max-w-2xl">
        Legal name, street address, trade licence, and hours are placeholders until LAFA confirms them.
      </p>
      <dl className="ds-meta mt-6">
        {rows.map((row) => (
          <div key={row.label}>
            <dt className="ds-meta-label">{row.label}</dt>
            <dd className="ds-meta-value">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
