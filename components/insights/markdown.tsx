import type { Components } from 'react-markdown';
import ReactMarkdown from 'react-markdown';

function safeHref(href: string | undefined) {
  if (!href) return undefined;
  if (href.startsWith('/') && !href.startsWith('//')) return href;
  if (/^https?:\/\//i.test(href)) return href;
  return undefined;
}

const components: Components = {
  a({ href, children }) {
    const safe = safeHref(href);
    if (!safe) return <span>{children}</span>;
    const external = safe.startsWith('http');
    return (
      <a href={safe} {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}>
        {children}
      </a>
    );
  },
  img() {
    return null;
  },
};

export function Markdown({ children }: { children: string }) {
  return (
    <div className="insight-body text-charcoal">
      <ReactMarkdown components={components}>{children}</ReactMarkdown>
    </div>
  );
}
