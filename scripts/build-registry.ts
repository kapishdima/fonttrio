/**
 * Builds registry.json index and copies registry items to public/r/
 *
 * Published pairings are materialized with explicit font dependencies and
 * @import rules so they work in non-Next shadcn projects without relying on
 * shadcn's registry:font package inference.
 *
 * Usage: bun run scripts/build-registry.ts
 */

import { mkdirSync, writeFileSync, copyFileSync, readdirSync, rmSync } from "fs";
import { join } from "path";
import {
  buildRegistryIndexFromItems,
  getAllFonts,
  getAllPairings,
  PairingItem,
} from "../lib/registry";
import {
  getNonFontRegistryDependencies,
  getPairingFontNames,
  resolveFontPackageName,
} from "../lib/font-package-support";

const ROOT = process.cwd();
const PUBLIC_R = join(ROOT, "public", "r");
const FONTS_DIR = join(ROOT, "registry", "fonts");
const PAIRINGS_DIR = join(ROOT, "registry", "pairings");

const BASE_URL = process.env.BASE_URL || "https://www.fonttrio.xyz";

mkdirSync(PUBLIC_R, { recursive: true });
for (const file of readdirSync(PUBLIC_R).filter((f) => f.endsWith(".json"))) {
  rmSync(join(PUBLIC_R, file));
}

const allFonts = getAllFonts();
const allPairings = getAllPairings();
const fontsByName = new Map(allFonts.map((font) => [font.name, font]));

function materializePairing(pairing: PairingItem): Record<string, unknown> {
  const fontNames = getPairingFontNames(pairing);
  const fonts = fontNames.map((fontName) => {
    const font = fontsByName.get(fontName);

    if (!font) {
      throw new Error(`Missing font dependency ${fontName} for pairing ${pairing.name}`);
    }

    return font;
  });

  const dependencies = fonts.map(resolveFontPackageName);
  const cssVarsTheme = {
    ...(pairing.cssVars?.theme || {}),
    ...Object.fromEntries(fonts.map((font) => [font.font.variable, font.font.family])),
  };
  const css = {
    ...Object.fromEntries(dependencies.map((dependency) => [`@import "${dependency}"`, {}])),
    ...(pairing.css || {}),
  };

  return {
    ...pairing,
    dependencies,
    registryDependencies: getNonFontRegistryDependencies(pairing),
    cssVars: {
      ...(pairing.cssVars || {}),
      theme: cssVarsTheme,
    },
    css,
  };
}

// Copy font JSONs to public/r/
for (const font of allFonts) {
  copyFileSync(join(FONTS_DIR, `${font.name}.json`), join(PUBLIC_R, `${font.name}.json`));
}

// Materialize pairing JSONs to public/r/ (strip "pairing-" prefix for URL)
for (const pairing of allPairings) {
  const file = `${pairing.name.replace("pairing-", "")}.json`;
  writeFileSync(
    join(PUBLIC_R, file),
    JSON.stringify(materializePairing(pairing), null, 2) + "\n"
  );
}

// Build and write registry index
const index = buildRegistryIndexFromItems(
  allFonts,
  allPairings,
  BASE_URL
);
writeFileSync(
  join(ROOT, "registry.json"),
  JSON.stringify(index, null, 2) + "\n"
);
writeFileSync(
  join(PUBLIC_R, "index.json"),
  JSON.stringify(index, null, 2) + "\n"
);

console.log(
  `Registry built: ${index.fonts.length} fonts, ${index.pairings.length} pairings`
);
console.log(`Output: registry.json + public/r/ (${readdirSync(PUBLIC_R).length} files)`);
