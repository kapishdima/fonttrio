import type { Metadata } from "next";
import { getAllPairings } from "@/lib/pairings";
import { PairingsClient } from "./pairings-client";

export const metadata: Metadata = {
  title: "Pairings — Fonttrio",
  description:
    "Browse curated font pairings for shadcn/ui projects. Each includes heading, body, and mono fonts with a complete typography scale.",
  openGraph: {
    title: "Pairings — Fonttrio",
    description:
      "Browse curated font pairings for shadcn/ui projects. Each includes heading, body, and mono fonts with a complete typography scale.",
  },
};

export default function PairingsPage() {
  const pairings = getAllPairings();
  return <PairingsClient pairings={pairings} />;
}
