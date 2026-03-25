"use client";

import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { PRO_TIER, getCheckoutUrl } from "@/lib/pro";

const MCP_TOOLS = [
	{
		name: "search_pairings",
		description: "Search curated font pairings by mood, use case, or style",
		example: '"Find an elegant serif pairing for a blog"',
	},
	{
		name: "search_fonts",
		description: "Search individual fonts by name or category",
		example: '"Find monospace fonts"',
	},
	{
		name: "preview_pairing",
		description: "Get full details: fonts, mood, typography scale, CSS vars",
		example: '"Preview the editorial pairing"',
	},
	{
		name: "install_pairing",
		description: "Install a font pairing into your project automatically",
		example: '"Install modern-clean"',
	},
	{
		name: "install_font",
		description: "Install an individual font into your project",
		example: '"Install Inter"',
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
		<div className="min-h-screen bg-black">
			<div className="mx-auto max-w-3xl px-6 py-24">
				{/* Hero */}
				<div className="text-center mb-16">
					<h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
						AI-powered font pairing
					</h1>
					<p className="text-white/50 text-lg max-w-xl mx-auto">
						Search, preview, and install curated font pairings directly from
						your IDE. Works with Claude Code, Cursor, Codex, and OpenCode.
					</p>
				</div>

				{/* MCP Tools */}
				<section className="mb-12">
					<h2 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-6">
						MCP Server Tools
					</h2>
					<div className="grid gap-3">
						{MCP_TOOLS.map((tool) => (
							<div
								key={tool.name}
								className="rounded-xl border border-white/10 bg-white/5 p-4"
							>
								<div className="flex items-start justify-between gap-4">
									<div>
										<code className="text-sm font-mono text-white/80">
											{tool.name}
										</code>
										<p className="text-white/40 text-sm mt-1">
											{tool.description}
										</p>
									</div>
									<span className="text-white/20 text-xs whitespace-nowrap mt-0.5">
										{tool.example}
									</span>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* Skills */}
				<section className="mb-12">
					<h2 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-6">
						Claude Code Skills
					</h2>
					<div className="grid gap-3">
						{SKILLS.map((skill) => (
							<div
								key={skill.name}
								className="rounded-xl border border-white/10 bg-white/5 p-4"
							>
								<code className="text-sm font-mono text-white/80">
									/{skill.name}
								</code>
								<p className="text-white/40 text-sm mt-1">
									{skill.description}
								</p>
							</div>
						))}
					</div>
				</section>

				{/* Setup Docs */}
				<section className="mb-12">
					<h2 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-6">
						Setup
					</h2>
					<div className="rounded-xl border border-white/10 bg-white/5 p-6 space-y-4">
						<p className="text-white/60 text-sm">
							After subscribing, run this command to install MCP + Skills:
						</p>
						<div className="bg-black/50 rounded-lg px-4 py-3 border border-white/10">
							<code className="text-sm text-green-400 font-mono break-all">
								curl -fsSL https://www.fonttrio.xyz/api/install?key={displayKey}{" "}
								| bash
							</code>
						</div>
						<p className="text-white/30 text-xs">
							The script will let you choose your IDE (Claude Code, Cursor,
							Codex, OpenCode) and configure everything automatically.
						</p>

						<div className="pt-4 border-t border-white/10">
							<p className="text-white/40 text-sm mb-2">
								Or configure manually:
							</p>
							<div className="bg-black/50 rounded-lg px-4 py-3 border border-white/10">
								<pre className="text-xs text-white/60 font-mono overflow-x-auto">
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

				{/* Pricing */}
				<section>
					<div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
						<h2 className="text-2xl font-bold text-white mb-2">Pro</h2>
						<div className="mb-4">
							<span className="text-4xl font-bold text-white">
								${PRO_TIER.price}
							</span>
							<span className="text-white/40 text-sm">/month</span>
						</div>
						<ul className="text-left space-y-2 mb-6 max-w-sm mx-auto">
							{PRO_TIER.features.map((feature) => (
								<li
									key={feature}
									className="flex items-start gap-2 text-white/60 text-sm"
								>
									<Check className="size-4 text-green-400 mt-0.5 shrink-0" />
									{feature}
								</li>
							))}
						</ul>
						{isPro ? (
							<Button
								size="lg"
								variant="ghost"
								className="rounded-full text-white/40 cursor-default"
								disabled
							>
								Already subscribed
							</Button>
						) : (
							<Button
								size="lg"
								className="rounded-full cursor-pointer"
								asChild
							>
								<a
									href={
										session?.user
											? getCheckoutUrl(session.user.id)
											: "#"
									}
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
					</div>
				</section>
			</div>
		</div>
	);
}
