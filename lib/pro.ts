export const PRO_TIER = {
	name: "Pro",
	price: 5,
	currency: "USD",
	interval: "month" as const,
	paymentUrl: process.env.CREEM_PRO_PRODUCT_URL || "",
	features: [
		"MCP Server — AI-powered font search & install in your IDE",
		"Claude Code Skills — typography audit & suggestions",
		"Multi-IDE support — Claude Code, Cursor, Codex, OpenCode",
		"All future tools & updates",
	],
} as const;

export function getCheckoutUrl(userId: string): string {
	const baseUrl = PRO_TIER.paymentUrl;
	if (!baseUrl) return "";
	const separator = baseUrl.includes("?") ? "&" : "?";
	return `${baseUrl}${separator}metadata[user_id]=${encodeURIComponent(userId)}`;
}
