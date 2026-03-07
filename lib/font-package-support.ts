import { FontItem, PairingItem } from "./registry";

const REGULAR_FONT_PACKAGE_NAMES = new Set([
  "alfa-slab-one",
  "anton",
  "archivo-black",
  "arvo",
  "barlow",
  "barlow-condensed",
  "bebas-neue",
  "bungee",
  "changa-one",
  "crimson-text",
  "dm-serif-display",
  "fira-sans",
  "fjalla-one",
  "gravitas-one",
  "hind",
  "hind-siliguri",
  "ibm-plex-mono",
  "kanit",
  "lato",
  "lobster",
  "lobster-two",
  "m-plus-rounded-1c",
  "mukta",
  "nanum-gothic",
  "noto-color-emoji",
  "oxygen",
  "pacifico",
  "poppins",
  "prompt",
  "pt-sans",
  "pt-sans-narrow",
  "pt-serif",
  "ramabhadra",
  "share-tech",
  "slabo-27px",
  "tajawal",
  "titillium-web",
  "ubuntu",
]);

const FONTTRIO_FONT_URL_RE = /\/r\/(.+)\.json$/;

export function getPairingFontNames(pairing: PairingItem): string[] {
  return (pairing.registryDependencies || [])
    .map((dependency) => dependency.match(FONTTRIO_FONT_URL_RE)?.[1] || null)
    .filter((name): name is string => Boolean(name));
}

export function getNonFontRegistryDependencies(pairing: PairingItem): string[] {
  return (pairing.registryDependencies || []).filter(
    (dependency) => !FONTTRIO_FONT_URL_RE.test(dependency)
  );
}

export function resolveFontPackageName(font: FontItem): string {
  if (font.font.provider === "google") {
    if (REGULAR_FONT_PACKAGE_NAMES.has(font.name)) {
      return `@fontsource/${font.name}`;
    }

    return `@fontsource-variable/${font.name}`;
  }

  throw new Error(`Unsupported font provider for ${font.name}: ${font.font.provider}`);
}

export async function validateFontPackages(fonts: FontItem[]): Promise<string[]> {
  const failures = await Promise.all(
    fonts.map(async (font) => {
      const packageName = resolveFontPackageName(font);
      const response = await fetch(
        `https://registry.npmjs.org/${encodeURIComponent(packageName)}`
      );

      if (response.ok) {
        return null;
      }

      return `${font.name} -> ${packageName} (${response.status})`;
    })
  );

  return failures.filter((failure): failure is string => Boolean(failure)).sort();
}
