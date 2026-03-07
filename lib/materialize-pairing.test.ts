import { describe, expect, test } from "bun:test";

import { resolveFontPackageName } from "./font-package-support";
import { FontItem, PairingItem } from "./registry";
import { materializePairing } from "./materialize-pairing";

const publicSans: FontItem = {
  name: "public-sans",
  type: "registry:font",
  title: "Public Sans",
  description: "Public Sans",
  font: {
    family: "Public Sans",
    provider: "google",
    import: "Public_Sans",
    variable: "--font-public-sans",
    weight: ["400"],
    subsets: ["latin"],
  },
};

const lato: FontItem = {
  name: "lato",
  type: "registry:font",
  title: "Lato",
  description: "Lato",
  font: {
    family: "Lato",
    provider: "google",
    import: "Lato",
    variable: "--font-lato",
    weight: ["400"],
    subsets: ["latin"],
  },
};

const sourceCodePro: FontItem = {
  name: "source-code-pro",
  type: "registry:font",
  title: "Source Code Pro",
  description: "Source Code Pro",
  font: {
    family: "Source Code Pro",
    provider: "google",
    import: "Source_Code_Pro",
    variable: "--font-source-code-pro",
    weight: ["400"],
    subsets: ["latin"],
  },
};

describe("resolveFontPackageName", () => {
  test("falls back to regular @fontsource packages for fonts without variable packages", () => {
    expect(resolveFontPackageName(lato)).toBe("@fontsource/lato");
  });

  test("uses variable packages when available", () => {
    expect(resolveFontPackageName(publicSans)).toBe(
      "@fontsource-variable/public-sans"
    );
  });
});

describe("materializePairing", () => {
  test("inlines font dependencies and css imports for non-Next installs", () => {
    const pairing: PairingItem = {
      name: "pairing-govtech",
      type: "registry:style",
      extends: "none",
      title: "Govtech",
      description: "Govtech",
      categories: ["sans-serif"],
      registryDependencies: [
        "https://www.fonttrio.xyz/r/public-sans.json",
        "https://www.fonttrio.xyz/r/lato.json",
        "https://www.fonttrio.xyz/r/source-code-pro.json",
      ],
      cssVars: {
        theme: {
          "--font-heading": "var(--font-public-sans)",
          "--font-body": "var(--font-lato)",
          "--font-mono": "var(--font-source-code-pro)",
        },
      },
      css: {
        "body, p": {
          "font-family": "var(--font-body)",
        },
      },
      meta: {
        preview: "",
        mood: [],
        useCase: [],
      },
    };

    const materialized = materializePairing(pairing, new Map([
      [publicSans.name, publicSans],
      [lato.name, lato],
      [sourceCodePro.name, sourceCodePro],
    ]));

    expect(materialized.registryDependencies).toEqual([]);
    expect(materialized.dependencies).toEqual([
      "@fontsource-variable/public-sans",
      "@fontsource/lato",
      "@fontsource-variable/source-code-pro",
    ]);
    expect(materialized.cssVars.theme["--font-lato"]).toBe("Lato");
    expect(materialized.css['@import "@fontsource/lato"']).toEqual({});
    expect(materialized.css["body, p"]).toEqual({
      "font-family": "var(--font-body)",
    });
  });
});
