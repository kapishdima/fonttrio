import { Footer } from "@/app/components/footer";
import { InnerHeader } from "@/app/components/header";
import { AnimateIn, AnimateInView } from "./ai-hero";

const MCP_TOOLS = [
	{
		name: "search_pairings",
		description: "Search curated font pairings by mood, use case, or style",
		example: "Find an elegant serif pairing for a blog",
		params: "query, mood, useCase, category, limit",
	},
	{
		name: "search_fonts",
		description: "Search individual fonts by name or category",
		example: "Find monospace fonts",
		params: "query, category, limit",
	},
	{
		name: "preview_pairing",
		description: "Get full details: fonts, mood, typography scale, CSS vars",
		example: "Preview the editorial pairing",
		params: "name",
	},
	{
		name: "install_pairing",
		description: "Install a font pairing into your project automatically",
		example: "Install modern-clean",
		params: "name",
	},
	{
		name: "install_font",
		description: "Install an individual font into your project",
		example: "Install Inter",
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

export default function AIPage() {
	return (
		<main className="bg-black min-h-screen flex flex-col">
			<InnerHeader />

			{/* Hero */}
			<div className="p-3 pt-20">
				<section className="w-full dark:bg-neutral-950 bg-white rounded-4xl px-4 sm:px-6 md:px-12 lg:px-24 py-16 md:py-24">
					<AnimateIn>
						<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight dark:text-white text-neutral-900 text-balance max-w-2xl">
							AI-powered font pairing
						</h1>
					</AnimateIn>
					<AnimateIn delay={0.1}>
						<p className="mt-4 text-base md:text-lg dark:text-neutral-400 text-neutral-600 max-w-xl">
							Search, preview, and install curated font pairings directly
							from your IDE. Works with Claude&nbsp;Code, Cursor, Codex,
							and OpenCode. Free for everyone.
						</p>
					</AnimateIn>
				</section>
			</div>

			{/* Get Started */}
			<div className="p-3 pt-0">
				<section className="w-full dark:bg-neutral-950 bg-white rounded-4xl px-4 sm:px-6 md:px-12 lg:px-24 py-16 md:py-24">
					<h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight dark:text-white text-neutral-900 mb-12">
						Get Started
					</h2>

					<div className="space-y-12 max-w-2xl">
						{/* Skills */}
						<div>
							<h3 className="font-medium dark:text-white text-neutral-900 mb-3">
								Install Skills
							</h3>
							<p className="text-sm dark:text-neutral-400 text-neutral-600 mb-3">
								Install typography audit and suggestion skills for your
								AI coding agent via{" "}
								<a
									href="https://skills.sh"
									className="underline underline-offset-2 hover:dark:text-neutral-300 hover:text-neutral-600"
									target="_blank"
									rel="noopener noreferrer"
								>
									skills.sh
								</a>
								:
							</p>
							<div className="rounded-xl dark:bg-neutral-900 bg-neutral-100 border dark:border-neutral-800 border-neutral-200 px-4 py-3 overflow-x-auto">
								<code className="text-sm font-mono dark:text-neutral-300 text-neutral-700">
									npx skills add fonttrio/fonttrio
								</code>
							</div>
						</div>

						{/* MCP */}
						<div>
							<h3 className="font-medium dark:text-white text-neutral-900 mb-3">
								MCP Server
							</h3>
							<p className="text-sm dark:text-neutral-400 text-neutral-600 mb-3">
								Add this to your IDE's MCP configuration for AI-powered
								font search and install:
							</p>
							<div className="rounded-xl dark:bg-neutral-900 bg-neutral-100 border dark:border-neutral-800 border-neutral-200 px-4 py-3 overflow-x-auto">
								<pre className="text-xs font-mono dark:text-neutral-300 text-neutral-700">
{`{
  "mcpServers": {
    "fonttrio": {
      "url": "https://www.fonttrio.xyz/api/mcp"
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
							<AnimateInView
								key={tool.name}
								delay={i * 0.06}
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
								<p className="text-xs dark:text-neutral-500 text-neutral-400 mt-2 font-mono">
									params: {tool.params}
								</p>
							</AnimateInView>
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
							<AnimateInView
								key={skill.name}
								delay={i * 0.08}
								className="rounded-2xl border dark:border-neutral-800 border-neutral-200 p-6"
							>
								<code className="text-sm font-mono dark:text-white text-neutral-900">
									{skill.command}
								</code>
								<p className="text-sm dark:text-neutral-400 text-neutral-600 mt-2 leading-relaxed">
									{skill.description}
								</p>
							</AnimateInView>
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
