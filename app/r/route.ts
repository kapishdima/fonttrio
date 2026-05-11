import { NextResponse } from "next/server";
import { op } from "@/lib/op";
import { buildRegistryIndex } from "@/lib/registry";

export async function GET() {
  void op.track("registry_index_served");

  const index = buildRegistryIndex();
  return NextResponse.json(index, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
