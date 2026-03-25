import { createHmac } from "crypto";
import { supabase } from "@/lib/supabase";
import { generateApiKey } from "@/lib/api-key";

interface CreemWebhookPayload {
	event: string;
	data: {
		id: string;
		subscription_id?: string;
		customer_id?: string;
		metadata?: Record<string, string>;
		current_period_end?: string;
	};
}

function verifySignature(body: string, signature: string | null): boolean {
	const secret = process.env.CREEM_WEBHOOK_SECRET;
	if (!secret || !signature) return false;

	const expected = createHmac("sha256", secret).update(body).digest("hex");
	return signature === expected;
}

export async function POST(req: Request): Promise<Response> {
	const body = await req.text();
	const signature = req.headers.get("x-creem-signature");

	if (!verifySignature(body, signature)) {
		return Response.json({ error: "Invalid signature" }, { status: 401 });
	}

	const payload: CreemWebhookPayload = JSON.parse(body);
	const { event, data } = payload;
	const userId = data.metadata?.user_id;

	if (!userId) {
		return Response.json({ error: "Missing user_id in metadata" }, { status: 400 });
	}

	switch (event) {
		case "checkout.completed": {
			const apiKey = generateApiKey();
			await supabase.from("profiles").upsert(
				{
					user_id: userId,
					api_key: apiKey,
					api_key_created_at: new Date().toISOString(),
					subscription_status: "active",
					subscription_id: data.subscription_id,
					customer_id: data.customer_id,
					subscribed_at: new Date().toISOString(),
					current_period_end: data.current_period_end,
				},
				{ onConflict: "user_id" },
			);
			break;
		}

		case "subscription.active": {
			await supabase
				.from("profiles")
				.update({
					subscription_status: "active",
					current_period_end: data.current_period_end,
					updated_at: new Date().toISOString(),
				})
				.eq("user_id", userId);
			break;
		}

		case "subscription.cancelled": {
			await supabase
				.from("profiles")
				.update({
					subscription_status: "cancelled",
					cancelled_at: new Date().toISOString(),
					updated_at: new Date().toISOString(),
				})
				.eq("user_id", userId);
			break;
		}

		case "subscription.past_due": {
			await supabase
				.from("profiles")
				.update({
					subscription_status: "past_due",
					updated_at: new Date().toISOString(),
				})
				.eq("user_id", userId);
			break;
		}

		default:
			return Response.json({ received: true, ignored: true });
	}

	return Response.json({ received: true });
}
