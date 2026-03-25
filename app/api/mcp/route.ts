import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { createMcpServer } from "@/lib/mcp/server";
import { authenticateMcpRequest } from "@/lib/mcp/auth";

async function handleMcpRequest(req: Request): Promise<Response> {
	// Initialize requests don't require auth (MCP protocol handshake)
	const body = await req.clone().text();
	const isInitialize = body.includes('"method":"initialize"');

	if (!isInitialize) {
		const authResult = await authenticateMcpRequest(req);
		if (!authResult.authorized) {
			return Response.json(
				{
					jsonrpc: "2.0",
					error: { code: -32001, message: authResult.error },
					id: null,
				},
				{ status: 401 },
			);
		}
	}

	const transport = new WebStandardStreamableHTTPServerTransport({
		sessionIdGenerator: undefined, // stateless mode for Vercel serverless
	});

	const server = createMcpServer();
	await server.connect(transport);

	return transport.handleRequest(req);
}

export async function POST(req: Request): Promise<Response> {
	return handleMcpRequest(req);
}

export async function GET(req: Request): Promise<Response> {
	const transport = new WebStandardStreamableHTTPServerTransport({
		sessionIdGenerator: undefined,
	});

	const server = createMcpServer();
	await server.connect(transport);

	return transport.handleRequest(req);
}

export async function DELETE(): Promise<Response> {
	return new Response(null, { status: 405 });
}
