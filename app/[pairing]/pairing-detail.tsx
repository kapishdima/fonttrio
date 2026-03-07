"use client";

import type { PairingData } from "@/lib/pairings";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { HeroSection } from "../components/sections/hero-section";
import { PreviewSection } from "../components/sections/preview-section";
import { TypeTesterSection } from "../components/sections/type-tester-section";
import { ContextSection } from "../components/sections/context-section";

interface PairingDetailProps {
  pairing: PairingData;
}

export function PairingDetail({ pairing }: PairingDetailProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      
      <HeroSection pairing={pairing} />
      <PreviewSection pairing={pairing} />
      <TypeTesterSection pairing={pairing} />
      <ContextSection pairing={pairing} />
      
      <SiteFooter subtitle={`${pairing.heading} / ${pairing.body} / ${pairing.mono}`} />
    </div>
  );
}
