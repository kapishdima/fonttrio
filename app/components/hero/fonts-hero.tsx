import { Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { FilterGrid } from "@/app/components/filters/filter-grid";
import type {
	FilterDefinition,
	FilterValues,
} from "@/app/components/filters/types";
import { RotatingSpecimen } from "@/app/components/rotating-specimen";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";

export function FontsHero({
	searchQuery,
	setSearchQuery,
	filters,
	filterValues,
	onFilterChange,
	totalCount,
}: {
	searchQuery: string;
	setSearchQuery: (v: string | null) => void;
	filters: FilterDefinition[];
	filterValues: FilterValues;
	onFilterChange: (filterId: string, value: string) => void;
	totalCount: number;
}) {
	return (
		<div className="h-auto min-h-[40vh] md:h-[60vh] p-3">
			<section className="w-full h-full flex flex-col justify-center dark:bg-neutral-950 bg-white rounded-4xl pb-[5vh] px-4 sm:px-6 md:px-12 lg:px-24 py-8 md:py-12 lg:py-0">
				<div className="flex items-center justify-between mb-10">
					<div>
						<h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-neutral-900 dark:text-white tracking-tight text-balance">
							Browse fonts
						</h2>
						<p className="font-medium text-sm dark:text-neutral-400 text-neutral-500 mt-2">
							{totalCount.toLocaleString()}+ fonts. Install any with a single
							command.
						</p>
						<div className="flex flex-col max-w-lg w-full">
							<InputGroup className="h-10 mt-6 pl-2 bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 font-medium rounded-xl">
								<InputGroupInput
									placeholder="Search fonts..."
									value={searchQuery ?? ""}
									onChange={(e) => setSearchQuery(e.target.value || null)}
									aria-label="Search fonts"
								/>
								<InputGroupAddon>
									<HugeiconsIcon
										icon={Search01Icon}
										size={24}
										color="currentColor"
										strokeWidth={1.5}
									/>
								</InputGroupAddon>
							</InputGroup>
						</div>
					</div>

					<RotatingSpecimen />
				</div>

				<FilterGrid
					filters={filters}
					values={filterValues}
					onValueChange={onFilterChange}
				/>
			</section>
		</div>
	);
}
