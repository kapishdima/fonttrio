"use client";

import { useEffect, useRef } from "react";

interface FontProviderProps {
  fonts: string[];
  googleFontsUrl?: string;
}

export function FontProvider({ fonts, googleFontsUrl }: FontProviderProps) {
  const loadedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (googleFontsUrl && !loadedRef.current.has(googleFontsUrl)) {
      loadedRef.current.add(googleFontsUrl);

      // Preconnect
      if (!document.querySelector('link[href="https://fonts.gstatic.com"]')) {
        const preconnect = document.createElement("link");
        preconnect.rel = "preconnect";
        preconnect.href = "https://fonts.gstatic.com";
        preconnect.crossOrigin = "anonymous";
        document.head.appendChild(preconnect);
      }

      // Load stylesheet
      const existing = document.querySelector(
        `link[href="${googleFontsUrl}"]`
      );
      if (!existing) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = googleFontsUrl;
        document.head.appendChild(link);
      }
    }
  }, [googleFontsUrl]);

  // For fonts not loaded via Google Fonts URL (like Geist which is bundled)
  useEffect(() => {
    fonts.forEach((font) => {
      if (
        font === "Geist" ||
        font === "Geist Mono" ||
        loadedRef.current.has(font)
      )
        return;
      // Already loaded via googleFontsUrl — no extra action needed
    });
  }, [fonts]);

  return null;
}

/**
 * Build a Google Fonts URL from an array of font families
 */
export function buildGoogleFontsUrl(families: string[]): string {
  const filtered = families.filter(
    (f) => f !== "Geist" && f !== "Geist Mono"
  );
  if (filtered.length === 0) return "";

  const params = filtered
    .map((f) => `family=${f.replace(/ /g, "+")}:wght@400;500;600;700`)
    .join("&");

  return `https://fonts.googleapis.com/css2?${params}&display=swap`;
}
