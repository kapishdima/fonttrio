"use client";

import type { PairingData } from "@/lib/pairings";
import { TypeTester } from "../type-tester";
import { SectionWrapper } from "./section-wrapper";

interface TypeTesterSectionProps {
  pairing: PairingData;
}

export function TypeTesterSection({ pairing }: TypeTesterSectionProps) {
  return (
    <SectionWrapper label="Type Tester">
      <TypeTester pairing={pairing} />
    </SectionWrapper>
  );
}
