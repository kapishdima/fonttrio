/**
 * Builds registry.json index and copies all registry items to public/r/
 *
 * Usage: bun run scripts/build-registry.ts
 */

import { mkdirSync, writeFileSync, copyFileSync, readdirSync } from "fs";
import { join } from "path";
import { buildRegistryIndex } from "../lib/registry";

const ROOT = process.cwd();
const PUBLIC_R = join(ROOT, "public", "r");
const FONTS_DIR = join(ROOT, "registry", "fonts");
const PAIRINGS_DIR = join(ROOT, "registry", "pairings");

const BASE_URL = process.env.BASE_URL || "https://fonttrio.dev";

mkdirSync(PUBLIC_R, { recursive: true });

// Copy font JSONs to public/r/
for (const file of readdirSync(FONTS_DIR).filter((f) => f.endsWith(".json"))) {
  copyFileSync(join(FONTS_DIR, file), join(PUBLIC_R, file));
}

// Copy pairing JSONs to public/r/ (strip "pairing-" prefix for URL)
for (const file of readdirSync(PAIRINGS_DIR).filter((f) => f.endsWith(".json"))) {
  const content = JSON.parse(
    Bun.file(join(PAIRINGS_DIR, file)).textSync?.() ??
      require("fs").readFileSync(join(PAIRINGS_DIR, file), "utf-8")
  );
  // Output filename = pairing name without "pairing-" prefix
  const outName = content.name?.replace("pairing-", "") || file;
  const outFile = outName.endsWith(".json") ? outName : `${outName}.json`;
  copyFileSync(join(PAIRINGS_DIR, file), join(PUBLIC_R, outFile));
}

// Build and write registry index
const index = buildRegistryIndex(BASE_URL);
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
