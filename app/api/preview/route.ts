import { type NextRequest, NextResponse } from "next/server";

const PREVIEW_URL = "https://ui.shadcn.com/preview/radix/preview";

let cachedHtml: string | null = null;
let cacheTime = 0;
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

export async function GET(_request: NextRequest) {
	const now = Date.now();

	if (!cachedHtml || now - cacheTime > CACHE_TTL) {
		const response = await fetch(PREVIEW_URL, {
			headers: {
				"User-Agent":
					"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
				Accept: "text/html,application/xhtml+xml",
			},
		});

		if (!response.ok) {
			return NextResponse.json(
				{ error: "Failed to fetch preview" },
				{ status: 502 },
			);
		}

		let html = await response.text();

		// Inject <base> so relative assets (JS, CSS, images) resolve to shadcn's domain
		// Also patch History API to prevent cross-origin SecurityError
		// when shadcn's JS calls replaceState/pushState with relative URLs
		// that resolve against the <base> href
		const historyPatch = `<script>(function(){var r=history.replaceState.bind(history),p=history.pushState.bind(history);history.replaceState=function(s,t,u){try{r(s,t,u)}catch(e){r(s,t)}};history.pushState=function(s,t,u){try{p(s,t,u)}catch(e){p(s,t)}}})();</script>`;
		html = html.replace("<head>", `<head>${historyPatch}<base href="https://ui.shadcn.com/">`);

		cachedHtml = html;
		cacheTime = now;
	}

	return new Response(cachedHtml, {
		headers: {
			"Content-Type": "text/html; charset=utf-8",
			"Cache-Control": "public, max-age=3600",
		},
	});
}
