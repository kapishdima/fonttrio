import { getAllPairings } from "@/lib/pairings";
import { PairsContent } from "./pairs-content";

export default function PairsPage() {
	const pairings = getAllPairings();
	return <PairsContent pairings={pairings} />;
}
