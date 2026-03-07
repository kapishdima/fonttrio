/**
 * Fetches Google Fonts metadata and generates registry:font JSON files
 * for the top ~100 most popular fonts + all fonts required by pairings.
 *
 * Usage: bun run scripts/generate-fonts.ts
 */

import { writeFileSync, mkdirSync, readdirSync, readFileSync } from "fs";
import { join } from "path";

const FONTS_DIR = join(import.meta.dir, "..", "registry", "fonts");
const PAIRINGS_DIR = join(import.meta.dir, "..", "registry", "pairings");
const TOP_N = 100;

/**
 * Fonts required by pairings that must be included regardless of popularity.
 * Also includes fonts not on Google Fonts (e.g. Vercel's Geist) with manual metadata.
 */
const REQUIRED_FAMILIES = new Set<string>();

/** Fonts not available on Google Fonts — defined manually */
const MANUAL_FONTS: Array<{
  family: string;
  category: string;
  weights: string[];
  subsets: string[];
  provider: "npm";
  npmPackage: string;
}> = [
  {
    family: "Geist",
    category: "sans-serif",
    weights: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin", "latin-ext"],
    provider: "npm",
    npmPackage: "geist",
  },
  {
    family: "Geist Mono",
    category: "monospace",
    weights: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin", "latin-ext"],
    provider: "npm",
    npmPackage: "geist",
  },
];

function toKebab(family: string): string {
  return family
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function toImportName(family: string): string {
  return family.replace(/ /g, "_");
}

function extractWeights(variants: string[]): string[] {
  const weights = new Set<string>();
  for (const v of variants) {
    const match = v.match(/^(\d+)/);
    if (match) {
      weights.add(match[1]);
    } else if (v === "regular" || v === "italic") {
      weights.add("400");
    }
  }
  return Array.from(weights).sort();
}

/** Scan pairing JSONs to find all required font families */
function collectRequiredFonts(): void {
  try {
    const files = readdirSync(PAIRINGS_DIR).filter((f) => f.endsWith(".json"));
    for (const file of files) {
      const content = JSON.parse(readFileSync(join(PAIRINGS_DIR, file), "utf-8"));
      const deps: string[] = content.registryDependencies || [];
      for (const dep of deps) {
        // Extract font name from URL like "https://fonttrio.dev/r/playfair-display.json"
        const match = dep.match(/\/r\/(.+)\.json$/);
        if (match) {
          REQUIRED_FAMILIES.add(match[1]);
        }
      }
    }
  } catch {
    // Pairings dir might not exist yet
  }
  console.log(`Required by pairings: ${REQUIRED_FAMILIES.size} fonts`);
}

function writeFont(opts: {
  family: string;
  category: string;
  weights: string[];
  subsets: string[];
  provider: string;
  npmPackage?: string;
}): void {
  const kebab = toKebab(opts.family);
  const registryFont: Record<string, unknown> = {
    name: kebab,
    type: "registry:font",
    title: opts.family,
    description: `${opts.family} — ${opts.category} font.`,
    font: {
      family: opts.family,
      provider: opts.provider,
      import: toImportName(opts.family),
      variable: `--font-${kebab}`,
      weight: opts.weights,
      subsets: opts.subsets,
    },
  };

  if (opts.npmPackage) {
    (registryFont.font as Record<string, unknown>).npmPackage = opts.npmPackage;
  }

  writeFileSync(
    join(FONTS_DIR, `${kebab}.json`),
    JSON.stringify(registryFont, null, 2) + "\n"
  );
}

async function main() {
  collectRequiredFonts();

  console.log("Fetching Google Fonts metadata...");
  const res = await fetch("https://fonts.google.com/metadata/fonts");
  const text = await res.text();
  // The response starts with ")]}'" which needs to be stripped
  const json = JSON.parse(text.replace(/^\)]\}'?\n?/, ""));

  const families: Array<{
    family: string;
    variants: string[];
    subsets: string[];
    category: string;
    popularity: number;
  }> = [];

  for (const item of json.familyMetadataList) {
    const weights = Object.keys(item.fonts || {}).filter(
      (k) => !k.includes("i")
    );
    families.push({
      family: item.family,
      variants: weights.length > 0 ? weights : ["400"],
      subsets: item.subsets || ["latin"],
      category: item.category || "sans-serif",
      popularity: item.popularity || 999,
    });
  }

  // Build a lookup by kebab name
  const familyByKebab = new Map<string, (typeof families)[0]>();
  for (const f of families) {
    familyByKebab.set(toKebab(f.family), f);
  }

  // Sort by popularity (lower number = more popular)
  families.sort((a, b) => a.popularity - b.popularity);
  const top = families.slice(0, TOP_N);

  // Collect the set of fonts to generate (top N + required by pairings)
  const toGenerate = new Map<string, (typeof families)[0]>();
  for (const font of top) {
    toGenerate.set(toKebab(font.family), font);
  }

  // Add required fonts that aren't already in top N
  let extraCount = 0;
  for (const kebab of REQUIRED_FAMILIES) {
    if (!toGenerate.has(kebab)) {
      const font = familyByKebab.get(kebab);
      if (font) {
        toGenerate.set(kebab, font);
        extraCount++;
      }
    }
  }

  mkdirSync(FONTS_DIR, { recursive: true });

  // Generate Google Fonts
  let count = 0;
  for (const [, font] of toGenerate) {
    writeFont({
      family: font.family,
      category: font.category,
      weights: extractWeights(font.variants),
      subsets: font.subsets,
      provider: "google",
    });
    count++;
  }

  // Generate manual fonts (npm-based, e.g. Geist)
  for (const manual of MANUAL_FONTS) {
    const kebab = toKebab(manual.family);
    // Skip if already required and generated from Google Fonts
    if (toGenerate.has(kebab)) continue;

    writeFont({
      family: manual.family,
      category: manual.category,
      weights: manual.weights,
      subsets: manual.subsets,
      provider: manual.provider,
      npmPackage: manual.npmPackage,
    });
    count++;
  }

  console.log(
    `Generated ${count} font registry items (top ${TOP_N} + ${extraCount} from pairings + ${MANUAL_FONTS.length} manual)`
  );
}

main().catch(console.error);
