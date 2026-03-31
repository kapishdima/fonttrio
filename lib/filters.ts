import type { FontCategory, PairingData } from "./pairings";

export type CategoryFilter = "all" | FontCategory;

export interface StyleGroup {
  key: string;
  label: string;
  moods: string[];
}

export const STYLE_GROUPS: StyleGroup[] = [
  { key: "editorial", label: "Editorial", moods: ["editorial", "literary", "narrative", "dramatic", "sophisticated"] },
  { key: "clean", label: "Clean", moods: ["clean", "neutral", "minimal", "modern", "Vercel-style"] },
  { key: "bold", label: "Bold", moods: ["bold", "impactful", "commanding", "raw", "brutalist"] },
  { key: "friendly", label: "Friendly", moods: ["friendly", "approachable", "warm", "playful", "startup"] },
  { key: "corporate", label: "Corporate", moods: ["professional", "corporate", "trustworthy", "systematic"] },
  { key: "creative", label: "Creative", moods: ["creative", "distinctive", "geometric", "curated", "nordic"] },
  { key: "academic", label: "Academic", moods: ["academic", "scholarly", "refined", "readable", "universal"] },
];

export const CATEGORY_OPTIONS: { key: CategoryFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "serif", label: "Serif" },
  { key: "sans-serif", label: "Sans" },
];

// --- Use case normalization ---

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

// --- Matching helpers (reusable across UI, API, MCP) ---

export function matchesSearch(p: PairingData, q: string): boolean {
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

export function matchesMood(p: PairingData, mood: string): boolean {
  const m = mood.toLowerCase();
  return p.mood.some((pm) => pm.toLowerCase().includes(m));
}

export function matchesUseCase(p: PairingData, filter: string): boolean {
  const mapped = USE_CASE_MAP[filter] || filter;
  return p.useCase.some((u) => u.toLowerCase() === mapped.toLowerCase());
}

export function matchesCategory(p: PairingData, category: string): boolean {
  const c = category.toLowerCase();
  return (
    p.headingCategory.toLowerCase() === c ||
    p.bodyCategory.toLowerCase() === c
  );
}

export function matchesLanguage(p: PairingData, filter: string): boolean {
  const subsetNames = SUBSET_MAP[filter] || [filter];
  return subsetNames.some((s) => p.subsets.includes(s));
}

export function matchesAppearance(p: PairingData, appearance: string): boolean {
  return p.appearance.includes(appearance);
}

// --- Universal filter ---

export interface PairingFilters {
  query?: string;
  mood?: string;
  useCase?: string;
  category?: string;
  appearance?: string;
  language?: string;
}

export function filterPairings(
  pairings: PairingData[],
  filters: PairingFilters,
): PairingData[] {
  return pairings.filter((p) => {
    if (filters.query && !matchesSearch(p, filters.query)) return false;
    if (filters.mood && !matchesMood(p, filters.mood)) return false;
    if (filters.useCase && !matchesUseCase(p, filters.useCase)) return false;
    if (filters.category && !matchesCategory(p, filters.category)) return false;
    if (filters.appearance && !matchesAppearance(p, filters.appearance)) return false;
    if (filters.language && !matchesLanguage(p, filters.language)) return false;
    return true;
  });
}

/**
 * @deprecated Use filterPairings({ query }) instead
 */
export function filterPairingsByFont(
  pairings: PairingData[],
  query: string,
): PairingData[] {
  return filterPairings(pairings, { query: query.trim() });
}
