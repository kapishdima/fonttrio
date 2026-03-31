import { useEffect } from "react";
import type { EnrichedPairing } from "../../types";

interface Props {
	pairing: EnrichedPairing;
	applying?: boolean;
	onBack: () => void;
	onApply: (pairing: EnrichedPairing) => void;
}

export function PairingDetail({ pairing, applying, onBack, onApply }: Props) {
	const { heading, body, mono, scale } = pairing;

	useEffect(() => {
		if (pairing.googleFontsUrl) {
			const link = document.createElement("link");
			link.rel = "stylesheet";
			link.href = pairing.googleFontsUrl;
			document.head.appendChild(link);
			return () => {
				document.head.removeChild(link);
			};
		}
	}, [pairing.googleFontsUrl]);

	return (
		<div className="detail">
			<div className="detail__header">
				<button type="button" className="detail__back" onClick={onBack}>
					← Back
				</button>
				<span className="detail__name">{pairing.name}</span>
			</div>

			<div className="detail__body">
				<div className="detail__fonts">
					<div>
						<div className="detail__font-label">Heading</div>
						<div style={{ fontFamily: `"${heading.family}", serif` }}>
							{heading.family}
						</div>
					</div>
					<div>
						<div className="detail__font-label">Body</div>
						<div style={{ fontFamily: `"${body.family}", sans-serif` }}>
							{body.family}
						</div>
					</div>
					<div>
						<div className="detail__font-label">Mono</div>
						<div style={{ fontFamily: `"${mono.family}", monospace` }}>
							{mono.family}
						</div>
					</div>
				</div>

				<div className="detail__scale-box">
					<ScalePreview
						label="H1"
						text="Heading One"
						fontFamily={heading.family}
						scale={scale.h1}
					/>
					<ScalePreview
						label="H2"
						text="Heading Two"
						fontFamily={heading.family}
						scale={scale.h2}
					/>
					<ScalePreview
						label="H3"
						text="Heading Three"
						fontFamily={heading.family}
						scale={scale.h3}
					/>
					<ScalePreview
						label="H4"
						text="Heading Four"
						fontFamily={heading.family}
						scale={scale.h4}
					/>
					<hr className="detail__divider" />
					<ScalePreview
						label="Body"
						text="The quick brown fox jumps over the lazy dog."
						fontFamily={body.family}
						scale={scale.body}
					/>
					<hr className="detail__divider" />
					<ScalePreview
						label="Code"
						text="const pair = fonttrio.apply();"
						fontFamily={mono.family}
						scale={scale.code}
					/>
				</div>

				{pairing.mood.length > 0 && (
					<div className="detail__section">
						<div className="detail__section-label">Mood</div>
						<div className="pairing-card__tags">
							{pairing.mood.map((m) => (
								<span key={m} className="tag">
									{m}
								</span>
							))}
						</div>
					</div>
				)}
				{pairing.useCase.length > 0 && (
					<div className="detail__section">
						<div className="detail__section-label">Use Case</div>
						<div className="pairing-card__tags">
							{pairing.useCase.map((u) => (
								<span key={u} className="tag">
									{u}
								</span>
							))}
						</div>
					</div>
				)}
			</div>

			<div className="detail__footer">
				<button
					type="button"
					className="btn-apply"
					onClick={() => onApply(pairing)}
					disabled={applying}
					style={{ opacity: applying ? 0.7 : 1 }}
				>
					{applying ? "Applying..." : "Apply to Figma"}
				</button>
			</div>
		</div>
	);
}

function ScalePreview({
	label,
	text,
	fontFamily,
	scale,
}: {
	label: string;
	text: string;
	fontFamily: string;
	scale: {
		size: string;
		weight: number;
		lineHeight: string;
		letterSpacing?: string;
	};
}) {
	const rawPx = parseFloat(scale.size) * (scale.size.endsWith("rem") ? 16 : 1);
	const cappedPx = Math.min(rawPx, 32);

	return (
		<div className="scale-row">
			<div className="scale-row__inner">
				<span className="scale-row__label">{label}</span>
				<div
					className="truncate"
					style={{
						fontFamily: `"${fontFamily}", sans-serif`,
						fontSize: `${cappedPx}px`,
						fontWeight: scale.weight,
						lineHeight: scale.lineHeight,
						letterSpacing: scale.letterSpacing || "normal",
					}}
				>
					{text}
				</div>
			</div>
		</div>
	);
}
