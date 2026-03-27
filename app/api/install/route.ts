export async function GET(): Promise<Response> {
	const script = generateInstallScript();

	return new Response(script, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
			"Cache-Control": "no-cache",
		},
	});
}

function generateInstallScript(): string {
	return `#!/usr/bin/env bash
set -euo pipefail

# Fonttrio Installer
# Installs MCP server config + Claude Code skills

MCP_URL="https://www.fonttrio.xyz/api/mcp"
SKILLS_URL="https://www.fonttrio.xyz/api/skills"

echo ""
echo "  Fonttrio Installer"
echo "  ────────────────────────"
echo ""

# ─── IDE Selection ───────────────────────────────────────────────

declare -a SELECTED_IDES=()

echo "  Select IDEs to configure (space to toggle, enter to confirm):"
echo ""

declare -a IDE_NAMES=("Claude Code" "Cursor" "Codex" "OpenCode")
declare -a IDE_SELECTED=(0 0 0 0)

select_ides() {
  local cursor=0
  local key

  while true; do
    # Clear and redraw
    for i in "\${!IDE_NAMES[@]}"; do
      local prefix="  "
      if [ "$i" -eq "$cursor" ]; then prefix="> "; fi
      local check=" "
      if [ "\${IDE_SELECTED[$i]}" -eq 1 ]; then check="x"; fi
      echo "  $prefix[\${check}] \${IDE_NAMES[$i]}"
    done
    echo ""
    echo "  (space=toggle, enter=confirm, a=all)"

    read -rsn1 key
    # Move cursor up to redraw
    for _ in "\${IDE_NAMES[@]}"; do tput cuu1 2>/dev/null || true; done
    tput cuu1 2>/dev/null || true
    tput cuu1 2>/dev/null || true

    case "$key" in
      A|B)  # Arrow keys (preceded by escape sequence)
        read -rsn1 key2 2>/dev/null || true
        case "$key2" in
          A) cursor=$(( (cursor - 1 + \${#IDE_NAMES[@]}) % \${#IDE_NAMES[@]} )) ;;
          B) cursor=$(( (cursor + 1) % \${#IDE_NAMES[@]} )) ;;
        esac
        ;;
      " ")
        IDE_SELECTED[$cursor]=$(( 1 - \${IDE_SELECTED[$cursor]} ))
        ;;
      "a"|"A")
        for i in "\${!IDE_SELECTED[@]}"; do IDE_SELECTED[$i]=1; done
        ;;
      "")
        break
        ;;
    esac
  done

  for i in "\${!IDE_NAMES[@]}"; do
    if [ "\${IDE_SELECTED[$i]}" -eq 1 ]; then
      SELECTED_IDES+=("\${IDE_NAMES[$i]}")
    fi
  done
}

select_ides

if [ \${#SELECTED_IDES[@]} -eq 0 ]; then
  echo "  No IDEs selected. Exiting."
  exit 0
fi

echo ""
echo "  Installing for: \${SELECTED_IDES[*]}"
echo ""

# ─── JSON Merge Helper ──────────────────────────────────────────

merge_mcp_config() {
  local config_file="$1"
  local mcp_entry

  mcp_entry=$(cat <<MCPJSON
{
  "fonttrio": {
    "url": "$MCP_URL"
  }
}
MCPJSON
)

  if [ ! -f "$config_file" ]; then
    mkdir -p "$(dirname "$config_file")"
    echo "{\\"mcpServers\\": $mcp_entry}" > "$config_file"
    return
  fi

  if command -v jq &>/dev/null; then
    local tmp
    tmp=$(jq --argjson entry "$mcp_entry" '.mcpServers = (.mcpServers // {}) + $entry' "$config_file")
    echo "$tmp" > "$config_file"
  elif command -v python3 &>/dev/null; then
    python3 -c "
import json, sys
with open('$config_file', 'r') as f:
    config = json.load(f)
config.setdefault('mcpServers', {})
config['mcpServers']['fonttrio'] = {
    'url': '$MCP_URL'
}
with open('$config_file', 'w') as f:
    json.dump(config, f, indent=2)
"
  elif command -v node &>/dev/null; then
    node -e "
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('$config_file', 'utf8'));
config.mcpServers = config.mcpServers || {};
config.mcpServers.fonttrio = {
  url: '$MCP_URL'
};
fs.writeFileSync('$config_file', JSON.stringify(config, null, 2));
"
  else
    echo "  ERROR: Need jq, python3, or node to merge JSON configs"
    exit 1
  fi
}

# ─── Install Skills ─────────────────────────────────────────────

install_skills() {
  local skills_dir="$1"
  mkdir -p "$skills_dir"

  for skill in audit-typography suggest-improvements; do
    echo "  Downloading skill: $skill"
    curl -fsSL "$SKILLS_URL/$skill" -o "$skills_dir/$skill.md"
  done
}

# ─── Configure Each IDE ─────────────────────────────────────────

for ide in "\${SELECTED_IDES[@]}"; do
  case "$ide" in
    "Claude Code")
      echo "  Configuring Claude Code..."
      merge_mcp_config "$HOME/.claude/settings.json"
      install_skills "$HOME/.claude/skills/fonttrio"
      echo "  ✓ Claude Code configured"
      ;;
    "Cursor")
      echo "  Configuring Cursor..."
      merge_mcp_config "$HOME/.cursor/mcp.json"
      echo "  ✓ Cursor configured"
      ;;
    "Codex")
      echo "  Configuring Codex..."
      merge_mcp_config "$HOME/.codex/mcp.json"
      echo "  ✓ Codex configured"
      ;;
    "OpenCode")
      echo "  Configuring OpenCode..."
      merge_mcp_config "$HOME/.opencode/mcp.json"
      echo "  ✓ OpenCode configured"
      ;;
  esac
done

echo ""
echo "  ────────────────────────"
echo "  Done! Restart your IDE to activate Fonttrio."
echo ""
`;
}
