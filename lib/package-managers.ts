export const REGISTRY_PREFIX = "@fonttrio/";

export function buildInstallCommand(
  fontNames: string | string[],
): string {
  if (fontNames.length === 0) return "";

  const names = Array.isArray(fontNames) ? fontNames : [fontNames];

  const fontList = names.map((name) => `${REGISTRY_PREFIX}${name}`).join(" ");

  return `npx shadcn@latest add ${fontList}`;
}
