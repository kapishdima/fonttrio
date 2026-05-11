/**
 * Known shadcn component names that bots/tools probe for.
 * Suppress registry_item_not_found for these to reduce noise.
 */
export const SHADCN_PROBE_NAMES = new Set([
  "accordion",
  "alert",
  "alert-dialog",
  "aspect-ratio",
  "avatar",
  "badge",
  "breadcrumb",
  "button",
  "calendar",
  "card",
  "carousel",
  "chart",
  "checkbox",
  "collapsible",
  "combobox",
  "command",
  "context-menu",
  "data-table",
  "date-picker",
  "dialog",
  "drawer",
  "dropdown-menu",
  "feature-1",
  "form",
  "hover-card",
  "input",
  "input-otp",
  "label",
  "menubar",
  "navigation-menu",
  "pagination",
  "popover",
  "progress",
  "radio-group",
  "resizable",
  "scroll-area",
  "select",
  "separator",
  "sheet",
  "sidebar-01",
  "sidebar",
  "skeleton",
  "slider",
  "sonner",
  "switch",
  "table",
  "tabs",
  "textarea",
  "toast",
  "toggle",
  "toggle-group",
  "tooltip",
]);

const BOT_UA_PATTERN =
  /bot|crawl|spider|slurp|facebook|twitter|linkedin|discord|telegram|whatsapp|preview|fetch|curl|wget|python-requests|go-http-client|java|php|ruby|perl|dart|node-fetch|axios|got\//i;

export function isBot(request: Request): boolean {
  const ua = request.headers.get("user-agent") || "";
  return !ua || BOT_UA_PATTERN.test(ua);
}
