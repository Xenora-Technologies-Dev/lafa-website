import type { ReactNode } from 'react';

export default function LilLayout({ children }: { children: ReactNode }) {
  return (
    <div className="lil-theme" data-enquiry-division="lil">
      {children}
    </div>
  );
}
