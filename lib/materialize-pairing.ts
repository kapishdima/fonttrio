import {
  getNonFontRegistryDependencies,
  getPairingFontNames,
  resolveFontPackageName,
} from "./font-package-support";
import { FontItem, PairingItem } from "./registry";

export interface MaterializedPairing extends PairingItem {
  dependencies: string[];
}

export function materializePairing(
  pairing: PairingItem,
  fontsByName: Map<string, FontItem>
): MaterializedPairing {
  const fonts = getPairingFontNames(pairing).map((fontName) => {
    const font = fontsByName.get(fontName);

    if (!font) {
      throw new Error(`Missing font dependency ${fontName} for pairing ${pairing.name}`);
    }

    return font;
  });

  const dependencies = fonts.map(resolveFontPackageName);

  return {
    ...pairing,
    dependencies,
    registryDependencies: getNonFontRegistryDependencies(pairing),
    cssVars: {
      ...(pairing.cssVars || {}),
      theme: {
        ...(pairing.cssVars?.theme || {}),
        ...Object.fromEntries(
          fonts.map((font) => [font.font.variable, font.font.family])
        ),
      },
    },
    css: {
      ...Object.fromEntries(
        dependencies.map((dependency) => [`@import "${dependency}"`, {}])
      ),
      ...(pairing.css || {}),
    },
  };
}
