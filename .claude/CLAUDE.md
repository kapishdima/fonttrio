# fonttrio — Font Pairing Registry for shadcn

## Что это

Кураторский shadcn-совместимый реестр font pairings. Пользователь делает `shadcn add https://www.fonttrio.xyz/r/editorial.json` и получает полностью настроенную типографику (heading + body + mono).

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
│   ├── page.tsx                     # Landing
│   ├── landing-client.tsx           # Клиентский landing компонент
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
├── components/
│   ├── DotGrid.tsx                  # Canvas-based interactive dot grid (GSAP)
│   └── Magnet.tsx                   # Magnetic cursor effect component
├── lib/
│   ├── pairings.ts
│   ├── sponsors.ts
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
  - Style: `radix-nova`, baseColor: `neutral`
  - Дополнительный реестр: `@react-bits` → `https://reactbits.dev/r/{name}.json`
- shadcn CLI (`shadcn build`) для сборки registry
- **GSAP** + InertiaPlugin — для физических анимаций (DotGrid)
- nuqs — URL state management
- Vercel — хостинг
- Bun — runtime/package manager

## Правила разработки

- **НИКОГДА не писать примитивные компоненты вручную.** Tabs, Button, Slider, Select, Input, Badge, Tooltip, Dialog, Dropdown, Toggle — всё через `bunx shadcn@latest add <component>`.
- Кастомные компоненты (pairing-card, type-tester, DotGrid, Magnet и т.д.) строятся НА ОСНОВЕ shadcn/ui примитивов или являются автономными интерактивными компонентами.
- Стилизация — Tailwind классы и CSS variables. Inline стили допускаются только для динамических значений (позиции, transform от JS).
- Анимации — GSAP для физически-корректных эффектов, CSS transitions для простых hover/fade.

## Дизайн

**Aesthetic:** Modern Organic — тёмный фон с белыми скруглёнными поверхностями, интерактивные эффекты.

### Ключевые паттерны

- **Обёртка страницы:** `bg-black` на `<main>`, внутри `bg-white rounded-4xl` — создаёт эффект "приложение в рамке"
- **Навигация:** Центрированная плавающая тёмная панель, крепится к верху белого контейнера (`rounded-tr-none rounded-tl-none`)
- **Фон:** Интерактивный DotGrid (canvas + GSAP physics) как фоновый слой
- **Заголовки:** Outfit (bold) для крупных display текстов
- **Тело:** Manrope (medium) для подзаголовков и UI текста
- **Курсор:** Magnetic эффект через `Magnet.tsx` для ключевых интерактивных элементов
- **Border-radius:** Крупные скругления (`rounded-4xl` = 24px) для контейнеров; `rounded-xl` для навигации

### Цветовые переменные

```css
/* Light */
--bg: #fafafa;
--text: #0a0a0a;
--text-muted: #666666;
--text-subtle: #999999;
--surface-border: #eaeaea;
--surface-border-strong: #d4d4d4;
--surface: #f0f0f0;

/* Dark */
--bg: #0a0a0a;
--text: #ededed;
--text-muted: #888888;
--text-subtle: #555555;
--surface-border: #1f1f1f;
--surface-border-strong: #333333;
--surface: #141414;
```

### Типографика

```css
--font-display: var(--font-bebas-neue), system-ui, sans-serif; /* акценты/лого */
--font-sans: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
--font-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
```

В контенте страниц используются Outfit (заголовки) через `font-[Outfit]`. Manrope — дефолтный sans-шрифт через `--font-sans`, не нужно указывать явно.

### DotGrid — параметры по умолчанию

```tsx
<DotGrid
  dotSize={2}
  gap={30}
  baseColor="#1c1c1c"
  activeColor="#a1a1a1"
  proximity={200}
  shockRadius={10}
  shockStrength={10}
  resistance={100}
  returnDuration={2.9}
/>
```

## Открытые вопросы

1. `registry:style` с `extends: "none"` — проверить что `registryDependencies` тянут `registry:font` из внешнего URL
2. Typography scale уникален для каждой пары
