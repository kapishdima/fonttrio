import { getAllPairings, getAllPopularPairings } from "@/lib/pairings";
import { PairsContent } from "./pairs-content";

export default function PairsPage() {
	const pairings = getAllPairings();
	const popularPairings = getAllPopularPairings();
	return <PairsContent pairings={pairings} popularPairings={popularPairings} />;
}
