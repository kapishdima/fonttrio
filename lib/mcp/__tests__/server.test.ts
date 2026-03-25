import { describe, it, expect, vi, beforeEach } from "vitest";
import { createMcpServer } from "../server";

// Mock registry functions to use fixtures
vi.mock("@/lib/registry", () => {
	const fontsDir = __dirname + "/fixtures/fonts";
	const pairingsDir = __dirname + "/fixtures/pairings";
	const { readdirSync, readFileSync } = require("node:fs");
	const { join } = require("node:path");

	function readJsonDir<T>(dir: string): T[] {
		try {
			const files = readdirSync(dir).filter((f: string) => f.endsWith(".json"));
			return files.map((f: string) => {
				const content = readFileSync(join(dir, f), "utf-8");
				return JSON.parse(content);
			});
		} catch {
			return [];
		}
	}

	function getItem<T>(dir: string, name: string): T | null {
		try {
			const content = readFileSync(join(dir, `${name}.json`), "utf-8");
			return JSON.parse(content);
		} catch {
			return null;
		}
	}

	return {
		getAllFonts: () => readJsonDir(fontsDir),
		getAllPairings: () => readJsonDir(pairingsDir),
		getFont: (name: string) => getItem(fontsDir, name),
		getPairing: (name: string) => getItem(pairingsDir, name),
	};
});

describe("createMcpServer", () => {
	it("creates a server instance", () => {
		const server = createMcpServer();
		expect(server).toBeDefined();
		expect(server.server).toBeDefined();
	});

	it("server has underlying Server instance", () => {
		const server = createMcpServer();
		expect(server.server).toBeDefined();
	});
});
