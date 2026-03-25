"use client";

import { useCommandInstallation } from "@/hooks/use-command-installation";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import type { CopyState } from "@/hooks/use-copy-to-clipboard";
import { useCallback } from "react";

export function useInstallCopy(name: string) {
	const command = useCommandInstallation(name);
	const { state, copy } = useCopyToClipboard();

	const copyCommand = useCallback(() => {
		copy(command);
	}, [copy, command]);

	return { command, state, copyCommand } as const;
}

export type { CopyState };
