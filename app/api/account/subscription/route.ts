import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { supabase } from "@/lib/supabase";

export async function GET() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user) {
		return Response.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { data: profile } = await supabase
		.from("profiles")
		.select("subscription_status, subscribed_at, current_period_end, cancelled_at")
		.eq("user_id", session.user.id)
		.single();

	return Response.json({
		status: profile?.subscription_status || "free",
		subscribedAt: profile?.subscribed_at,
		currentPeriodEnd: profile?.current_period_end,
		cancelledAt: profile?.cancelled_at,
	});
}
