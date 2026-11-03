const STORAGE_KEY = 'lafa-enquiry-list';

export function readEnquiryList(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]') as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === 'string' && item.trim().length > 0).slice(0, 30);
  } catch {
    return [];
  }
}

export function writeEnquiryList(items: string[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function addEnquiryItem(name: string) {
  const next = readEnquiryList();
  if (!next.includes(name)) next.push(name);
  writeEnquiryList(next);
  return next;
}

export function removeEnquiryItem(name: string) {
  const next = readEnquiryList().filter((item) => item !== name);
  writeEnquiryList(next);
  return next;
}

export function enquiryListSuffix(items = readEnquiryList()) {
  if (!items.length) return '';
  return ` Enquiry list: ${items.join(', ')}.`;
}
