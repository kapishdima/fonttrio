"use client";

import Link from "next/link";
import type { PairingData } from "@/lib/pairings";
import { usePairingFonts } from "@/lib/hooks/use-pairing-fonts";
import { GridBackground } from "../grid-background";
import { MetricLines } from "../metric-lines";
import { InstallCommand } from "../install-command";
import { SectionLabel } from "../section-label";
import { AnimatedLayout } from "../animated-layout";
import { ArrowLeft } from "lucide-react";

interface HeroSectionProps {
  pairing: PairingData;
}

const METRIC_LINES = [
  { position: "20%", label: "Ascender" },
  { position: "50%", label: "Baseline" },
  { position: "80%", label: "Descender" },
];

export function HeroSection({ pairing }: HeroSectionProps) {
  const { heading, body, mono, getHeadingStyle } = usePairingFonts(pairing);

  return (
    <header id="main-content" className="pt-16 relative min-h-screen flex flex-col">
      <GridBackground />

      {/* Back Button */}
      <div className="relative px-4 lg:px-8 py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          <span>Back to pairings</span>
        </Link>
      </div>

      {/* Hero Content */}
      <div className="relative flex-1 flex flex-col justify-center px-4 lg:px-8 xl:px-12 pb-12">
        <AnimatedLayout>
          <div className="max-w-none">
            {/* Pairing Name with Metric Lines */}
            <div className="relative h-[clamp(3rem,15vw,12rem)] overflow-hidden">
              <MetricLines lines={METRIC_LINES} />

              {/* Text — above lines */}
              <div className="h-full flex items-center relative z-10 overflow-hidden">
                <h1
                  style={{
                    fontFamily: heading.family,
                    fontWeight: pairing.scale.h1.weight,
                    lineHeight: "0.9",
                    letterSpacing: pairing.scale.h1.letterSpacing,
                    fontSize: "clamp(2.5rem,14vw,12rem)",
                  }}
                  className="truncate w-full"
                >
                  {pairing.name}
                </h1>
              </div>
            </div>

            {/* Font Trio Preview */}
            <AnimatedLayout delay={100}>
              <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div>
                  <SectionLabel className="mb-2">Heading Font</SectionLabel>
                  <p style={{ fontFamily: heading.family, fontSize: "1.5rem", fontWeight: pairing.scale.h1.weight }}>
                    {pairing.heading}
                  </p>
                </div>
                <div>
                  <SectionLabel className="mb-2">Body Font</SectionLabel>
                  <p style={{ fontFamily: body.family, fontSize: "1.25rem" }}>
                    {pairing.body}
                  </p>
                </div>
                <div>
                  <SectionLabel className="mb-2">Mono Font</SectionLabel>
                  <p style={{ fontFamily: mono.family, fontSize: "1rem" }}>
                    {pairing.mono}
                  </p>
                </div>
              </div>
            </AnimatedLayout>

            {/* Description */}
            <AnimatedLayout delay={150}>
              <p
                className="mt-10 text-lg text-muted-foreground leading-relaxed max-w-2xl"
                style={{ fontFamily: body.family }}
              >
                {pairing.description}
              </p>
            </AnimatedLayout>

            {/* Install Command */}
            <AnimatedLayout delay={200}>
              <div className="mt-28 max-w-2xl">
                <InstallCommand pairingName={pairing.name} showPackageManagerSelector showFeatures={false} />
              </div>
            </AnimatedLayout>
          </div>
        </AnimatedLayout>
      </div>

      <div className="absolute bottom-0 left-0 right-0 border-b border-border" />
    </header>
  );
}
