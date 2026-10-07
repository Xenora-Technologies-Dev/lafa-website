export function Stats({ items }: { items: { value: string; label: string }[] }) {
  return (
    <dl className="grid grid-cols-2 border-y border-line lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="border-b border-line px-1 py-6 sm:px-6 lg:border-b-0 lg:border-l lg:first:border-l-0">
          <dt className="ds-small">{item.label}</dt>
          <dd className="ds-h2 mt-2">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
