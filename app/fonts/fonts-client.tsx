"use client";

import { useEffect, useState } from "react";
import { AnimatedLayout } from "@/app/components/animated-layout";
import { FontCard } from "@/app/components/font-card";
import { Pagination } from "@/app/components/pagination";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import type { FontItem } from "@/lib/fonts";
import { useFontFilters } from "@/lib/hooks/use-font-filters";

function ScrollToTopButton() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const toggleVisibility = () => {
			if (window.scrollY > 400) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};

		window.addEventListener("scroll", toggleVisibility);
		return () => window.removeEventListener("scroll", toggleVisibility);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<button
			type="button"
			onClick={scrollToTop}
			aria-label="Scroll to top"
			className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-10 h-10 bg-foreground text-background border border-border transition-all duration-300 ease-out-quart hover:bg-background hover:text-foreground ${
				isVisible
					? "opacity-100 translate-y-0"
					: "opacity-0 translate-y-4 pointer-events-none"
			}`}
		>
			<svg
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
			>
				<path
					d="M8 12V4M8 4L4 8M8 4L12 8"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="square"
					strokeLinejoin="miter"
				/>
			</svg>
		</button>
	);
}

interface FontsClientInnerProps {
	fonts: FontItem[];
}

function FontsClientInner({ fonts }: FontsClientInnerProps) {
	const {
		searchQuery,
		setSearchQuery,
		categoryFilter,
		setCategoryFilter,
		currentPage,
		totalPages,
		setPage,
		paginatedFonts,
		filteredFonts,
		hasActiveFilters,
		clearFilters,
		categoryOptions,
		itemsPerPage,
	} = useFontFilters(fonts);

	const goToPage = (page: number) => {
		setPage(page);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<div className="min-h-screen bg-background text-foreground">
			<SiteHeader />

			{/* Page Header */}
			<section className="pt-24 sm:pt-25 border-b border-border">
				<div className="px-4 lg:px-8 py-12 lg:py-20">
					<AnimatedLayout>
						<div className="flex flex-col gap-3">
							<p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-mono">
								01 — FONTS
							</p>
							<h1
								className="text-[clamp(3rem,10vw,8rem)] leading-none uppercase font-black tracking-tight"
								style={{ fontFamily: "var(--font-bebas-neue), sans-serif" }}
							>
								Fonts
							</h1>
							<p className="text-sm text-muted-foreground leading-relaxed max-w-md">
								Browse {fonts.length.toLocaleString()}+ fonts. Install any with
								a single command.
							</p>
						</div>
					</AnimatedLayout>
				</div>
			</section>

			{/* Sticky Filters */}
			<div className="sticky top-16 z-40 bg-background/95 border-b border-border backdrop-blur-sm">
				<div className="px-4 lg:px-8 py-3 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
					{/* Search */}
					<div className="relative shrink-0 w-full sm:w-64">
						<input
							type="search"
							value={searchQuery ?? ""}
							onChange={(e) => setSearchQuery(e.target.value || null)}
							placeholder="Search fonts..."
							className="w-full font-mono text-xs px-3 py-2 bg-transparent border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground h-9"
							aria-label="Search fonts"
						/>
					</div>

					<span className="w-px h-6 bg-border shrink-0 hidden sm:block" />

					{/* Category filter */}
					<div className="flex items-center gap-0 overflow-x-auto no-scrollbar">
						{categoryOptions.map((cat) => (
							<button
								type="button"
								key={cat.key}
								onClick={() => setCategoryFilter(cat.key)}
								aria-pressed={categoryFilter === cat.key}
								className={`px-3 py-2 text-xs uppercase tracking-wider border-b-2 transition-[color,border-color] min-h-[44px] flex items-center whitespace-nowrap ${
									categoryFilter === cat.key
										? "border-foreground text-foreground"
										: "border-transparent text-muted-foreground hover:text-foreground"
								}`}
							>
								{cat.label}
							</button>
						))}
					</div>

					{/* Count + Clear */}
					<div className="flex items-center gap-3 sm:ml-auto shrink-0">
						<span className="text-xs font-mono text-muted-foreground tabular-nums">
							{filteredFonts.length.toLocaleString()} fonts
							{filteredFonts.length > itemsPerPage && (
								<span className="text-muted-foreground/50">
									{" "}
									({(currentPage - 1) * itemsPerPage + 1}-
									{Math.min(currentPage * itemsPerPage, filteredFonts.length)})
								</span>
							)}
						</span>
						{hasActiveFilters && (
							<button
								type="button"
								onClick={clearFilters}
								className="text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
							>
								Clear
							</button>
						)}
					</div>
				</div>
			</div>

			{/* Font Grid */}
			<main className="px-0">
				{filteredFonts.length === 0 ? (
					<div className="px-4 lg:px-8 py-24 text-center">
						<p className="text-muted-foreground text-sm">No fonts found.</p>
					</div>
				) : (
					<>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 border-t border-l border-border">
							{paginatedFonts.map((font, i) => (
								<AnimatedLayout key={font.name} delay={Math.min(i * 10, 150)}>
									<FontCard font={font} />
								</AnimatedLayout>
							))}
						</div>

						{/* Pagination */}
						{totalPages > 1 && (
							<div className="px-4 lg:px-8 py-8">
								<Pagination
									currentPage={currentPage}
									totalPages={totalPages}
									onPageChange={goToPage}
								/>
							</div>
						)}
					</>
				)}
			</main>

			<SiteFooter />
			<ScrollToTopButton />
		</div>
	);
}

interface FontsClientProps {
	fonts: FontItem[];
}

export function FontsClient({ fonts }: FontsClientProps) {
	return <FontsClientInner fonts={fonts} />;
}
