"use client";

import { useState, useMemo, useCallback } from "react";
import type { PairingData, FontCategory } from "@/lib/pairings";
import { STYLE_GROUPS, CATEGORY_OPTIONS, type CategoryFilter } from "@/lib/filters";

interface UsePairingFiltersResult {
  // State
  categoryFilter: CategoryFilter;
  styleFilter: string | null;
  
  // Actions
  setCategoryFilter: (filter: CategoryFilter) => void;
  setStyleFilter: (filter: string | null) => void;
  toggleStyleFilter: (key: string) => void;
  clearFilters: () => void;
  
  // Data
  filteredPairings: PairingData[];
  hasActiveFilters: boolean;
  styleGroups: typeof STYLE_GROUPS;
  categoryOptions: typeof CATEGORY_OPTIONS;
}

export function usePairingFilters(pairings: PairingData[]): UsePairingFiltersResult {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [styleFilter, setStyleFilter] = useState<string | null>(null);

  const filteredPairings = useMemo(() => {
    return pairings.filter((p) => {
      if (categoryFilter !== "all" && p.headingCategory !== categoryFilter) return false;
      if (styleFilter) {
        const group = STYLE_GROUPS.find((g) => g.key === styleFilter);
        if (group && !p.mood.some((m) => group.moods.includes(m))) return false;
      }
      return true;
    });
  }, [pairings, categoryFilter, styleFilter]);

  const toggleStyleFilter = useCallback((key: string) => {
    setStyleFilter((current) => (current === key ? null : key));
  }, []);

  const clearFilters = useCallback(() => {
    setCategoryFilter("all");
    setStyleFilter(null);
  }, []);

  const hasActiveFilters = categoryFilter !== "all" || styleFilter !== null;

  return {
    categoryFilter,
    styleFilter,
    setCategoryFilter,
    setStyleFilter,
    toggleStyleFilter,
    clearFilters,
    filteredPairings,
    hasActiveFilters,
    styleGroups: STYLE_GROUPS,
    categoryOptions: CATEGORY_OPTIONS,
  };
}
