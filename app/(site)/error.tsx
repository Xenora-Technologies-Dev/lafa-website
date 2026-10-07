'use client';

import { Container } from '@/components/layout/container';
import { ErrorState } from '@/components/system/states';
import { Button } from '@/components/ui/button';

export default function SiteError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Container className="ds-section">
      <ErrorState
        title="This page could not be loaded."
        text="Try again in a moment. If it continues, use the contact page and we will take it from there."
        action={<Button onClick={() => reset()}>Try again</Button>}
      />
    </Container>
  );
}
