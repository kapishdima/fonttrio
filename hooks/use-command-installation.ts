import { convertNpmCommand } from "@/components/code-block-command/code-block-command";
import { usePackageManager } from "@/hooks/use-package-manager";
import { buildInstallCommand } from "@/lib/package-managers";

export const useCommandInstallation = (pairingName: string) => {
    const [packageManager = "bun"] = usePackageManager();

    return convertNpmCommand(buildInstallCommand(pairingName))[packageManager];
};
