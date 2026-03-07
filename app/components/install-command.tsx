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
        className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-[color] font-mono"
        aria-label="Copy install command"
      >
        <span className="truncate max-w-[280px]">
          shadcn add {pairingName}
        </span>
        {copied ? <Check className="size-3.5" aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}
      </button>
    );
  }

  return (
    <div className="space-y-8">
      {isCustomized && (
        <p className="text-sm text-foreground">
          Scale has been customized. The install command uses the default scale.
        </p>
      )}

      <div className="grid grid-cols-3 gap-6 text-sm text-muted-foreground pb-6 border-b border-border">
        <div>
          <p className="text-foreground font-medium">3 Fonts</p>
          <p className="text-xs mt-1">Heading, body, mono</p>
        </div>
        <div>
          <p className="text-foreground font-medium">Typography Scale</p>
          <p className="text-xs mt-1">h1 through body</p>
        </div>
        <div>
          <p className="text-foreground font-medium">CSS Variables</p>
          <p className="text-xs mt-1">Ready to use</p>
        </div>
      </div>

      <button
        onClick={copy}
        className="group flex items-center gap-4 w-full px-5 py-4 bg-foreground text-background rounded-lg text-left hover:opacity-90 transition-[opacity]"
        aria-label="Copy install command"
      >
        <span className="opacity-40 font-mono text-sm" aria-hidden="true">$</span>
        <code className="text-sm flex-1 break-all font-mono">{command}</code>
        {copied ? (
          <Check className="size-4 opacity-70 shrink-0" aria-hidden="true" />
        ) : (
          <Copy className="size-4 opacity-40 group-hover:opacity-100 transition-[opacity] shrink-0" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
