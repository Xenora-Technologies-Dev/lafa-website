import { AdminError, DatabaseRequired } from '@/components/admin/database-required';
import { loadAdmin } from '@/lib/admin';
import { databaseConfigured } from '@/lib/db';
import { listEnquiries } from '@/lib/queries';
import { formatDate } from '@/lib/site';

export default async function EnquiriesPage() {
  if (!databaseConfigured()) {
    return (
      <div>
        <h1 className="mb-6 font-serif text-4xl text-navy">Enquiries</h1>
        <DatabaseRequired>
          <span />
        </DatabaseRequired>
        <p className="mt-4 max-w-xl text-sm leading-6 text-stone">
          After deploy, Netlify Forms can also keep submissions named enquiry, even before Neon is connected.
        </p>
      </div>
    );
  }
  const result = await loadAdmin(() => listEnquiries());
  return (
    <div>
      <h1 className="font-serif text-4xl text-navy">Enquiries</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-stone">
        These are stored in Neon. On the published site the same submission is also sent to the Netlify Form named enquiry. The newest 200 are listed.
      </p>
      {!result.ok ? (
        <div className="mt-6">
          <AdminError message={result.error} />
        </div>
      ) : result.data.length === 0 ? (
        <p className="mt-8 text-sm text-stone">No enquiries stored yet.</p>
      ) : (
        <ul className="mt-8 space-y-4">
          {result.data.map((enquiry) => (
            <li key={enquiry.id} className="border border-line bg-white p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="font-serif text-2xl text-navy">{enquiry.company}</h2>
                <time className="text-xs text-stone" dateTime={enquiry.createdAt}>
                  {formatDate(enquiry.createdAt)}
                </time>
              </div>
              <p className="mt-2 text-sm text-navy">
                {enquiry.name} · <a href={`mailto:${enquiry.email}`}>{enquiry.email}</a>
              </p>
              <dl className="mt-3 space-y-1 text-sm text-stone">
                {enquiry.phone ? (
                  <div>
                    <dt className="inline">Phone: </dt>
                    <dd className="inline">{enquiry.phone}</dd>
                  </div>
                ) : null}
                {enquiry.market ? (
                  <div>
                    <dt className="inline">Market: </dt>
                    <dd className="inline">{enquiry.market}</dd>
                  </div>
                ) : null}
                {enquiry.interest ? (
                  <div>
                    <dt className="inline">Interest: </dt>
                    <dd className="inline">{enquiry.interest}</dd>
                  </div>
                ) : null}
              </dl>
              <p className="mt-4 text-sm leading-6 whitespace-pre-wrap text-charcoal">{enquiry.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
