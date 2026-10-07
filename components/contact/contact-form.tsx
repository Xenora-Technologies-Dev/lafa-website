'use client';

import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type Status = 'idle' | 'sending' | 'sent' | 'local' | 'error';

export function ContactForm({ interest }: { interest: string }) {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (String(data.get('bot-field') || '').trim()) {
      setStatus('sent');
      return;
    }

    const payload = {
      name: String(data.get('name') || ''),
      company: String(data.get('company') || ''),
      email: String(data.get('email') || ''),
      phone: String(data.get('phone') || ''),
      market: String(data.get('market') || ''),
      interest: String(data.get('interest') || ''),
      message: String(data.get('message') || ''),
      'bot-field': String(data.get('bot-field') || ''),
    };

    setStatus('sending');
    setMessage('');

    let stored = false;
    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const body = (await response.json().catch(() => null)) as { stored?: boolean; error?: string } | null;
      if (response.status === 400) {
        setStatus('error');
        setMessage(body?.error || 'Check the form and try again.');
        return;
      }
      if (response.status === 429) {
        setStatus('error');
        setMessage(body?.error || 'Too many enquiries. Try again in a few minutes.');
        return;
      }
      stored = response.ok && Boolean(body?.stored);
    } catch {
      stored = false;
    }

    const host = window.location.hostname;
    const local = host === 'localhost' || host === '127.0.0.1';
    let netlify = false;
    if (!local) {
      const body = new URLSearchParams();
      body.set('form-name', 'enquiry');
      for (const [key, value] of Object.entries(payload)) body.append(key, value);
      try {
        const response = await fetch('/__forms.html', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: body.toString(),
        });
        netlify = response.ok;
      } catch {
        netlify = false;
      }
    }

    if (stored || netlify) {
      setStatus('sent');
      form.reset();
      return;
    }

    if (local) {
      setStatus('local');
      return;
    }

    setStatus('error');
    setMessage('The enquiry could not be sent. Try again in a moment.');
  }

  if (status === 'sent') {
    return (
      <p className="border border-gold bg-white px-5 py-6 text-sm leading-6" role="status">
        Your enquiry has been sent. We will use the email you gave. This site does not send an automatic reply.
      </p>
    );
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit} noValidate={false}>
      <p className="hidden">
        <label>
          Do not fill this in
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <Field label="Name" name="name" required autoComplete="name" />
      <Field label="Company" name="company" required autoComplete="organization" />
      <Field label="Email" name="email" type="email" required autoComplete="email" />
      <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
      <Field label="Country / market" name="market" autoComplete="country-name" />
      <Field label="Product or category of interest" name="interest" defaultValue={interest} />
      <div className="space-y-2">
        <Label htmlFor="message">
          Message <span className="text-gold-deep">*</span>
        </Label>
        <Textarea id="message" name="message" required rows={6} />
      </div>
      <Button type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send enquiry'}
      </Button>
      {status === 'local' ? (
        <p className="text-sm leading-6 text-stone" role="status">
          This form stores enquiries in Neon when the database is connected, and on Netlify after deploy. A local preview without a database does not deliver it. Email notification stays off until LAFA names the inbox.
        </p>
      ) : null}
      {status === 'error' ? (
        <p className="text-sm text-[#8f2d2d]" role="alert">
          {message}
        </p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required,
  autoComplete,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  defaultValue?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>
        {label}
        {required ? <span className="text-gold-deep"> *</span> : null}
      </Label>
      <Input id={name} name={name} type={type} required={required} autoComplete={autoComplete} defaultValue={defaultValue} />
    </div>
  );
}