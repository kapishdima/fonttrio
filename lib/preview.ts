import type { PairingData } from "@/lib/pairings";

const STYLE_ID = "fonttrio-font-override";

export function buildFontCSS(pairing: PairingData): string {
    return `
@import url('${pairing.googleFontsUrl}');

*, *::before, *::after {
  font-family: "${pairing.body}", ${pairing.bodyCategory} !important;
}

h1, h2, h3, h4, h5, h6,
[class*="text-3xl"], [class*="text-4xl"], [class*="text-5xl"],
[class*="font-semibold"], [class*="font-bold"] {
  font-family: "${pairing.heading}", ${pairing.headingCategory} !important;
}

code, pre, kbd, samp,
[class*="font-mono"], .font-mono {
  font-family: "${pairing.mono}", monospace !important;
}
`;
}

export function injectFonts(iframeDoc: Document, pairing: PairingData) {
    let style = iframeDoc.getElementById(STYLE_ID) as HTMLStyleElement | null;
    if (!style) {
        style = iframeDoc.createElement("style");
        style.id = STYLE_ID;
        iframeDoc.head.appendChild(style);
    }
    style.textContent = buildFontCSS(pairing);
}
