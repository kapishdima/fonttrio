import { describe, it, expect } from "vitest";
import { previewPairing } from "../tools/preview-pairing";
import type { PairingItem } from "@/lib/registry";
import editorial from "./fixtures/pairings/editorial.json";

const pairingsMap: Record<string, PairingItem> = {
	"pairing-editorial": editorial as unknown as PairingItem,
};

const getPairing = (name: string) => pairingsMap[name] || null;

describe("previewPairing", () => {
	it("returns full details for existing pairing", () => {
		const result = previewPairing(getPairing, { name: "editorial" });
		expect(result.found).toBe(true);
		expect(result.name).toBe("editorial");
		expect(result.title).toContain("Playfair Display");
		expect(result.description).toContain("editorial");
	});

	it("includes font CSS variables", () => {
		const result = previewPairing(getPairing, { name: "editorial" });
		expect(result.headingFont).toBe("var(--font-playfair-display)");
		expect(result.bodyFont).toBe("var(--font-source-serif-4)");
		expect(result.monoFont).toBe("var(--font-jetbrains-mono)");
	});

	it("includes mood and useCase", () => {
		const result = previewPairing(getPairing, { name: "editorial" });
		expect(result.mood).toContain("elegant");
		expect(result.useCase).toContain("blog");
	});

	it("includes typography scale", () => {
		const result = previewPairing(getPairing, { name: "editorial" });
		expect(result.typographyScale).toBeDefined();
		expect(result.typographyScale?.h1).toBeDefined();
		expect(result.typographyScale?.h1?.["font-size"]).toBe("2.25rem");
	});

	it("includes install command", () => {
		const result = previewPairing(getPairing, { name: "editorial" });
		expect(result.installCommand).toBe(
			"bunx shadcn@latest add https://www.fonttrio.xyz/r/editorial.json",
		);
	});

	it("returns error for non-existent pairing", () => {
		const result = previewPairing(getPairing, { name: "nonexistent" });
		expect(result.found).toBe(false);
		expect(result.error).toContain("not found");
	});

	it("includes categories", () => {
		const result = previewPairing(getPairing, { name: "editorial" });
		expect(result.categories).toContain("serif");
		expect(result.categories).toContain("elegant");
	});
});
