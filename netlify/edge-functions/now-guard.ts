import type { Context } from "https://edge.netlify.com";

// Keep in sync with NOW_STALE_DAYS in src/utils/nowStatus.ts.
const STALE_MS = 30 * 24 * 60 * 60 * 1000;

// Reads the <meta name="now-updated" content="YYYY-MM-DD"> that BaseLayout
// renders into every page, compares it to the real request-time clock, and
// once the /now page has been stale for too long, quietly serves the homepage
// content instead (keeping the /now URL, HTTP 200) — matching the site-wide
// catch-all that reroutes any unknown path to home. Runs per-request, no
// rebuild required.
export default async function handler(request: Request, context: Context) {
  const response = await context.next();

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("text/html")) {
    return response;
  }

  const body = await response.text();
  const match = body.match(/name="now-updated"\s+content="([^"]+)"/);

  if (match) {
    const updated = new Date(match[1]).getTime();
    if (!Number.isNaN(updated) && Date.now() - updated > STALE_MS) {
      // Stale: serve the homepage in place, preserving the /now URL (200),
      // just like the catch-all does for any other unknown path.
      const home = await fetch(new URL("/", request.url));
      return new Response(await home.text(), {
        status: 200,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  }

  // Fresh (or no date found): serve the page unchanged.
  return new Response(body, {
    status: response.status,
    headers: response.headers,
  });
}

export const config = {
  path: ["/now", "/now/*"],
};
