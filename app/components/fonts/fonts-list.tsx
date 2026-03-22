import { FontFullCard } from "@/app/components/font-card";
import { Button } from "@/components/ui/button";
import type { FontItem } from "@/lib/fonts";

export function FontsList({
	paginatedFonts,
	filteredCount,
	currentPage,
	totalPages,
	setPage,
}: {
	paginatedFonts: FontItem[];
	filteredCount: number;
	currentPage: number;
	totalPages: number;
	setPage: (page: number) => void;
}) {
	return (
		<div className="p-3">
			<section className="w-full h-full dark:bg-neutral-950 bg-white rounded-4xl py-16 px-4 sm:px-6 md:px-12 lg:px-24">
				{filteredCount === 0 ? (
					<div className="py-24 text-center">
						<p className="dark:text-neutral-400 text-neutral-500 text-sm font-medium">
							No fonts found.
						</p>
					</div>
				) : (
					<>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
							{paginatedFonts.map((font) => (
								<FontFullCard key={font.name} font={font} />
							))}
						</div>

						{totalPages > 1 && (
							<PaginationBar
								currentPage={currentPage}
								totalPages={totalPages}
								setPage={setPage}
							/>
						)}
					</>
				)}
			</section>
		</div>
	);
}

function PaginationBar({
	currentPage,
	totalPages,
	setPage,
}: {
	currentPage: number;
	totalPages: number;
	setPage: (page: number) => void;
}) {
	const goTo = (page: number) => {
		setPage(page);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	// Show up to 7 page numbers with ellipsis
	const pages: (number | "...")[] = [];
	if (totalPages <= 7) {
		for (let i = 1; i <= totalPages; i++) pages.push(i);
	} else {
		pages.push(1);
		if (currentPage > 3) pages.push("...");
		for (
			let i = Math.max(2, currentPage - 1);
			i <= Math.min(totalPages - 1, currentPage + 1);
			i++
		) {
			pages.push(i);
		}
		if (currentPage < totalPages - 2) pages.push("...");
		pages.push(totalPages);
	}

	return (
		<div className="flex items-center justify-center gap-1 mt-12">
			<Button
				variant="ghost"
				size="sm"
				className="rounded-full font-medium text-xs"
				disabled={currentPage === 1}
				onClick={() => goTo(currentPage - 1)}
			>
				← Prev
			</Button>

			{pages.map((p, i) =>
				p === "..." ? (
					<span
						key={`ellipsis-${i}`}
						className="px-2 text-xs dark:text-neutral-500 text-neutral-400"
					>
						…
					</span>
				) : (
					<Button
						key={p}
						variant={currentPage === p ? "default" : "ghost"}
						size="icon"
						className="h-8 w-8 rounded-full font-medium text-xs tabular-nums"
						onClick={() => goTo(p)}
					>
						{p}
					</Button>
				),
			)}

			<Button
				variant="ghost"
				size="sm"
				className="rounded-full font-medium text-xs"
				disabled={currentPage === totalPages}
				onClick={() => goTo(currentPage + 1)}
			>
				Next →
			</Button>
		</div>
	);
}
