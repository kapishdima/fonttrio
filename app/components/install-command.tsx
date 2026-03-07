"use client";

import { useState, useCallback } from "react";
import { Check, Copy } from "lucide-react";

interface InstallCommandProps {
  pairingName: string;
  isCustomized?: boolean;
  compact?: boolean;
}

export function InstallCommand({
  pairingName,
  isCustomized = false,
  compact = false,
}: InstallCommandProps) {
  const [copied, setCopied] = useState(false);

  const command = `npx shadcn@latest add https://fonttrio.dev/r/${pairingName}.json`;

  const copy = useCallback(() => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [command]);

  if (compact) {
    return (
      <button
        onClick={copy}
        className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors font-mono uppercase tracking-wider"
        aria-label="Copy install command"
      >
        <span className="truncate max-w-[280px]">
          shadcn add .../{pairingName}.json
        </span>
        {copied ? <Check className="size-3.5" aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}
      </button>
    );
  }

  return (
    <div className="space-y-6">
      {isCustomized && (
        <div className="inline-block">
          <span className="text-xs uppercase tracking-widest text-[#e30613] border border-[#e30613] px-3 py-1">
            Scale Customized
          </span>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 text-xs uppercase tracking-widest text-muted-foreground border-b border-border pb-4">
        <span>3 Fonts</span>
        <span>Typography Scale</span>
        <span>CSS Variables</span>
      </div>

      <button
        onClick={copy}
        className="group flex items-center gap-4 w-full px-5 py-5 border-2 border-foreground text-left hover:bg-foreground hover:text-background transition-colors"
        aria-label="Copy install command"
      >
        <span className="text-muted-foreground group-hover:text-background/70 select-none text-xs uppercase tracking-wider font-mono" aria-hidden="true">$</span>
        <code className="text-sm flex-1 break-all font-mono">{command}</code>
        {copied ? (
          <Check className="size-4 text-[#e30613] shrink-0" aria-hidden="true" />
        ) : (
          <Copy className="size-4 text-muted-foreground group-hover:text-background shrink-0" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
