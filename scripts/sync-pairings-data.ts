/**
 * Syncs registry/pairings/*.json → lib/pairings-data.ts
 * Generates a static TypeScript file with all pairing data
 * that can be imported by both server and client components.
 *
 * Usage: bun run scripts/sync-pairings-data.ts
 */

import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

const PAIRINGS_DIR = join(import.meta.dir, "..", "registry", "pairings");
const OUTPUT = join(import.meta.dir, "..", "lib", "pairings-data.ts");

interface PairingJson {
  name: string;
  title: string;
  description: string;
  categories: string[];
  registryDependencies: string[];
  cssVars: { theme: Record<string, string> };
  css: Record<string, Record<string, string>>;
  meta: { mood: string[]; useCase: string[] };
}

function toKebab(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Extract font family from CSS var reference like "var(--font-playfair-display)" */
function varToFamily(cssVar: string, fonts: Map<string, string>): string {
  const match = cssVar.match(/var\(--font-(.+)\)/);
  if (!match) return cssVar;
  return fonts.get(match[1]) || kebabToTitle(match[1]);
}

function kebabToTitle(kebab: string): string {
  return kebab
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/** Infer category from font dependency URL and registry font data */
function inferCategory(fontKebab: string, fontsDir: string): "serif" | "sans-serif" | "monospace" {
  try {
    const fontPath = join(fontsDir, "..", "fonts", `${fontKebab}.json`);
    const data = JSON.parse(readFileSync(fontPath, "utf-8"));
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

function main() {
  const files = readdirSync(PAIRINGS_DIR)
    .filter((f) => f.endsWith(".json"))
    .sort();

  // Load all font metadata for family name resolution
  const fontsDir = join(import.meta.dir, "..", "registry", "fonts");
  const fontFamilies = new Map<string, string>();
  try {
    for (const f of readdirSync(fontsDir).filter((f) => f.endsWith(".json"))) {
      const data = JSON.parse(readFileSync(join(fontsDir, f), "utf-8"));
      fontFamilies.set(data.name, data.font?.family || data.title);
    }
  } catch { /* fonts dir might not exist */ }

  const pairings: string[] = [];

  for (const file of files) {
    const raw = JSON.parse(readFileSync(join(PAIRINGS_DIR, file), "utf-8")) as PairingJson;
    const name = raw.name.replace("pairing-", "");

    // Extract font kebab names from cssVars
    const headingVar = raw.cssVars?.theme?.["--font-heading"] || "";
    const bodyVar = raw.cssVars?.theme?.["--font-body"] || "";
    const monoVar = raw.cssVars?.theme?.["--font-mono"] || "";

    const headingKebab = headingVar.match(/var\(--font-(.+)\)/)?.[1] || "";
    const bodyKebab = bodyVar.match(/var\(--font-(.+)\)/)?.[1] || "";
    const monoKebab = monoVar.match(/var\(--font-(.+)\)/)?.[1] || "";

    const heading = fontFamilies.get(headingKebab) || kebabToTitle(headingKebab);
    const body = fontFamilies.get(bodyKebab) || kebabToTitle(bodyKebab);
    const mono = fontFamilies.get(monoKebab) || kebabToTitle(monoKebab);

    const headingCategory = inferCategory(headingKebab, PAIRINGS_DIR);
    const bodyCategory = inferCategory(bodyKebab, PAIRINGS_DIR);

    // Extract scale from css
    const css = raw.css || {};
    const h1 = css["h1"] || {};
    const h2 = css["h2"] || {};
    const h3 = css["h3"] || {};
    const h4 = css["h4, h5, h6"] || css["h4"] || {};
    const bodyCSS = css["body, p"] || css["body"] || {};

    function scaleEntry(
      obj: Record<string, string>,
      defaults: { size: string; weight: number; lineHeight: string; letterSpacing: string }
    ) {
      return {
        size: obj["font-size"] || defaults.size,
        weight: parseInt(obj["font-weight"] || String(defaults.weight)),
        lineHeight: obj["line-height"] || defaults.lineHeight,
        letterSpacing: obj["letter-spacing"] || defaults.letterSpacing,
      };
    }

    const scale = {
      h1: scaleEntry(h1, { size: "2.25rem", weight: 700, lineHeight: "1.2", letterSpacing: "-0.025em" }),
      h2: scaleEntry(h2, { size: "1.875rem", weight: 600, lineHeight: "1.25", letterSpacing: "-0.02em" }),
      h3: scaleEntry(h3, { size: "1.5rem", weight: 600, lineHeight: "1.3", letterSpacing: "-0.015em" }),
      h4: scaleEntry(h4, { size: "1.25rem", weight: 500, lineHeight: "1.35", letterSpacing: "-0.01em" }),
      h5: scaleEntry({}, { size: "1.125rem", weight: 500, lineHeight: "1.4", letterSpacing: "0em" }),
      h6: scaleEntry({}, { size: "1rem", weight: 500, lineHeight: "1.5", letterSpacing: "0em" }),
      body: {
        size: bodyCSS["font-size"] || "1rem",
        lineHeight: bodyCSS["line-height"] || "1.6",
        weight: parseInt(bodyCSS["font-weight"] || "400"),
      },
    };

    // Build Google Fonts URL
    const uniqueFonts = new Set([heading, body]);
    const googleFontsUrl = buildGoogleFontsUrl(heading, body, mono, headingKebab, bodyKebab, monoKebab);

    const entry = `  {
    name: ${JSON.stringify(name)},
    heading: ${JSON.stringify(heading)},
    headingCategory: ${JSON.stringify(headingCategory)},
    body: ${JSON.stringify(body)},
    bodyCategory: ${JSON.stringify(bodyCategory)},
    mono: ${JSON.stringify(mono)},
    mood: ${JSON.stringify(raw.meta?.mood || [])},
    useCase: ${JSON.stringify(raw.meta?.useCase || [])},
    description: ${JSON.stringify(raw.description)},
    scale: ${JSON.stringify(scale, null, 6).replace(/\n/g, "\n    ")},
    googleFontsUrl: ${JSON.stringify(googleFontsUrl)},
  }`;

    pairings.push(entry);
  }

  const output = `// AUTO-GENERATED by scripts/sync-pairings-data.ts
// Do not edit manually. Edit registry/pairings/*.json and re-run the script.

import type { PairingData } from "./pairings";

export const PAIRINGS_DATA: PairingData[] = [
${pairings.join(",\n")}
];
`;

  writeFileSync(OUTPUT, output);
  console.log(`Generated lib/pairings-data.ts with ${pairings.length} pairings`);
}

function buildGoogleFontsUrl(
  heading: string,
  body: string,
  mono: string,
  headingKebab: string,
  bodyKebab: string,
  monoKebab: string,
): string {
  // Skip non-Google fonts (Geist)
  if (headingKebab === "geist" || bodyKebab === "geist" || monoKebab === "geist-mono") {
    // Build partial URL for the Google fonts in this pairing
    const parts: string[] = [];
    if (headingKebab !== "geist") parts.push(`family=${heading.replace(/ /g, "+")}:wght@400;500;600;700`);
    if (bodyKebab !== "geist" && body !== heading) parts.push(`family=${body.replace(/ /g, "+")}:wght@400;500;600`);
    if (monoKebab !== "geist-mono") parts.push(`family=${mono.replace(/ /g, "+")}:wght@400;500`);
    if (parts.length === 0) return "";
    return `https://fonts.googleapis.com/css2?${parts.join("&")}&display=swap`;
  }

  const parts: string[] = [];
  parts.push(`family=${heading.replace(/ /g, "+")}:wght@400;500;600;700`);
  if (body !== heading) {
    parts.push(`family=${body.replace(/ /g, "+")}:wght@400;500;600`);
  }
  parts.push(`family=${mono.replace(/ /g, "+")}:wght@400;500`);

  return `https://fonts.googleapis.com/css2?${parts.join("&")}&display=swap`;
}

main();
