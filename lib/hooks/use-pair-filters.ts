"use client";

import { useCallback, useMemo } from "react";
import { useQueryState, parseAsString } from "nuqs";
import { serverInteger } from "@/lib/nuqs";
import type { PairingData } from "@/lib/pairings";
import { POPULAR_PAIRING_NAMES } from "@/lib/popular-pairings";
import type { FilterValues } from "@/app/components/filters/types";

const ITEMS_PER_PAGE = 40;

const USE_CASE_MAP: Record<string, string> = {
  landing: "landing page",
  ecommerce: "e-commerce",
};

const SUBSET_MAP: Record<string, string[]> = {
  latin: ["latin", "latin-ext"],
  cyrillic: ["cyrillic", "cyrillic-ext"],
  greek: ["greek", "greek-ext"],
  vietnamese: ["vietnamese"],
  arabic: ["arabic"],
  hebrew: ["hebrew"],
  devanagari: ["devanagari"],
  "chinese-simplified": ["chinese-simplified", "chinese-simplified-ext"],
  japanese: ["japanese"],
  korean: ["korean"],
};

function matchesSearch(p: PairingData, q: string): boolean {
  const lower = q.toLowerCase();
  return (
    p.name.toLowerCase().includes(lower) ||
    p.heading.toLowerCase().includes(lower) ||
    p.body.toLowerCase().includes(lower) ||
    p.mono.toLowerCase().includes(lower) ||
    p.description.toLowerCase().includes(lower) ||
    p.mood.some((m) => m.toLowerCase().includes(lower)) ||
    p.useCase.some((u) => u.toLowerCase().includes(lower))
  );
}

function matchesUseCase(p: PairingData, filter: string): boolean {
  const mapped = USE_CASE_MAP[filter] || filter;
  return p.useCase.some((u) => u.toLowerCase() === mapped.toLowerCase());
}

function matchesLanguage(p: PairingData, filter: string): boolean {
  const subsetNames = SUBSET_MAP[filter] || [filter];
  return subsetNames.some((s) => p.subsets.includes(s));
}

export function usePairFilters(pairings: PairingData[]) {
  const [searchQuery, setSearchQuery] = useQueryState(
    "q",
    parseAsString.withDefault(""),
  );
  const [appearance, setAppearance] = useQueryState(
    "appearance",
    parseAsString.withDefault(""),
  );
  const [usecase, setUsecase] = useQueryState(
    "usecase",
    parseAsString.withDefault(""),
  );
  const [language, setLanguage] = useQueryState(
    "language",
    parseAsString.withDefault(""),
  );
  const [feeling, setFeeling] = useQueryState(
    "feeling",
    parseAsString.withDefault(""),
  );
  const [page, setPage] = useQueryState(
    "page",
    serverInteger.withDefault(1),
  );

  const hasActiveFilters =
    !!searchQuery || !!appearance || !!usecase || !!language || !!feeling;

  const filteredPairings = useMemo(() => {
    return pairings.filter((p) => {
      // Exclude popular pairings from the paginated list when no filters are active
      // (they're shown in a separate "Popular pairings" section above)
      if (!hasActiveFilters && POPULAR_PAIRING_NAMES.has(p.name)) return false;
      if (searchQuery && !matchesSearch(p, searchQuery)) return false;
      if (appearance && !p.appearance.includes(appearance)) return false;
      if (usecase && !matchesUseCase(p, usecase)) return false;
      if (language && !matchesLanguage(p, language)) return false;
      if (feeling && !p.mood.includes(feeling)) return false;
      return true;
    });
  }, [pairings, searchQuery, appearance, usecase, language, feeling, hasActiveFilters]);

  const filterValues: FilterValues = useMemo(
    () => ({
      appearance: appearance || undefined,
      usecase: usecase || undefined,
      language: language || undefined,
      feeling: feeling || undefined,
    }),
    [appearance, usecase, language, feeling],
  );

  const totalPages = Math.ceil(filteredPairings.length / ITEMS_PER_PAGE);
  const currentPage = Math.min(Math.max(1, page), Math.max(1, totalPages));

  const paginatedPairings = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPairings.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredPairings, currentPage]);

  const handleFilterChange = useCallback(
    (filterId: string, value: string) => {
      setPage(1);
      switch (filterId) {
        case "appearance":
          setAppearance(value || null);
          break;
        case "usecase":
          setUsecase(value || null);
          break;
        case "language":
          setLanguage(value || null);
          break;
        case "feeling":
          setFeeling(value || null);
          break;
      }
    },
    [setAppearance, setUsecase, setLanguage, setFeeling, setPage],
  );

  const clearFilters = useCallback(() => {
    setSearchQuery(null);
    setAppearance(null);
    setUsecase(null);
    setLanguage(null);
    setFeeling(null);
    setPage(1);
  }, [setSearchQuery, setAppearance, setUsecase, setLanguage, setFeeling, setPage]);

  return {
    searchQuery,
    setSearchQuery: (v: string | null) => {
      setPage(1);
      setSearchQuery(v);
    },
    filteredPairings,
    paginatedPairings,
    totalPages,
    filterValues,
    handleFilterChange,
    clearFilters,
    hasActiveFilters,
  };
}
