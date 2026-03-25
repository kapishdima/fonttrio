import { randomBytes } from "crypto";
import { supabase } from "./supabase";

export function generateApiKey(): string {
	const bytes = randomBytes(24);
	return `ft_live_${bytes.toString("base64url")}`;
}

export async function validateApiKey(apiKey: string): Promise<{
	valid: boolean;
	userId?: string;
	status?: string;
}> {
	const { data, error } = await supabase
		.from("profiles")
		.select("user_id, subscription_status")
		.eq("api_key", apiKey)
		.single();

	if (error || !data) {
		return { valid: false };
	}

	if (data.subscription_status !== "active") {
		return { valid: false, userId: data.user_id, status: data.subscription_status };
	}

	return { valid: true, userId: data.user_id, status: data.subscription_status };
}

export async function getOrCreateApiKey(userId: string): Promise<string> {
	const { data: existing } = await supabase
		.from("profiles")
		.select("api_key")
		.eq("user_id", userId)
		.single();

	if (existing?.api_key) {
		return existing.api_key;
	}

	const apiKey = generateApiKey();
	await supabase
		.from("profiles")
		.upsert({
			user_id: userId,
			api_key: apiKey,
			api_key_created_at: new Date().toISOString(),
		}, { onConflict: "user_id" });

	return apiKey;
}

export async function regenerateApiKey(userId: string): Promise<string> {
	const apiKey = generateApiKey();
	await supabase
		.from("profiles")
		.update({
			api_key: apiKey,
			api_key_created_at: new Date().toISOString(),
		})
		.eq("user_id", userId);

	return apiKey;
}
