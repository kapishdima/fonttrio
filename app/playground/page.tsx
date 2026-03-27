import { getAllPairings } from "@/lib/pairings";
import { PlaygroundPageClient } from "./page-client";

export default function PlaygroundPage() {
	const pairings = getAllPairings();
	return <PlaygroundPageClient pairings={pairings} />;
}
