"use client";

import { CheckmarkBadge02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Footer } from "@/app/components/footer";
import { InnerHeader } from "@/app/components/header";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { getCheckoutUrl, PRO_TIER } from "@/lib/pro";

const EASE = [0.16, 1, 0.3, 1] as const;

const MCP_TOOLS = [
	{
		name: "search_pairings",
		description: "Search curated font pairings by mood, use case, or style",
		example: "Find an elegant serif pairing for a blog",
	},
	{
		name: "search_fonts",
		description: "Search individual fonts by name or category",
		example: "Find monospace fonts",
	},
	{
		name: "preview_pairing",
		description: "Get full details: fonts, mood, typography scale, CSS vars",
		example: "Preview the editorial pairing",
	},
	{
		name: "install_pairing",
		description: "Install a font pairing into your project automatically",
		example: "Install modern-clean",
	},
	{
		name: "install_font",
		description: "Install an individual font into your project",
		example: "Install Inter",
	},
];

const SKILLS = [
	{
		name: "audit-typography",
		description:
			"Analyzes your project's current typography setup and identifies issues: missing fonts, inconsistent scales, accessibility problems.",
	},
	{
		name: "suggest-improvements",
		description:
			"Analyzes your project's stack, mood, and use case, then recommends the best font pairing and offers to install it.",
	},
];

export default function AIPage() {
	const { data: session } = authClient.useSession();
	const [apiKey, setApiKey] = useState<string | null>(null);
	const [subscription, setSubscription] = useState<string>("free");

	useEffect(() => {
		if (!session?.user) return;
		Promise.all([
			fetch("/api/account/api-key").then((r) => r.json()),
			fetch("/api/account/subscription").then((r) => r.json()),
		]).then(([keyData, subData]) => {
			setApiKey(keyData.apiKey || null);
			setSubscription(subData.status || "free");
		});
	}, [session?.user]);

	const isPro = subscription === "active";
	const displayKey = isPro && apiKey ? apiKey : "YOUR_API_KEY";

	return (
		<main className="bg-black min-h-screen flex flex-col">
			<InnerHeader />

			{/* Hero + Pricing */}
			<div className="p-3 pt-20">
				<section className="w-full dark:bg-neutral-950 bg-white rounded-4xl px-4 sm:px-6 md:px-12 lg:px-24 py-16 md:py-24">
					<div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 lg:gap-16">
						{/* Left: text */}
						<div className="flex-1 min-w-0">
							<motion.h1
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, ease: EASE }}
								className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight dark:text-white text-neutral-900 text-balance max-w-2xl"
							>
								AI-powered font pairing
							</motion.h1>
							<motion.p
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
								className="mt-4 text-base md:text-lg dark:text-neutral-400 text-neutral-600 max-w-xl"
							>
								Search, preview, and install curated font pairings directly from
								your IDE. Works with Claude&nbsp;Code, Cursor, Codex, and
								OpenCode.
							</motion.p>
						</div>

						{/* Right: pricing card */}
						<motion.div
							initial={{ opacity: 0, y: 24 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
							className="rounded-2xl border dark:border-neutral-700 border-neutral-300 dark:bg-neutral-900/50 bg-neutral-50 p-6 md:p-8 w-full lg:w-[380px] shrink-0"
						>
							<div className="mb-6">
								<div className="mt-2 flex items-baseline gap-1">
									<span className="text-3xl md:text-5xl font-semibold tracking-tighter dark:text-white text-neutral-900 tabular-nums">
										$ {PRO_TIER.price}
									</span>
									<span className="text-base dark:text-neutral-500 text-neutral-400">
										/month
									</span>
								</div>
							</div>

							<ul className="space-y-3 mb-8">
								{PRO_TIER.features.map((feature) => (
									<li
										key={feature}
										className="flex items-start gap-2.5 text-sm"
									>
										<HugeiconsIcon
											icon={CheckmarkBadge02Icon}
											size={16}
											color="currentColor"
											strokeWidth={1.5}
											className="shrink-0 mt-0.5"
										/>
										<span className="dark:text-neutral-300 text-neutral-700">
											{feature}
										</span>
									</li>
								))}
							</ul>

							{isPro ? (
								<Button variant="outline" className="w-full h-10" disabled>
									Already subscribed
								</Button>
							) : (
								<Button
									variant="default"
									className="w-full h-10 cursor-pointer"
									asChild
								>
									<a
										href={session?.user ? getCheckoutUrl(session.user.id) : "#"}
										onClick={(e) => {
											if (!session?.user) {
												e.preventDefault();
												authClient.signIn.social({
													provider: "github",
												});
											}
										}}
									>
										{session?.user ? "Subscribe" : "Sign in to subscribe"}
									</a>
								</Button>
							)}
						</motion.div>
					</div>
				</section>
			</div>

			{/* MCP Tools */}
			<div className="p-3 pt-0">
				<section className="w-full dark:bg-neutral-950 bg-white rounded-4xl px-4 sm:px-6 md:px-12 lg:px-24 py-16 md:py-24">
					<h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight dark:text-white text-neutral-900 mb-12">
						MCP Server Tools
					</h2>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{MCP_TOOLS.map((tool, i) => (
							<motion.div
								key={tool.name}
								initial={{ opacity: 0, y: 24 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-60px" }}
								transition={{
									duration: 0.5,
									ease: EASE,
									delay: i * 0.06,
								}}
								className="rounded-2xl border dark:border-neutral-800 border-neutral-200 p-5 md:p-6"
							>
								<code className="text-sm font-mono dark:text-white text-neutral-900">
									{tool.name}
								</code>
								<p className="text-sm dark:text-neutral-400 text-neutral-600 mt-2 leading-relaxed">
									{tool.description}
								</p>
								<p className="text-xs dark:text-neutral-600 text-neutral-400 mt-3">
									{tool.example}
								</p>
							</motion.div>
						))}
					</div>
				</section>
			</div>

			{/* Skills */}
			<div className="p-3 pt-0">
				<section className="w-full dark:bg-neutral-950 bg-white rounded-4xl px-4 sm:px-6 md:px-12 lg:px-24 py-16 md:py-24">
					<h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight dark:text-white text-neutral-900 mb-12">
						Claude Code Skills
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{SKILLS.map((skill, i) => (
							<motion.div
								key={skill.name}
								initial={{ opacity: 0, y: 24 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-60px" }}
								transition={{
									duration: 0.5,
									ease: EASE,
									delay: i * 0.08,
								}}
								className="rounded-2xl border dark:border-neutral-800 border-neutral-200 p-6"
							>
								<code className="text-sm font-mono dark:text-white text-neutral-900">
									/{skill.name}
								</code>
								<p className="text-sm dark:text-neutral-400 text-neutral-600 mt-2 leading-relaxed">
									{skill.description}
								</p>
							</motion.div>
						))}
					</div>
				</section>
			</div>

			{/* Setup */}
			<div className="p-3 pt-0">
				<section className="w-full dark:bg-neutral-950 bg-white rounded-4xl px-4 sm:px-6 md:px-12 lg:px-24 py-16 md:py-24">
					<h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight dark:text-white text-neutral-900 mb-12">
						Setup
					</h2>

					<div className="space-y-6 max-w-2xl">
						<div>
							<p className="text-sm dark:text-neutral-400 text-neutral-600 mb-3">
								After subscribing, run this command to install MCP + Skills:
							</p>
							<div className="rounded-xl dark:bg-neutral-900 bg-neutral-100 border dark:border-neutral-800 border-neutral-200 px-4 py-3 overflow-x-auto">
								<code className="text-sm font-mono dark:text-neutral-300 text-neutral-700 break-all">
									curl -fsSL https://www.fonttrio.xyz/api/install?key=
									{displayKey} | bash
								</code>
							</div>
							<p className="text-xs dark:text-neutral-500 text-neutral-400 mt-2">
								The script will let you choose your IDE and configure everything
								automatically.
							</p>
						</div>

						<div className="h-px dark:bg-neutral-800 bg-neutral-200" />

						<div>
							<p className="text-sm dark:text-neutral-400 text-neutral-600 mb-3">
								Or configure manually:
							</p>
							<div className="rounded-xl dark:bg-neutral-900 bg-neutral-100 border dark:border-neutral-800 border-neutral-200 px-4 py-3 overflow-x-auto">
								<pre className="text-xs font-mono dark:text-neutral-300 text-neutral-700">
									{`// ~/.claude/settings.json or .vscode/mcp.json
{
  "mcpServers": {
    "fonttrio": {
      "url": "https://www.fonttrio.xyz/api/mcp",
      "headers": {
        "Authorization": "Bearer ${displayKey}"
      }
    }
  }
}`}
								</pre>
							</div>
						</div>
					</div>
				</section>
			</div>

			<Footer />
		</main>
	);
}
