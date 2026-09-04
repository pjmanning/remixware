# Remixware

Marketplace of **one-off, security-vetted software** you can buy and remix.

Seeded from [pjmanning/web-template](https://github.com/pjmanning/web-template)
(TanStack Start · Cloudflare Workers · Convex · Clerk · Tailwind + shadcn/ui).

## Product slice (Day 0)

| Route            | What it does                                                                             |
| ---------------- | ---------------------------------------------------------------------------------------- |
| `/`              | Brand hero + featured catalog                                                            |
| `/catalog`       | Full vetted catalog                                                                      |
| `/catalog/$slug` | Listing detail with **Overview**, **agent.md**, and **Docs** tabs + security check badge |
| `/sell`          | Seller submit stub (requires agent.md + docs fields)                                     |

Every public listing must pass the **security check** badge and include `agent.md` plus docs.

## Run locally

```bash
pnpm install
cp -n .env.example .env.local
pnpm dev          # Vite on port 3000 (or set --port)
```

Optional for `/app` and auth:

```bash
npx convex dev    # writes VITE_CONVEX_URL
# add VITE_CLERK_PUBLISHABLE_KEY + CLERK_SECRET_KEY
pnpm run dev:all
```

## Scripts

| Command          | Purpose                                  |
| ---------------- | ---------------------------------------- |
| `pnpm dev`       | Dev server                               |
| `pnpm run check` | Prettier + ESLint + TypeScript           |
| `pnpm run build` | Production build (Workers)               |
| `pnpm run og`    | Regenerate `public/og.png` from `og.svg` |

## Repos

- Origin: create/mirror `pjmanning/remixware` (agent session may push to a temporary Origin remote until mirrored)
- GitHub: https://github.com/pjmanning/remixware

## Stack notes

See `AGENTS.md` and `DESIGN.md`. Marketing and catalog boot with **zero** env keys;
Convex + Clerk unlock the authenticated product shell.
