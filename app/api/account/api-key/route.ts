import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getOrCreateApiKey, regenerateApiKey } from "@/lib/api-key";

export async function GET() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user) {
		return Response.json({ error: "Unauthorized" }, { status: 401 });
	}

	const apiKey = await getOrCreateApiKey(session.user.id);
	return Response.json({ apiKey });
}

export async function POST() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user) {
		return Response.json({ error: "Unauthorized" }, { status: 401 });
	}

	const apiKey = await regenerateApiKey(session.user.id);
	return Response.json({ apiKey });
}
