import { getCollection } from 'astro:content';

// How long a /now entry stays "fresh" before the page auto-hides.
// Kept in sync with the same constant in netlify/edge-functions/now-guard.ts.
export const NOW_STALE_DAYS = 30;

// Filenames are DD-MM-YYYY (e.g. 18-04-2026.mdx).
export function parseDateFromSlug(slug: string): Date {
  const [day, month, year] = slug.split('-').map(Number);
  return new Date(year ?? 2025, (month ?? 1) - 1, day ?? 1);
}

// The date of the most recent published /now entry, or null if there are none.
export async function getLatestNowDate(): Promise<Date | null> {
  const entries = await getCollection('now', ({ data }) => data.draft !== true);
  if (entries.length === 0) return null;

  return entries
    .map((entry) => parseDateFromSlug(entry.slug))
    .sort((a, b) => b.getTime() - a.getTime())[0];
}

// YYYY-MM-DD in local terms — unambiguous to re-parse in the browser and at the edge.
export function toIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}
