"use client";

import { useCallback } from "react";
import { useQueryState } from "nuqs";
import { serverInteger, serverString } from "@/lib/nuqs";

export type FontCategoryFilter = "all" | "serif" | "sans-serif" | "monospace" | "display" | "handwriting";

export const FONT_CATEGORY_OPTIONS: { key: FontCategoryFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "serif", label: "Serif" },
  { key: "sans-serif", label: "Sans Serif" },
  { key: "monospace", label: "Mono" },
  { key: "display", label: "Display" },
  { key: "handwriting", label: "Handwriting" },
];

export function useFontFilters() {
  const [searchQuery, setSearchQuery] = useQueryState(
    "q",
    serverString.withDefault("")
  );
  const [categoryFilter, setCategoryFilter] = useQueryState(
    "category",
    serverString.withDefault("all")
  );
  const [, setPage] = useQueryState(
    "page",
    serverInteger.withDefault(1)
  );

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
    hasActiveFilters,
    clearFilters,
    categoryOptions: FONT_CATEGORY_OPTIONS,
  };
}
