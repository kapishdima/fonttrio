"use client";

import { track } from "@vercel/analytics";
import { useCallback } from "react";
import { useCommandInstallation } from "@/hooks/use-command-installation";
import type { CopyState } from "@/hooks/use-copy-to-clipboard";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { usePackageManager } from "@/hooks/use-package-manager";

export function useInstallCopy(name: string) {
	const command = useCommandInstallation(name);
	const [packageManager] = usePackageManager();
	const { state, copy } = useCopyToClipboard();

	const copyCommand = useCallback(() => {
		copy(command);
		track("install_copied", { name, package_manager: packageManager });
	}, [copy, command, name, packageManager]);

	return { command, state, copyCommand } as const;
}

export type { CopyState };
