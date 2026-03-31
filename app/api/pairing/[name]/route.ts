import { NextResponse } from "next/server";
import { getPairing } from "@/lib/pairings";
import { getFont } from "@/lib/registry";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

function resolveFontDetail(kebabName: string) {
  const font = getFont(kebabName);
  if (!font) return null;
  return {
    family: font.font.family.replace(/ Variable$/, ""),
    import: font.font.import,
    weights: font.font.weight,
    category: font.category || "sans-serif",
    variable: font.font.variable,
  };
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params;
  const pairing = getPairing(name);

  if (!pairing) {
    return NextResponse.json(
      { error: `Pairing "${name}" not found` },
      { status: 404, headers: CORS_HEADERS },
    );
  }

  const heading = resolveFontDetail(pairing.headingKebab);
  const body = resolveFontDetail(pairing.bodyKebab);
  const mono = resolveFontDetail(pairing.monoKebab);

  return NextResponse.json(
    {
      name: pairing.name,
      description: pairing.description,
      mood: pairing.mood,
      useCase: pairing.useCase,
      heading,
      body,
      mono,
      scale: pairing.scale,
      googleFontsUrl: pairing.googleFontsUrl,
    },
    {
      headers: {
        ...CORS_HEADERS,
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    },
  );
}
