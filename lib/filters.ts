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

/**
 * Filter pairings by font name query.
 * Matches against heading, body, mono font names and pairing name.
 */
export function filterPairingsByFont(
  pairings: PairingData[],
  query: string,
): PairingData[] {
  const q = query.trim().toLowerCase();
  if (!q) return pairings;
  return pairings.filter(
    (p) =>
      p.heading.toLowerCase().includes(q) ||
      p.body.toLowerCase().includes(q) ||
      p.mono.toLowerCase().includes(q) ||
      p.name.toLowerCase().includes(q),
  );
}
