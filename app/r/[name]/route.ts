import { track } from "@vercel/analytics/server";
import { existsSync, readFileSync } from "fs";
import { NextResponse } from "next/server";
import { join } from "path";
import { isBot, SHADCN_PROBE_NAMES } from "@/lib/analytics";

const PAIRINGS_DIR = join(process.cwd(), "registry", "pairings");
const FONTS_DIR = join(process.cwd(), "registry", "fonts");

export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  const rawName = name.replace(/\.json$/, "");
  const bot = isBot(request);

  let filePath = join(PAIRINGS_DIR, `${rawName}.json`);

  if (!existsSync(filePath)) {
    filePath = join(FONTS_DIR, `${rawName}.json`);
  }

  if (!existsSync(filePath)) {
    if (!bot && !SHADCN_PROBE_NAMES.has(rawName)) {
      track("registry_item_not_found", { name: rawName });
    }

    return NextResponse.json(
      { error: `Registry item "${rawName}" not found` },
      { status: 404 }
    );
  }

  const type = filePath.includes("pairings") ? "pairing" : "font";

  if (!bot) {
    track("registry_item_served", { name: rawName, type });
  }

  const data = JSON.parse(readFileSync(filePath, "utf-8"));
  return NextResponse.json(data, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
