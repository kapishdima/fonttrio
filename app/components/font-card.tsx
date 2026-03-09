"use client";

import Link from "next/link";
import { Check, Copy, ArrowRight } from "lucide-react";
import type { FontItem } from "@/lib/fonts";
import { parseFontCategory, getFontGoogleFontsUrl } from "@/lib/fonts";
import { useCopyToClipboard } from "@/lib/hooks/use-copy-to-clipboard";
import { usePackageManagerContext } from "@/lib/contexts/package-manager-context";
import { buildInstallCommand } from "@/lib/package-managers";
import { useLazyFontLoad } from "@/lib/hooks/use-lazy-font-load";
import { SectionLabel } from "./section-label";

interface FontCardProps {
  font: FontItem;
}

export function FontCard({ font }: FontCardProps) {
  const { packageManager } = usePackageManagerContext();
  const command = buildInstallCommand(font.name, packageManager);
  const { copied, copy } = useCopyToClipboard(command);
  const googleFontsUrl = getFontGoogleFontsUrl(font);
  const { ref, loaded } = useLazyFontLoad(googleFontsUrl);
  const category = parseFontCategory(font);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    copy();
  };

  const fontFamily = loaded ? `"${font.font.family}", ${category}` : "inherit";

  return (
    <Link
      href={`/fonts/${font.name}`}
      className="group flex flex-col border-r border-b border-border hover:bg-surface/40 transition-[background-color] bg-background"
      ref={ref as React.Ref<HTMLAnchorElement>}
    >
      {/* Preview Area */}
      <div className="h-48 px-4 py-4 flex flex-col justify-between overflow-hidden">
        <div>
          <SectionLabel className="mb-2">Preview</SectionLabel>
          <p
            style={{
              fontFamily,
              fontSize: "1.75rem",
              lineHeight: "1.1",
              fontWeight: 400,
            }}
            className="truncate transition-all duration-300"
          >
            {font.title}
          </p>
        </div>

        <p
          style={{ fontFamily, fontSize: "0.8125rem", lineHeight: "1.5" }}
          className="text-muted-foreground line-clamp-2 transition-all duration-300"
        >
          The quick brown fox jumps over the lazy dog
        </p>
      </div>

      {/* Install Command */}
      <button
        onClick={handleCopy}
        className="w-full flex items-center gap-2 px-4 py-3 border-t border-border bg-surface/30 hover:bg-surface text-left transition-[background-color] min-h-[44px]"
        aria-label={`Copy install command for ${font.title}`}
      >
        <span
          className="text-muted-foreground/50 select-none text-[11px] font-mono"
          aria-hidden="true"
        >
          $
        </span>
        <code className="flex-1 truncate text-muted-foreground text-[11px] font-mono">
          {command}
        </code>
        {copied ? (
          <Check className="size-4 shrink-0 text-foreground" aria-hidden="true" />
        ) : (
          <Copy className="size-4 shrink-0 text-muted-foreground/50" aria-hidden="true" />
        )}
      </button>

      {/* Info Area */}
      <div className="px-4 py-2.5 border-t border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium">{font.title}</h3>
            <p className="text-[11px] text-muted-foreground mt-0.5 uppercase tracking-wider">
              {category} · {font.font.weight.length} weights
            </p>
          </div>
          <ArrowRight className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        </div>
      </div>
    </Link>
  );
}
