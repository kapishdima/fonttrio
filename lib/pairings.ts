import { readdirSync, readFileSync } from "fs";
import { join } from "path";

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
  appearance: string[];
  subsets: string[];
  description: string;
  scale: TypographyScale;
  googleFontsUrl: string;
}

// --- JSON types from registry/pairings/*.json ---

interface PairingJson {
  name: string;
  title: string;
  description: string;
  categories: string[];
  registryDependencies: string[];
  cssVars: { theme: Record<string, string> };
  css: Record<string, Record<string, string>>;
  meta: {
    mood: string[];
    useCase: string[];
    appearance?: string[];
    preview?: string;
  };
}

interface FontJson {
  name: string;
  title: string;
  description: string;
  category?: string;
  font: {
    family: string;
    provider: string;
    import: string;
    variable: string;
    weight: string[];
    subsets?: string[];
  };
}

// --- Loader (cached at module level, read once per process) ---

const REGISTRY_DIR = join(process.cwd(), "registry");
const PAIRINGS_DIR = join(REGISTRY_DIR, "pairings");
const FONTS_DIR = join(REGISTRY_DIR, "fonts");
const POPULAR_PAIRING_DIR = join(PAIRINGS_DIR, "popular");

let _cachedFontFamilies: Map<string, string> | null = null;
let _cachedFontSubsets: Map<string, string[]> | null = null;

function loadFontMeta(): { families: Map<string, string>; subsets: Map<string, string[]> } {
  if (_cachedFontFamilies && _cachedFontSubsets) {
    return { families: _cachedFontFamilies, subsets: _cachedFontSubsets };
  }

  const families = new Map<string, string>();
  const subsets = new Map<string, string[]>();

  try {
    for (const f of readdirSync(FONTS_DIR).filter((f) => f.endsWith(".json"))) {
      const data = JSON.parse(readFileSync(join(FONTS_DIR, f), "utf-8")) as FontJson;
      families.set(data.name, data.font?.family || data.title);
      if (data.font?.subsets) {
        subsets.set(data.name, data.font.subsets);
      }
    }
  } catch {
    /* fonts dir might not exist */
  }

  _cachedFontFamilies = families;
  _cachedFontSubsets = subsets;
  return { families, subsets };
}

function kebabToTitle(kebab: string): string {
  return kebab
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function inferCategory(fontKebab: string): FontCategory {
  try {
    const fontPath = join(FONTS_DIR, `${fontKebab}.json`);
    const data = JSON.parse(readFileSync(fontPath, "utf-8")) as FontJson;
    const desc = `${data.title} ${data.description}`.toLowerCase();
    if (desc.includes("mono")) return "monospace";
    if (desc.includes("serif") && !desc.includes("sans")) return "serif";
    return "sans-serif";
  } catch {
    if (fontKebab.includes("mono")) return "monospace";
    if (fontKebab.includes("serif") && !fontKebab.includes("sans")) return "serif";
    return "sans-serif";
  }
}

function buildGoogleFontsUrl(
  heading: string,
  body: string,
  mono: string,
): string {
  const parts: string[] = [];
  parts.push(`family=${heading.replace(/ /g, "+")}:wght@400;500;600;700`);
  if (body !== heading) {
    parts.push(`family=${body.replace(/ /g, "+")}:wght@400;500;600`);
  }
  if (mono !== heading && mono !== body) {
    parts.push(`family=${mono.replace(/ /g, "+")}:wght@400;500`);
  }

  return `https://fonts.googleapis.com/css2?${parts.join("&")}&display=swap`;
}

function computeSubsets(fontKebabs: string[], fontSubsets: Map<string, string[]>): string[] {
  const sets = fontKebabs
    .map((k) => fontSubsets.get(k))
    .filter((s): s is string[] => !!s);

  if (sets.length === 0) return [];

  // Intersection of all fonts' subsets
  let result = new Set(sets[0]);
  for (let i = 1; i < sets.length; i++) {
    const current = new Set(sets[i]);
    result = new Set([...result].filter((s) => current.has(s)));
  }

  // Filter out non-language subsets
  result.delete("menu");
  return Array.from(result).sort();
}

function loadPairings(path: string = PAIRINGS_DIR): PairingData[] {

  const { families, subsets: fontSubsets } = loadFontMeta();

  const files = readdirSync(path)
    .filter((f) => f.endsWith(".json"))
    .sort();

  const pairings: PairingData[] = [];

  for (const file of files) {
    const raw = JSON.parse(readFileSync(join(path, file), "utf-8")) as PairingJson;
    const name = raw.name;

    // Extract font kebab names from cssVars
    const headingKebab = raw.cssVars?.theme?.["--font-heading"]?.match(/var\(--font-(.+)\)/)?.[1] || "";
    const bodyKebab = raw.cssVars?.theme?.["--font-body"]?.match(/var\(--font-(.+)\)/)?.[1] || "";
    const monoKebab = raw.cssVars?.theme?.["--font-mono"]?.match(/var\(--font-(.+)\)/)?.[1] || "";

    const heading = (families.get(headingKebab) || kebabToTitle(headingKebab)).replace(/ Variable$/, "");
    const body = (families.get(bodyKebab) || kebabToTitle(bodyKebab)).replace(/ Variable$/, "");
    const mono = (families.get(monoKebab) || kebabToTitle(monoKebab)).replace(/ Variable$/, "");

    const headingCategory = inferCategory(headingKebab);
    const bodyCategory = inferCategory(bodyKebab);

    // Extract scale from css
    const cssBlock = raw.css?.["@layer base"] || raw.css || {};
    const h1CSS = cssBlock["h1"] || {};
    const h2CSS = cssBlock["h2"] || {};
    const h3CSS = cssBlock["h3"] || {};
    const h4CSS = cssBlock["h4, h5, h6"] || cssBlock["h4"] || {};
    const bodyCSS = cssBlock["body, p"] || cssBlock["body"] || {};

    function scaleEntry(
      obj: Record<string, string>,
      defaults: { size: string; weight: number; lineHeight: string; letterSpacing: string },
    ) {
      return {
        size: obj["font-size"] || defaults.size,
        weight: parseInt(obj["font-weight"] || String(defaults.weight)),
        lineHeight: obj["line-height"] || defaults.lineHeight,
        letterSpacing: obj["letter-spacing"] || defaults.letterSpacing,
      };
    }

    const scale: TypographyScale = {
      h1: scaleEntry(h1CSS, { size: "2.25rem", weight: 700, lineHeight: "1.2", letterSpacing: "-0.025em" }),
      h2: scaleEntry(h2CSS, { size: "1.875rem", weight: 600, lineHeight: "1.25", letterSpacing: "-0.02em" }),
      h3: scaleEntry(h3CSS, { size: "1.5rem", weight: 600, lineHeight: "1.3", letterSpacing: "-0.015em" }),
      h4: scaleEntry(h4CSS, { size: "1.25rem", weight: 500, lineHeight: "1.35", letterSpacing: "-0.01em" }),
      h5: scaleEntry({}, { size: "1.125rem", weight: 500, lineHeight: "1.4", letterSpacing: "0em" }),
      h6: scaleEntry({}, { size: "1rem", weight: 500, lineHeight: "1.5", letterSpacing: "0em" }),
      body: {
        size: bodyCSS["font-size"] || "1rem",
        lineHeight: bodyCSS["line-height"] || "1.6",
        weight: parseInt(bodyCSS["font-weight"] || "400"),
      },
    };

    const pairingSubsets = computeSubsets([headingKebab, bodyKebab, monoKebab], fontSubsets);

    pairings.push({
      name,
      heading,
      headingCategory,
      body,
      bodyCategory,
      mono,
      mood: raw.meta?.mood || [],
      useCase: raw.meta?.useCase || [],
      appearance: raw.meta?.appearance || [],
      subsets: pairingSubsets,
      description: raw.description,
      scale,
      googleFontsUrl: buildGoogleFontsUrl(heading, body, mono),
    });
  }

  return pairings;
}

// --- Public API (same as before) ---


export function getAllPairings(): PairingData[] {
  return loadPairings();
}


export function getAllPopularPairings(): PairingData[] {
  return loadPairings(POPULAR_PAIRING_DIR);
}

export function getPairing(name: string): PairingData | undefined {
  return loadPairings().find((p) => p.name === name);
}

export function getPairingsByMood(mood: string): PairingData[] {
  return loadPairings().filter((p) => p.mood.includes(mood));
}

export function getPairingsByCategory(category: FontCategory): PairingData[] {
  return loadPairings().filter((p) => p.headingCategory === category);
}

export function getAllMoods(): string[] {
  const moods = new Set<string>();
  loadPairings().forEach((p) => p.mood.forEach((m) => moods.add(m)));
  return Array.from(moods);
}

export function getAllGoogleFontsUrls(): string[] {
  const urls = new Set<string>();
  loadPairings().forEach((p) => {
    if (p.googleFontsUrl) {
      urls.add(p.googleFontsUrl);
    }
  });
  return Array.from(urls);
}

export function getPairingGoogleFontsUrl(name: string): string | null {
  const pairing = getPairing(name);
  return pairing?.googleFontsUrl ?? null;
}
