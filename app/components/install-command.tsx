"use client";

import { useState, useCallback } from "react";
import { Check, Copy, ChevronDown } from "lucide-react";
import { usePackageManager } from "@/lib/hooks/use-package-manager";
import { buildInstallCommand, type PackageManager } from "@/lib/package-managers";

interface InstallCommandProps {
  pairingName: string;
  isCustomized?: boolean;
  compact?: boolean;
  showPackageManagerSelector?: boolean;
  showFeatures?: boolean;
}

export function InstallCommand({
  pairingName,
  isCustomized = false,
  compact = false,
  showPackageManagerSelector = true,
  showFeatures = true,
}: InstallCommandProps) {
  const { packageManager, setPackageManager, packageManagers } = usePackageManager();
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const command = buildInstallCommand(pairingName, packageManager);
  const displayCommand = `shadcn add ${pairingName}`;

  const copy = useCallback(() => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [command]);

  const handleSelect = (pm: PackageManager) => {
    setPackageManager(pm);
    setIsOpen(false);
  };

  if (compact) {
    return (
      <button
        onClick={copy}
        className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-[color] font-mono"
        aria-label="Copy install command"
      >
        <span className="truncate max-w-70">{displayCommand}</span>
        {copied ? (
          <Check className="size-3.5" aria-hidden="true" />
        ) : (
          <Copy className="size-3.5" aria-hidden="true" />
        )}
      </button>
    );
  }

  return (
    <div className="space-y-5">
      {isCustomized && (
        <p className="text-sm text-foreground">
          Scale has been customized. The install command uses the default scale.
        </p>
      )}

      {showFeatures && (
        <div className="grid grid-cols-3 gap-2 text-sm text-muted-foreground pb-4 border-b border-border">
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
      )}

      {showPackageManagerSelector && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            Package Manager
          </span>
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-1 px-2 py-1 text-xs uppercase tracking-wider border border-border bg-surface hover:bg-surface-hover transition-colors"
              aria-haspopup="listbox"
              aria-expanded={isOpen}
            >
              {packageManager}
              <ChevronDown className="size-3" />
            </button>

            {isOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsOpen(false)}
                />
                <ul
                  className="absolute top-full left-0 mt-1 z-50 min-w-[100px] bg-background border border-border shadow-lg"
                  role="listbox"
                >
                  {packageManagers.map((pm) => (
                    <li key={pm.key}>
                      <button
                        onClick={() => handleSelect(pm.key)}
                        className={`w-full px-3 py-2 text-xs uppercase tracking-wider text-left hover:bg-surface transition-colors ${
                          packageManager === pm.key
                            ? "bg-surface text-foreground"
                            : "text-muted-foreground"
                        }`}
                        role="option"
                        aria-selected={packageManager === pm.key}
                      >
                        {pm.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      )}

      <button
        onClick={copy}
        className="group flex items-center gap-3 w-full px-4 py-3 bg-surface border border-border text-left hover:bg-surface-hover transition-[background-color] rounded-sm"
        aria-label="Copy install command"
      >
        <span
          className="text-muted-foreground select-none text-xs uppercase tracking-wider font-mono"
          aria-hidden="true"
        >
          $
        </span>
        <code className="text-sm flex-1 break-all font-mono">{command}</code>
        {copied ? (
          <Check className="size-4 shrink-0" aria-hidden="true" />
        ) : (
          <Copy className="size-4 text-muted-foreground shrink-0" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
