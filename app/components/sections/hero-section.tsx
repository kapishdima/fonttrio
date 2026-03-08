"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import type { PairingData } from "@/lib/pairings";
import { usePairingFonts } from "@/lib/hooks/use-pairing-fonts";
import { GridBackground } from "../grid-background";
import { MetricLines } from "../metric-lines";
import { InstallCommand } from "../install-command";

import { SectionLabel } from "../section-label";
import { AnimatedLayout } from "../animated-layout";

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
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const el = parallaxRef.current;
      if (!el) return;
      const y = window.scrollY;
      el.style.transform = `translateY(${-y * 0.6}px)`;
      el.style.opacity = `${Math.max(0, 1 - y / 250)}`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header id="main-content" className="pt-24 sm:pt-[100px] lg:pt-[120px] relative min-h-[70vh] sm:min-h-[80vh] lg:min-h-screen flex flex-col">
      <GridBackground />

      {/* Hero Content */}
      <div className="relative flex-1 flex flex-col justify-start sm:justify-center px-4 sm:px-6 lg:px-8 xl:px-12 pb-6 sm:pb-12">
        <AnimatedLayout>
          <div className="max-w-none">
            {/* Pairing Name with Metric Lines */}
            <div className="relative mt-4 sm:mt-0 h-[clamp(2rem,10vw,6rem)] sm:h-[clamp(2.5rem,12vw,10rem)] lg:h-[clamp(3rem,15vw,12rem)] overflow-hidden">
              <div className="hidden sm:block">
                <MetricLines lines={METRIC_LINES} />
              </div>

              {/* Text — above lines with parallax */}
              <div
                ref={parallaxRef}
                className="h-full flex items-center relative z-10 overflow-hidden"
              >
                <h1
                  style={{
                    fontFamily: heading.family,
                    fontWeight: pairing.scale.h1.weight,
                    lineHeight: "0.9",
                    letterSpacing: pairing.scale.h1.letterSpacing,
                    fontSize: "clamp(1.5rem,8vw,5rem)",
                  }}
                  className="truncate w-full text-[clamp(1.5rem,8vw,5rem)] sm:text-[clamp(1.75rem,10vw,8rem)] lg:text-[clamp(2.5rem,14vw,12rem)]"
                >
                  {pairing.name}
                </h1>
              </div>
            </div>

            {/* Font Trio Preview */}
            <AnimatedLayout delay={100}>
              <div className="mt-4 sm:mt-6 lg:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
                <div>
                  <SectionLabel className="mb-1 sm:mb-2 text-[10px] sm:text-xs">Heading Font</SectionLabel>
                  <p 
                    style={{ fontFamily: heading.family }} 
                    className="text-sm sm:text-lg lg:text-xl xl:text-2xl font-semibold"
                  >
                    {pairing.heading}
                  </p>
                </div>
                <div>
                  <SectionLabel className="mb-1 sm:mb-2 text-[10px] sm:text-xs">Body Font</SectionLabel>
                  <p 
                    style={{ fontFamily: body.family }}
                    className="text-xs sm:text-base lg:text-lg"
                  >
                    {pairing.body}
                  </p>
                </div>
                <div className="sm:col-span-2 lg:col-span-1">
                  <SectionLabel className="mb-1 sm:mb-2 text-[10px] sm:text-xs">Mono Font</SectionLabel>
                  <p 
                    style={{ fontFamily: mono.family }}
                    className="text-xs sm:text-sm lg:text-base"
                  >
                    {pairing.mono}
                  </p>
                </div>
              </div>
            </AnimatedLayout>

            {/* Description */}
            <AnimatedLayout delay={150}>
              <p
                className="mt-4 sm:mt-6 lg:mt-10 text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl"
                style={{ fontFamily: body.family }}
              >
                {pairing.description}
              </p>
            </AnimatedLayout>

            {/* Install Command */}
            <AnimatedLayout delay={200}>
              <div className="mt-6 sm:mt-10 lg:mt-16 max-w-full sm:max-w-2xl">
                <InstallCommand.Full pairingName={pairing.name} />
              </div>
            </AnimatedLayout>
          </div>
        </AnimatedLayout>
      </div>

      <div className="absolute bottom-0 left-0 right-0 border-b border-border" />
    </header>
  );
}
