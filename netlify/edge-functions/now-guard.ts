import type { Context } from "https://edge.netlify.com";

// Keep in sync with NOW_STALE_DAYS in src/utils/nowStatus.ts.
const STALE_MS = 30 * 24 * 60 * 60 * 1000;

// Reads the <meta name="now-updated" content="YYYY-MM-DD"> that BaseLayout
// renders into every page, compares it to the real request-time clock, and
// returns a genuine 404 once the /now page has been stale for too long.
// This runs per-request, so the page hides itself with no rebuild required.
export default async function handler(_request: Request, context: Context) {
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
      return new Response(notFoundPage(), {
        status: 404,
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

function notFoundPage(): string {
  return `<!doctype html>
<html lang="en-GB" data-mode="dark">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>404 - Yuval Ginor</title>
<style>
  :root { color-scheme: dark; }
  body {
    background: #282c34; color: #abb2bf;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    display: flex; min-height: 100vh; margin: 0;
    align-items: center; justify-content: center; text-align: center;
  }
  a { color: #a99cf0; }
</style>
</head>
<body>
<main>
<p>404 &mdash; nothing here.</p>
<p><a href="/">&larr; back home</a></p>
</main>
</body>
</html>`;
}

export const config = {
  path: ["/now", "/now/*"],
};
