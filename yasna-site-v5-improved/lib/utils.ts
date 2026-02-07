/**
 * Prepend the basePath to a public asset path.
 * Needed for static assets (images, favicon) when deployed under a sub-path (e.g. GitHub Pages).
 * Next.js Link/router handle basePath automatically, but raw <img src> and <link href> do not.
 */
export function assetUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return `${base}${path}`;
}
