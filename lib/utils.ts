import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function buildFontFamily(name: string, category: string): string {
  return `"${name}", ${category}`;
}

export function buildInstallCommand(pairingName: string): string {
  return `npx shadcn@latest add https://www.fonttrio.xyz/r/${pairingName}.json`;
}
