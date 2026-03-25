import { describe, it, expect, vi, beforeEach } from "vitest";
import { extractApiKey, authenticateMcpRequest } from "../auth";

vi.mock("@/lib/api-key", () => ({
	validateApiKey: vi.fn(),
}));

import { validateApiKey } from "@/lib/api-key";
const mockValidate = vi.mocked(validateApiKey);

describe("extractApiKey", () => {
	it("extracts key from valid Bearer header", () => {
		const req = new Request("http://localhost", {
			headers: { Authorization: "Bearer ft_live_abc123" },
		});
		expect(extractApiKey(req)).toBe("ft_live_abc123");
	});

	it("returns null for missing header", () => {
		const req = new Request("http://localhost");
		expect(extractApiKey(req)).toBeNull();
	});

	it("returns null for non-ft_live prefix", () => {
		const req = new Request("http://localhost", {
			headers: { Authorization: "Bearer sk_test_abc123" },
		});
		expect(extractApiKey(req)).toBeNull();
	});

	it("returns null for non-Bearer scheme", () => {
		const req = new Request("http://localhost", {
			headers: { Authorization: "Basic ft_live_abc123" },
		});
		expect(extractApiKey(req)).toBeNull();
	});
});

describe("authenticateMcpRequest", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("rejects missing authorization header", async () => {
		const req = new Request("http://localhost");
		const result = await authenticateMcpRequest(req);
		expect(result.authorized).toBe(false);
		expect(result.error).toContain("Missing");
	});

	it("authorizes valid active key", async () => {
		mockValidate.mockResolvedValue({ valid: true, userId: "user-1", status: "active" });
		const req = new Request("http://localhost", {
			headers: { Authorization: "Bearer ft_live_validkey" },
		});
		const result = await authenticateMcpRequest(req);
		expect(result.authorized).toBe(true);
		expect(result.userId).toBe("user-1");
	});

	it("rejects invalid key", async () => {
		mockValidate.mockResolvedValue({ valid: false });
		const req = new Request("http://localhost", {
			headers: { Authorization: "Bearer ft_live_badkey" },
		});
		const result = await authenticateMcpRequest(req);
		expect(result.authorized).toBe(false);
		expect(result.error).toContain("Invalid API key");
	});

	it("rejects cancelled subscription", async () => {
		mockValidate.mockResolvedValue({ valid: false, userId: "user-2", status: "cancelled" });
		const req = new Request("http://localhost", {
			headers: { Authorization: "Bearer ft_live_cancelled" },
		});
		const result = await authenticateMcpRequest(req);
		expect(result.authorized).toBe(false);
		expect(result.error).toContain("cancelled");
	});

	it("rejects past_due subscription", async () => {
		mockValidate.mockResolvedValue({ valid: false, userId: "user-3", status: "past_due" });
		const req = new Request("http://localhost", {
			headers: { Authorization: "Bearer ft_live_pastdue" },
		});
		const result = await authenticateMcpRequest(req);
		expect(result.authorized).toBe(false);
		expect(result.error).toContain("past_due");
	});
});
