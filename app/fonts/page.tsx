import type { Metadata } from "next";
import { getAllFonts } from "@/lib/registry";
import { FontsClient } from "./fonts-client";

export const metadata: Metadata = {
  title: "Fonts — Fonttrio",
  description:
    "Browse 1700+ fonts from the Fonttrio registry. Install any font with a single shadcn command.",
  openGraph: {
    title: "Fonts — Fonttrio",
    description:
      "Browse 1700+ fonts from the Fonttrio registry. Install any font with a single shadcn command.",
  },
};

export default function FontsPage() {
  const fonts = getAllFonts();
  // Sort alphabetically by title
  const sorted = [...fonts].sort((a, b) => a.title.localeCompare(b.title));
  return <FontsClient fonts={sorted} />;
}
