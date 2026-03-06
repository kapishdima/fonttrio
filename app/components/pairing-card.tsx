"use client";

import Link from "next/link";
import type { PairingData } from "@/lib/pairings";
import { InstallCommand } from "./install-command";

interface PairingCardProps {
  pairing: PairingData;
  size: "large" | "medium" | "compact";
}

const SPECIMEN_HEADING = "The quick brown fox";
const SPECIMEN_BODY =
  "Typography is the craft of endowing human language with a durable visual form, and thus with an independent existence. Its heartbeat is a steady double-pulse: analysis and synthesis.";
const SPECIMEN_BODY_SHORT =
  "Typography is the craft of endowing human language with a durable visual form.";
const SPECIMEN_CODE = `const font = await loadFont("heading");\nconsole.log(font.family);`;

export function PairingCard({ pairing, size }: PairingCardProps) {
  const headingFont = `"${pairing.heading}", ${pairing.headingCategory}`;
  const bodyFont = `"${pairing.body}", ${pairing.bodyCategory}`;
  const monoFont = `"${pairing.mono}", monospace`;

  if (size === "large") {
    return (
      <Link href={`/${pairing.name}`} className="group block">
        <article className="space-y-6 p-6 sm:p-8 border border-border rounded-lg hover:border-accent/40 transition-colors duration-300">
          <div className="space-y-4">
            <h2
              style={{
                fontFamily: headingFont,
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: pairing.scale.h1.weight,
                lineHeight: pairing.scale.h1.lineHeight,
                letterSpacing: pairing.scale.h1.letterSpacing,
              }}
            >
              {SPECIMEN_HEADING}
            </h2>
            <p
              style={{
                fontFamily: bodyFont,
                fontSize: pairing.scale.body.size,
                lineHeight: pairing.scale.body.lineHeight,
                fontWeight: pairing.scale.body.weight,
              }}
              className="text-muted max-w-prose"
            >
              {SPECIMEN_BODY}
            </p>
          </div>

          <pre
            className="px-4 py-3 rounded bg-accent-soft/40 border border-border overflow-x-auto"
            style={{
              fontFamily: monoFont,
              fontSize: "0.8125rem",
              lineHeight: "1.6",
            }}
          >
            <code className="text-muted">{SPECIMEN_CODE}</code>
          </pre>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 flex-wrap">
              {pairing.mood.map((m) => (
                <span
                  key={m}
                  className="inline-flex px-2 py-0.5 rounded-full text-[11px] font-sans font-medium tracking-wide text-muted border border-border"
                >
                  {m}
                </span>
              ))}
              <span className="text-[11px] font-mono text-muted/60 ml-2">
                {pairing.heading} + {pairing.body} + {pairing.mono}
              </span>
            </div>
            <div className="install-reveal">
              <InstallCommand pairingName={pairing.name} compact />
            </div>
          </div>
        </article>
      </Link>
    );
  }

  if (size === "medium") {
    return (
      <Link href={`/${pairing.name}`} className="group block">
        <article className="space-y-4 p-5 sm:p-6 border border-border rounded-lg hover:border-accent/40 transition-colors duration-300">
          <h2
            style={{
              fontFamily: headingFont,
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              fontWeight: pairing.scale.h2.weight,
              lineHeight: pairing.scale.h2.lineHeight,
              letterSpacing: pairing.scale.h2.letterSpacing,
            }}
          >
            {SPECIMEN_HEADING}
          </h2>
          <p
            style={{
              fontFamily: bodyFont,
              fontSize: pairing.scale.body.size,
              lineHeight: pairing.scale.body.lineHeight,
              fontWeight: pairing.scale.body.weight,
            }}
            className="text-muted"
          >
            {SPECIMEN_BODY_SHORT}
          </p>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              {pairing.mood.map((m) => (
                <span
                  key={m}
                  className="inline-flex px-2 py-0.5 rounded-full text-[11px] font-sans font-medium tracking-wide text-muted border border-border"
                >
                  {m}
                </span>
              ))}
            </div>
            <div className="install-reveal">
              <InstallCommand pairingName={pairing.name} compact />
            </div>
          </div>
        </article>
      </Link>
    );
  }

  // compact
  return (
    <Link href={`/${pairing.name}`} className="group block">
      <article className="space-y-3 p-4 sm:p-5 border border-border rounded-lg hover:border-accent/40 transition-colors duration-300">
        <h2
          style={{
            fontFamily: headingFont,
            fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
            fontWeight: pairing.scale.h3.weight,
            lineHeight: pairing.scale.h3.lineHeight,
            letterSpacing: pairing.scale.h3.letterSpacing,
          }}
        >
          {pairing.name}
        </h2>

        <pre
          className="px-3 py-2 rounded bg-accent-soft/40 border border-border overflow-x-auto"
          style={{
            fontFamily: monoFont,
            fontSize: "0.75rem",
            lineHeight: "1.5",
          }}
        >
          <code className="text-muted">{`font.heading = "${pairing.heading}"\nfont.mono = "${pairing.mono}"`}</code>
        </pre>

        <div className="flex items-center gap-2">
          {pairing.mood.map((m) => (
            <span
              key={m}
              className="inline-flex px-2 py-0.5 rounded-full text-[11px] font-sans font-medium tracking-wide text-muted border border-border"
            >
              {m}
            </span>
          ))}
        </div>
      </article>
    </Link>
  );
}
