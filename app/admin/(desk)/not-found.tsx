import Link from 'next/link';

export default function AdminNotFound() {
  return (
    <div>
      <h1 className="font-serif text-4xl text-navy">Not found</h1>
      <p className="mt-3 text-sm text-stone">That admin page does not exist.</p>
      <p className="mt-4">
        <Link href="/admin" className="text-sm font-semibold text-gold-deep hover:text-navy">
          Back to overview
        </Link>
      </p>
    </div>
  );
}
