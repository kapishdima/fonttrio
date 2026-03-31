import { NextResponse } from "next/server";
import { getAllPairings } from "@/lib/pairings";
import { filterPairings } from "@/lib/filters";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 100);
  const offset = parseInt(searchParams.get("offset") || "0");

  const results = filterPairings(getAllPairings(), {
    query: searchParams.get("query") || undefined,
    mood: searchParams.get("mood") || undefined,
    useCase: searchParams.get("useCase") || undefined,
    category: searchParams.get("category") || undefined,
    appearance: searchParams.get("appearance") || undefined,
    language: searchParams.get("language") || undefined,
  });

  const total = results.length;
  const pairings = results.slice(offset, offset + limit).map((p) => ({
    name: p.name,
    description: p.description,
    mood: p.mood,
    useCase: p.useCase,
    heading: p.heading,
    headingCategory: p.headingCategory,
    body: p.body,
    bodyCategory: p.bodyCategory,
    mono: p.mono,
    googleFontsUrl: p.googleFontsUrl,
  }));

  return NextResponse.json(
    { pairings, total, limit, offset },
    {
      headers: {
        ...CORS_HEADERS,
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    },
  );
}
