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
							Search, preview, and install curated font pairings directly from
							your IDE. Works with Claude&nbsp;Code, Cursor, Codex, and
							OpenCode. Free for everyone.
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
								Install typography audit and suggestion skills for your AI
								coding agent via{" "}
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
									npx skills add kapishdima/fonttrio
								</code>
							</div>
						</div>

						{/* MCP */}
						<div>
							<h3 className="font-medium dark:text-white text-neutral-900 mb-3">
								MCP Server
							</h3>
							<p className="text-sm dark:text-neutral-400 text-neutral-600 mb-3">
								Add this to your IDE's MCP configuration for AI-powered font
								search and install:
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
								<ConfigPath ide="Claude Code" path="~/.claude/settings.json" />
								<ConfigPath ide="Cursor" path="~/.cursor/mcp.json" />
								<ConfigPath ide="Codex" path="~/.codex/mcp.json" />
								<ConfigPath ide="OpenCode" path="~/.opencode/mcp.json" />
							</div>
						</div>
					</div>
				</section>
			</div>

			{/* Codex Plugin */}
			<div className="p-3 pt-0">
				<section className="w-full dark:bg-neutral-950 bg-white rounded-4xl px-4 sm:px-6 md:px-12 lg:px-24 py-16 md:py-24">
					<h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight dark:text-white text-neutral-900 mb-4">
						Codex Plugin
					</h2>
					<p className="text-sm dark:text-neutral-400 text-neutral-600 mb-12 max-w-xl">
						Install the fonttrio plugin for OpenAI Codex. Includes MCP server
						connection + typography skills — search, audit, and install font
						pairings right from Codex.
					</p>

					<div className="space-y-8 max-w-2xl">
						<div>
							<h3 className="font-medium dark:text-white text-neutral-900 mb-3">
								Workspace install (recommended)
							</h3>
							<p className="text-sm dark:text-neutral-400 text-neutral-600 mb-3">
								Run in your project root to install the plugin for this repo:
							</p>
							<div className="rounded-xl dark:bg-neutral-900 bg-neutral-100 border dark:border-neutral-800 border-neutral-200 px-4 py-3 overflow-x-auto">
								<code className="text-sm font-mono dark:text-neutral-300 text-neutral-700">
									curl -fsSL fonttrio.xyz/install-codex.sh | bash
								</code>
							</div>
						</div>

						<div>
							<h3 className="font-medium dark:text-white text-neutral-900 mb-3">
								Personal install
							</h3>
							<p className="text-sm dark:text-neutral-400 text-neutral-600 mb-3">
								Install globally for all your Codex workspaces:
							</p>
							<div className="rounded-xl dark:bg-neutral-900 bg-neutral-100 border dark:border-neutral-800 border-neutral-200 px-4 py-3 overflow-x-auto">
								<code className="text-sm font-mono dark:text-neutral-300 text-neutral-700">
									curl -fsSL fonttrio.xyz/install-codex.sh | bash -s --
									--personal
								</code>
							</div>
						</div>

						<div>
							<h3 className="font-medium dark:text-white text-neutral-900 mb-3">
								Activate in Codex
							</h3>
							<p className="text-sm dark:text-neutral-400 text-neutral-600 mb-3">
								After running the install script, open Codex and:
							</p>
							<ol className="text-sm dark:text-neutral-400 text-neutral-600 space-y-2 list-decimal list-inside">
								<li>
									Go to the{" "}
									<span className="font-medium dark:text-neutral-200 text-neutral-800">
										Plugins
									</span>{" "}
									tab
								</li>
								<li>
									Find{" "}
									<span className="font-medium dark:text-neutral-200 text-neutral-800">
										Fonttrio
									</span>{" "}
									in the list
								</li>
								<li>
									Click{" "}
									<span className="font-medium dark:text-neutral-200 text-neutral-800">
										Add
									</span>{" "}
									to enable it
								</li>
							</ol>
						</div>

						<details className="group">
							<summary className="cursor-pointer text-sm font-medium dark:text-neutral-400 text-neutral-500 hover:dark:text-neutral-300 hover:text-neutral-600">
								Manual installation
							</summary>
							<div className="mt-4 space-y-4 text-sm dark:text-neutral-400 text-neutral-600">
								<div>
									<p className="mb-2">
										1. Download and extract the plugin:
									</p>
									<div className="rounded-xl dark:bg-neutral-900 bg-neutral-100 border dark:border-neutral-800 border-neutral-200 px-4 py-3 overflow-x-auto">
										<code className="text-xs font-mono dark:text-neutral-300 text-neutral-700">
											curl -fsSL fonttrio.xyz/fonttrio-codex-plugin.tar.gz |
											tar -xz
										</code>
									</div>
								</div>
								<div>
									<p className="mb-2">
										2. Move{" "}
										<code className="dark:text-neutral-300 text-neutral-700">
											fonttrio/
										</code>{" "}
										to{" "}
										<code className="dark:text-neutral-300 text-neutral-700">
											.agents/plugins/fonttrio/
										</code>{" "}
										in your repo
									</p>
								</div>
								<div>
									<p className="mb-2">
										3. Create{" "}
										<code className="dark:text-neutral-300 text-neutral-700">
											.agents/plugins/marketplace.json
										</code>
										:
									</p>
									<div className="rounded-xl dark:bg-neutral-900 bg-neutral-100 border dark:border-neutral-800 border-neutral-200 px-4 py-3 overflow-x-auto">
										<pre className="text-xs font-mono dark:text-neutral-300 text-neutral-700">
											{`{
  "name": "fonttrio",
  "interface": { "displayName": "Fonttrio" },
  "plugins": [{
    "name": "fonttrio",
    "source": {
      "source": "local",
      "path": "./.agents/plugins/fonttrio"
    },
    "policy": {
      "installation": "AVAILABLE",
      "authentication": "ON_INSTALL"
    },
    "category": "Productivity"
  }]
}`}
										</pre>
									</div>
								</div>
								<div>
									<p className="mb-2">
										4. Open Codex → Plugins tab → select Fonttrio → click Add
									</p>
								</div>
							</div>
						</details>
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
