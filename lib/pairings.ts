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

const PAIRINGS: PairingData[] = [
  {
    name: "editorial",
    heading: "Playfair Display",
    headingCategory: "serif",
    body: "Source Serif 4",
    bodyCategory: "serif",
    mono: "JetBrains Mono",
    mood: ["elegant", "traditional"],
    useCase: ["blog", "editorial", "magazine"],
    description:
      "Classic editorial pairing. High-contrast serif headings with readable serif body text.",
    scale: {
      h1: { size: "3.5rem", weight: 700, lineHeight: "1.1", letterSpacing: "-0.02em" },
      h2: { size: "2.5rem", weight: 700, lineHeight: "1.15", letterSpacing: "-0.015em" },
      h3: { size: "2rem", weight: 600, lineHeight: "1.2", letterSpacing: "-0.01em" },
      h4: { size: "1.5rem", weight: 600, lineHeight: "1.3", letterSpacing: "-0.005em" },
      h5: { size: "1.25rem", weight: 600, lineHeight: "1.4", letterSpacing: "0em" },
      h6: { size: "1rem", weight: 600, lineHeight: "1.5", letterSpacing: "0.01em" },
      body: { size: "1.125rem", lineHeight: "1.75", weight: 400 },
    },
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Serif+4:wght@400;600&family=JetBrains+Mono:wght@400;500&display=swap",
  },
  {
    name: "modern-clean",
    heading: "Inter",
    headingCategory: "sans-serif",
    body: "Inter",
    bodyCategory: "sans-serif",
    mono: "Geist Mono",
    mood: ["clean", "neutral"],
    useCase: ["SaaS", "dashboard", "web app"],
    description:
      "The Swiss Army knife. Clean geometric sans for everything.",
    scale: {
      h1: { size: "3rem", weight: 700, lineHeight: "1.1", letterSpacing: "-0.03em" },
      h2: { size: "2.25rem", weight: 600, lineHeight: "1.15", letterSpacing: "-0.02em" },
      h3: { size: "1.75rem", weight: 600, lineHeight: "1.2", letterSpacing: "-0.015em" },
      h4: { size: "1.375rem", weight: 600, lineHeight: "1.3", letterSpacing: "-0.01em" },
      h5: { size: "1.125rem", weight: 600, lineHeight: "1.4", letterSpacing: "-0.005em" },
      h6: { size: "1rem", weight: 600, lineHeight: "1.5", letterSpacing: "0em" },
      body: { size: "1rem", lineHeight: "1.65", weight: 400 },
    },
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
  },
  {
    name: "technical",
    heading: "IBM Plex Sans",
    headingCategory: "sans-serif",
    body: "IBM Plex Sans",
    bodyCategory: "sans-serif",
    mono: "IBM Plex Mono",
    mood: ["professional", "corporate"],
    useCase: ["documentation", "enterprise", "developer tools"],
    description:
      "IBM's design language. Professional and highly legible superfamily.",
    scale: {
      h1: { size: "3rem", weight: 600, lineHeight: "1.15", letterSpacing: "-0.02em" },
      h2: { size: "2.25rem", weight: 600, lineHeight: "1.2", letterSpacing: "-0.015em" },
      h3: { size: "1.75rem", weight: 500, lineHeight: "1.25", letterSpacing: "-0.01em" },
      h4: { size: "1.375rem", weight: 500, lineHeight: "1.3", letterSpacing: "0em" },
      h5: { size: "1.125rem", weight: 500, lineHeight: "1.4", letterSpacing: "0em" },
      h6: { size: "1rem", weight: 500, lineHeight: "1.5", letterSpacing: "0.01em" },
      body: { size: "1rem", lineHeight: "1.7", weight: 400 },
    },
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap",
  },
  {
    name: "creative",
    heading: "Space Grotesk",
    headingCategory: "sans-serif",
    body: "DM Sans",
    bodyCategory: "sans-serif",
    mono: "Fira Code",
    mood: ["playful", "startup"],
    useCase: ["landing page", "startup", "portfolio"],
    description:
      "Geometric meets friendly. Space Grotesk's personality with DM Sans readability.",
    scale: {
      h1: { size: "3.25rem", weight: 700, lineHeight: "1.1", letterSpacing: "-0.025em" },
      h2: { size: "2.375rem", weight: 600, lineHeight: "1.15", letterSpacing: "-0.02em" },
      h3: { size: "1.875rem", weight: 600, lineHeight: "1.2", letterSpacing: "-0.01em" },
      h4: { size: "1.5rem", weight: 500, lineHeight: "1.3", letterSpacing: "-0.005em" },
      h5: { size: "1.25rem", weight: 500, lineHeight: "1.4", letterSpacing: "0em" },
      h6: { size: "1rem", weight: 500, lineHeight: "1.5", letterSpacing: "0.01em" },
      body: { size: "1.0625rem", lineHeight: "1.7", weight: 400 },
    },
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@400;500;600&family=Fira+Code:wght@400;500&display=swap",
  },
  {
    name: "classic",
    heading: "DM Serif Display",
    headingCategory: "serif",
    body: "Libre Baskerville",
    bodyCategory: "serif",
    mono: "JetBrains Mono",
    mood: ["literary", "warm"],
    useCase: ["blog", "publishing", "book"],
    description:
      "Warm transitional serifs. Literary feel with excellent screen readability.",
    scale: {
      h1: { size: "3.5rem", weight: 400, lineHeight: "1.1", letterSpacing: "-0.01em" },
      h2: { size: "2.5rem", weight: 400, lineHeight: "1.15", letterSpacing: "-0.01em" },
      h3: { size: "2rem", weight: 400, lineHeight: "1.2", letterSpacing: "0em" },
      h4: { size: "1.5rem", weight: 400, lineHeight: "1.3", letterSpacing: "0em" },
      h5: { size: "1.25rem", weight: 400, lineHeight: "1.4", letterSpacing: "0em" },
      h6: { size: "1rem", weight: 400, lineHeight: "1.5", letterSpacing: "0.01em" },
      body: { size: "1.125rem", lineHeight: "1.8", weight: 400 },
    },
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Libre+Baskerville:wght@400;700&family=JetBrains+Mono:wght@400;500&display=swap",
  },
  {
    name: "minimal",
    heading: "Geist",
    headingCategory: "sans-serif",
    body: "Geist",
    bodyCategory: "sans-serif",
    mono: "Geist Mono",
    mood: ["modern", "minimal"],
    useCase: ["SaaS", "developer tools", "Vercel-style"],
    description:
      "Vercel's type system. Designed for interfaces, optimized for screens.",
    scale: {
      h1: { size: "3rem", weight: 700, lineHeight: "1.1", letterSpacing: "-0.03em" },
      h2: { size: "2.25rem", weight: 600, lineHeight: "1.15", letterSpacing: "-0.025em" },
      h3: { size: "1.75rem", weight: 600, lineHeight: "1.2", letterSpacing: "-0.02em" },
      h4: { size: "1.375rem", weight: 500, lineHeight: "1.3", letterSpacing: "-0.01em" },
      h5: { size: "1.125rem", weight: 500, lineHeight: "1.4", letterSpacing: "0em" },
      h6: { size: "1rem", weight: 500, lineHeight: "1.5", letterSpacing: "0em" },
      body: { size: "1rem", lineHeight: "1.65", weight: 400 },
    },
    googleFontsUrl: "",
  },
];

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
