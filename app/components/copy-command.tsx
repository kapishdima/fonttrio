"use client";

import { Check, Copy } from "lucide-react";
import { usePackageManager } from "@/lib/hooks/use-package-manager";
import { useCopyToClipboard } from "@/lib/hooks/use-copy-to-clipboard";
import { buildInstallCommand } from "@/lib/package-managers";

interface CopyCommandProps {
  pairingName: string;
}

export function CopyCommand({ pairingName }: CopyCommandProps) {
  const { packageManager } = usePackageManager();
  const command = buildInstallCommand(pairingName, packageManager);
  const { copied, copy } = useCopyToClipboard(command);

  return (
    <button
      onClick={copy}
      className="group w-full flex items-center gap-3 px-4 py-3 bg-surface border border-border text-left hover:bg-surface-hover transition-[background-color] rounded-sm"
      aria-label="Copy install command"
    >
      <span
        className="text-muted-foreground select-none text-xs uppercase tracking-wider font-mono"
        aria-hidden="true"
      >
        $
      </span>
      <code className="text-sm flex-1 break-all font-mono">
        shadcn add {pairingName}
      </code>
      {copied ? (
        <Check className="size-4 shrink-0" aria-hidden="true" />
      ) : (
        <Copy className="size-4 text-muted-foreground shrink-0" aria-hidden="true" />
      )}
    </button>
  );
}
