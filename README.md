# lugo-landing

Marketing landing page for **LUGO — the AI Companion Platform**.

Positions LUGO as the layer between foundation models and real-world companions:
*models provide the intelligence, LUGO provides the experience*. Bilingual
(Tiếng Việt / English) with a live toggle.

Built on the visual identity of [`lugo-web-client`](../lugo-web-client): the
`LugoMark` (ring = Lugo, dot = you), the cream/ink + orange palette (orange is
reserved strictly for active states and primary actions), and Be Vietnam Pro.

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
    Ecosystem.tsx      the 10 LUGO modules
    Audiences.tsx      individuals · developers · businesses · device makers
    Devices.tsx        ESP32 · Raspberry Pi · browser
    CTA.tsx
```

## Copy & links

- Edit page text in `src/i18n.tsx` (VI and EN sit side by side per key).
- Point CTAs at real destinations in `src/links.ts` (`getStarted`, `github`).
