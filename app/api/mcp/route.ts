import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { createMcpServer } from "@/lib/mcp/server";

export async function POST(req: Request): Promise<Response> {
	const transport = new WebStandardStreamableHTTPServerTransport({
		sessionIdGenerator: undefined, // stateless mode for Vercel serverless
	});

	const server = createMcpServer();
	await server.connect(transport);

	return transport.handleRequest(req);
}

export async function GET(req: Request): Promise<Response> {
	const transport = new WebStandardStreamableHTTPServerTransport({
		sessionIdGenerator: undefined,
	});

	const server = createMcpServer();
	await server.connect(transport);

	return transport.handleRequest(req);
}

export async function DELETE(req: Request): Promise<Response> {
	return new Response(null, { status: 405 });
}
