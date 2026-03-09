"use client";

import { useEffect, useRef, useState } from "react";

export function useLazyFontLoad(googleFontsUrl: string) {
  const ref = useRef<HTMLElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!googleFontsUrl || loaded) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = googleFontsUrl;
          link.onload = () => setLoaded(true);
          document.head.appendChild(link);
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
