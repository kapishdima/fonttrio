// Registry prefix - can be easily changed from URL to npm scope
// Current: https://www.fonttrio.xyz/r/
// Future: @fonttrio/
export const REGISTRY_PREFIX = "@fonttrio/";

// Package managers
export type PackageManager = "npm" | "yarn" | "pnpm" | "bun";

export interface PackageManagerConfig {
  key: PackageManager;
  label: string;
  command: string;
}

export const PACKAGE_MANAGERS: PackageManagerConfig[] = [
  { key: "npm", label: "npm", command: "npx" },
  { key: "yarn", label: "yarn", command: "yarn dlx" },
  { key: "pnpm", label: "pnpm", command: "pnpm dlx" },
  { key: "bun", label: "bun", command: "bunx" },
];

export const DEFAULT_PACKAGE_MANAGER: PackageManager = "npm";

// Storage key for localStorage
export const PACKAGE_MANAGER_STORAGE_KEY = "fonttrio-package-manager";

// Build install command based on package manager and pairing
export function buildInstallCommand(
  pairingName: string,
  packageManager: PackageManager = "npm"
): string {
  const pm = PACKAGE_MANAGERS.find((p) => p.key === packageManager) || PACKAGE_MANAGERS[0];
  return `${pm.command} shadcn@latest add ${REGISTRY_PREFIX}${pairingName}`;
}

// Build short command for display (without full URL)
export function buildDisplayCommand(pairingName: string): string {
  return `shadcn add ${pairingName}`;
}
