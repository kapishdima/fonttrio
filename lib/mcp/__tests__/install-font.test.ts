import { describe, it, expect } from "vitest";
import { installFont } from "../tools/install-font";
import type { FontItem } from "@/lib/registry";
import inter from "./fixtures/fonts/inter.json";
import jetbrainsMono from "./fixtures/fonts/jetbrains-mono.json";

const fontsMap: Record<string, FontItem> = {
	inter: inter as unknown as FontItem,
	"jetbrains-mono": jetbrainsMono as unknown as FontItem,
};

const getFont = (name: string) => fontsMap[name] || null;

describe("installFont", () => {
	it("returns command for existing font", () => {
		const result = installFont(getFont, { name: "inter" });
		expect(result.found).toBe(true);
		expect(result.command).toBe(
			"bunx shadcn@latest add https://www.fonttrio.xyz/r/inter.json",
		);
		expect(result.title).toBe("Inter");
	});

	it("returns error for non-existent font", () => {
		const result = installFont(getFont, { name: "nonexistent" });
		expect(result.found).toBe(false);
		expect(result.error).toContain("not found");
	});

	it("works with hyphenated names", () => {
		const result = installFont(getFont, { name: "jetbrains-mono" });
		expect(result.found).toBe(true);
		expect(result.name).toBe("jetbrains-mono");
	});
});
