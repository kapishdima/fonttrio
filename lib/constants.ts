import type { FontCategory } from "@/lib/pairings";

export type CategoryFilter = "all" | FontCategory;

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

export const GITHUB_REPO = "kapishdima/fonttrio";

export const REPULSOR = {
  radius: 150,
  maxRepulse: 30,
  maxScale: 1.4,
  maxOpacity: 1.0,
  baseOpacity: 0.25,
}

const SCATTER_CONFIG = {
  count: 200,
  minDistance: 80,
  innerRadius: 1000, // px — пустота в центре (радиус)
  maxAttempts: 150,
};

export const CHAOS_TRANSITION = {
  duration: 0.1,
  stagger: 0.003,
}

export const HERO_TRANSITION = {
  stagger: 0.25,
  delay: (SCATTER_CONFIG.count - 1) * CHAOS_TRANSITION.stagger + CHAOS_TRANSITION.duration * 0.6,
  duration: 0.7,
  ease: [0.34, 1.56, 0.64, 1],
} as const

export const HEADER_TRANSITION = {
  delay: HERO_TRANSITION.delay + HERO_TRANSITION.stagger * 2,
  duration: 0.7,
  ease: [0.34, 1.56, 0.64, 1],
} as const

