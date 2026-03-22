"use client";

import { useMemo, useCallback } from "react";
import { useQueryState, parseAsString, parseAsInteger } from "nuqs";
import type { FontItem } from "@/lib/registry";
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

const ITEMS_PER_PAGE = 60;

export function useFontFilters(fonts: FontItem[]) {
  const [searchQuery, setSearchQuery] = useQueryState(
    "q",
    parseAsString.withDefault("")
  );
  const [categoryFilter, setCategoryFilter] = useQueryState(
    "category",
    parseAsString.withDefault("all")
  );
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1)
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

  const totalPages = Math.ceil(filteredFonts.length / ITEMS_PER_PAGE);

  // Ensure current page is valid
  const currentPage = Math.min(Math.max(1, page), Math.max(1, totalPages));

  const paginatedFonts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredFonts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredFonts, currentPage]);

  const hasActiveFilters = !!searchQuery || (!!categoryFilter && categoryFilter !== "all");

  // Reset page when filters change
  const handleSetSearchQuery = useCallback((value: string | null) => {
    setSearchQuery(value);
    setPage(1);
  }, [setSearchQuery, setPage]);

  const handleSetCategoryFilter = useCallback((value: string) => {
    setCategoryFilter(value === "all" ? null : value);
    setPage(1);
  }, [setCategoryFilter, setPage]);

  const handleSetPage = useCallback((newPage: number) => {
    setPage(newPage);
  }, [setPage]);

  function clearFilters() {
    setSearchQuery(null);
    setCategoryFilter(null);
    setPage(1);
  }

  return {
    searchQuery,
    setSearchQuery: handleSetSearchQuery,
    categoryFilter: (categoryFilter || "all") as FontCategoryFilter,
    setCategoryFilter: handleSetCategoryFilter,
    currentPage,
    totalPages,
    setPage: handleSetPage,
    paginatedFonts,
    filteredFonts,
    hasActiveFilters,
    clearFilters,
    categoryOptions: FONT_CATEGORY_OPTIONS,
    itemsPerPage: ITEMS_PER_PAGE,
  };
}
