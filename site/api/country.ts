/**
 * Tells the browser which country the request came from, so the site can open in the
 * local language on the first visit. Vercel adds the header at the edge from the visitor's
 * IP address; Cloudflare's equivalent is read as a fallback. Nothing is stored or logged.
 */
export const config = { runtime: 'edge' }

export default function handler(request: Request): Response {
  const raw = request.headers.get('x-vercel-ip-country') ?? request.headers.get('cf-ipcountry') ?? ''
  const country = /^[A-Za-z]{2}$/.test(raw) ? raw.toUpperCase() : null

  return new Response(JSON.stringify({ country }), {
    headers: {
      'Content-Type': 'application/json',
      // Differs per visitor, so it must never be shared or cached.
      'Cache-Control': 'private, no-store',
    },
  })
}
