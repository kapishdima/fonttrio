import { getAllPairings, getPairing, getAllMoods } from "@/lib/pairings";
import { SPONSORS } from "@/lib/sponsors";
import { LandingClient } from "./landing-client";

export default function Home() {
  const allPairings = getAllPairings();
  const featured = getPairing("editorial")!;
  const rest = allPairings.filter((p) => p.name !== "editorial");
  const moods = getAllMoods();
  const goldSponsors = SPONSORS.filter((s) => s.tier === "gold");

  return (
    <LandingClient
      featured={featured}
      pairings={rest}
      allPairings={allPairings}
      moods={moods}
      goldSponsors={goldSponsors}
    />
  );
}
