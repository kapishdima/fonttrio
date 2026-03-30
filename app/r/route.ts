import { track } from "@vercel/analytics";
import { NextResponse } from "next/server";
import { buildRegistryIndex } from "@/lib/registry";

export async function GET() {
  track("registry_index_served");

  const index = buildRegistryIndex();
  return NextResponse.json(index, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
