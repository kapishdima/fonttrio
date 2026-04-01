import type { PairingData } from "@/lib/pairings";

export function PairFontScale({ pairing }: { pairing: PairingData }) {
	const headingFont = `"${pairing.heading}", ${pairing.headingCategory}`;
	const bodyFont = `"${pairing.body}", ${pairing.bodyCategory}`;

	return (
		<div className="flex-1 min-w-0 flex flex-col gap-4">
			{(["h1", "h2", "h3", "h4"] as const).map((level) => {
				const s = pairing.scale[level];
				return (
					<div key={level} className="overflow-hidden">
						<span className="text-xs font-mono dark:text-neutral-600 text-neutral-400 uppercase">
							{level}
						</span>
						<p
							className="dark:text-neutral-200 text-neutral-800 truncate"
							style={{
								fontFamily: headingFont,
								fontSize: s.size,
								fontWeight: s.weight,
								lineHeight: s.lineHeight,
								letterSpacing: s.letterSpacing,
							}}
						>
							{pairing.heading}
						</p>
					</div>
				);
			})}
			<div>
				<span className="text-xs font-mono dark:text-neutral-600 text-neutral-400 uppercase">
					body
				</span>
				<p
					className="dark:text-neutral-300 text-neutral-700"
					style={{
						fontFamily: bodyFont,
						fontSize: pairing.scale.body.size,
						fontWeight: pairing.scale.body.weight,
						lineHeight: pairing.scale.body.lineHeight,
					}}
				>
					The quick brown fox jumps over the lazy dog. Good typography is
					invisible — great typography speaks before you read.
				</p>
			</div>
		</div>
	);
}
