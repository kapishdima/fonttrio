"use client";

import type { PairingData } from "@/lib/pairings";
import { ContextPreview } from "../context-preview";
import { SectionWrapper } from "./section-wrapper";

interface ContextSectionProps {
  pairing: PairingData;
}

export function ContextSection({ pairing }: ContextSectionProps) {
  return (
    <SectionWrapper label="In Context">
      <ContextPreview pairing={pairing} />
    </SectionWrapper>
  );
}
