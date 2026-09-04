---
name: Remixware
description: >
  Dark-first, high-contrast identity for a marketplace of vetted, remixable software.
  Deep green-black ground, one electric lime accent, expressive grotesque display type.
  Reads as instrument panel at night — catalog of one-offs, not a brochure.
mode: dark-first

colors:
  # Brand ramp — the source of truth. shadcn variables map onto these.
  void: '#05100c' # page ground
  basalt: '#0b1a15' # raised surface / card
  slate: '#132720' # secondary surface, chips
  line: '#1e3830' # hairline borders
  lime: '#c6f24e' # primary accent — one per view
  limeDeep: '#9ccb2c' # accent for light mode / links on light
  ion: '#57e2c4' # secondary accent, charts, aurora
  ember: '#ff6a4d' # destructive only
  chalk: '#e8f2ec' # primary text
  fog: '#8fa79d' # secondary text

  light:
    void: '#eff2ec'
    basalt: '#f8faf6'
    slate: '#e5eae0'
    line: '#d3dbcb'
    lime: '#b7e63c'
    limeDeep: '#5f8210'
    ion: '#17a98c'
    ember: '#d93a22'
    chalk: '#08150f'
    fog: '#55655c'

typography:
  display:
    family: Bricolage Grotesque
    weights: [400, 600, 700, 800]
    tracking: -0.028em
    usage: h1, h2, h3, prices, wordmark
  body:
    family: Space Grotesk
    weights: [300, 400, 500, 600, 700]
    features: "'ss01' 1, 'cv05' 1"
    usage: body copy, UI labels, buttons
  mono:
    family: JetBrains Mono
    weights: [400, 500]
    usage: kickers, eyebrows, env var names, code, metadata
  scale:
    hero: 6rem–7.5rem / 0.94
    h1: 2.25rem–3.75rem / 1.05
    h2: 1.875rem–2.25rem / 1.1
    h3: 1.25rem / 1.3
    body: 1rem / 1.65
    small: 0.875rem / 1.6
    kicker: 0.6875rem / tracking 0.22em / uppercase

spacing:
  unit: 0.25rem
  section: 6rem # py-24 between marketing sections
  sectionTight: 3.5rem
  shell: min(76rem, 100% - 2.5rem)
  gutter: 1.25rem

rounded:
  sm: 0.25rem
  md: 0.375rem # --radius, the default
  lg: 0.625rem
  xl: 0.875rem # panels, hero cards
  full: 9999px # pills, chips, avatars

elevation:
  flat: none # default; separation comes from a 1px border
  panel: '1px border + blur(10px) + 82% surface opacity'
  glow: '0 0 0 1px rgb(198 242 78 / 0.16), 0 18px 60px -20px rgb(198 242 78 / 0.28)'

motion:
  budget: 3 intentional motions on the landing page
  easing: cubic-bezier(0.16, 1, 0.3, 1)
  duration: 0.55s–0.85s
  stagger: 0.09s
  reducedMotion: required — every animation checks useReducedMotion()

components:
  button:
    variants: [default, outline, ghost, secondary, destructive, link]
    sizes: [sm, default, lg, icon]
    radius: md
    primary: lime fill, void text, one per view
  card:
    surface: basalt
    border: 1px line
    radius: xl
    padding: 1.5rem–2.5rem
  input:
    surface: void
    border: 1px line
    focus: 2px lime ring
    radius: md
  chip:
    surface: slate
    type: mono, uppercase, tracking 0.14em
    radius: full
  panel:
    class: nj-panel
    usage: overlay surfaces that sit on the aurora
---

# Remixware Design System

## Overview

Remixware reuses the Nightjar visual system for a marketplace of vetted,
remixable software. It is intentionally not a neutral template skin — the
product should feel finished on first load, and rebranding should mean changing
tokens rather than rewriting components.

**The idea.** A developer marketplace used late at night. Deep green-black ground, a
single electric lime signal, a slow aurora behind the fold. Contrast is high,
chrome is thin, and color is spent only where it means something — especially the
security check badge.

**Anti-brief.** Three aesthetics this deliberately avoids, because they are what
generated UI defaults to:

- purple-to-blue gradient on white with a glassy card grid
- warm cream and terracotta with a friendly geometric sans
- broadsheet newspaper: serif headline, hairline rules, editorial columns

**Where it lives.** `src/styles.css` is the implementation and the single source
of truth. This file is the specification. If they disagree, fix both.

## Colors

Dark is the default. `.light` on `<html>` opts into the light theme; the class is
applied before first paint by `themeScript` in `src/lib/theme.tsx`, so there is
no flash.

### The ramp

| Token      | Dark      | Light     | Use                                         |
| ---------- | --------- | --------- | ------------------------------------------- |
| `void`     | `#05100c` | `#eff2ec` | Page ground. Never on text.                 |
| `basalt`   | `#0b1a15` | `#f8faf6` | Cards, header, footer, popovers.            |
| `slate`    | `#132720` | `#e5eae0` | Chips, secondary buttons, table stripes.    |
| `line`     | `#1e3830` | `#d3dbcb` | All borders and dividers. 1px, always.      |
| `lime`     | `#c6f24e` | `#b7e63c` | Primary action, focus ring, one accent.     |
| `limeDeep` | `#9ccb2c` | `#5f8210` | Links, and lime that must pass AA on light. |
| `ion`      | `#57e2c4` | `#17a98c` | Second data series, aurora, rare accents.   |
| `ember`    | `#ff6a4d` | `#d93a22` | Destructive only. Never decorative.         |
| `chalk`    | `#e8f2ec` | `#08150f` | Primary text.                               |
| `fog`      | `#8fa79d` | `#55655c` | Secondary text, placeholders, metadata.     |

### Rules

- **One accent per view.** Lime marks the single most important action. A screen
  with three lime buttons has no primary action.
- **Never use raw hex in a component.** Use the semantic token —
  `bg-background`, `bg-card`, `text-muted-foreground`, `border-border`,
  `bg-primary`, `text-primary`. The brand ramp exists so the tokens have values,
  not so components read it directly.
- **Lime on lime is illegal.** Lime text goes on void or basalt. Text on lime is
  `primary-foreground` (near-black), never white.
- **Ember means destruction.** Delete, revoke, cancel, error. Not "warning",
  not "attention", not a highlight.
- **Contrast floor.** Body text meets 4.5:1 against its surface, large display
  text 3:1. `fog` on `void` is the minimum acceptable pairing — do not go dimmer.

### Atmosphere

The background is not flat. `.nj-atmosphere` is a fixed, `-z-1`, pointer-events-none
layer with three ingredients:

1. three soft radial aurora gradients (lime top-left, ion top-right, ion bottom)
2. a 72px grid, masked to fade out below the fold
3. an SVG fractal-noise grain at 5% opacity, to kill gradient banding

The hero adds a second aurora that tracks the pointer on a slow spring. Both are
decorative and hidden from assistive technology.

## Typography

Three families, each with one job. **Do not substitute Inter, Roboto, or the
system stack** — the expressive display face is a large part of the identity.

| Role    | Family              | Notes                                               |
| ------- | ------------------- | --------------------------------------------------- |
| Display | Bricolage Grotesque | Variable optical size. Tight tracking (`-0.028em`). |
| Body    | Space Grotesk       | Slightly technical grotesque. `ss01` and `cv05` on. |
| Mono    | JetBrains Mono      | Kickers, env vars, code, metadata.                  |

Applied automatically: `h1`, `h2`, `h3` and `.font-display` get the display face;
`body` gets the body face; `font-mono` gets the mono face.

### Scale

Type sizes come from Tailwind's scale. What matters is the relationship:

- **Hero** — `text-6xl` → `lg:text-[7.5rem]`, `leading-[0.94]`, `text-balance`.
  Two or three words per line. Cap the measure with `max-w-[16ch]`.
- **Section heading** — `text-3xl`/`text-4xl`, `font-semibold`.
- **Body** — `text-base`, `leading-relaxed`, `max-w-xl` to `max-w-2xl`.
  Never let prose run the full shell width.
- **Kicker** — `.nj-kicker`: mono, `0.6875rem`, `tracking-[0.22em]`, uppercase,
  fog. Every section that needs a label uses this, not a small bold heading.

### Rules

- Headlines are sentences and end in a period. "Ship the boring parts on night
  one." — not "Ship Faster" and not "SHIP FASTER".
- One lime span inside a headline, maximum, on the word that carries the promise.
- `text-balance` on headings, `text-pretty` on paragraphs.
- Numerals in prices use the display face; the `/month` suffix uses body at
  `text-sm text-muted-foreground`.

## Layout

- **Shell.** `.nj-shell` = `min(76rem, 100% - 2.5rem)`, centered. Every page
  section sits in one. Do not nest shells.
- **Rhythm.** `py-24` between marketing sections, `py-14` for tight ones,
  `py-12` inside the product shell.
- **Hero is full-bleed.** `min-h-[86vh]`, content vertically centered, aurora
  bleeding past the shell on both sides.
- **Prose measure.** `max-w-xl` for supporting copy, `max-w-3xl` for long-form
  and legal, `prose` for MDX.
- **Grids collapse at one breakpoint.** `grid gap-6 sm:grid-cols-2 lg:grid-cols-3`.
  Avoid three-stage responsive choreography.
- **Product shell.** Sticky header (`h-16`, blurred, 1px bottom border), wordmark
  and nav left, theme toggle and user menu right. Content in a shell below.

## Elevation

There are no drop shadows in the default state. Depth comes from three things,
in this order:

1. **Surface** — `void` → `basalt` → `slate` as things come forward.
2. **Hairline** — a 1px `line` border. This is the primary separation device.
3. **Blur** — `nj-panel` (`backdrop-filter: blur(10px)`, 82% surface opacity) for
   anything that floats over the aurora: sticky header, overlay panels, popovers.

`nj-glow` is the one shadow, a lime bloom, reserved for the single element that
should look energized — a featured price card, a primary CTA on hover. Two glows
on one screen means neither is special.

## Shapes

`--radius` is `0.375rem`. Corners are crisp, not pill-soft.

| Element                         | Radius          |
| ------------------------------- | --------------- |
| Buttons, inputs, selects        | `md`            |
| Cards, panels, dialogs          | `xl`            |
| Chips, badges, avatars, toggles | `full`          |
| Code blocks                     | `lg`            |
| Dividers                        | none — 1px line |

Icons are Lucide, `1.5px` stroke, sized `size-4` inline and `size-5` standalone.
`.nj-rule` is the standard divider: a hairline that fades at both ends.

## Components

Built on shadcn/ui. Regenerate primitives with the CLI rather than hand-editing
`src/components/ui/` — they are already wired to these tokens.

### Button

`default` is lime on near-black and is the one primary per view. `outline` is the
standard secondary. `ghost` is for icon buttons and toolbar actions. Buttons that
navigate use `asChild` around a Router `<Link>` so they stay real links.

### Card

`basalt` surface, 1px `line` border, `xl` radius, `p-6`. A card is for content
that could stand alone. **Do not put cards in the hero** — the hero is one
composition, not a grid of boxes.

### Input and Form

Inputs sit on `void` inside a `basalt` card so they read as recessed. Labels are
`text-sm font-medium` above the field. Errors are `text-sm text-destructive`
below it. Forms are TanStack Form; validation messages come from the field state,
never from a toast.

### Chip

Mono, uppercase, `tracking-[0.14em]`, `slate` surface, `full` radius. Used for
tags, plan badges and metadata. Not for actions.

### Empty state

Kicker, one display-face sentence, one paragraph of explanation, one action.
Left-aligned in a `max-w-xl`, or centered in a `nj-panel` when it is a blocking
state like "setup required".

### Motion

Three motions on the landing page, no more:

1. **Hero entrance** — brand, headline, copy and CTAs on one staggered timeline
   (`rise` variant: opacity, 24px rise, 6px blur out).
2. **Pointer aurora** — the hero background follows the cursor on a slow spring
   (stiffness 40, damping 22). Depth, not a thing to track.
3. **Section reveal** — `<Reveal>` fades sections in once as they enter view.

Everything else is a CSS transition on hover or focus. Every animation checks
`useReducedMotion()` and resolves to its final state when reduced motion is on.

## Do's and Don'ts

**Do**

- Use semantic tokens (`bg-card`, `text-muted-foreground`) so both themes work.
- Spend lime on exactly one thing per screen.
- Separate with a 1px border before reaching for a shadow.
- Cap every measure of prose.
- Put a kicker above section headings instead of a smaller heading.
- End headlines with a period.
- Check both themes and reduced motion before calling UI done.
- Add a token to `styles.css` _and_ this file when you genuinely need one.

**Don't**

- Don't use raw hex, `slate-800`, or any Tailwind palette color directly.
- Don't use white text on lime, or lime text on lime.
- Don't use ember for anything but destructive actions.
- Don't build card grids in the hero.
- Don't add a fourth typeface, or swap the display face for Inter.
- Don't add drop shadows to cards; `nj-glow` is for one element.
- Don't animate on scroll continuously, or animate anything more than once.
- Don't set `transition-all` — name the properties.
- Don't reach for `dark:` variants; the tokens already swap.
- Don't introduce a purple-blue gradient. That is the aesthetic this replaces.

## Rebranding

For a **new product** from this template, use the full Day-0 sequence in
[`BOOTSTRAP.md`](./BOOTSTRAP.md). The brand-only file list:

Four files, in order:

1. **`DESIGN.md`** — rewrite the front matter tokens and the prose that changed.
2. **`src/styles.css`** — the `:root`/`.dark` and `.light` blocks, and the
   `@theme inline` font families.
3. **`src/lib/site.ts`** — name, tagline, description, contact, social.
4. **`src/components/brand.tsx`** — the `BrandMark` glyph and `Wordmark`.

Then regenerate the OG image (`public/og.svg` → `pnpm run og`) and the favicon.
Nothing else should need to change.
