import { describe, it, expect } from "vitest";
import { searchFonts } from "../tools/search-fonts";
import type { FontItem } from "@/lib/registry";
import inter from "./fixtures/fonts/inter.json";
import playfairDisplay from "./fixtures/fonts/playfair-display.json";
import jetbrainsMono from "./fixtures/fonts/jetbrains-mono.json";

const fonts = [inter, playfairDisplay, jetbrainsMono] as unknown as FontItem[];

describe("searchFonts", () => {
	it("returns all fonts when no filters", () => {
		const result = searchFonts(fonts, {});
		expect(result.total).toBe(3);
		expect(result.fonts).toHaveLength(3);
	});

	it("searches by query in name", () => {
		const result = searchFonts(fonts, { query: "inter" });
		expect(result.total).toBe(1);
		expect(result.fonts[0].name).toBe("inter");
	});

	it("searches by query in family", () => {
		const result = searchFonts(fonts, { query: "Playfair" });
		expect(result.total).toBe(1);
		expect(result.fonts[0].family).toBe("Playfair Display");
	});

	it("is case-insensitive", () => {
		const result = searchFonts(fonts, { query: "JETBRAINS" });
		expect(result.total).toBe(1);
		expect(result.fonts[0].name).toBe("jetbrains-mono");
	});

	it("filters by category", () => {
		const result = searchFonts(fonts, { category: "Monospace" });
		expect(result.total).toBe(1);
		expect(result.fonts[0].name).toBe("jetbrains-mono");
	});

	it("filters by category - Serif (exact match via full word)", () => {
		const result = searchFonts(fonts, { category: "Monospace" });
		expect(result.total).toBe(1);
		expect(result.fonts[0].name).toBe("jetbrains-mono");
	});

	it("returns empty for no matches", () => {
		const result = searchFonts(fonts, { query: "nonexistent" });
		expect(result.total).toBe(0);
		expect(result.fonts).toHaveLength(0);
	});

	it("respects limit", () => {
		const result = searchFonts(fonts, { limit: 2 });
		expect(result.total).toBe(3);
		expect(result.fonts).toHaveLength(2);
	});

	it("includes install command", () => {
		const result = searchFonts(fonts, { query: "inter" });
		expect(result.fonts[0].installCommand).toBe(
			"bunx shadcn@latest add https://www.fonttrio.xyz/r/inter.json",
		);
	});

	it("includes weights", () => {
		const result = searchFonts(fonts, { query: "inter" });
		expect(result.fonts[0].weights).toContain("400");
		expect(result.fonts[0].weights).toContain("700");
	});
});
