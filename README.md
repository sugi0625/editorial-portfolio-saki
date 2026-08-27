# Editorial Portfolio Foundation

Phase 1 establishes the production foundation for the editorial portfolio. It intentionally contains no hero, portfolio page, or case study.

## Runtime

- Next.js 15 App Router and React 19
- TypeScript in strict mode
- Tailwind CSS 4
- GSAP, Framer Motion, and Lenis
- ESLint and Prettier
- Node.js 20.19 or newer

## Architecture

```text
src/
├─ app/                 # Routes, root metadata, fonts, and global styles
├─ components/
│  └─ editorial/       # Reusable, content-agnostic editorial primitives
├─ content/             # Project stories and copy added in later phases
├─ lib/                 # Shared browser integrations such as GSAP
├─ providers/           # Application-wide behavior such as smooth scrolling
└─ styles/              # CSS and runtime design tokens
public/
└─ media/               # Optimized project assets added in later phases
```

## Design decisions

### App Router and server-first components

The root layout owns global metadata, fonts, and providers. Editorial components remain server-compatible by default. Only the smooth-scroll provider and GSAP integration cross the client boundary.

### Design tokens

`src/styles/tokens.css` is the source of truth for visual values because CSS custom properties support fluid typography, media queries, and runtime composition without JavaScript. Tailwind reads those same variables through `@theme`. `tokens.ts` exposes only values needed by animation or viewport logic, avoiding two competing visual systems.

The token system follows the documented 8pt rhythm, 12-column desktop grid, 4-column mobile grid, 1440px maximum container, restrained editorial palette, quiet surfaces, named layers, and reduced-motion behavior.

### Typography

Pretendard Variable is the default Korean face and Inter Variable is applied to English-language content via `lang="en"`. Both fonts are installed locally, avoiding layout shifts and third-party font requests. Fluid display and heading scales preserve hierarchy while body sizes remain stable for reading.

### Editorial primitives

Nine editorial components are exported: `Container`, `Section`, `EditorialHeading`, `EditorialParagraph`, `Caption`, `Divider`, `FullBleedImage`, `ProjectMeta`, and `LargeNumber`.

These components define semantic structure and rhythm, not portfolio content. They accept native HTML attributes, preserve accessible elements, and expose only deliberate variants. This keeps pages distinct through composition without duplicating layout code or introducing a card system.

### Responsive layout

Container gutters, section spacing, type scales, and grid gaps use bounded `clamp()` values. Breakpoints align with Tailwind and are also available to runtime code. The editorial grid changes from 12 columns to 4 on small screens while reading width remains capped independently.

### Motion

Lenis uses the GSAP ticker as its single animation clock, and ScrollTrigger receives synchronized scroll updates. Cleanup removes every listener and ticker callback. Smooth scrolling is disabled when the user requests reduced motion. Framer Motion is installed for component-level entrances and state transitions in later phases; GSAP is reserved for precise scroll narratives.

### Images

`FullBleedImage` wraps `next/image`, preserving optimization, responsive `sizes`, required alternative text, and optional meaningful captions. Next.js emits AVIF and WebP where supported.

## Commands

- `npm run dev` — local development
- `npm run typecheck` — TypeScript validation
- `npm run lint` — ESLint validation
- `npm run format` — format source files
- `npm run format:check` — verify formatting
- `npm run build` — production build
