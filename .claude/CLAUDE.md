# fonttrio — Font Pairing Registry for shadcn

## Что это

Кураторский shadcn-совместимый реестр font pairings. Пользователь делает `shadcn add https://fonttrio.dev/r/editorial.json` и получает полностью настроенную типографику (heading + body + mono).

**Tagline:** "Three fonts. One command."

## Архитектура

### Два уровня registry items

1. **Атомарные шрифты** (`registry:font`) — JSON-метаданные Google Fonts (~100 популярных)
2. **Pairings** (`registry:style`) — мета-item с `registryDependencies` на шрифты + cssVars + css (typography scale)

Мы НЕ храним файлы шрифтов. Только JSON-метаданные ~0.5KB каждый.

### Структура проекта

```
fonttrio/
├── package.json
├── next.config.ts
├── registry.json                    # Registry index
├── scripts/
│   ├── generate-fonts.ts            # Google Fonts API → registry:font JSONs
│   └── generate-pairing-candidates.ts
├── registry/
│   ├── fonts/                       # AUTO-GENERATED (~100 popular)
│   └── pairings/                    # CURATED (6 стартовых)
├── app/
│   ├── page.tsx                     # Landing: editorial masonry
│   ├── [pairing]/page.tsx           # Детальная страница
│   ├── api/r/[name]/route.ts        # Dynamic registry endpoint
│   └── components/
│       ├── pairing-card.tsx
│       ├── type-tester.tsx
│       ├── context-preview.tsx
│       ├── typography-customizer.tsx
│       ├── side-by-side.tsx
│       ├── install-command.tsx
│       └── font-provider.tsx
├── lib/
│   ├── pairings.ts
│   └── registry.ts
└── public/r/                        # Built registry output
```

## Стартовые 6 пар

| Name | Heading | Body | Mono | Mood |
|------|---------|------|------|------|
| editorial | Playfair Display | Source Serif 4 | JetBrains Mono | elegant, traditional |
| modern-clean | Inter | Inter | Geist Mono | clean, neutral, SaaS |
| technical | IBM Plex Sans | IBM Plex Sans | IBM Plex Mono | professional |
| creative | Space Grotesk | DM Sans | Fira Code | playful, startup |
| classic | DM Serif Display | Libre Baskerville | JetBrains Mono | literary, warm |
| minimal | Geist | Geist | Geist Mono | Vercel-style, modern |

## Стек

- Next.js 16 (App Router), Tailwind CSS v4, TypeScript
- **shadcn/ui** — ВСЕ примитивные UI компоненты (Button, Tabs, Slider, Select, Tooltip, Badge, etc.)
- shadcn CLI (`shadcn build`) для сборки registry
- nuqs — URL state management
- Vercel — хостинг
- Bun — runtime/package manager

## Правила разработки

- **НИКОГДА не писать примитивные компоненты вручную.** Tabs, Button, Slider, Select, Input, Badge, Tooltip, Dialog, Dropdown, Toggle — всё через `bunx shadcn@latest add <component>`.
- Кастомные компоненты (pairing-card, type-tester, context-preview и т.д.) строятся НА ОСНОВЕ shadcn/ui примитивов.
- Стилизация — только через Tailwind классы и CSS variables, без inline стилей.

## Дизайн

**Aesthetic:** Editorial Type Foundry (Klim/Grilli/Commercial Type вдохновение)
- Тёплая OKLCH палитра (no pure black/white), terracotta акцент
- UI шрифт: Geist + Geist Mono (minimal пара)
- Editorial masonry layout (не uniform grid)
- Generous whitespace, type specimens крупные

### Цвета (OKLCH)

```css
/* Light */
--bg: oklch(0.985 0.005 80);
--text: oklch(0.15 0.01 80);
--muted: oklch(0.55 0.01 80);
--border: oklch(0.88 0.005 80);
--accent: oklch(0.65 0.15 45);
--accent-soft: oklch(0.92 0.05 45);

/* Dark */
--bg: oklch(0.13 0.01 80);
--text: oklch(0.92 0.005 80);
--muted: oklch(0.5 0.01 80);
--border: oklch(0.25 0.005 80);
--accent: oklch(0.72 0.12 45);
--accent-soft: oklch(0.2 0.04 45);
```

## План реализации

### Шаг 1: Scaffold ✅
- Next.js project создан

### Шаг 2: Скрипт генерации шрифтов
- `scripts/generate-fonts.ts` — fetch Google Fonts metadata → `registry/fonts/`
- Топ ~100 по popularity

### Шаг 3: Pairing JSONs
- 6 кураторских пар в `registry/pairings/`

### Шаг 4: Registry build
- `shadcn build` → `public/r/*.json`

### Шаг 5: Preview website
- Landing page, pairing detail page, все компоненты
- Type tester, context previews, typography customizer, side-by-side, install command

### Шаг 5.5: Рефакторинг на shadcn/ui
- Пройти по всем компонентам, найти самописные примитивы (tabs, buttons, sliders, selects, badges, toggles, inputs)
- Установить нужные shadcn/ui компоненты: `bunx shadcn@latest add tabs button slider select badge toggle input tooltip`
- Заменить самописные реализации на shadcn/ui

### Шаг 6: Deploy

## Открытые вопросы

1. `registry:style` с `extends: "none"` — проверить что `registryDependencies` тянут `registry:font` из внешнего URL
2. Typography scale уникален для каждой пары
