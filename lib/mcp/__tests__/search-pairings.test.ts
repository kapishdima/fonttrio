import { describe, it, expect } from "vitest";
import { searchPairings } from "../tools/search-pairings";
import type { PairingData } from "@/lib/pairings";

const pairings: PairingData[] = [
	{
		name: "editorial",
		heading: "Playfair Display",
		headingKebab: "playfair-display",
		headingCategory: "serif",
		body: "Source Serif 4",
		bodyKebab: "source-serif-4",
		bodyCategory: "serif",
		mono: "JetBrains Mono",
		monoKebab: "jetbrains-mono",
		mood: ["elegant", "traditional", "authoritative"],
		useCase: ["blog", "editorial", "magazine", "documentation"],
		appearance: ["classic"],
		subsets: ["latin"],
		description: "Classic editorial pairing. High-contrast serif headings with readable serif body text.",
		scale: {
			h1: { size: "2.25rem", weight: 700, lineHeight: "1.2", letterSpacing: "-0.025em" },
			h2: { size: "1.875rem", weight: 600, lineHeight: "1.25", letterSpacing: "-0.02em" },
			h3: { size: "1.5rem", weight: 600, lineHeight: "1.3", letterSpacing: "-0.015em" },
			h4: { size: "1.25rem", weight: 500, lineHeight: "1.35", letterSpacing: "-0.01em" },
			h5: { size: "1.125rem", weight: 500, lineHeight: "1.4", letterSpacing: "0em" },
			h6: { size: "1rem", weight: 500, lineHeight: "1.5", letterSpacing: "0em" },
			body: { size: "1rem", lineHeight: "1.65", weight: 400 },
			code: { size: "0.875rem", lineHeight: "1.6", weight: 400 },
		},
		googleFontsUrl: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Source+Serif+4:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
	},
	{
		name: "modern-clean",
		heading: "Inter",
		headingKebab: "inter",
		headingCategory: "sans-serif",
		body: "Inter",
		bodyKebab: "inter",
		bodyCategory: "sans-serif",
		mono: "Geist Mono",
		monoKebab: "geist-mono",
		mood: ["clean", "neutral", "modern"],
		useCase: ["SaaS", "dashboard", "web app"],
		appearance: ["modern", "geometric"],
		subsets: ["latin"],
		description: "Modern clean pairing for SaaS and dashboards.",
		scale: {
			h1: { size: "2.25rem", weight: 700, lineHeight: "1.2", letterSpacing: "-0.025em" },
			h2: { size: "1.875rem", weight: 600, lineHeight: "1.25", letterSpacing: "-0.02em" },
			h3: { size: "1.5rem", weight: 600, lineHeight: "1.3", letterSpacing: "-0.015em" },
			h4: { size: "1.25rem", weight: 500, lineHeight: "1.35", letterSpacing: "-0.01em" },
			h5: { size: "1.125rem", weight: 500, lineHeight: "1.4", letterSpacing: "0em" },
			h6: { size: "1rem", weight: 500, lineHeight: "1.5", letterSpacing: "0em" },
			body: { size: "1rem", lineHeight: "1.6", weight: 400 },
			code: { size: "0.875rem", lineHeight: "1.6", weight: 400 },
		},
		googleFontsUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap",
	},
];

describe("searchPairings", () => {
	it("returns all pairings when no filters", () => {
		const result = searchPairings(pairings, {});
		expect(result.total).toBe(2);
		expect(result.pairings).toHaveLength(2);
	});

	it("searches by query in name", () => {
		const result = searchPairings(pairings, { query: "editorial" });
		expect(result.total).toBe(1);
		expect(result.pairings[0].name).toBe("editorial");
	});

	it("searches by query in description", () => {
		const result = searchPairings(pairings, { query: "SaaS" });
		expect(result.total).toBe(1);
		expect(result.pairings[0].name).toBe("modern-clean");
	});

	it("is case-insensitive", () => {
		const result = searchPairings(pairings, { query: "EDITORIAL" });
		expect(result.total).toBe(1);
		expect(result.pairings[0].name).toBe("editorial");
	});

	it("filters by mood", () => {
		const result = searchPairings(pairings, { mood: "elegant" });
		expect(result.total).toBe(1);
		expect(result.pairings[0].name).toBe("editorial");
	});

	it("filters by useCase", () => {
		const result = searchPairings(pairings, { useCase: "dashboard" });
		expect(result.total).toBe(1);
		expect(result.pairings[0].name).toBe("modern-clean");
	});

	it("filters by category", () => {
		const result = searchPairings(pairings, { category: "serif" });
		expect(result.total).toBe(1);
		expect(result.pairings[0].name).toBe("editorial");
	});

	it("returns empty for no matches", () => {
		const result = searchPairings(pairings, { query: "nonexistent" });
		expect(result.total).toBe(0);
		expect(result.pairings).toHaveLength(0);
	});

	it("respects limit", () => {
		const result = searchPairings(pairings, { limit: 1 });
		expect(result.total).toBe(2);
		expect(result.pairings).toHaveLength(1);
	});

	it("includes install command", () => {
		const result = searchPairings(pairings, { query: "editorial" });
		expect(result.pairings[0].installCommand).toContain(
			"bunx shadcn@latest add https://www.fonttrio.xyz/r/editorial.json",
		);
	});

	it("combines filters (mood + useCase)", () => {
		const result = searchPairings(pairings, { mood: "clean", useCase: "SaaS" });
		expect(result.total).toBe(1);
		expect(result.pairings[0].name).toBe("modern-clean");
	});
});
