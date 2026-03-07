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
      <div className="space-y-6 sm:space-y-8">
        {/* Heading Preview */}
        <div className="overflow-hidden">
          <h3 
            style={getHeadingStyle('h1')}
            className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl"
          >
            The quick brown fox jumps over the lazy dog
          </h3>
        </div>

        {/* Body Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 max-w-4xl">
          <p
            style={getBodyStyle()}
            className="text-muted-foreground text-sm sm:text-base"
          >
            Typography is the art and technique of arranging type to make written language
            legible, readable, and appealing when displayed. The arrangement of type involves
            selecting typefaces, point sizes, line lengths, line-spacing, and letter-spacing.
          </p>
          <p
            style={getBodyStyle()}
            className="text-muted-foreground text-sm sm:text-base"
          >
            Good typography is measured by how well it reinforces the meaning of the text,
            not by some abstract scale of merit. Typographic subtlety can be just as important
            as typographic boldness.
          </p>
        </div>

        {/* Mixed Preview */}
        <div className="pt-6 sm:pt-8 border-t border-border max-w-3xl">
          <h4
            style={getHeadingStyle('h3')}
            className="mb-3 sm:mb-4 text-lg sm:text-xl"
          >
            A beautiful pairing
          </h4>
          <p
            style={getBodyStyle()}
            className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base"
          >
            When <span style={{ fontFamily: heading.family }}>{pairing.heading}</span> meets{" "}
            <span style={{ fontFamily: body.family }}>{pairing.body}</span>, magic happens.
            This combination creates a perfect balance between impact and readability.
          </p>
          <code
            className="block p-3 sm:p-4 bg-surface border border-border text-xs sm:text-sm max-w-xl overflow-x-auto"
            style={{ fontFamily: mono.family, lineHeight: "1.65" }}
          >
            <span className="text-muted-foreground">{'// Install this pairing'}</span><br />
            npx shadcn add https://www.fonttrio.xyz/r/{pairing.name}.json
          </code>
        </div>
      </div>
    </SectionWrapper>
  );
}
