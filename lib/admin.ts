import { logError } from '@/lib/http';

export async function loadAdmin<T>(loader: () => Promise<T>) {
  try {
    return { ok: true as const, data: await loader() };
  } catch (error) {
    logError('admin', error);
    return {
      ok: false as const,
      error: 'The database could not be reached. Check DATABASE_URL and that npm run db:setup has been run.',
    };
  }
}
