import { getAllPairings } from "@/lib/pairings";
import { PairsContent } from "@/app/pairs/pairs-content";

export default function Redesign04Pairs() {
	const pairings = getAllPairings();
	return <PairsContent pairings={pairings} />;
}
