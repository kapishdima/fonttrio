/**
 * Client-side singleton that tracks loaded Google Fonts stylesheet URLs.
 * Prevents duplicate <link> injections across components.
 */

const loadedUrls = new Set<string>();
const pendingLoads = new Map<string, Promise<void>>();

export function isFontUrlLoaded(url: string): boolean {
  return loadedUrls.has(url);
}

export function loadFontUrl(url: string): Promise<void> {
  if (!url) return Promise.resolve();

  if (loadedUrls.has(url)) return Promise.resolve();

  const pending = pendingLoads.get(url);
  if (pending) return pending;

  // Check if a <link> already exists in the document (e.g. from SSR)
  if (typeof document !== "undefined") {
    const existing = document.querySelector(`link[href="${CSS.escape(url)}"]`);
    if (existing) {
      loadedUrls.add(url);
      return Promise.resolve();
    }
  }

  const promise = new Promise<void>((resolve) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;
    link.onload = () => {
      loadedUrls.add(url);
      pendingLoads.delete(url);
      resolve();
    };
    link.onerror = () => {
      pendingLoads.delete(url);
      resolve();
    };
    document.head.appendChild(link);
  });

  pendingLoads.set(url, promise);
  return promise;
}
