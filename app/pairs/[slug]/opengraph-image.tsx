import { ImageResponse } from "next/og";
import { getAllPairings, getPairing } from "@/lib/pairings";

export const size = {
	width: 1200,
	height: 630,
};

export const contentType = "image/png";

export function generateStaticParams() {
	return getAllPairings().map((p) => ({ slug: p.name }));
}

function kebabToTitle(kebab: string): string {
	return kebab
		.split("-")
		.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
		.join(" ");
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const pairing = getPairing(slug);

	if (!pairing) {
		return new ImageResponse(
			<div
				style={{
					background: "#0a0a0a",
					width: "100%",
					height: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					color: "white",
					fontSize: 48,
				}}
			>
				fonttrio
			</div>,
			{ ...size },
		);
	}

	return new ImageResponse(
		(
			<div
				style={{
					background: "linear-gradient(to bottom right, #0a0a0a, #171717)",
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					padding: "60px",
				}}
			>
				{/* Grid background */}
				<div
					style={{
						position: "absolute",
						inset: 0,
						backgroundImage: `
							linear-gradient(to right, #262626 1px, transparent 1px),
							linear-gradient(to bottom, #262626 1px, transparent 1px)
						`,
						backgroundSize: "40px 40px",
						opacity: 0.3,
					}}
				/>

				{/* Top: Pairing name + description */}
				<div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
					<h1
						style={{
							fontSize: "64px",
							fontWeight: 700,
							color: "white",
							letterSpacing: "-0.03em",
							lineHeight: 1.1,
							margin: 0,
						}}
					>
						{kebabToTitle(pairing.name)}
					</h1>
					<p
						style={{
							fontSize: "24px",
							color: "#a3a3a3",
							lineHeight: 1.4,
							maxWidth: "700px",
							margin: 0,
						}}
					>
						{pairing.description}
					</p>
				</div>

				{/* Bottom: Font trio + branding */}
				<div
					style={{
						display: "flex",
						alignItems: "flex-end",
						justifyContent: "space-between",
					}}
				>
					<div style={{ display: "flex", gap: "32px" }}>
						{[
							{ role: "Heading", font: pairing.heading },
							{ role: "Body", font: pairing.body },
							{ role: "Mono", font: pairing.mono },
						].map((item) => (
							<div
								key={item.role}
								style={{
									display: "flex",
									flexDirection: "column",
									gap: "4px",
								}}
							>
								<span style={{ fontSize: "14px", color: "#737373", textTransform: "uppercase", letterSpacing: "0.05em" }}>
									{item.role}
								</span>
								<span style={{ fontSize: "20px", color: "white", fontWeight: 600 }}>
									{item.font}
								</span>
							</div>
						))}
					</div>

					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: "8px",
						}}
					>
						<span
							style={{
								fontSize: "20px",
								color: "#737373",
								fontWeight: 500,
							}}
						>
							fonttrio.xyz
						</span>
					</div>
				</div>
			</div>
		),
		{ ...size },
	);
}
