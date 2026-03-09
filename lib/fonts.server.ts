/**
 * Server-only font utilities (use Node fs via registry.ts).
 * Never import this from client components.
 */
import { getAllFonts } from "./registry";
import { parseFontCategory } from "./fonts";

export function getAllFontCategories(): string[] {
  const fonts = getAllFonts();
  const cats = new Set<string>();
  for (const f of fonts) {
    cats.add(parseFontCategory(f));
  }
  return Array.from(cats).sort();
}

export function getAllFontSubsets(): string[] {
  const fonts = getAllFonts();
  const subsets = new Set<string>();
  for (const f of fonts) {
    for (const s of f.font.subsets) {
      subsets.add(s);
    }
  }
  return Array.from(subsets).sort();
}
