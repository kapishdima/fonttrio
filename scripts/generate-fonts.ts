/**
 * Fetches Google Fonts metadata and generates registry:font JSON files
 * for ALL available Google Fonts (~1700+ families).
 *
 * Usage: bun run scripts/generate-fonts.ts
 */

import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

const FONTS_DIR = join(import.meta.dir, "..", "registry", "fonts");
const PAIRINGS_DIR = join(import.meta.dir, "..", "registry", "pairings");

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
        // Extract font name from URL like "https://www.fonttrio.xyz/r/playfair-display.json"
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

const FONTSOURCE_CACHE = new Map<string, boolean>(); // true = variable exists

async function hasVariablePackage(kebab: string): Promise<boolean> {
  if (FONTSOURCE_CACHE.has(kebab)) return FONTSOURCE_CACHE.get(kebab)!;
  const res = await fetch(
    `https://registry.npmjs.org/@fontsource-variable/${kebab}`,
    { method: "HEAD" }
  );
  const exists = res.status === 200;
  FONTSOURCE_CACHE.set(kebab, exists);
  return exists;
}

async function checkAllFonts(
  kebabs: string[],
  concurrency = 20
): Promise<Map<string, boolean>> {
  const results = new Map<string, boolean>();
  const chunks: string[][] = [];
  for (let i = 0; i < kebabs.length; i += concurrency) {
    chunks.push(kebabs.slice(i, i + concurrency));
  }
  let done = 0;
  for (const chunk of chunks) {
    const settled = await Promise.all(
      chunk.map(async (k) => ({ k, ok: await hasVariablePackage(k) }))
    );
    for (const { k, ok } of settled) results.set(k, ok);
    done += chunk.length;
    process.stdout.write(`\r  ${done}/${kebabs.length} checked...`);
  }
  process.stdout.write("\n");
  return results;
}

function writeFont(opts: {
  family: string;
  category: string;
  weights: string[];
  subsets: string[];
  provider: string;
  npmPackage?: string;
  dependency?: string;
}): void {
  const kebab = toKebab(opts.family);
  // No dependency → @fontsource-variable exists → append " Variable" to family name
  // dependency set → only regular @fontsource available → keep family name as-is
  const fontFamily =
    opts.provider === "google"
      ? opts.dependency
        ? opts.family
        : `${opts.family} Variable`
      : opts.family;

  const registryFont: Record<string, unknown> = {
    name: kebab,
    type: "registry:font",
    category: opts.category,
    title: opts.family,
    description: `${opts.family} — ${opts.category} font.`,
    font: {
      family: fontFamily,
      provider: opts.provider,
      import: toImportName(opts.family),
      variable: `--font-${kebab}`,
      weight: opts.weights,
      subsets: opts.subsets,
      ...(opts.dependency ? { dependency: opts.dependency } : {}),
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

  mkdirSync(FONTS_DIR, { recursive: true });

  // Check @fontsource-variable availability for all Google Fonts
  console.log("Checking @fontsource-variable availability on npm...");
  const kebabs = families.map((f) => toKebab(f.family));
  const variableMap = await checkAllFonts(kebabs);

  // Generate ALL Google Fonts
  let count = 0;
  for (const font of families) {
    const kebab = toKebab(font.family);
    const hasVariable = variableMap.get(kebab) ?? false;
    writeFont({
      family: font.family,
      category: font.category,
      weights: extractWeights(font.variants),
      subsets: font.subsets,
      provider: "google",
      dependency: hasVariable ? undefined : `@fontsource/${kebab}`,
    });
    count++;
  }

  // Generate manual fonts (npm-based, e.g. Geist)
  for (const manual of MANUAL_FONTS) {
    const kebab = toKebab(manual.family);
    // Skip if already generated from Google Fonts
    if (families.some((f) => toKebab(f.family) === kebab)) continue;

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
    `Generated ${count} font registry items (${families.length} from Google Fonts + manual)`
  );
}

main().catch(console.error);
