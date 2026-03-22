import { existsSync, readFileSync } from "fs";
import { type NextRequest, NextResponse } from "next/server";
import { join } from "path";

const PAIRINGS_DIR = join(process.cwd(), "registry", "pairings");
const FONTS_DIR = join(process.cwd(), "registry", "fonts");

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  const rawName = name.replace(/\.json$/, "");

  // Try to find the file: check pairings first, then fonts
  let filePath = join(PAIRINGS_DIR, `${rawName}.json`);
  if (!existsSync(filePath)) {
    // Try stripping "pairing-" prefix
    const withoutPrefix = rawName.replace(/^pairing-/, "");
    filePath = join(PAIRINGS_DIR, `${withoutPrefix}.json`);
  }
  if (!existsSync(filePath)) {
    // Try fonts directory
    filePath = join(FONTS_DIR, `${rawName}.json`);
  }
  if (!existsSync(filePath)) {
    return NextResponse.json(
      { error: `Registry item "${rawName}" not found` },
      { status: 404 }
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const hasOverrides = searchParams.size > 0;

  // If no query params, redirect to static file
  if (!hasOverrides) {
    const data = JSON.parse(readFileSync(filePath, "utf-8"));
    return NextResponse.json(data, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  }

  // Parse overrides from query params and merge into CSS
  const data = JSON.parse(readFileSync(filePath, "utf-8"));

  if (data.css) {
    for (const [key, value] of searchParams.entries()) {
      // Parse keys like "h1-size" → selector "h1", property "font-size"
      const match = key.match(/^(h[1-6]|body|code|pre)[-_](.+)$/);
      if (match) {
        const selector = match[1];
        const prop = match[2]
          .replace(/([A-Z])/g, "-$1")
          .toLowerCase()
          .replace(/^/, "font-")
          .replace(/^font-(size|weight|family|style)$/, "font-$1")
          .replace(/^font-(line-height|letter-spacing)$/, "$1");

        // Normalize property name
        let cssProp = match[2];
        if (cssProp === "size") cssProp = "font-size";
        else if (cssProp === "weight") cssProp = "font-weight";
        else if (cssProp === "lh" || cssProp === "line-height")
          cssProp = "line-height";
        else if (cssProp === "ls" || cssProp === "letter-spacing")
          cssProp = "letter-spacing";
        else if (cssProp === "family") cssProp = "font-family";

        // Find matching selector in css
        for (const cssSelector of Object.keys(data.css)) {
          if (
            cssSelector === selector ||
            cssSelector.startsWith(`${selector},`) ||
            cssSelector.includes(`, ${selector}`)
          ) {
            data.css[cssSelector][cssProp] = value;
          }
        }
      }
    }
  }

  return NextResponse.json(data, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
  });
}
