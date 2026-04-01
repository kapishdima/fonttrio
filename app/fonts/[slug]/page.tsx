import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { parseFontCategory } from "@/lib/fonts";
import { getPairingsUsingFont } from "@/lib/pairings";
import { getAllFonts, getFont } from "@/lib/registry";
import { FontDetail } from "./font-detail";

interface PageProps {
	params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
	return getAllFonts().map((f) => ({ slug: f.name }));
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const font = getFont(slug);

	if (!font) return {};

	const category = parseFontCategory(font);
	const title = `${font.title} — ${category}`;

	return {
		title: `${title} | fonttrio`,
		description: font.description,
		openGraph: {
			title,
			description: font.description,
			url: `https://www.fonttrio.xyz/fonts/${font.name}`,
			type: "website",
		},
	};
}

export default async function FontPage({ params }: PageProps) {
	const { slug } = await params;
	const font = getFont(slug);

	if (!font) notFound();

	const pairings = getPairingsUsingFont(slug);

	return <FontDetail font={font} pairings={pairings} />;
}
