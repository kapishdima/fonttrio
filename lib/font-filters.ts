import { parseFontCategory } from "@/lib/fonts";
import type { FontItem } from "@/lib/registry";

export const ITEMS_PER_PAGE = 60;

export function filterFonts(
  fonts: FontItem[],
  query: string,
  category: string,
): FontItem[] {
  return fonts.filter((f) => {
    if (query) {
      const q = query.toLowerCase();
      if (!f.title.toLowerCase().includes(q)) return false;
    }
    if (category && category !== "all") {
      if (parseFontCategory(f) !== category) return false;
    }
    return true;
  });
}

export function paginateFonts(
  fonts: FontItem[],
  page: number,
): { paginatedFonts: FontItem[]; totalPages: number; currentPage: number } {
  const totalPages = Math.max(1, Math.ceil(fonts.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(Math.max(1, page), totalPages);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedFonts = fonts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  return { paginatedFonts, totalPages, currentPage };
}
