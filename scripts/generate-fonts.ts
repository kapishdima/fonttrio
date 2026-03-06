/**
 * Fetches Google Fonts metadata and generates registry:font JSON files
 * for the top ~100 most popular fonts.
 *
 * Usage: bun run scripts/generate-fonts.ts
 */

import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const FONTS_DIR = join(import.meta.dir, "..", "registry", "fonts");
const TOP_N = 100;

interface GoogleFontItem {
  family: string;
  variants: string[];
  subsets: string[];
  category: string;
  popularity: number;
}

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

async function main() {
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

  // Sort by popularity (lower number = more popular)
  families.sort((a, b) => a.popularity - b.popularity);
  const top = families.slice(0, TOP_N);

  mkdirSync(FONTS_DIR, { recursive: true });

  let count = 0;
  for (const font of top) {
    const kebab = toKebab(font.family);
    const registryFont = {
      name: kebab,
      type: "registry:font",
      title: font.family,
      description: `${font.family} — ${font.category} font from Google Fonts.`,
      font: {
        family: font.family,
        provider: "google",
        import: toImportName(font.family),
        variable: `--font-${kebab}`,
        weight: extractWeights(font.variants),
        subsets: font.subsets,
      },
    };

    writeFileSync(
      join(FONTS_DIR, `${kebab}.json`),
      JSON.stringify(registryFont, null, 2) + "\n"
    );
    count++;
  }

  console.log(`Generated ${count} font registry items in registry/fonts/`);
}

main().catch(console.error);
