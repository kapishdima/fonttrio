// Colors from fonttrio dark mode palette
export const COLORS = {
  bg: "#fff",
  text: "#000",
  textMuted: "#888888",
  textSubtle: "#555555",
  surfaceBorder: "#1f1f1f",
  surfaceBorderStrong: "#333333",
  surface: "#141414",
  white: "#ffffff",
  black: "#000000",
  accent: "#a1a1a1",
  dotBase: "#1c1c1c",
  dotActive: "#a1a1a1",
  // Terminal
  terminalDotRed: "#ff5f57",
  terminalDotYellow: "#febc2e",
  terminalDotGreen: "#28c840",
  green: "#22c55e",
  amber: "#f59e0b",
  blue: "#3b82f6",
};

export const FPS = 30;
export const TRANSITION_FRAMES = 15;

// Scene durations synced to sound.mp3 beats:
//
// 0.0s - 0.8s  : silence (build up)
// 0.8s - 2.0s  : crescendo → first beat drop at ~2s
// 2s  - 12s    : medium energy → slot machine + Fonttrio
// 13s - 14s    : dip → interludes
// 15s - 27s    : medium energy → how-it-works + best pairs
// 27s          : dip → playground interlude
// 29s - 40s    : high energy → playground + terminal
// 41s          : dip → outro
// 45s          : end
//
export const SCENES = {
  // ACT 0: Intro
  intro: 85,                       // Google search → type → click → zoom

  // ACT 1: Roulette
  fontRoulette: 315,               // slot machine + "Fonttrio" hold

  // ACT 1.5: Interludes (10.5s - 14.5s, aligns with energy dip at 13s)
  interlude1: 35,                  // "Curated font pairings"
  interlude2: 30,                  // "for shadcn/ui"
  interlude3: 40,                  // "Three fonts. One command."

  // ACT 2: Showcases (14.5s - 27s, medium energy)
  interludeHowItWorks: 35,         // "How it works"
  howItWorks: 120,                 // 3 cards
  interludeBestPairs: 30,          // "Best pairs"
  bestPairs: 150,                  // scrolling cards wall

  // ACT 3: Playground (27s - 40s, high energy)
  interludePlayground: 35,         // "See it live"
  playground: 330,                 // live.mov (~11s to match high energy section)

  // ACT 4: AI (interludes)
  interludeAI1: 35,              // "AI-powered."
  interludeAI2: 45,              // "Skills. MCP. Automation."

  // ACT 5: Terminal + Outro
  terminal: 170,
  outro: 90,
};

// Total: sum of scenes minus transition overlaps
export const TOTAL_DURATION = 1500;
