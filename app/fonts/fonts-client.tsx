"use client";

import { FilterPill } from "@/app/components/filters/filter-pill";
import { FontsList } from "@/app/components/fonts/fonts-list";
import { InnerHeader } from "@/app/components/header";
import { FontsHero } from "@/app/components/hero/fonts-hero";

import { useFontFilters } from "@/lib/hooks/use-font-filters";
import { FONT_FILTERS } from "@/lib/fonts-filter-config";
import type { FontItem } from "@/lib/registry";

export default function FontsClient({ fonts }: { fonts: FontItem[] }) {
	const filters = useFontFilters(fonts);

	const filterValues = { category: filters.categoryFilter === "all" ? undefined : filters.categoryFilter };

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
				totalCount={fonts.length}
			/>
			<FontsList
				paginatedFonts={filters.paginatedFonts}
				filteredCount={filters.filteredFonts.length}
				currentPage={filters.currentPage}
				totalPages={filters.totalPages}
				setPage={filters.setPage}
			/>
		</main>
	);
}
