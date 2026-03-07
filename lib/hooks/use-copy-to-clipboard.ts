"use client";

import { useState, useCallback } from "react";

export function useCopyToClipboard(text: string, resetDelay = 2000) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    (e?: React.MouseEvent) => {
      e?.preventDefault();
      e?.stopPropagation();
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), resetDelay);
    },
    [text, resetDelay]
  );

  return { copied, copy } as const;
}
