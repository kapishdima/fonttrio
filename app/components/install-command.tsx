"use client";

import { useState, useCallback } from "react";

interface InstallCommandProps {
  pairingName: string;
  isCustomized?: boolean;
  customParams?: string;
  compact?: boolean;
}

export function InstallCommand({
  pairingName,
  isCustomized = false,
  customParams = "",
  compact = false,
}: InstallCommandProps) {
  const [copied, setCopied] = useState(false);

  const baseUrl = `https://fonttrio.dev/r/${pairingName}.json`;
  const url = customParams ? `${baseUrl}?${customParams}` : baseUrl;
  const command = `npx shadcn@latest add ${url}`;

  const copy = useCallback(() => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [command]);

  if (compact) {
    return (
      <button
        onClick={copy}
        className="flex items-center gap-2 font-mono text-xs text-muted hover:text-text"
      >
        <span className="truncate max-w-[280px]">
          shadcn add .../{pairingName}.json
        </span>
        {copied ? (
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 8.5l3 3 7-7" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="5" y="5" width="8" height="8" rx="1.5" />
            <path d="M3 11V3.5A1.5 1.5 0 0 1 4.5 2H11" />
          </svg>
        )}
      </button>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono tracking-wide bg-accent-soft text-accent border border-accent/20">
          3 fonts
        </span>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono tracking-wide bg-accent-soft text-accent border border-accent/20">
          typography scale included
        </span>
        {isCustomized && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono tracking-wide bg-accent text-bg">
            customized
          </span>
        )}
      </div>

      <div className="relative group">
        <div className="flex items-center gap-3 px-4 py-3 bg-accent-soft/50 border border-border rounded-lg font-mono text-sm">
          <span className="text-muted select-none">$</span>
          <code className="text-text flex-1 break-all">{command}</code>
          <button
            onClick={copy}
            className="shrink-0 p-1.5 rounded hover:bg-border/50"
            aria-label="Copy command"
          >
            {copied ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--accent)" strokeWidth="2">
                <path d="M3 8.5l3 3 7-7" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="5" y="5" width="8" height="8" rx="1.5" />
                <path d="M3 11V3.5A1.5 1.5 0 0 1 4.5 2H11" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
