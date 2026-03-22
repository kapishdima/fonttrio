"use client";

import { FilterPill } from "@/app/components/filters/filter-pill";
import { FontsList } from "@/app/components/fonts/fonts-list";
import { Footer } from "@/app/components/footer";
import { InnerHeader } from "@/app/components/header";
import { FontsHero } from "@/app/components/hero/fonts-hero";
import { Pagination } from "@/app/components/pagination";
import { FONT_FILTERS } from "@/lib/fonts-filter-config";
import { useFontFilters } from "@/lib/hooks/use-font-filters";
import type { FontItem } from "@/lib/registry";

interface FontsClientProps {
	fonts: FontItem[];
	filteredCount: number;
	totalPages: number;
	currentPage: number;
}

export default function FontsClient({
	fonts,
	filteredCount,
	totalPages,
}: FontsClientProps) {
	const filters = useFontFilters();

	const filterValues = {
		category:
			filters.categoryFilter === "all" ? undefined : filters.categoryFilter,
	};

	const handleFilterChange = (filterId: string, value: string) => {
		if (filterId === "category") {
			filters.setCategoryFilter(value);
		}
	};

	return (
		<main className="bg-black">
			<InnerHeader
				extraWhenScroll={
					<FilterPill
						filters={FONT_FILTERS}
						values={filterValues}
						onValueChange={handleFilterChange}
						onClear={filters.clearFilters}
						searchParam="q"
						searchPlaceholder="Search fonts..."
					/>
				}
			/>
			<FontsHero
				searchQuery={filters.searchQuery}
				setSearchQuery={filters.setSearchQuery}
				filters={FONT_FILTERS}
				filterValues={filterValues}
				onFilterChange={handleFilterChange}
			/>
			<FontsList paginatedFonts={fonts} filteredCount={filteredCount} />
			<Pagination totalPages={totalPages} />
			<Footer />
		</main>
	);
}
