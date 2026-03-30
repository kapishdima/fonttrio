import { describe, it, expect } from "vitest";
import { installPairing } from "../tools/install-pairing";
import type { PairingItem } from "@/lib/registry";
import editorial from "./fixtures/pairings/editorial.json";
import modernClean from "./fixtures/pairings/modern-clean.json";

const pairingsMap: Record<string, PairingItem> = {
	"editorial": editorial as unknown as PairingItem,
	"modern-clean": modernClean as unknown as PairingItem,
};

const getPairing = (name: string) => pairingsMap[name] || null;

describe("installPairing", () => {
	it("returns command for existing pairing", () => {
		const result = installPairing(getPairing, { name: "editorial" });
		expect(result.found).toBe(true);
		expect(result.command).toBe(
			"bunx shadcn@latest add https://www.fonttrio.xyz/r/editorial.json",
		);
		expect(result.title).toBe(
			"Editorial — Playfair Display + Source Serif 4 + JetBrains Mono",
		);
		expect(result.name).toBe("editorial");
	});

	it("returns error for non-existent pairing", () => {
		const result = installPairing(getPairing, { name: "nonexistent" });
		expect(result.found).toBe(false);
		expect(result.error).toContain("not found");
	});

	it("returns correct name for pairing", () => {
		const result = installPairing(getPairing, { name: "modern-clean" });
		expect(result.found).toBe(true);
		expect(result.name).toBe("modern-clean");
	});
});
