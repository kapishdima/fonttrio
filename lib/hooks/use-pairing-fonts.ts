"use client";

import type { PairingData } from "@/lib/pairings";

type HeadingScaleKey = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface FontConfig {
  family: string;
  cssVar: string;
}

interface PairingFonts {
  heading: FontConfig;
  body: FontConfig;
  mono: FontConfig;
  getHeadingStyle: (scaleKey: HeadingScaleKey) => React.CSSProperties;
  getBodyStyle: () => React.CSSProperties;
  getMonoStyle: () => React.CSSProperties;
}

export function usePairingFonts(pairing: PairingData): PairingFonts {
  const heading: FontConfig = {
    family: `"${pairing.heading}", ${pairing.headingCategory}`,
    cssVar: "var(--font-heading)",
  };

  const body: FontConfig = {
    family: `"${pairing.body}", ${pairing.bodyCategory}`,
    cssVar: "var(--font-body)",
  };

  const mono: FontConfig = {
    family: `"${pairing.mono}", monospace`,
    cssVar: "var(--font-mono)",
  };

  const getHeadingStyle = (scaleKey: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'): React.CSSProperties => {
    const scale = pairing.scale[scaleKey];
    return {
      fontFamily: heading.family,
      fontSize: scale.size,
      fontWeight: scale.weight,
      lineHeight: scale.lineHeight,
      letterSpacing: scale.letterSpacing,
    };
  };

  const getBodyStyle = (): React.CSSProperties => ({
    fontFamily: body.family,
    fontSize: pairing.scale.body.size,
    lineHeight: pairing.scale.body.lineHeight,
    fontWeight: pairing.scale.body.weight,
  });

  const getMonoStyle = (): React.CSSProperties => ({
    fontFamily: mono.family,
    fontSize: "0.8125rem",
    lineHeight: "1.65",
  });

  return {
    heading,
    body,
    mono,
    getHeadingStyle,
    getBodyStyle,
    getMonoStyle,
  };
}
