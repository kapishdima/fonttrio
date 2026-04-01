import {
	CodeBlockCommand,
	convertNpmCommand,
} from "@/components/code-block-command/code-block-command";
import { BackLink } from "@/components/ui/back-link";
import { Badge } from "@/components/ui/badge";
import { type FontItem, parseFontCategory } from "@/lib/fonts";
import { buildInstallCommand } from "@/lib/package-managers";

export function FontHero({
	font,
	fontFamily,
}: {
	font: FontItem;
	fontFamily: string;
}) {
	const category = parseFontCategory(font);
	const subsets = font.font.subsets.filter((s) => s !== "menu");

	return (
		<div className="p-3">
			<section className="w-full dark:bg-neutral-950 bg-white rounded-4xl py-12 md:py-20 px-4 sm:px-6 md:px-12 lg:px-24">
				<BackLink href="/fonts" text="All fonts" />

				<div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 lg:gap-16">
					{/* Left: Identity */}
					<div className="flex-1 min-w-0">
						<h1
							className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight dark:text-white text-neutral-900 text-balance"
							style={{ fontFamily }}
						>
							{font.title}
						</h1>

						<p className="mt-2 text-base sm:text-lg dark:text-neutral-400 text-neutral-600 leading-relaxed max-w-xl text-pretty">
							{font.description}
						</p>

						<div className="flex flex-wrap gap-1.5 mt-6">
							<Badge
								variant="secondary"
								className="text-xs rounded-md font-medium capitalize"
							>
								{category}
							</Badge>
							<Badge
								variant="secondary"
								className="text-xs rounded-md font-medium tabular-nums"
							>
								{font.font.weight.length} weights
							</Badge>
							{subsets.map((subset) => (
								<Badge
									key={subset}
									variant="secondary"
									className="text-xs rounded-md font-medium capitalize"
								>
									{subset.replace(/-/g, " ")}
								</Badge>
							))}
						</div>

						<div className="mt-8 max-w-xl">
							<p className="text-sm font-medium dark:text-neutral-500 text-neutral-400 mb-2 tracking-tighter ">
								Installation
							</p>
							<div className="dark:bg-neutral-900/50 bg-neutral-50 dark:text-white text-neutral-800 rounded-md text-sm font-medium block">
								<CodeBlockCommand
									{...convertNpmCommand(buildInstallCommand(font.name))}
								/>
							</div>
						</div>
					</div>

					{/* Right: Large specimen */}
					<div className="lg:w-80 shrink-0 dark:bg-neutral-900/50 bg-neutral-50 rounded-xl p-6 flex flex-col items-center justify-center gap-4">
						<p
							className="text-8xl lg:text-9xl font-semibold dark:text-neutral-200 text-neutral-800 leading-none"
							style={{ fontFamily }}
						>
							Aa
						</p>
						<p
							className="text-sm dark:text-neutral-400 text-neutral-500 text-center leading-relaxed"
							style={{ fontFamily }}
						>
							ABCDEFGHIJKLM
							<br />
							NOPQRSTUVWXYZ
							<br />
							abcdefghijklm
							<br />
							nopqrstuvwxyz
							<br />
							0123456789
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}
