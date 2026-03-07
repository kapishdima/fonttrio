export type FontCategory = "serif" | "sans-serif" | "monospace";

export interface TypographyScale {
  h1: { size: string; weight: number; lineHeight: string; letterSpacing: string };
  h2: { size: string; weight: number; lineHeight: string; letterSpacing: string };
  h3: { size: string; weight: number; lineHeight: string; letterSpacing: string };
  h4: { size: string; weight: number; lineHeight: string; letterSpacing: string };
  h5: { size: string; weight: number; lineHeight: string; letterSpacing: string };
  h6: { size: string; weight: number; lineHeight: string; letterSpacing: string };
  body: { size: string; lineHeight: string; weight: number };
}

export interface PairingData {
  name: string;
  heading: string;
  headingCategory: FontCategory;
  body: string;
  bodyCategory: FontCategory;
  mono: string;
  mood: string[];
  useCase: string[];
  description: string;
  scale: TypographyScale;
  googleFontsUrl: string;
}

import { PAIRINGS_DATA } from "./pairings-data";

const PAIRINGS: PairingData[] = PAIRINGS_DATA;

export function getAllPairings(): PairingData[] {
  return PAIRINGS;
}

export function getPairing(name: string): PairingData | undefined {
  return PAIRINGS.find((p) => p.name === name);
}

export function getPairingsByMood(mood: string): PairingData[] {
  return PAIRINGS.filter((p) => p.mood.includes(mood));
}

export function getPairingsByCategory(category: FontCategory): PairingData[] {
  return PAIRINGS.filter((p) => p.headingCategory === category);
}

export function getAllMoods(): string[] {
  const moods = new Set<string>();
  PAIRINGS.forEach((p) => p.mood.forEach((m) => moods.add(m)));
  return Array.from(moods);
}
