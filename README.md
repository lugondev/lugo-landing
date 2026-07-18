# lugo-landing

Marketing landing page for **LUGO — the AI Companion Platform**.

Positions LUGO as the layer between foundation models and real-world companions:
*models provide the intelligence, LUGO provides the experience*. Bilingual
(Tiếng Việt / English) with a live toggle.

Built on the visual identity of [`lugo-web-client`](../lugo-web-client): the
`LugoMark` (ring = Lugo, dot = you), the cream/ink + orange palette (orange is
reserved strictly for active states and primary actions), and Be Vietnam Pro.

Full brand rules live in [`GUIDELINE.md`](GUIDELINE.md); ready-made logo files
(SVG/PNG/JPEG, every colour variant) live in [`public/brand/`](public/brand).

## Stack

Vite + React 19 + TypeScript — the same toolchain as the web client. No runtime
UI dependencies beyond React and the bundled font.

## Develop

```bash
pnpm install
pnpm dev        # dev server
pnpm build      # typecheck + production build → dist/
pnpm preview    # serve the production build
```

## Structure

```
src/
  theme.css            brand tokens (carried over from lugo-web-client)
  landing.css          buttons/cards from the design system + section layout
  i18n.tsx             VI/EN strings + language context
  links.ts             where every CTA points (update with real URLs)
  components/
    LugoMark.tsx       the signature ring+dot mark (ambient + state variants)
    Header.tsx         fixed nav, transparent over hero → solid on scroll
    Footer.tsx
  sections/
    Hero.tsx           dark hero, the platform thesis
    Positioning.tsx    foundation models → LUGO → companions
    Capabilities.tsx   understand · remember · communicate · act · connect · everywhere
    HowItWorks.tsx     the conversation states (you speak → thinks → replies)
    Ecosystem.tsx      the 10 LUGO modules (currently hidden — see App.tsx)
    Audiences.tsx      individuals · developers · businesses · device makers
    Devices.tsx        ESP32 · Raspberry Pi · browser
    Branding.tsx       the mark, its meaning, and the palette
    CTA.tsx
public/
  favicon.svg          the mark on ink, rounded-square
  brand/               exported logo kit (see GUIDELINE.md §8)
```

## Copy & links

- Edit page text in `src/i18n.tsx` (VI and EN sit side by side per key).
- Point CTAs at real destinations in `src/links.ts` (`getStarted`, `github`).

## Brand assets

![LUGO](public/brand/logo-anim-cycle.gif)

- Rules of use: [`GUIDELINE.md`](GUIDELINE.md).
- Exported logos: [`public/brand/`](public/brand) — SVG + PNG (+ JPEG for solid
  backgrounds) per colour variant. Animated: per-state **SVGs** (transparent,
  self-contained, <1 KB) for the web, plus **GIFs** of the four states and a full
  `idle → listening → thinking → speaking` cycle for README/social.
- Status icons (`icon-info/success/warning/error`, transparent SVG + PNG) reuse
  the LUGO mark (open ring + orange dot) and the semantic tokens `--lugo-info` /
  `--lugo-success` / `--lugo-warning` / `--lugo-danger` in `src/theme.css`.
- Regenerate after tweaking colour/geometry:

  ```bash
  bash scripts/gen-logo.sh            # static kit — rasterizes via macOS `sips`
  node scripts/gen-logo-anim-svg.mjs  # transparent animated SVGs — no extra tools
  bash scripts/gen-logo-anim.sh       # animated GIFs — needs `ffmpeg`
  bash scripts/gen-status-icons.sh    # info/error/success icons — via `sips`
  ```
