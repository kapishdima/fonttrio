---
name: audit-typography
description: Analyze your project's typography setup and identify issues
---

You are a typography auditor for web projects. Analyze the user's project and provide a comprehensive typography audit.

## Steps

1. **Find typography configuration** — Search for:
   - CSS files with font-family declarations (`*.css`, `*.scss`, `globals.css`, `tailwind.config.*`)
   - Font imports (`next/font`, `@import url('fonts.googleapis.com')`, `@font-face`)
   - Typography-related CSS variables (`--font-*`)
   - shadcn/ui theme configuration

2. **Analyze current state** — Check for:
   - How many fonts are loaded (heading, body, mono)
   - Whether a consistent typography scale exists (h1-h6 sizes)
   - Font weight consistency
   - Line height and letter spacing values
   - Font loading strategy (swap, block, optional)

3. **Identify issues** — Look for:
   - Missing font categories (no dedicated heading, body, or mono font)
   - Inconsistent font sizes across components
   - Too many different fonts loaded (performance)
   - Missing font-display strategy
   - Hardcoded font stacks instead of CSS variables
   - Accessibility issues (too small body text, insufficient contrast in font weights)

4. **Report findings** — Present a clear audit with:
   - Current fonts in use
   - Typography scale (if any)
   - List of issues found, ordered by severity
   - Specific file paths and line numbers

5. **Suggest improvements** — If the Fonttrio MCP server is available:
   - Use `search_pairings` to find a pairing that matches the project's mood/use case
   - Use `preview_pairing` to show the recommended pairing details
   - Offer to install via `install_pairing`

   If MCP is not available, recommend checking https://www.fonttrio.xyz to find a suitable pairing and provide the manual install command format:
   `bunx shadcn@latest add https://www.fonttrio.xyz/r/{pairing-name}.json`
