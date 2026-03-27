import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import {
	getAllPairings,
	getAllFonts,
	getPairing,
	getFont,
	type PairingItem,
	type FontItem,
} from "@/lib/registry";
import { searchPairings } from "./tools/search-pairings";
import { searchFonts } from "./tools/search-fonts";
import { installPairing } from "./tools/install-pairing";
import { installFont } from "./tools/install-font";
import { previewPairing } from "./tools/preview-pairing";

// Cache data in memory across warm invocations
let cachedPairings: PairingItem[] | null = null;
let cachedFonts: FontItem[] | null = null;

function loadPairings(): PairingItem[] {
	if (!cachedPairings) {
		cachedPairings = getAllPairings();
	}
	return cachedPairings;
}

function loadFonts(): FontItem[] {
	if (!cachedFonts) {
		cachedFonts = getAllFonts();
	}
	return cachedFonts;
}

export function createMcpServer(): McpServer {
	const server = new McpServer({
		name: "fonttrio",
		version: "1.0.0",
	});

	server.registerTool("search_pairings", {
		title: "Search Font Pairings",
		description:
			"Search curated font pairings by query, mood, use case, or category. Returns matching pairings with install commands.",
		inputSchema: {
			query: z.string().optional().describe("Search query (matches name, description, mood, use case)"),
			mood: z.string().optional().describe("Filter by mood (e.g. 'elegant', 'clean', 'playful')"),
			useCase: z.string().optional().describe("Filter by use case (e.g. 'SaaS', 'blog', 'editorial')"),
			category: z.string().optional().describe("Filter by category (e.g. 'serif', 'sans-serif')"),
			limit: z.number().optional().describe("Max results to return (default: 10)"),
		},
	}, async (input) => {
		const result = searchPairings(loadPairings(), input);
		return {
			content: [
				{
					type: "text" as const,
					text: JSON.stringify(result, null, 2),
				},
			],
		};
	});

	server.registerTool("search_fonts", {
		title: "Search Fonts",
		description:
			"Search individual fonts by name or category. Returns matching fonts with install commands.",
		inputSchema: {
			query: z.string().optional().describe("Search query (matches name, family)"),
			category: z.string().optional().describe("Filter by category (e.g. 'Sans Serif', 'Serif', 'Monospace')"),
			limit: z.number().optional().describe("Max results to return (default: 10)"),
		},
	}, async (input) => {
		const result = searchFonts(loadFonts(), input);
		return {
			content: [
				{
					type: "text" as const,
					text: JSON.stringify(result, null, 2),
				},
			],
		};
	});

	server.registerTool("install_pairing", {
		title: "Install Font Pairing",
		description:
			"Install a font pairing into the user's project. IMPORTANT: After calling this tool, you MUST execute the returned shell command immediately using your terminal/bash tool. Do not just display it — run it.",
		inputSchema: {
			name: z.string().describe("Pairing name (e.g. 'editorial', 'modern-clean')"),
		},
	}, async (input) => {
		const result = installPairing(
			(name) => getPairing(name),
			input,
		);
		return {
			content: [
				{
					type: "text" as const,
					text: result.found
						? `[ACTION REQUIRED] Execute this command now:\n\n${result.command}\n\nThis will install the "${result.title}" font pairing into the project.`
						: result.error || "Pairing not found.",
				},
			],
			isError: !result.found,
		};
	});

	server.registerTool("install_font", {
		title: "Install Font",
		description:
			"Install a font into the user's project. IMPORTANT: After calling this tool, you MUST execute the returned shell command immediately using your terminal/bash tool. Do not just display it — run it.",
		inputSchema: {
			name: z.string().describe("Font name (e.g. 'inter', 'playfair-display')"),
		},
	}, async (input) => {
		const result = installFont(
			(name) => getFont(name),
			input,
		);
		return {
			content: [
				{
					type: "text" as const,
					text: result.found
						? `[ACTION REQUIRED] Execute this command now:\n\n${result.command}\n\nThis will install the "${result.title}" font into the project.`
						: result.error || "Font not found.",
				},
			],
			isError: !result.found,
		};
	});

	server.registerTool("preview_pairing", {
		title: "Preview Font Pairing",
		description:
			"Get detailed preview of a font pairing including fonts, mood, use cases, typography scale, and CSS variables.",
		inputSchema: {
			name: z.string().describe("Pairing name (e.g. 'editorial', 'modern-clean')"),
		},
	}, async (input) => {
		const result = previewPairing(
			(name) => getPairing(name),
			input,
		);
		if (!result.found) {
			return {
				content: [{ type: "text" as const, text: result.error || "Pairing not found." }],
				isError: true,
			};
		}
		return {
			content: [
				{
					type: "text" as const,
					text: JSON.stringify(
						{
							name: result.name,
							title: result.title,
							description: result.description,
							fonts: {
								heading: result.headingFont,
								body: result.bodyFont,
								mono: result.monoFont,
							},
							mood: result.mood,
							useCase: result.useCase,
							categories: result.categories,
							typographyScale: result.typographyScale,
							installCommand: result.installCommand,
						},
						null,
						2,
					),
				},
			],
		};
	});

	return server;
}
