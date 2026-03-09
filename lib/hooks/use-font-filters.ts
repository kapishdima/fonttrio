"use client";

import { useMemo } from "react";
import { useQueryState, parseAsString } from "nuqs";
import type { FontItem } from "@/lib/fonts";
import { parseFontCategory } from "@/lib/fonts";

export type FontCategoryFilter = "all" | "serif" | "sans-serif" | "monospace" | "display" | "handwriting";

export const FONT_CATEGORY_OPTIONS: { key: FontCategoryFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "serif", label: "Serif" },
  { key: "sans-serif", label: "Sans Serif" },
  { key: "monospace", label: "Mono" },
  { key: "display", label: "Display" },
  { key: "handwriting", label: "Handwriting" },
];

export function useFontFilters(fonts: FontItem[]) {
  const [searchQuery, setSearchQuery] = useQueryState(
    "q",
    parseAsString.withDefault("")
  );
  const [categoryFilter, setCategoryFilter] = useQueryState(
    "category",
    parseAsString.withDefault("all")
  );

  const filteredFonts = useMemo(() => {
    return fonts.filter((f) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!f.title.toLowerCase().includes(q)) return false;
      }
      if (categoryFilter && categoryFilter !== "all") {
        if (parseFontCategory(f) !== categoryFilter) return false;
      }
      return true;
    });
  }, [fonts, searchQuery, categoryFilter]);

  const hasActiveFilters = !!searchQuery || (!!categoryFilter && categoryFilter !== "all");

  function clearFilters() {
    setSearchQuery(null);
    setCategoryFilter(null);
  }

  return {
    searchQuery,
    setSearchQuery,
    categoryFilter: (categoryFilter || "all") as FontCategoryFilter,
    setCategoryFilter: (v: string) => setCategoryFilter(v === "all" ? null : v),
    filteredFonts,
    hasActiveFilters,
    clearFilters,
    categoryOptions: FONT_CATEGORY_OPTIONS,
  };
}
