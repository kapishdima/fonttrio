#!/usr/bin/env bash
set -euo pipefail

# ─────────────────────────────────────────────
# Fonttrio — Codex Plugin Installer
# https://www.fonttrio.xyz
# ─────────────────────────────────────────────

PLUGIN_NAME="fonttrio"
TARBALL_URL="https://www.fonttrio.xyz/fonttrio-codex-plugin.tar.gz"

# ── Parse arguments ──────────────────────────
SCOPE="workspace"
while [[ $# -gt 0 ]]; do
  case "$1" in
    --personal) SCOPE="personal"; shift ;;
    --workspace) SCOPE="workspace"; shift ;;
    -h|--help)
      echo "Usage: curl -fsSL fonttrio.xyz/install-codex.sh | bash [-s -- OPTIONS]"
      echo ""
      echo "Options:"
      echo "  --workspace   Install into current repo (default)"
      echo "  --personal    Install globally for all workspaces"
      exit 0
      ;;
    *) echo "Unknown option: $1. Use --help for usage."; exit 1 ;;
  esac
done

# ── Determine target directories ─────────────
if [ "$SCOPE" = "personal" ]; then
  PLUGIN_DIR="$HOME/.codex/plugins/$PLUGIN_NAME"
  MARKETPLACE_DIR="$HOME/.agents/plugins"
  MARKETPLACE="$MARKETPLACE_DIR/marketplace.json"
  PLUGIN_SOURCE_PATH="$HOME/.codex/plugins/$PLUGIN_NAME"
else
  REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null || pwd)
  PLUGIN_DIR="$REPO_ROOT/.agents/plugins/$PLUGIN_NAME"
  MARKETPLACE_DIR="$REPO_ROOT/.agents/plugins"
  MARKETPLACE="$MARKETPLACE_DIR/marketplace.json"
  PLUGIN_SOURCE_PATH="./.agents/plugins/$PLUGIN_NAME"
fi

# ── Download and extract ─────────────────────
TMPDIR=$(mktemp -d)
trap 'rm -rf "$TMPDIR"' EXIT

echo "⬇ Downloading fonttrio Codex plugin..."
curl -fsSL "$TARBALL_URL" -o "$TMPDIR/plugin.tar.gz"

echo "📦 Extracting..."
tar -xzf "$TMPDIR/plugin.tar.gz" -C "$TMPDIR"

# ── Copy plugin files ────────────────────────
mkdir -p "$PLUGIN_DIR"
cp -R "$TMPDIR/fonttrio/." "$PLUGIN_DIR/"
find "$PLUGIN_DIR" -name '.DS_Store' -delete 2>/dev/null || true

# ── Set up marketplace.json ──────────────────
mkdir -p "$MARKETPLACE_DIR"

ENTRY='{
  "name": "fonttrio",
  "source": { "source": "local", "path": "PLUGIN_PATH_PLACEHOLDER" },
  "policy": { "installation": "AVAILABLE", "authentication": "ON_INSTALL" },
  "category": "Productivity"
}'
ENTRY=$(echo "$ENTRY" | sed "s|PLUGIN_PATH_PLACEHOLDER|$PLUGIN_SOURCE_PATH|")

if [ -f "$MARKETPLACE" ]; then
  if grep -q '"fonttrio"' "$MARKETPLACE"; then
    echo "✓ marketplace.json already contains fonttrio, skipping."
  else
    # Merge into existing marketplace using Node
    if command -v node &>/dev/null; then
      node -e "
        const fs = require('fs');
        const mp = JSON.parse(fs.readFileSync('$MARKETPLACE', 'utf8'));
        const entry = $ENTRY;
        mp.plugins = mp.plugins || [];
        mp.plugins.push(entry);
        fs.writeFileSync('$MARKETPLACE', JSON.stringify(mp, null, 2) + '\n');
      "
      echo "✓ Added fonttrio to existing marketplace.json"
    else
      echo "⚠ Could not auto-merge (Node not found). Add this entry to $MARKETPLACE manually:"
      echo "$ENTRY"
    fi
  fi
else
  cat > "$MARKETPLACE" << MKJSON
{
  "name": "fonttrio",
  "interface": { "displayName": "Fonttrio" },
  "plugins": [
    {
      "name": "fonttrio",
      "source": {
        "source": "local",
        "path": "$PLUGIN_SOURCE_PATH"
      },
      "policy": {
        "installation": "AVAILABLE",
        "authentication": "ON_INSTALL"
      },
      "category": "Productivity"
    }
  ]
}
MKJSON
  echo "✓ Created marketplace.json"
fi

# ── Done ─────────────────────────────────────
echo ""
echo "✅ Fonttrio Codex plugin installed!"
echo "   Scope:       $SCOPE"
echo "   Plugin:      $PLUGIN_DIR"
echo "   Marketplace: $MARKETPLACE"
echo ""
echo "Open Codex — the plugin will appear in your plugin list."
echo "Skills: /audit-typography, /suggest-improvements"
echo "MCP:    search_pairings, preview_pairing, install_pairing"
