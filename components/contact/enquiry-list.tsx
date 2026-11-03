'use client';

import { useEffect, useState } from 'react';
import { addEnquiryItem, readEnquiryList, removeEnquiryItem } from '@/lib/enquiry-list';

export function AddToEnquiry({ name }: { name: string }) {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setAdded(readEnquiryList().includes(name));
  }, [name]);

  return (
    <button
      type="button"
      className="ds-btn ds-btn-outline ds-btn-sm ds-button w-full min-[420px]:w-auto"
      onClick={() => {
        if (added) {
          removeEnquiryItem(name);
          setAdded(false);
          return;
        }
        addEnquiryItem(name);
        setAdded(true);
      }}
    >
      {added ? 'Added to enquiry list' : 'Add to enquiry list'}
    </button>
  );
}

export function EnquiryListNote() {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    setItems(readEnquiryList());
  }, []);

  if (!items.length) return null;

  return (
    <div className="border border-line bg-paper p-4">
      <p className="ds-label">Enquiry list</p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-center justify-between gap-3 text-sm">
            <span>{item}</span>
            <button
              type="button"
              className="ds-small text-navy underline-offset-2 hover:underline"
              onClick={() => setItems(removeEnquiryItem(item))}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p className="ds-small mt-3">These names are added to the message when you send the form, and to WhatsApp when you open the contact panel.</p>
    </div>
  );
}
