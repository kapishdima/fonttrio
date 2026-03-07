"use client";

import Link from "next/link";
import type { PairingData } from "@/lib/pairings";
import { ArrowRight } from "lucide-react";

interface PairingCardProps {
  pairing: PairingData;
}

export function PairingCard({ pairing }: PairingCardProps) {
  const headingFont = `"${pairing.heading}", ${pairing.headingCategory}`;
  const bodyFont = `"${pairing.body}", ${pairing.bodyCategory}`;

  return (
    <Link href={`/${pairing.name}`} className="block specimen-card">
      <div className="border-b border-border py-8 px-6 lg:px-12">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-12 gap-4 items-end">
            <div className="col-span-12 lg:col-span-8">
              <h2
                style={{
                  fontFamily: headingFont,
                  fontWeight: pairing.scale.h1.weight,
                  lineHeight: "0.95",
                  letterSpacing: pairing.scale.h1.letterSpacing,
                }}
                className="text-[clamp(2rem,5vw,4rem)] truncate"
              >
                {pairing.name}
              </h2>
            </div>

            <div className="col-span-12 lg:col-span-4 lg:text-right">
              <div className="flex items-center justify-end gap-4">
                <span
                  className="text-sm text-muted-foreground"
                  style={{ fontFamily: bodyFont }}
                >
                  {pairing.heading} / {pairing.body} / {pairing.mono}
                </span>
                <ArrowRight className="specimen-arrow size-4 text-[#e30613]" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
