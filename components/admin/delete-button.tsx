'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function DeleteButton({
  url,
  confirm,
  redirectTo,
  label = 'Delete',
}: {
  url: string;
  confirm: string;
  redirectTo?: string;
  label?: string;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  async function onClick() {
    if (!window.confirm(confirm)) return;
    setPending(true);
    setError('');
    try {
      const response = await fetch(url, { method: 'DELETE' });
      const body = (await response.json().catch(() => null)) as { error?: string } | null;
      if (!response.ok) {
        setError(body?.error || 'Could not delete.');
        setPending(false);
        return;
      }
      if (redirectTo) router.push(redirectTo);
      router.refresh();
    } catch {
      setError('Could not delete.');
      setPending(false);
    }
  }

  return (
    <div className="space-y-2">
      <Button type="button" variant="destructive" size="sm" onClick={onClick} disabled={pending}>
        {pending ? 'Deleting…' : label}
      </Button>
      {error ? <p className="text-sm text-[#8f2d2d]">{error}</p> : null}
    </div>
  );
}
