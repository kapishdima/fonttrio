"use client";

import {
	LanguageSkillIcon,
	Search01Icon,
	Shirt01Icon,
	SmileIcon,
	TextFontIcon,
	Trash2,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
	AnimatePresence,
	motion,
	useCycle,
	useReducedMotion,
} from "motion/react";
import { useEffect, useState } from "react";
import { FontFullCard } from "@/app/components/font-card";
import { InnerHeader } from "@/app/components/header";
import { RotatingSpecimen } from "@/app/components/rotating-specimen";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldTitle } from "@/components/ui/field";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { type FontItem, getAllFontsClient } from "@/lib/fonts";
import {
	FONT_CATEGORY_OPTIONS,
	useFontFilters,
} from "@/lib/hooks/use-font-filters";

const allFonts = getAllFontsClient().sort((a, b) =>
	a.title.localeCompare(b.title),
);

export default function Redesign04Fonts() {
	const filters = useFontFilters(allFonts);

	return (
		<main className="bg-black">
			<InnerHeader
				extraWhenScroll={
					<FontFilterPill
						searchQuery={filters.searchQuery}
						setSearchQuery={filters.setSearchQuery}
						categoryFilter={filters.categoryFilter}
						setCategoryFilter={filters.setCategoryFilter}
					/>
				}
			/>
			<FontsHero
				searchQuery={filters.searchQuery}
				setSearchQuery={filters.setSearchQuery}
				categoryFilter={filters.categoryFilter}
				setCategoryFilter={filters.setCategoryFilter}
				totalCount={allFonts.length}
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

const SPECIMEN_FONTS = [
	{ name: "Playfair Display", family: "'Playfair Display', serif" },
	{ name: "Space Grotesk", family: "'Space Grotesk', sans-serif" },
	{ name: "DM Serif Display", family: "'DM Serif Display', serif" },
	{ name: "Cormorant Garamond", family: "'Cormorant Garamond', serif" },
];

function FontsHero({
	searchQuery,
	setSearchQuery,
	categoryFilter,
	setCategoryFilter,
	totalCount,
}: {
	searchQuery: string;
	setSearchQuery: (v: string | null) => void;
	categoryFilter: string;
	setCategoryFilter: (v: string) => void;
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

				<FontFilter
					categoryFilter={categoryFilter}
					setCategoryFilter={setCategoryFilter}
				/>
			</section>
		</div>
	);
}

function FontFilter({
	categoryFilter,
	setCategoryFilter,
}: {
	categoryFilter: string;
	setCategoryFilter: (v: string) => void;
}) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 rounded-3xl">
			<Field>
				<FieldLabel>
					<FieldTitle className="text-default">
						<HugeiconsIcon
							icon={Shirt01Icon}
							size={18}
							color="currentColor"
							strokeWidth={1.5}
						/>
						Appearance
					</FieldTitle>
				</FieldLabel>
				<Select>
					<SelectTrigger className="w-full bg-neutral-100 dark:bg-neutral-800">
						<SelectValue placeholder="Appearance" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="modern">Modern</SelectItem>
						<SelectItem value="classic">Classic</SelectItem>
						<SelectItem value="geometric">Geometric</SelectItem>
						<SelectItem value="humanist">Humanist</SelectItem>
						<SelectItem value="grotesque">Grotesque</SelectItem>
					</SelectContent>
				</Select>
			</Field>
			<Field>
				<FieldLabel>
					<FieldTitle className="text-default">
						<HugeiconsIcon
							icon={TextFontIcon}
							size={18}
							color="currentColor"
							strokeWidth={1.5}
						/>
						Category
					</FieldTitle>
				</FieldLabel>
				<Select
					value={categoryFilter === "all" ? undefined : categoryFilter}
					onValueChange={(v) => setCategoryFilter(v)}
				>
					<SelectTrigger className="w-full bg-neutral-100 dark:bg-neutral-800">
						<SelectValue placeholder="Category" />
					</SelectTrigger>
					<SelectContent>
						{FONT_CATEGORY_OPTIONS.filter((c) => c.key !== "all").map((cat) => (
							<SelectItem key={cat.key} value={cat.key}>
								{cat.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</Field>
			<Field>
				<FieldLabel>
					<FieldTitle className="text-default">
						<HugeiconsIcon
							icon={LanguageSkillIcon}
							size={18}
							color="currentColor"
							strokeWidth={1.5}
						/>
						Language
					</FieldTitle>
				</FieldLabel>
				<Select>
					<SelectTrigger className="w-full bg-neutral-100 dark:bg-neutral-800">
						<SelectValue placeholder="Language" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="latin">Latin</SelectItem>
						<SelectItem value="cyrillic">Cyrillic</SelectItem>
						<SelectItem value="greek">Greek</SelectItem>
						<SelectItem value="vietnamese">Vietnamese</SelectItem>
						<SelectItem value="arabic">Arabic</SelectItem>
						<SelectItem value="hebrew">Hebrew</SelectItem>
						<SelectItem value="devanagari">Devanagari</SelectItem>
						<SelectItem value="chinese-simplified">
							Chinese Simplified
						</SelectItem>
						<SelectItem value="japanese">Japanese</SelectItem>
						<SelectItem value="korean">Korean</SelectItem>
					</SelectContent>
				</Select>
			</Field>
			<Field>
				<FieldLabel>
					<FieldTitle className="text-default">
						<HugeiconsIcon
							icon={SmileIcon}
							size={18}
							color="currentColor"
							strokeWidth={1.5}
						/>
						Feeling
					</FieldTitle>
				</FieldLabel>
				<Select>
					<SelectTrigger className="w-full bg-neutral-100 dark:bg-neutral-800">
						<SelectValue placeholder="Feeling" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="elegant">Elegant</SelectItem>
						<SelectItem value="playful">Playful</SelectItem>
						<SelectItem value="professional">Professional</SelectItem>
						<SelectItem value="minimal">Minimal</SelectItem>
						<SelectItem value="warm">Warm</SelectItem>
						<SelectItem value="bold">Bold</SelectItem>
					</SelectContent>
				</Select>
			</Field>
		</div>
	);
}

function FontsList({
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

const PILL_FILTERS = [
	{ id: "appearance", icon: Shirt01Icon, label: "Appearance" },
	{ id: "category", icon: TextFontIcon, label: "Category" },
	{ id: "language", icon: LanguageSkillIcon, label: "Language" },
	{ id: "feeling", icon: SmileIcon, label: "Feeling" },
];

function FontFilterPill({
	searchQuery,
	setSearchQuery,
	categoryFilter,
	setCategoryFilter,
}: {
	searchQuery: string;
	setSearchQuery: (v: string | null) => void;
	categoryFilter: string;
	setCategoryFilter: (v: string) => void;
}) {
	const [activeFilter, setActiveFilter] = useState<string | null>(null);

	return (
		<>
			<motion.div
				layout
				className="bg-neutral-950 backdrop-blur-md border border-white/10 flex flex-col overflow-hidden rounded-full z-0 px-2 py-1.5 min-w-32 w-40 sm:w-48 md:w-56 lg:w-64 shrink"
				transition={{
					layout: { duration: 0.3, type: "spring", bounce: 0 },
				}}
			>
				<InputGroup className="border-none text-white rounded-full">
					<InputGroupAddon>
						<HugeiconsIcon
							icon={Search01Icon}
							size={24}
							color="currentColor"
							strokeWidth={1.5}
						/>
					</InputGroupAddon>
					<InputGroupInput
						value={searchQuery ?? ""}
						onChange={(e) => setSearchQuery(e.target.value || null)}
						placeholder="Search fonts..."
					/>
				</InputGroup>
			</motion.div>
			<motion.div
				layout
				className="bg-neutral-950 backdrop-blur-md border border-white/10 flex flex-col overflow-hidden rounded-full z-0 shrink-0"
				transition={{
					layout: { duration: 0.3, type: "spring", bounce: 0 },
				}}
			>
				<div className="flex items-center gap-1 px-2 py-1.5 overflow-x-auto scrollbar-hide">
					{PILL_FILTERS.map((filter) => (
						<>
							<Button
								key={filter.id}
								size="icon"
								variant="ghost"
								className={`h-8 w-8 rounded-full p-0 text-white ${activeFilter === filter.id ? "bg-white text-neutral-950" : "bg-transparent"}`}
								onClick={() =>
									setActiveFilter((f) => (f === filter.id ? null : filter.id))
								}
							>
								<HugeiconsIcon
									icon={filter.icon}
									size={12}
									strokeWidth={1.5}
									color="currentColor"
								/>
							</Button>
							{activeFilter === filter.id ? (
								<motion.div
									layout
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
								>
									<Select>
										<SelectTrigger className="w-28 sm:w-40 bg-neutral-800 border-neutral-700 text-white text-xs h-8">
											<SelectValue placeholder={filter.label} />
										</SelectTrigger>
										<SelectContent className="fixed z-200">
											<SelectItem value="option-1">Option 1</SelectItem>
											<SelectItem value="option-2">Option 2</SelectItem>
											<SelectItem value="option-3">Option 3</SelectItem>
										</SelectContent>
									</Select>
								</motion.div>
							) : null}
						</>
					))}
					<Button
						size="icon"
						variant="destructive"
						className="h-8 w-8 rounded-full p-0"
					>
						<HugeiconsIcon
							icon={Trash2}
							size={12}
							strokeWidth={1.5}
							color="currentColor"
						/>
					</Button>
				</div>
			</motion.div>
		</>
	);
}
