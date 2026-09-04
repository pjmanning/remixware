/**
 * Seed catalog for Remixware. Marketing routes read from here so the site
 * boots without Convex. Each listing must include agent.md + docs; only
 * security-vetted listings appear in the public catalog.
 */

export type VettingStatus = 'passed' | 'pending' | 'failed'

export type ListingDoc = {
  title: string
  slug: string
  body: string
}

export type Listing = {
  slug: string
  title: string
  summary: string
  priceCents: number
  currency: 'usd'
  category: string
  seller: string
  stack: string[]
  vetted: VettingStatus
  vettedAt?: string
  securitySummary: string
  agentMd: string
  docs: ListingDoc[]
}

export const listings: Listing[] = [
  {
    slug: 'invoice-rail',
    title: 'Invoice Rail',
    summary:
      'A self-hosted invoicing core with PDF templates, tax rules, and a clean TypeScript API you can fork into any SaaS.',
    priceCents: 14900,
    currency: 'usd',
    category: 'Finance',
    seller: 'Northline Labs',
    stack: ['TypeScript', 'Convex', 'React'],
    vetted: 'passed',
    vettedAt: '2026-08-12',
    securitySummary:
      'Dependency audit clean, no secrets in repo, authz checks on every mutation, rate limits on public endpoints.',
    agentMd: `# agent.md — Invoice Rail

## Purpose
Give coding agents a safe, remixable invoicing domain: customers, invoices, line items, and PDF export.

## Required before changes
- Read \`docs/architecture.md\` and \`docs/security.md\`.
- Do not weaken authorization checks on invoice ownership.
- Keep Stripe keys out of client bundles; use server functions only.

## Safe remix targets
- Brand tokens and PDF layouts
- Tax rule tables for a new jurisdiction
- Extra invoice statuses (draft → sent → paid)

## Do not
- Store raw card numbers
- Expose another seller's invoices via guessed IDs
- Remove rate limiting on public create endpoints
`,
    docs: [
      {
        title: 'Architecture',
        slug: 'architecture',
        body: `Invoice Rail keeps documents flat: customers, invoices, and line items as separate tables joined by IDs. PDF generation runs in an action; mutations only write structured data.

Indexes cover \`by_seller\` and \`by_customer\` so catalog queries never scan the full table.`,
      },
      {
        title: 'Security',
        slug: 'security',
        body: `Every public function validates args and returns. Ownership is checked against the authenticated seller before patch or delete. Public quote forms are rate-limited.

The security check badge means: no known critical CVEs in lockfile, secrets scan passed, and authz review signed off.`,
      },
      {
        title: 'Remix guide',
        slug: 'remix',
        body: `Start by swapping brand tokens and PDF chrome. Then add your tax jurisdictions. Keep the agent.md constraints intact so future agents do not regress ownership checks.`,
      },
    ],
  },
  {
    slug: 'presence-pulse',
    title: 'Presence Pulse',
    summary:
      'Realtime presence and typing indicators as a drop-in Convex component, ready to remix into chat, boards, or live docs.',
    priceCents: 7900,
    currency: 'usd',
    category: 'Realtime',
    seller: 'Signalforge',
    stack: ['Convex', 'TypeScript'],
    vetted: 'passed',
    vettedAt: '2026-07-28',
    securitySummary:
      'Heartbeat TTL enforced server-side, room membership gated, no PII beyond display name.',
    agentMd: `# agent.md — Presence Pulse

## Purpose
Maintain live \`online\` / \`typing\` state per room with automatic expiry.

## Rules for agents
- Heartbeats must go through the provided mutation; do not invent a second presence table.
- Room IDs are opaque Convex IDs — never trust client-supplied emails for access.
- Purge stale presence with the scheduled internal mutation only.

## Remix hooks
- Display name formatting
- Idle timeout length
- Room capacity caps
`,
    docs: [
      {
        title: 'Getting started',
        slug: 'getting-started',
        body: `Install the Convex functions, wire the client hook, and pass a room id. Presence rows expire after the configured TTL when heartbeats stop.`,
      },
      {
        title: 'Security',
        slug: 'security',
        body: `Membership is verified before writing presence. The security badge covers TTL enforcement, index usage, and absence of cross-room leakage in the review checklist.`,
      },
    ],
  },
  {
    slug: 'docs-forge',
    title: 'Docs Forge',
    summary:
      'MDX docs site kit with search, versioned sidebars, and an agent.md that keeps docs and code in sync when you remix.',
    priceCents: 9900,
    currency: 'usd',
    category: 'Docs',
    seller: 'Quillstack',
    stack: ['MDX', 'TanStack Start', 'TypeScript'],
    vetted: 'passed',
    vettedAt: '2026-08-30',
    securitySummary:
      'No remote code execution in MDX pipeline, rehype sanitization enabled, build-time only content.',
    agentMd: `# agent.md — Docs Forge

## Purpose
Ship product docs that stay accurate when agents edit both code and MDX.

## Agent contract
- Update the matching doc page when you change a public API.
- Never disable rehype sanitization.
- Keep frontmatter \`title\` and \`description\` in sync with the route \`head\`.

## Remix
- Theme tokens
- Sidebar IA
- Search index fields
`,
    docs: [
      {
        title: 'Content model',
        slug: 'content-model',
        body: `Docs live as MDX under \`content/\` with frontmatter. The router prerenders each page. Search indexes title, headings, and body at build time.`,
      },
      {
        title: 'Security',
        slug: 'security',
        body: `MDX is compiled at build time with sanitization. The vetting badge confirms no \`eval\`, no unchecked HTML passthrough, and locked dependency versions for the remark stack.`,
      },
    ],
  },
  {
    slug: 'waitlist-gate',
    title: 'Waitlist Gate',
    summary:
      'A polished waitlist + invite code flow with Convex storage, Resend hooks, and fraud-resistant rate limits.',
    priceCents: 5900,
    currency: 'usd',
    category: 'Growth',
    seller: 'Harbor Kit',
    stack: ['Convex', 'Resend', 'React'],
    vetted: 'passed',
    vettedAt: '2026-06-18',
    securitySummary:
      'Email enumeration mitigated, invite codes hashed at rest, submit endpoint rate-limited.',
    agentMd: `# agent.md — Waitlist Gate

## Purpose
Collect emails, issue invite codes, and gate early access without leaking who is on the list.

## Hard constraints
- Hash invite codes before storage.
- Do not return whether an email is already registered to unauthenticated callers.
- Keep rate limits on submit and redeem.

## Safe edits
- Copy and empty states
- Invite batch sizes
- Email templates
`,
    docs: [
      {
        title: 'Flows',
        slug: 'flows',
        body: `Visitors join the waitlist, admins approve batches, invite codes unlock signup. Redeem is a single-use mutation.`,
      },
      {
        title: 'Security',
        slug: 'security',
        body: `Codes are hashed. Enumeration responses are uniform. Rate limits sit in front of submit and redeem. Badge = checklist pass on those three.`,
      },
    ],
  },
]

export function listCatalog(): Listing[] {
  return listings.filter((listing) => listing.vetted === 'passed')
}

export function getListing(slug: string): Listing | undefined {
  return listings.find((listing) => listing.slug === slug)
}

export function formatPrice(listing: Listing): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: listing.currency.toUpperCase(),
    maximumFractionDigits: 0,
  }).format(listing.priceCents / 100)
}
