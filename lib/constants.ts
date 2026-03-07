import type { FontCategory } from "@/lib/pairings";

export const DISPLAY_TEXT = "Three fonts";

export const SCRAMBLE_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export const DEFAULT_SPECIMEN_TEXT =
  "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.";

export const FONT_WEIGHTS = [
  { value: 300, label: "Light" },
  { value: 400, label: "Regular" },
  { value: 500, label: "Medium" },
  { value: 600, label: "SemiBold" },
  { value: 700, label: "Bold" },
] as const;

export const FONT_SIZES = [
  { value: 14, label: "14" },
  { value: 18, label: "18" },
  { value: 24, label: "24" },
  { value: 32, label: "32" },
  { value: 48, label: "48" },
  { value: 64, label: "64" },
  { value: 96, label: "96" },
  { value: 128, label: "128" },
] as const;

export const COMPARE_HEADING = "Beautiful Typography";

export const COMPARE_BODY =
  "The quick brown fox jumps over the lazy dog. Typography is the craft of endowing human language with a durable visual form.";

export const COMPARE_CODE = `const config = {\n  fonts: ["heading", "body", "mono"],\n  scale: "major-third",\n};`;

export type CategoryFilter = "all" | FontCategory;

export const CATEGORIES: { key: CategoryFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "serif", label: "Serif" },
  { key: "sans-serif", label: "Sans" },
];

export const STYLE_GROUPS: {
  key: string;
  label: string;
  moods: string[];
}[] = [
  { key: "editorial", label: "Editorial", moods: ["editorial", "literary", "narrative", "dramatic", "sophisticated"] },
  { key: "clean", label: "Clean", moods: ["clean", "neutral", "minimal", "modern", "Vercel-style"] },
  { key: "bold", label: "Bold", moods: ["bold", "impactful", "commanding", "raw", "brutalist"] },
  { key: "friendly", label: "Friendly", moods: ["friendly", "approachable", "warm", "playful", "startup"] },
  { key: "corporate", label: "Corporate", moods: ["professional", "corporate", "trustworthy", "systematic"] },
  { key: "creative", label: "Creative", moods: ["creative", "distinctive", "geometric", "curated", "nordic"] },
  { key: "academic", label: "Academic", moods: ["academic", "scholarly", "refined", "readable", "universal"] },
];

export const SOCIAL_LINKS = {
  x: {
    url: "https://x.com/kapish_dima",
    label: "Follow on X",
  },
  github: {
    url: "https://github.com/kapishdima/fonttrio",
    label: "View on GitHub",
  },
} as const;
