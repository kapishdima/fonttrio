import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllFonts, getFont } from "@/lib/registry";
import { getPairingsUsingFont, parseFontCategory, getFontAllWeightsUrl } from "@/lib/fonts";
import { FontDetail } from "./font-detail";

interface FontPageProps {
  params: Promise<{ font: string }>;
}

export async function generateStaticParams() {
  const fonts = getAllFonts();
  return fonts.map((f) => ({ font: f.name }));
}

export async function generateMetadata({ params }: FontPageProps): Promise<Metadata> {
  const { font: fontName } = await params;
  const font = getFont(fontName);
  if (!font) return {};

  const category = parseFontCategory(font);
  return {
    title: `${font.title} — Fonttrio`,
    description: `${font.title} is a ${category} font with ${font.font.weight.length} weights. Install with a single shadcn command.`,
    openGraph: {
      title: `${font.title} — Fonttrio`,
      description: `${font.title} is a ${category} font with ${font.font.weight.length} weights.`,
    },
  };
}

export default async function FontPage({ params }: FontPageProps) {
  const { font: fontName } = await params;
  const font = getFont(fontName);
  if (!font) notFound();

  const relatedPairings = getPairingsUsingFont(font.font.family);
  const allWeightsUrl = getFontAllWeightsUrl(font);

  return (
    <FontDetail
      font={font}
      relatedPairings={relatedPairings}
      allWeightsUrl={allWeightsUrl}
    />
  );
}
