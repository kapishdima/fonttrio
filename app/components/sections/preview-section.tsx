"use client";

import type { PairingData } from "@/lib/pairings";
import { usePairingFonts } from "@/lib/hooks/use-pairing-fonts";
import { SectionWrapper } from "./section-wrapper";

interface PreviewSectionProps {
  pairing: PairingData;
}

export function PreviewSection({ pairing }: PreviewSectionProps) {
  const { heading, body, mono, getHeadingStyle, getBodyStyle } = usePairingFonts(pairing);

  return (
    <SectionWrapper label="Preview">
      <div className="space-y-8">
        {/* Heading Preview */}
        <div>
          <h3 style={getHeadingStyle('h1')}>
            The quick brown fox jumps over the lazy dog
          </h3>
        </div>

        {/* Body Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl">
          <p
            style={getBodyStyle()}
            className="text-muted-foreground"
          >
            Typography is the art and technique of arranging type to make written language
            legible, readable, and appealing when displayed. The arrangement of type involves
            selecting typefaces, point sizes, line lengths, line-spacing, and letter-spacing.
          </p>
          <p
            style={getBodyStyle()}
            className="text-muted-foreground"
          >
            Good typography is measured by how well it reinforces the meaning of the text,
            not by some abstract scale of merit. Typographic subtlety can be just as important
            as typographic boldness.
          </p>
        </div>

        {/* Mixed Preview */}
        <div className="pt-8 border-t border-border max-w-3xl">
          <h4
            style={getHeadingStyle('h3')}
            className="mb-4"
          >
            A beautiful pairing
          </h4>
          <p
            style={getBodyStyle()}
            className="text-muted-foreground mb-4"
          >
            When <span style={{ fontFamily: heading.family }}>{pairing.heading}</span> meets{" "}
            <span style={{ fontFamily: body.family }}>{pairing.body}</span>, magic happens.
            This combination creates a perfect balance between impact and readability.
          </p>
          <code
            className="block p-4 bg-surface border border-border text-sm max-w-xl"
            style={{ fontFamily: mono.family, fontSize: "0.8125rem", lineHeight: "1.65" }}
          >
            <span className="text-muted-foreground">{'// Install this pairing'}</span><br />
            npx shadcn add https://www.fonttrio.xyz/r/{pairing.name}.json
          </code>
        </div>
      </div>
    </SectionWrapper>
  );
}
