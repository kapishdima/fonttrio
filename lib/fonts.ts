/**
 * Client-safe font utilities — NO imports from registry.ts (uses Node fs).
 * Server-side helpers (getAllFontCategories, etc.) are in lib/fonts.server.ts
 */
import { FONTS_DATA } from "./fonts-data";
import { PAIRINGS_DATA } from "./pairings-data";
import type { PairingData } from "./pairings";

// Re-export type only (no runtime import of registry)
export type { FontItem } from "./registry";

/** Client-safe: returns all fonts from pre-generated static data */
export function getAllFontsClient() {
  return FONTS_DATA;
}

export function parseFontCategory(font: { category?: string; description: string }): string {
  // Use category field if present, normalize it
  if (font.category) {
    const cat = font.category.toLowerCase().replace(/\s+/g, "-");
    // Map common variations
    if (cat === "sans-serif" || cat === "sans") return "sans-serif";
    if (cat === "serif") return "serif";
    if (cat === "monospace" || cat === "mono") return "monospace";
    if (cat === "display") return "display";
    if (cat === "handwriting") return "handwriting";
    return cat;
  }
  // Fallback: parse from description "Inter — Sans Serif font."
  const desc = font.description.toLowerCase();
  if (desc.includes("monospace") || desc.includes("mono")) return "monospace";
  if (desc.includes("sans")) return "sans-serif";
  if (desc.includes("serif")) return "serif";
  if (desc.includes("display")) return "display";
  if (desc.includes("handwriting")) return "handwriting";
  return "sans-serif";
}

export function getPairingsUsingFont(fontFamily: string): PairingData[] {
  return PAIRINGS_DATA.filter(
    (p) =>
      p.heading === fontFamily ||
      p.body === fontFamily ||
      p.mono === fontFamily
  );
}

export function getFontGoogleFontsUrl(font: {
  font: { provider: string; import: string };
}): string {
  if (font.font.provider !== "google") return "";
  const importName = font.font.import.replace(/ /g, "+");
  return `https://fonts.googleapis.com/css2?family=${importName}:wght@400&display=swap`;
}

export function getFontAllWeightsUrl(font: {
  font: { provider: string; import: string; weight: string[] };
}): string {
  if (font.font.provider !== "google") return "";
  const importName = font.font.import.replace(/ /g, "+");
  const weights = font.font.weight.join(";");
  return `https://fonts.googleapis.com/css2?family=${importName}:wght@${weights}&display=swap`;
}
