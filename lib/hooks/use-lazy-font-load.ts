"use client";

import { useEffect, useRef, useState } from "react";
import { isFontUrlLoaded, loadFontUrl } from "./font-load-registry";

export function useLazyFontLoad(googleFontsUrl: string) {
  const ref = useRef<HTMLElement | null>(null);
  const [loaded, setLoaded] = useState(() => isFontUrlLoaded(googleFontsUrl));

  useEffect(() => {
    if (!googleFontsUrl || loaded) return;

    // Already loaded by another component
    if (isFontUrlLoaded(googleFontsUrl)) {
      setLoaded(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          loadFontUrl(googleFontsUrl).then(() => setLoaded(true));
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [googleFontsUrl, loaded]);

  return { ref, loaded };
}
