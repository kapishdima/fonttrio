"use client";

import type { PairingData } from "@/lib/pairings";
import { usePairingFonts } from "@/lib/hooks/use-pairing-fonts";
import { InstallCommand } from "../install-command";
import { SectionLabel } from "../section-label";
import { AnimatedLayout } from "../animated-layout";
import { DetailHero } from "./detail-hero";

interface HeroSectionProps {
  pairing: PairingData;
}

export function HeroSection({ pairing }: HeroSectionProps) {
  const { heading, body, mono } = usePairingFonts(pairing);

  return (
    <DetailHero
      title={pairing.name}
      titleStyle={{
        fontFamily: heading.family,
        fontWeight: pairing.scale.h1.weight,
        letterSpacing: pairing.scale.h1.letterSpacing,
      }}
    >
      {/* Details Block */}
      <AnimatedLayout delay={100}>
        <div className="mt-6 sm:mt-8 border border-border max-w-2xl">
          {/* Font Trio */}
          <div className="grid grid-cols-3 divide-x divide-border border-b border-border">
            <div className="p-4">
              <SectionLabel className="mb-2 text-[10px]">Heading</SectionLabel>
              <p
                style={{ fontFamily: heading.family }}
                className="text-sm sm:text-base font-semibold truncate"
              >
                {pairing.heading}
              </p>
            </div>
            <div className="p-4">
              <SectionLabel className="mb-2 text-[10px]">Body</SectionLabel>
              <p
                style={{ fontFamily: body.family }}
                className="text-sm sm:text-base truncate"
              >
                {pairing.body}
              </p>
            </div>
            <div className="p-4">
              <SectionLabel className="mb-2 text-[10px]">Mono</SectionLabel>
              <p
                style={{ fontFamily: mono.family }}
                className="text-xs sm:text-sm truncate"
              >
                {pairing.mono}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="p-4 border-b border-border">
            <p
              className="text-sm text-muted-foreground leading-relaxed"
              style={{ fontFamily: body.family }}
            >
              {pairing.description}
            </p>
          </div>

          {/* Install Command */}
          <div className="p-4">
            <InstallCommand.Full pairingName={pairing.name} />
          </div>
        </div>
      </AnimatedLayout>
    </DetailHero>
  );
}
