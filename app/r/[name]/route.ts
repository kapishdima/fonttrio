import { track } from '@vercel/analytics/server'
import { existsSync, readFileSync } from "fs";
import { NextResponse } from "next/server";
import { join } from "path";

const PAIRINGS_DIR = join(process.cwd(), "registry", "pairings");
const FONTS_DIR = join(process.cwd(), "registry", "fonts");

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  const rawName = name.replace(/\.json$/, "");

  let filePath = join(PAIRINGS_DIR, `${rawName}.json`);

  if (!existsSync(filePath)) {
    track("pairing_not_found", { name: rawName });

    filePath = join(FONTS_DIR, `${rawName}.json`);
  }

  if (!existsSync(filePath)) {
    track("registry_item_not_found", { name: rawName });

    return NextResponse.json(
      { error: `Registry item "${rawName}" not found` },
      { status: 404 }
    );
  }

  track("registry_item_served", { name: rawName, type: filePath.includes("pairings") ? "pairing" : "font" });

  const data = JSON.parse(readFileSync(filePath, "utf-8"));
  return NextResponse.json(data, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
