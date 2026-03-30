/**
 * Builds registry.json index from registry/ source files.
 *
 * Usage: bun run scripts/build-registry.ts
 */

import { writeFileSync } from "fs";
import { join } from "path";
import { buildRegistryIndex } from "../lib/registry";

const ROOT = process.cwd();
const BASE_URL = process.env.BASE_URL || "https://www.fonttrio.xyz";

const index = buildRegistryIndex(BASE_URL);
writeFileSync(
  join(ROOT, "registry.json"),
  JSON.stringify(index, null, 2) + "\n"
);

console.log(
  `Registry built: ${index.fonts.length} fonts, ${index.pairings.length} pairings`
);
