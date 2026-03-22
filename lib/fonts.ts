/**
 * Font utilities — parseFontCategory, Google Fonts URL builders, etc.
 * For reading font data, use getAllFonts() from lib/registry.ts in Server Components.
 */

export type { FontItem } from "./registry";

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
