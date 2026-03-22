import { filterFonts, paginateFonts } from "@/lib/font-filters";
import { getAllFonts } from "@/lib/registry";
import FontsClient from "@/app/fonts/fonts-client";

export default async function Redesign04FontsPage({
	searchParams,
}: {
	searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
	const params = await searchParams;
	const q = typeof params.q === "string" ? params.q : "";
	const category =
		typeof params.category === "string" ? params.category : "all";
	const page = Math.max(1, Number(params.page) || 1);

	const allFonts = getAllFonts().sort((a, b) => a.title.localeCompare(b.title));
	const filtered = filterFonts(allFonts, q, category);
	const { paginatedFonts, totalPages, currentPage } = paginateFonts(
		filtered,
		page,
	);

	return (
		<FontsClient
			fonts={paginatedFonts}
			filteredCount={filtered.length}
			totalPages={totalPages}
			currentPage={currentPage}
		/>
	);
}
