import { readFileSync } from "node:fs";
import { join } from "node:path";
import { validateApiKey } from "@/lib/api-key";

const SKILLS_DIR = join(process.cwd(), "skills");

const VALID_SKILLS = ["audit-typography", "suggest-improvements"];

export async function GET(
	req: Request,
	{ params }: { params: Promise<{ name: string }> },
): Promise<Response> {
	const { name } = await params;

	// Validate skill name
	if (!VALID_SKILLS.includes(name)) {
		return Response.json({ error: "Skill not found" }, { status: 404 });
	}

	// Validate API key
	const url = new URL(req.url);
	const key = url.searchParams.get("key");

	if (!key) {
		return Response.json({ error: "Missing API key" }, { status: 401 });
	}

	const result = await validateApiKey(key);
	if (!result.valid) {
		return Response.json({ error: "Invalid or inactive API key" }, { status: 401 });
	}

	// Read and return skill file
	try {
		const content = readFileSync(join(SKILLS_DIR, `${name}.md`), "utf-8");
		return new Response(content, {
			headers: {
				"Content-Type": "text/markdown; charset=utf-8",
				"Cache-Control": "no-cache",
			},
		});
	} catch {
		return Response.json({ error: "Skill file not found" }, { status: 404 });
	}
}
