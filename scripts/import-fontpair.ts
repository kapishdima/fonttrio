/**
 * Imports font pairings from fontpair-data.json into registry/pairings/.
 * Reads pre-scraped data from fontpair.co and generates registry:style JSONs.
 *
 * Usage: bun run scripts/import-fontpair.ts
 */

import { writeFileSync, mkdirSync, existsSync, readFileSync } from "fs";
import { join } from "path";

const PAIRINGS_DIR = join(import.meta.dir, "..", "registry", "pairings");
const BASE_URL = "https://www.fonttrio.xyz";
const DATA_FILE = join(import.meta.dir, "fontpair-data.json");

function toKebab(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ── Mono font pool (randomly assigned) ──
const MONO_FONTS = [
  "JetBrains Mono",
  "Fira Code",
  "Source Code Pro",
  "Inconsolata",
  "IBM Plex Mono",
  "Roboto Mono",
];

// Deterministic "random" based on string hash
function pickMono(heading: string, body: string): string {
  let hash = 0;
  const str = heading + body;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) | 0;
  }
  return MONO_FONTS[Math.abs(hash) % MONO_FONTS.length];
}

// ── Typography scale presets ──
const SCALE_PRESETS: Record<
  string,
  {
    h1: Record<string, string>;
    h2: Record<string, string>;
    h3: Record<string, string>;
    h4h5h6: Record<string, string>;
    body: Record<string, string>;
  }
> = {
  "serif-editorial": {
    h1: {
      "font-size": "2.25rem",
      "line-height": "1.2",
      "letter-spacing": "-0.025em",
      "font-weight": "700",
    },
    h2: {
      "font-size": "1.875rem",
      "line-height": "1.25",
      "letter-spacing": "-0.02em",
      "font-weight": "600",
    },
    h3: {
      "font-size": "1.5rem",
      "line-height": "1.3",
      "letter-spacing": "-0.015em",
      "font-weight": "600",
    },
    h4h5h6: { "letter-spacing": "-0.01em" },
    body: { "line-height": "1.65" },
  },
  "sans-clean": {
    h1: {
      "font-size": "2.25rem",
      "line-height": "1.15",
      "letter-spacing": "-0.03em",
      "font-weight": "700",
    },
    h2: {
      "font-size": "1.875rem",
      "line-height": "1.2",
      "letter-spacing": "-0.025em",
      "font-weight": "600",
    },
    h3: {
      "font-size": "1.5rem",
      "line-height": "1.25",
      "letter-spacing": "-0.02em",
      "font-weight": "600",
    },
    h4h5h6: { "letter-spacing": "-0.01em" },
    body: { "line-height": "1.6" },
  },
  "sans-geometric": {
    h1: {
      "font-size": "2.5rem",
      "line-height": "1.1",
      "letter-spacing": "-0.03em",
      "font-weight": "700",
    },
    h2: {
      "font-size": "2rem",
      "line-height": "1.15",
      "letter-spacing": "-0.025em",
      "font-weight": "600",
    },
    h3: {
      "font-size": "1.5rem",
      "line-height": "1.25",
      "letter-spacing": "-0.015em",
      "font-weight": "600",
    },
    h4h5h6: { "letter-spacing": "-0.01em" },
    body: { "line-height": "1.6" },
  },
  "serif-classic": {
    h1: {
      "font-size": "2.5rem",
      "line-height": "1.15",
      "letter-spacing": "-0.015em",
      "font-weight": "400",
    },
    h2: {
      "font-size": "2rem",
      "line-height": "1.2",
      "letter-spacing": "-0.01em",
      "font-weight": "400",
    },
    h3: {
      "font-size": "1.5rem",
      "line-height": "1.3",
      "letter-spacing": "0em",
      "font-weight": "400",
    },
    h4h5h6: { "letter-spacing": "0em" },
    body: { "line-height": "1.75" },
  },
  "display-bold": {
    h1: {
      "font-size": "2.75rem",
      "line-height": "1.05",
      "letter-spacing": "-0.035em",
      "font-weight": "800",
    },
    h2: {
      "font-size": "2.25rem",
      "line-height": "1.1",
      "letter-spacing": "-0.025em",
      "font-weight": "700",
    },
    h3: {
      "font-size": "1.75rem",
      "line-height": "1.2",
      "letter-spacing": "-0.02em",
      "font-weight": "700",
    },
    h4h5h6: { "letter-spacing": "-0.01em" },
    body: { "line-height": "1.6" },
  },
  humanist: {
    h1: {
      "font-size": "2.25rem",
      "line-height": "1.2",
      "letter-spacing": "-0.02em",
      "font-weight": "600",
    },
    h2: {
      "font-size": "1.75rem",
      "line-height": "1.25",
      "letter-spacing": "-0.015em",
      "font-weight": "600",
    },
    h3: {
      "font-size": "1.375rem",
      "line-height": "1.3",
      "letter-spacing": "-0.01em",
      "font-weight": "500",
    },
    h4h5h6: { "letter-spacing": "-0.005em" },
    body: { "line-height": "1.65" },
  },
};

// Known serif fonts for category detection
const SERIF_FONTS = new Set([
  "playfair-display",
  "merriweather",
  "lora",
  "cormorant-garamond",
  "eb-garamond",
  "pt-serif",
  "noto-serif",
  "libre-baskerville",
  "crimson-text",
  "crimson-pro",
  "bitter",
  "source-serif-4",
  "dm-serif-display",
  "dm-serif-text",
  "roboto-slab",
  "arvo",
  "spectral",
  "alegreya",
  "cardo",
  "lusitana",
  "ovo",
  "lustria",
  "domine",
  "aleo",
  "petrona",
  "brawler",
  "cambo",
  "caudex",
  "zilla-slab",
  "alfa-slab-one",
  "gentium-book-plus",
  "josefin-slab",
  "libre-caslon-display",
  "libre-caslon-text",
  "besley",
  "noto-serif-display",
  "roboto-serif",
  "instrument-serif",
  "faustina",
  "newsreader",
  "david-libre",
  "martel",
  "tinos",
  "inknut-antiqua",
  "gloock",
  "fraunces",
  "abril-fatface",
  "quattrocento",
  "libertinus-serif",
  "rasa",
]);

const DISPLAY_FONTS = new Set([
  "abril-fatface",
  "alfa-slab-one",
  "anton",
  "archivo-black",
  "oswald",
  "fjalla-one",
  "dm-serif-display",
  "playfair-display",
  "playfair-display-sc",
  "yellowtail",
  "clash-display",
  "unbounded",
  "bricolage-grotesque",
  "funnel-display",
  "noto-serif-display",
  "libre-caslon-display",
  "alumni-sans",
  "gloock",
  "fraunces",
]);

const MONO_FONT_SET = new Set([
  "jetbrains-mono",
  "fira-code",
  "source-code-pro",
  "inconsolata",
  "ibm-plex-mono",
  "roboto-mono",
  "space-mono",
  "dm-mono",
  "overpass-mono",
  "oxygen-mono",
  "ubuntu-mono",
  "ubuntu-sans-mono",
  "geist-mono",
]);

function pickScalePreset(
  category: string,
  headingKebab: string,
  bodyKebab: string
): string {
  const cat = category.toLowerCase();
  const hIsSerif = SERIF_FONTS.has(headingKebab);
  const bIsSerif = SERIF_FONTS.has(bodyKebab);
  const hIsDisplay = DISPLAY_FONTS.has(headingKebab);
  const hIsMono = MONO_FONT_SET.has(headingKebab);
  const bIsMono = MONO_FONT_SET.has(bodyKebab);

  if (cat.includes("display") || hIsDisplay) return "display-bold";
  if (hIsSerif && bIsSerif) return "serif-classic";
  if (hIsSerif && !bIsSerif) return "serif-editorial";
  if (!hIsSerif && bIsSerif) return "humanist";
  if (hIsMono || bIsMono) return "sans-clean";
  if (cat.includes("serif") && !cat.includes("sans")) return "serif-editorial";
  return "sans-clean";
}

function inferMood(
  category: string,
  useCase: string,
  styleNotes: string
): string[] {
  const all = `${category} ${useCase} ${styleNotes}`.toLowerCase();
  const moods: string[] = [];
  if (all.includes("editorial") || all.includes("magazine"))
    moods.push("editorial");
  if (all.includes("modern") || all.includes("clean")) moods.push("modern");
  if (all.includes("elegant") || all.includes("luxe")) moods.push("elegant");
  if (all.includes("bold") || all.includes("impact")) moods.push("bold");
  if (all.includes("warm") || all.includes("friendly"))
    moods.push("approachable");
  if (all.includes("technical") || all.includes("sharp"))
    moods.push("technical");
  if (all.includes("neutral") || all.includes("balanced"))
    moods.push("neutral");
  if (moods.length === 0) moods.push("versatile");
  return moods;
}

function inferUseCase(category: string, useCase: string): string[] {
  const all = `${category} ${useCase}`.toLowerCase();
  const cases: string[] = [];
  if (all.includes("editorial") || all.includes("blog"))
    cases.push("editorial");
  if (all.includes("brand")) cases.push("branding");
  if (all.includes("web") || all.includes("general")) cases.push("web");
  if (all.includes("ui") || all.includes("app")) cases.push("web app");
  if (all.includes("product") || all.includes("saas")) cases.push("SaaS");
  if (all.includes("tech")) cases.push("tech");
  if (cases.length === 0) cases.push("general");
  return cases;
}

interface FontpairEntry {
  heading: string;
  body: string;
  category: string;
  use_case: string;
  style_notes: string;
  reason: string;
}

function main() {
  mkdirSync(PAIRINGS_DIR, { recursive: true });

  const raw = readFileSync(DATA_FILE, "utf-8");
  const entries: FontpairEntry[] = JSON.parse(raw);

  let created = 0;
  let skipped = 0;

  for (const entry of entries) {
    const headingKebab = toKebab(entry.heading);
    const bodyKebab = toKebab(entry.body);

    // Generate pairing name from fonts
    const headingShort = headingKebab.split("-").slice(0, 2).join("-");
    const bodyShort = bodyKebab.split("-").slice(0, 2).join("-");
    const pairingName = `${headingShort}-${bodyShort}`;

    const filePath = join(PAIRINGS_DIR, `${pairingName}.json`);

    if (existsSync(filePath)) {
      console.log(`SKIP (exists): ${pairingName}`);
      skipped++;
      continue;
    }

    const mono = pickMono(entry.heading, entry.body);
    const monoKebab = toKebab(mono);
    const scalePreset = pickScalePreset(
      entry.category,
      headingKebab,
      bodyKebab
    );
    const scale = SCALE_PRESETS[scalePreset];

    const deps = new Set([headingKebab, bodyKebab, monoKebab]);

    const description =
      entry.reason ||
      entry.style_notes ||
      `${entry.heading} paired with ${entry.body} for a ${entry.category.toLowerCase()} aesthetic.`;

    const categories = [
      entry.category.toLowerCase().replace(/\s*\+\s*/g, "-"),
    ].filter(Boolean);

    const json = {
      name: `pairing-${pairingName}`,
      type: "registry:style",
      extends: "none",
      title: `${pairingName
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")} — ${entry.heading} + ${entry.body} + ${mono}`,
      description,
      categories,
      registryDependencies: Array.from(deps).map(
        (d) => `${BASE_URL}/r/${d}.json`
      ),
      cssVars: {
        theme: {
          "--font-heading": `var(--font-${headingKebab})`,
          "--font-body": `var(--font-${bodyKebab})`,
          "--font-mono": `var(--font-${monoKebab})`,
        },
      },
      css: {
        "@layer base": {
          h1: { "font-family": "var(--font-heading)", ...scale.h1 },
          h2: { "font-family": "var(--font-heading)", ...scale.h2 },
          h3: { "font-family": "var(--font-heading)", ...scale.h3 },
          "h4, h5, h6": {
            "font-family": "var(--font-heading)",
            ...scale.h4h5h6,
          },
          "body, p": { "font-family": "var(--font-body)", ...scale.body },
          "code, pre": { "font-family": "var(--font-mono)" },
        },
      },
      meta: {
        preview: "The quick brown fox jumps over the lazy dog",
        mood: inferMood(entry.category, entry.use_case, entry.style_notes),
        useCase: inferUseCase(entry.category, entry.use_case),
      },
    };

    writeFileSync(filePath, JSON.stringify(json, null, 2) + "\n");
    console.log(
      `CREATED: ${pairingName} (${entry.heading} + ${entry.body} + ${mono})`
    );
    created++;
  }

  console.log(`\nDone: ${created} created, ${skipped} skipped`);
  console.log(
    "Run 'bun run scripts/generate-fonts.ts' to ensure all font dependencies exist."
  );
  console.log("Then 'bun run build:registry' to rebuild public/r/.");
}

main();
