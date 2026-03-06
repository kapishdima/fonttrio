/**
 * Generates pairing candidates from the top 100 Google Fonts.
 * Groups fonts by role (heading/body/mono) and outputs combination suggestions.
 *
 * Usage: bun run scripts/generate-pairing-candidates.ts
 */

import { readdirSync, readFileSync } from "fs";
import { join } from "path";

const FONTS_DIR = join(import.meta.dir, "..", "registry", "fonts");

interface FontMeta {
  name: string;
  title: string;
  family: string;
  category: string;
  weights: string[];
}

function loadFonts(): FontMeta[] {
  const files = readdirSync(FONTS_DIR).filter((f) => f.endsWith(".json"));
  return files.map((f) => {
    const data = JSON.parse(readFileSync(join(FONTS_DIR, f), "utf-8"));
    return {
      name: data.name,
      title: data.title,
      family: data.font.family,
      category: inferCategory(data.title, data.description),
      weights: data.font.weight,
    };
  });
}

function inferCategory(title: string, desc: string): string {
  const text = `${title} ${desc}`.toLowerCase();
  if (text.includes("mono") || text.includes("monospace")) return "monospace";
  if (text.includes("serif") && !text.includes("sans")) return "serif";
  if (text.includes("display")) return "display";
  if (text.includes("sans")) return "sans-serif";
  // Fallback heuristic based on common fonts
  return "sans-serif";
}

function hasWeight(font: FontMeta, w: string): boolean {
  return font.weights.includes(w);
}

function main() {
  const fonts = loadFonts();

  // Classify by role
  const headingCandidates = fonts.filter(
    (f) =>
      (f.category === "display" ||
        f.category === "serif" ||
        (f.category === "sans-serif" && hasWeight(f, "700"))) &&
      f.category !== "monospace"
  );

  const bodyCandidates = fonts.filter(
    (f) =>
      (f.category === "sans-serif" || f.category === "serif") &&
      hasWeight(f, "400") &&
      f.category !== "monospace"
  );

  const monoCandidates = fonts.filter((f) => f.category === "monospace");

  console.log("=== FONT CLASSIFICATION ===\n");
  console.log(`Heading candidates: ${headingCandidates.length}`);
  headingCandidates.forEach((f) =>
    console.log(`  ${f.title} (${f.category}, weights: ${f.weights.join(",")})`)
  );

  console.log(`\nBody candidates: ${bodyCandidates.length}`);
  bodyCandidates.forEach((f) =>
    console.log(`  ${f.title} (${f.category}, weights: ${f.weights.join(",")})`)
  );

  console.log(`\nMono candidates: ${monoCandidates.length}`);
  monoCandidates.forEach((f) =>
    console.log(`  ${f.title} (${f.category}, weights: ${f.weights.join(",")})`)
  );

  // Generate combinations
  console.log("\n=== PAIRING CANDIDATES ===\n");

  const combos: Array<{
    heading: string;
    body: string;
    mono: string;
    type: string;
  }> = [];

  // Rule: contrast pairings (serif heading + sans body)
  const serifHeadings = headingCandidates.filter(
    (f) => f.category === "serif" || f.category === "display"
  );
  const sansBodies = bodyCandidates.filter((f) => f.category === "sans-serif");
  const serifBodies = bodyCandidates.filter((f) => f.category === "serif");
  const defaultMono = monoCandidates[0]?.title || "JetBrains Mono";

  // Serif heading + Sans body (contrast)
  for (const h of serifHeadings.slice(0, 10)) {
    for (const b of sansBodies.slice(0, 5)) {
      combos.push({
        heading: h.title,
        body: b.title,
        mono: defaultMono,
        type: "contrast (serif+sans)",
      });
    }
  }

  // Serif heading + Serif body (harmonious)
  for (const h of serifHeadings.slice(0, 5)) {
    for (const b of serifBodies.slice(0, 5)) {
      if (h.title !== b.title) {
        combos.push({
          heading: h.title,
          body: b.title,
          mono: defaultMono,
          type: "harmonious (serif+serif)",
        });
      }
    }
  }

  // Sans superfamily (same font heading + body)
  for (const f of sansBodies.filter((f) => hasWeight(f, "700")).slice(0, 8)) {
    combos.push({
      heading: f.title,
      body: f.title,
      mono: defaultMono,
      type: "superfamily (same sans)",
    });
  }

  // Sans heading + Sans body (complementary)
  const geometricSans = sansBodies.filter((f) =>
    ["Space Grotesk", "DM Sans", "Outfit", "Sora", "Manrope"].includes(f.title)
  );
  for (const h of geometricSans) {
    for (const b of sansBodies.slice(0, 5)) {
      if (h.title !== b.title) {
        combos.push({
          heading: h.title,
          body: b.title,
          mono: defaultMono,
          type: "complementary (sans+sans)",
        });
      }
    }
  }

  // Print all candidates
  for (const c of combos) {
    console.log(`[${c.type}] ${c.heading} + ${c.body} + ${c.mono}`);
  }

  console.log(`\nTotal candidates: ${combos.length}`);
  console.log(
    "\nReview these candidates and create pairing JSONs for the best ones."
  );
  console.log("Use: registry/pairings/{name}.json with the registry:style format.");
}

main();
