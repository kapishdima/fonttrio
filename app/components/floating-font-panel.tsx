"use client";

import { useState, useCallback } from "react";
import { X, Copy, Check, ShoppingCart, ChevronUp } from "lucide-react";
import { useFontSelection } from "@/lib/hooks/use-font-selection";
import { usePackageManagerContext } from "@/lib/contexts/package-manager-context";
import { buildMultiInstallCommand } from "@/lib/package-managers";
import { cn } from "@/lib/utils";

export function FloatingFontPanel() {
  const { selectedFonts, count, removeFont, clearSelection, isMaxReached, maxAllowed } = useFontSelection();
  const { packageManager } = usePackageManagerContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const installCommand = buildMultiInstallCommand(selectedFonts, packageManager);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [installCommand]);

  const handleRemove = (fontName: string) => {
    removeFont(fontName);
    // If removing the last font, collapse the panel
    if (count === 1) {
      setIsExpanded(false);
    }
  };

  // Don't render if no fonts selected
  if (count === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Collapsed State */}
      {!isExpanded && (
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          className={cn(
            "flex items-center gap-2 px-4 py-3 bg-foreground text-background border border-border",
            "hover:bg-foreground/90 transition-all duration-300 shadow-lg",
            "rounded-sm"
          )}
          aria-label={`Open font selection panel (${count} fonts selected)`}
          aria-expanded={isExpanded}
        >
          <ShoppingCart className="size-4" aria-hidden="true" />
          <span className="text-sm font-medium">{count}</span>
          {isMaxReached && (
            <span className="text-[10px] text-background/60 ml-1">(max)</span>
          )}
        </button>
      )}

      {/* Expanded State */}
      {isExpanded && (
        <div
          className={cn(
            "bg-background border border-border shadow-xl rounded-sm",
            "w-80 overflow-hidden transition-all duration-300"
          )}
          role="dialog"
          aria-label="Selected fonts panel"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface">
            <div className="flex items-center gap-2">
              <ShoppingCart className="size-4 text-muted-foreground" aria-hidden="true" />
              <span className="text-sm font-medium">
                Selected Fonts ({count}/{maxAllowed})
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={clearSelection}
                className="px-2 py-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear all selections"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Collapse panel"
              >
                <ChevronUp className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Font List */}
          <div className="max-h-48 overflow-y-auto">
            {selectedFonts.length === 0 ? (
              <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                No fonts selected
              </div>
            ) : (
              selectedFonts.map((fontName) => (
                <div
                  key={fontName}
                  className="flex items-center justify-between px-4 py-2.5 border-b border-border last:border-b-0 hover:bg-surface/50 transition-colors"
                >
                  <span className="text-sm font-mono truncate pr-2">{fontName}</span>
                  <button
                    type="button"
                    onClick={() => handleRemove(fontName)}
                    className="p-1 text-muted-foreground hover:text-destructive transition-colors shrink-0"
                    aria-label={`Remove ${fontName} from selection`}
                  >
                    <X className="size-3.5" aria-hidden="true" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Install Command Section */}
          {selectedFonts.length > 0 && (
            <div className="border-t border-border p-4 space-y-3">
              <button
                type="button"
                onClick={handleCopy}
                className="group w-full flex items-center gap-2 px-3 py-2.5 bg-surface border border-border text-left hover:bg-surface-hover transition-colors rounded-sm"
                aria-label="Copy install command"
              >
                <span className="text-muted-foreground select-none text-xs font-mono" aria-hidden="true">
                  $
                </span>
                <code className="text-xs flex-1 break-all font-mono text-foreground">
                  {installCommand}
                </code>
                <span className="shrink-0">
                  {copied ? (
                    <Check className="size-4 text-green-500" aria-hidden="true" />
                  ) : (
                    <Copy className="size-4 text-muted-foreground group-hover:text-foreground" aria-hidden="true" />
                  )}
                </span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
