import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Footer } from "@/app/components/footer";
import { InnerHeader } from "@/app/components/header";
import { auth } from "@/lib/auth";
import { getOrCreateApiKey } from "@/lib/api-key";
import { supabase } from "@/lib/supabase";
import { AnimateIn } from "../ai-hero";

const MCP_TOOLS = [
	{
		name: "search_pairings",
		description: "Search curated font pairings by mood, use case, or style.",
		params: "query, mood, useCase, category, limit",
	},
	{
		name: "search_fonts",
		description: "Search individual fonts by name or category.",
		params: "query, category, limit",
	},
	{
		name: "preview_pairing",
		description:
			"Get full pairing details: fonts, mood, use cases, typography scale, CSS variables.",
		params: "name",
	},
	{
		name: "install_pairing",
		description:
			"Install a font pairing into the project. The AI will execute the install command automatically.",
		params: "name",
	},
	{
		name: "install_font",
		description:
			"Install an individual font into the project. The AI will execute the install command automatically.",
		params: "name",
	},
];

const SKILLS = [
	{
		name: "audit-typography",
		command: "/audit-typography",
		description:
			"Scans your project for font imports, CSS variables, typography scale, and font-display strategy. Reports issues ordered by severity with file paths and line numbers. Suggests a Fonttrio pairing if MCP is connected.",
	},
	{
		name: "suggest-improvements",
		command: "/suggest-improvements",
		description:
			"Reads your package.json, landing page, and styles to determine project type, mood, and audience. Searches Fonttrio for the best matching pairing and offers to install it.",
	},
];

export default async function AIDocsPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user) {
		redirect("/ai");
	}

	const { data: profile } = await supabase
		.from("profiles")
		.select("subscription_status, api_key")
		.eq("user_id", session.user.id)
		.single();

	if (profile?.subscription_status !== "active") {
		redirect("/ai");
	}

	const apiKey = profile.api_key || (await getOrCreateApiKey(session.user.id));

	return (
		<main className="bg-black min-h-screen flex flex-col">
			<InnerHeader />

			{/* Hero */}
			<div className="p-3 pt-20">
				<section className="w-full dark:bg-neutral-950 bg-white rounded-4xl px-4 sm:px-6 md:px-12 lg:px-24 py-16 md:py-24">
					<AnimateIn>
						<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight dark:text-white text-neutral-900">
							Documentation
						</h1>
					</AnimateIn>
					<AnimateIn delay={0.1}>
						<p className="mt-4 text-base md:text-lg dark:text-neutral-400 text-neutral-600 max-w-xl">
							Everything you need to set up and use Fonttrio Pro in your IDE.
						</p>
					</AnimateIn>
				</section>
			</div>

			{/* Quick Install */}
			<div className="p-3 pt-0">
				<section className="w-full dark:bg-neutral-950 bg-white rounded-4xl px-4 sm:px-6 md:px-12 lg:px-24 py-16 md:py-24">
					<h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight dark:text-white text-neutral-900 mb-12">
						Quick Install
					</h2>

					<div className="space-y-6 max-w-2xl">
						<p className="text-sm dark:text-neutral-400 text-neutral-600">
							Run this command to install MCP server and Claude Code skills.
							The script will let you choose your IDE (Claude&nbsp;Code, Cursor,
							Codex, OpenCode).
						</p>
						<div className="rounded-xl dark:bg-neutral-900 bg-neutral-100 border dark:border-neutral-800 border-neutral-200 px-4 py-3 overflow-x-auto">
							<code className="text-sm font-mono dark:text-neutral-300 text-neutral-700 break-all">
								curl -fsSL https://www.fonttrio.xyz/api/install?key={apiKey} |
								bash
							</code>
						</div>
					</div>
				</section>
			</div>

			{/* Manual Setup */}
			<div className="p-3 pt-0">
				<section className="w-full dark:bg-neutral-950 bg-white rounded-4xl px-4 sm:px-6 md:px-12 lg:px-24 py-16 md:py-24">
					<h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight dark:text-white text-neutral-900 mb-12">
						Manual Setup
					</h2>

					<div className="space-y-8 max-w-2xl">
						{/* MCP Config */}
						<div>
							<h3 className="font-medium dark:text-white text-neutral-900 mb-3">
								MCP Server
							</h3>
							<p className="text-sm dark:text-neutral-400 text-neutral-600 mb-3">
								Add this to your IDE's MCP configuration:
							</p>
							<div className="rounded-xl dark:bg-neutral-900 bg-neutral-100 border dark:border-neutral-800 border-neutral-200 px-4 py-3 overflow-x-auto">
								<pre className="text-xs font-mono dark:text-neutral-300 text-neutral-700">
{`{
  "mcpServers": {
    "fonttrio": {
      "url": "https://www.fonttrio.xyz/api/mcp",
      "headers": {
        "Authorization": "Bearer ${apiKey}"
      }
    }
  }
}`}
								</pre>
							</div>

							<div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
								<ConfigPath
									ide="Claude Code"
									path="~/.claude/settings.json"
								/>
								<ConfigPath ide="Cursor" path="~/.cursor/mcp.json" />
								<ConfigPath ide="Codex" path="~/.codex/mcp.json" />
								<ConfigPath
									ide="OpenCode"
									path="~/.opencode/mcp.json"
								/>
							</div>
						</div>

						{/* API Key */}
						<div className="h-px dark:bg-neutral-800 bg-neutral-200" />

						<div>
							<h3 className="font-medium dark:text-white text-neutral-900 mb-3">
								Your API Key
							</h3>
							<div className="rounded-xl dark:bg-neutral-900 bg-neutral-100 border dark:border-neutral-800 border-neutral-200 px-4 py-3">
								<code className="text-sm font-mono dark:text-neutral-300 text-neutral-700 break-all">
									{apiKey}
								</code>
							</div>
							<p className="text-xs dark:text-neutral-500 text-neutral-400 mt-2">
								You can regenerate this key in your{" "}
								<a
									href="/account"
									className="underline underline-offset-2 hover:dark:text-neutral-300 hover:text-neutral-600"
								>
									account settings
								</a>
								.
							</p>
						</div>
					</div>
				</section>
			</div>

			{/* Tool Reference */}
			<div className="p-3 pt-0">
				<section className="w-full dark:bg-neutral-950 bg-white rounded-4xl px-4 sm:px-6 md:px-12 lg:px-24 py-16 md:py-24">
					<h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight dark:text-white text-neutral-900 mb-12">
						MCP Tool Reference
					</h2>

					<div className="space-y-4 max-w-2xl">
						{MCP_TOOLS.map((tool) => (
							<div
								key={tool.name}
								className="rounded-2xl border dark:border-neutral-800 border-neutral-200 p-5 md:p-6"
							>
								<code className="text-sm font-mono dark:text-white text-neutral-900">
									{tool.name}
								</code>
								<p className="text-sm dark:text-neutral-400 text-neutral-600 mt-2">
									{tool.description}
								</p>
								<p className="text-xs dark:text-neutral-500 text-neutral-400 mt-2 font-mono">
									params: {tool.params}
								</p>
							</div>
						))}
					</div>
				</section>
			</div>

			{/* Skills Reference */}
			<div className="p-3 pt-0">
				<section className="w-full dark:bg-neutral-950 bg-white rounded-4xl px-4 sm:px-6 md:px-12 lg:px-24 py-16 md:py-24">
					<h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight dark:text-white text-neutral-900 mb-12">
						Skills Reference
					</h2>

					<div className="space-y-4 max-w-2xl">
						{SKILLS.map((skill) => (
							<div
								key={skill.name}
								className="rounded-2xl border dark:border-neutral-800 border-neutral-200 p-5 md:p-6"
							>
								<code className="text-sm font-mono dark:text-white text-neutral-900">
									{skill.command}
								</code>
								<p className="text-sm dark:text-neutral-400 text-neutral-600 mt-2 leading-relaxed">
									{skill.description}
								</p>
							</div>
						))}
					</div>
				</section>
			</div>

			<Footer />
		</main>
	);
}

function ConfigPath({ ide, path }: { ide: string; path: string }) {
	return (
		<div className="rounded-xl border dark:border-neutral-800 border-neutral-200 px-4 py-3">
			<p className="text-xs font-medium dark:text-neutral-400 text-neutral-500 mb-1">
				{ide}
			</p>
			<code className="text-xs font-mono dark:text-neutral-300 text-neutral-700">
				{path}
			</code>
		</div>
	);
}
