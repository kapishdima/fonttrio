import { getAllMoods, getAllPairings, getPairing } from "@/lib/pairings";
import { SPONSORS } from "@/lib/sponsors";
import { LandingClient } from "./landing-client";

export default function Home() {
	const allPairings = getAllPairings();
	const featured = getPairing("editorial")!;
	const rest = allPairings.filter((p) => p.name !== "editorial");
	const moods = getAllMoods();
	const sponsors = SPONSORS.filter((s) => ["gold", "silver"].includes(s.tier));

	return (
		<LandingClient
			featured={featured}
			pairings={rest}
			allPairings={allPairings}
			moods={moods}
			sponsors={sponsors}
		/>
	);
}
