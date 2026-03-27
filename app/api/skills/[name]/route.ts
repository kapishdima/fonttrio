import { readFileSync } from "node:fs";
import { join } from "node:path";

const SKILLS_DIR = join(process.cwd(), "skills");

const VALID_SKILLS = ["audit-typography", "suggest-improvements"];

export async function GET(
	_req: Request,
	{ params }: { params: Promise<{ name: string }> },
): Promise<Response> {
	const { name } = await params;

	if (!VALID_SKILLS.includes(name)) {
		return Response.json({ error: "Skill not found" }, { status: 404 });
	}

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
