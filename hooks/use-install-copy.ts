"use client";

import { useCallback } from "react";
import { useCommandInstallation } from "@/hooks/use-command-installation";
import type { CopyState } from "@/hooks/use-copy-to-clipboard";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { usePackageManager } from "@/hooks/use-package-manager";
import { useTrackEvent } from "@/lib/analytics";

export function useInstallCopy(name: string) {
	const command = useCommandInstallation(name);
	const [packageManager] = usePackageManager();
	const { state, copy } = useCopyToClipboard();
	const trackEvent = useTrackEvent();

	const copyCommand = useCallback(() => {
		copy(command);
		trackEvent("install_copied", { name, package_manager: packageManager });
	}, [copy, command, name, packageManager, trackEvent]);

	return { command, state, copyCommand } as const;
}

export type { CopyState };
