"use client";

import { useEffect, useMemo, useState } from "react";
import type { FontItem } from "@/lib/registry";
import { loadFontUrl } from "./font-load-registry";

const MAX_FAMILIES_PER_URL = 40;

function buildBatchUrls(fonts: FontItem[]): string[] {
  const googleFonts = fonts.filter((f) => f.font.provider === "google");
  if (googleFonts.length === 0) return [];

  const urls: string[] = [];
  for (let i = 0; i < googleFonts.length; i += MAX_FAMILIES_PER_URL) {
    const batch = googleFonts.slice(i, i + MAX_FAMILIES_PER_URL);
    const parts = batch.map(
      (f) => `family=${f.font.import.replace(/ /g, "+")}:wght@400`
    );
    urls.push(
      `https://fonts.googleapis.com/css2?${parts.join("&")}&display=swap`
    );
  }
  return urls;
}

export function useBatchFontLoad(fonts: FontItem[]): {
  loaded: boolean;
} {
  const [loaded, setLoaded] = useState(false);

  const batchUrls = useMemo(() => buildBatchUrls(fonts), [fonts]);

  useEffect(() => {
    if (batchUrls.length === 0) {
      setLoaded(true);
      return;
    }

    setLoaded(false);
    Promise.all(batchUrls.map(loadFontUrl)).then(() => setLoaded(true));
  }, [batchUrls]);

  return { loaded };
}
