"use client";

import Link from "next/link";
import type { PairingData } from "@/lib/pairings";
import { ArrowRight, Check, Copy } from "lucide-react";
import { useCopyToClipboard } from "@/lib/hooks/use-copy-to-clipboard";
import { buildInstallCommand } from "@/lib/utils";
import { SectionLabel } from "./section-label";

interface PairingCardProps {
  pairing: PairingData;
}

export function PairingCard({ pairing }: PairingCardProps) {
  const headingFont = `"${pairing.heading}", ${pairing.headingCategory}`;
  const bodyFont = `"${pairing.body}", ${pairing.bodyCategory}`;
  const monoFont = `"${pairing.mono}", monospace`;
  const command = buildInstallCommand(pairing.name);
  const { copied, copy } = useCopyToClipboard(command);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    copy();
  };

  return (
    <Link
      href={`/${pairing.name}`}
      className="group flex flex-col border-r border-b border-border hover:bg-surface/40 transition-[background-color] bg-background"
    >
      {/* Preview Area — fixed height */}
      <div className="h-48 px-4 py-4 flex flex-col justify-between overflow-hidden">
        {/* Heading Preview */}
        <div>
          <SectionLabel className="mb-1">Heading</SectionLabel>
          <p
            style={{
              fontFamily: headingFont,
              fontSize: "1.75rem",
              fontWeight: pairing.scale.h1.weight,
              lineHeight: "1.1",
            }}
            className="truncate"
          >
            {pairing.heading}
          </p>
        </div>

        {/* Body Preview */}
        <div>
          <SectionLabel className="mb-1">Body</SectionLabel>
          <p
            style={{
              fontFamily: bodyFont,
              fontSize: "0.8125rem",
              lineHeight: "1.5",
            }}
            className="text-muted-foreground line-clamp-2"
          >
            {pairing.description}
          </p>
        </div>
      </div>

      {/* Install Command — copyable mono specimen */}
      <button
        onClick={handleCopy}
        className="w-full flex items-center gap-2 px-4 py-2 border-t border-border bg-surface/30 hover:bg-surface text-left transition-[background-color]"
        aria-label={`Copy install command for ${pairing.name}`}
      >
        <span
          className="text-muted-foreground/50 select-none text-[11px]"
          style={{ fontFamily: monoFont }}
          aria-hidden="true"
        >$</span>
        <code
          className="flex-1 truncate text-muted-foreground text-[11px]"
          style={{ fontFamily: monoFont }}
        >
          npx shadcn add {pairing.name}
        </code>
        {copied ? (
          <Check className="size-3 shrink-0 text-foreground" aria-hidden="true" />
        ) : (
          <Copy className="size-3 shrink-0 text-muted-foreground/50" aria-hidden="true" />
        )}
      </button>

      {/* Info Area */}
      <div className="px-4 py-2.5 border-t border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium">{pairing.name}</h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              {pairing.heading} + {pairing.body} + {pairing.mono}
            </p>
          </div>
          <ArrowRight className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        </div>
      </div>
    </Link>
  );
}
