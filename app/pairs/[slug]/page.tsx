import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPairings, getPairing, getRelatedPairings } from "@/lib/pairings";
import { PairingDetail } from "./pairing-detail";

interface PageProps {
	params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
	return getAllPairings().map((p) => ({ slug: p.name }));
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const pairing = getPairing(slug);

	if (!pairing) return {};

	const title = `${pairing.name} — ${pairing.heading} + ${pairing.body} + ${pairing.mono}`;

	return {
		title: `${title} | fonttrio`,
		description: pairing.description,
		openGraph: {
			title,
			description: pairing.description,
			url: `https://www.fonttrio.xyz/pairs/${pairing.name}`,
			type: "website",
		},
	};
}

export default async function PairingPage({ params }: PageProps) {
	const { slug } = await params;
	const pairing = getPairing(slug);

	if (!pairing) notFound();

	const allPairings = getAllPairings();
	const relatedPairings = getRelatedPairings(pairing, allPairings);

	return <PairingDetail pairing={pairing} relatedPairings={relatedPairings} />;
}
