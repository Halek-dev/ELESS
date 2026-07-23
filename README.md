# Eless Autos Motors

Frontend for **Eless Autos Motors**, a Nigerian car dealership — built to match the approved design canvas exactly.

Premium dark showroom UI: near-black surfaces, frosted glass, one amber-gold accent. Every price in Naira, Lagos and Ibadan showrooms, Tokunbo and Nigerian-used stock.

**Fully static.** No backend, no database, no API routes, no environment variables.

---

## Stack

| | |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + CSS custom properties |
| Motion | Framer Motion |
| Icons | lucide-react |
| Fonts | Sora (display) + Manrope (body), self-hosted via `next/font` |

---

## Run locally

Requires Node.js 18.17 or newer.

```bash
npm install
```

```bash
npm run dev
```

Open <http://localhost:3000>.

Other scripts:

```bash
npm run build
```

```bash
npm run start
```

```bash
npm run lint
```

---

## Deploy to Vercel

Zero configuration — Vercel detects Next.js automatically.

**From the dashboard**

1. Push this repository to GitHub, GitLab or Bitbucket.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Leave every setting at its default — framework preset **Next.js**, build command `next build`, output directory `.next`.
4. Click **Deploy**. No environment variables are needed.

**From the CLI**

```bash
npx vercel
```

```bash
npx vercel --prod
```

Remote images are served from `images.unsplash.com`, already allow-listed in `next.config.mjs` under `images.remotePatterns`.

---

## Project structure

```
app/
  globals.css              Design tokens as CSS variables + base/component layers
  layout.tsx               Root layout, fonts, navbar/footer, metadata
  template.tsx             Route transition wrapper
  page.tsx                 Home
  not-found.tsx            404
  inventory/
    page.tsx               Inventory (Suspense boundary)
    [slug]/page.tsx        Car detail (statically generated per vehicle)
components/
  layout/                  Navbar, Footer, Wordmark, Providers
  home/                    Hero, HeroSearch, StatStrip, FeaturedCarousel,
                           WhyEless, BodyTypes, Brands, Testimonials, FinanceCTA
  inventory/               InventoryBrowser, EmptyState
  vehicle/                 VehicleCard, Gallery, FinanceCalculator,
                           AutopayModal, BookViewingForm
  ui/                      Button, Badge, Chip, Input, Select, Slider,
                           SegmentedToggle, Toast, Reveal, Counter, VehicleImage
lib/
  data/vehicles.ts         All vehicle data (18 vehicles) + contact details
  format.ts                Naira/km/phone formatting, finance maths
  motion.ts                Shared easing and variants
  images.ts                Blur placeholder
  cn.ts                    className joiner
```

---

## Design tokens

Tokens are defined once as CSS custom properties in `app/globals.css` and mapped into the Tailwind theme in `tailwind.config.ts`. **No component contains a raw hex value** — colours, radii, shadows and spacing all resolve through tokens.

| Group | Tokens |
|---|---|
| Surfaces | `--bg` `--bg-deep` `--surface` `--surface-sunken` `--glass-fill` |
| Accent | `--amber` `--amber-hover` `--amber-pressed` `--amber-light` `--on-amber` |
| Support | `--teal` (Tokunbo/verified/success) · `--red` (errors) |
| Text | `--text` `--text-70` `--text-55` `--text-50` `--text-40` |
| Tints | `--amber-tint` `--amber-border` `--teal-tint` `--red-tint` |
| Hairlines | `--line` `--line-soft` `--line-strong` |

Solid colours are stored as **raw RGB channels** (`--amber-rgb: 239 159 39`) and exposed to Tailwind as `rgb(var(--amber-rgb) / <alpha-value>)`, with an `rgb()` alias (`--amber`) for plain CSS. This is what makes alpha modifiers like `bg-amber/25` (the disabled button fill) resolve correctly — a variable holding a hex string silently ignores the modifier and renders at full opacity.

Radii `16 / 12 / 999 / 8 / 44px` map to `rounded-card`, `rounded-control`, `rounded-pill`, `rounded-thumb`, `rounded-phone`. Shadows map to `shadow-card`, `shadow-pop`, `shadow-glow`, `shadow-glow-inner`.

> Shadow tokens are deliberately named `glow*` rather than `amber*`: a `boxShadow` key that collides with a colour key makes Tailwind emit the `shadow-<colour>` utility instead, which drops the alpha and renders the CTA glow at full opacity.

The frosted-glass recipe is the `.glass` component class (5% white fill, 24px backdrop blur, hairline border, inner top highlight, wide soft drop shadow).

---

## Currency and finance

Every price renders through a single formatter in `lib/format.ts`:

```ts
new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
})
```

Finance terms: **12–36 month** tenures, **18.5–27% APR**, **30–50%** down payment. The monthly figure is a real reducing-balance amortisation, recomputed live as the sliders move, and it flows through to the autopay schedule and totals so every number on screen agrees.

> The calculator carries the design's "Illustrative demo figures" disclaimer. Figures are indicative, not a credit offer.

Phone numbers are `+234` format; WhatsApp CTAs link to `wa.me`.

---

## Images

- Pinned Unsplash CDN URLs only — format `https://images.unsplash.com/photo-{ID}?auto=format&fit=crop&w=1600&q=80`. Never `source.unsplash.com`, never a search or random endpoint.
- All URLs live in `lib/data/vehicles.ts` — never inline in a component.
- `next/image` throughout with explicit sizing, real descriptive alt text, `blurDataURL` placeholders, and `priority` on the hero image only.
- Every image has an `onError` fallback to a branded dark card (with a Retry affordance in the detail gallery).

> `lib/data/vehicles.ts` is marked `// TODO: replace with Eless Autos Motors' own photography`.

---

## Implemented states

Hover · focus-visible · pressed · disabled · loading (spinners + card skeletons) · empty results · form validation errors · image load failure. Sold stock dims its photo, greys its price and disables autopay.

## Motion

Staggered scroll reveals, card hover lift with image zoom, navbar transparent-to-glass, animated counters, route transitions, and modal/drawer enter–exit. All eased with `cubic-bezier(0.16, 1, 0.3, 1)` — no bouncy defaults.

`prefers-reduced-motion` is respected twice over: `MotionConfig reducedMotion="user"` for Framer Motion, plus a global CSS media query for everything else.

## Accessibility

Semantic landmarks and headings, skip-to-content link, keyboard-navigable throughout, visible amber focus rings (never a browser default), ARIA on the stepper/listbox/dialog/live regions, real alt text, and `aria-invalid` + `aria-describedby` wiring on form errors.

## Responsive

Verified 360px → 1920px with no horizontal overflow. Mobile matches the mobile frames: collapsed navbar with slide-in drawer, filter bar behind a Filter toggle, single-column grids.

---

## Notes

- **No `localStorage` or `sessionStorage`** — React state only.
- **The autopay flow is a visual mock.** There is no payment integration. Card fields are non-editable placeholders, nothing is transmitted or stored, and a demo disclaimer is shown on every step.
- The booking form is likewise a demo and submits nowhere.
