/**
 * Validates that each FontTrio registry font resolves to a published npm package
 * under the same package-selection rules used for materialized pairing builds.
 *
 * Usage: bun run scripts/validate-font-packages.ts
 */

import { getAllFonts } from "../lib/registry";
import { validateFontPackages } from "../lib/font-package-support";

const failures = await validateFontPackages(getAllFonts());

if (failures.length) {
  console.error("Unresolvable font packages detected:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("All registry fonts resolve to published npm packages.");
