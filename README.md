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
  og-image.png         1200×630 social preview (see `scripts/gen-og.sh`)
  robots.txt           crawl rules + sitemap pointer (allows AI crawlers)
  sitemap.xml          single-page sitemap with vi/en hreflang
  brand/               exported logo kit (see GUIDELINE.md §8)
```

## SEO

Meta tags, Open Graph / Twitter cards and JSON-LD (`Organization` + `WebSite` +
`SoftwareApplication`) live in [`index.html`](index.html). Title and description
also update per language on the client — see the `meta.title` / `meta.description`
keys in `src/i18n.tsx`. The canonical/OG domain is a placeholder (`https://lugo.vn/`);
**find-and-replace it** once the real domain is set (in `index.html`, `robots.txt`,
`sitemap.xml` and `scripts/gen-og.sh`).

Regenerate the social preview after brand/copy tweaks:

```bash
bash scripts/gen-og.sh   # 1200×630 og-image.{svg,png,jpg} — rasterizes via `sips`
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

---

## Part of LUGO

**LUGO** is a self-hosted AI companion platform — models supply the intelligence, LUGO
supplies the experience: one assistant that talks, remembers and acts across the browser,
ESP32 boards and a Raspberry Pi.

This repository is one piece of it. Every client and service talks to the gateway:

| Repo | Role |
| --- | --- |
| [lugo-gateway](https://github.com/lugondev/lugo-gateway) | The hub — STT/TTS/LLM engines, auth, device pairing, MCP tools, per-user chat memory. Everything below talks to this. |
| [lugo-web-client](https://github.com/lugondev/lugo-web-client) | React + TypeScript web client: talk, devices, history, tools. |
| [esp32-assistant](https://github.com/lugondev/esp32-assistant) | ESP-IDF firmware for ESP32-S3 / ESP32-C3 — a hands-free voice terminal. |
| [rpi-assistant](https://github.com/lugondev/rpi-assistant) | Raspberry Pi voice client (mic capture, Opus duplex, systemd unit). |
| [knowledge-api](https://github.com/lugondev/knowledge-api) | **kbase** — RAG knowledge base: documents in, retrievable chunks out. |
| [router-memory-services](https://github.com/lugondev/router-memory-services) | **memgw** — one API in front of any AI memory provider (Mem0, Zep, pgvector). |
| [mcp-basic-tools](https://github.com/lugondev/mcp-basic-tools) | Remote MCP tool server (timedate, fetch, ipinfo, web search). |
| [livehost-api](https://github.com/lugondev/livehost-api) | TikTok Live AI co-host, an out-of-process gateway plugin. |
| [voiceprint-api](https://github.com/lugondev/voiceprint-api) | Speaker recognition (3D-Speaker), forked from [xinnan-tech/voiceprint-api](https://github.com/xinnan-tech/voiceprint-api). |
| **lugo-landing** &nbsp;&larr; you are here | Marketing landing page for the platform, bilingual (Tiếng Việt / English). |
