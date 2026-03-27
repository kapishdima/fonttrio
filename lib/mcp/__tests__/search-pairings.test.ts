import { describe, it, expect } from "vitest";
import { searchPairings } from "../tools/search-pairings";
import type { PairingItem } from "@/lib/registry";
import editorial from "./fixtures/pairings/editorial.json";
import modernClean from "./fixtures/pairings/modern-clean.json";

const pairings = [editorial, modernClean] as unknown as PairingItem[];

describe("searchPairings", () => {
	it("returns all pairings when no filters", () => {
		const result = searchPairings(pairings, {});
		expect(result.total).toBe(2);
		expect(result.pairings).toHaveLength(2);
	});

	it("searches by query in title", () => {
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
		const result = searchPairings(pairings, { category: "editorial" });
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
