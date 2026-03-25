import { validateApiKey } from "@/lib/api-key";

export interface McpAuthResult {
	authorized: boolean;
	userId?: string;
	error?: string;
}

export function extractApiKey(req: Request): string | null {
	const authHeader = req.headers.get("authorization");
	if (!authHeader) return null;

	const match = authHeader.match(/^Bearer\s+(ft_live_.+)$/);
	return match?.[1] || null;
}

export async function authenticateMcpRequest(req: Request): Promise<McpAuthResult> {
	const apiKey = extractApiKey(req);

	if (!apiKey) {
		return {
			authorized: false,
			error: "Missing or invalid Authorization header. Expected: Bearer ft_live_xxx",
		};
	}

	const result = await validateApiKey(apiKey);

	if (!result.valid) {
		if (result.status && result.status !== "active") {
			return {
				authorized: false,
				userId: result.userId,
				error: `Subscription is ${result.status}. Please renew at https://www.fonttrio.xyz/ai`,
			};
		}
		return {
			authorized: false,
			error: "Invalid API key. Get your key at https://www.fonttrio.xyz/account",
		};
	}

	return { authorized: true, userId: result.userId };
}
