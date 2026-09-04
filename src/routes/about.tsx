import { createFileRoute, Link } from '@tanstack/react-router'

import { MarketingShell, PageHeader } from '#/components/marketing-shell'
import { Reveal } from '#/components/motion/reveal'
import { Button } from '#/components/ui/button'
import { seoHead } from '#/lib/seo'
import { site } from '#/lib/site'

export const Route = createFileRoute('/about')({
  head: () =>
    seoHead({
      title: 'About',
      path: '/about',
      description: `Why ${site.name} exists and how vetted one-offs get into the catalog.`,
    }),
  component: AboutPage,
})

const decisions = [
  {
    title: 'One-offs, not SaaS aisles',
    body: 'Buy a finished slice of software, remix it into your product, and own the result. Subscriptions for host tooling can come later — the catalog is the product.',
  },
  {
    title: 'agent.md is mandatory',
    body: 'Coding agents will touch these remixes. Every listing ships a contract so ownership checks, rate limits, and safe edit boundaries survive the fork.',
  },
  {
    title: 'Security check before shelf',
    body: 'Deps, secrets, and authz review gate the catalog. The badge is visible on every listing; failed or pending never appear publicly.',
  },
  {
    title: 'Docs travel with the code',
    body: 'Architecture and security docs are part of the listing, not an afterthought README. Buyers and agents read the same source of truth.',
  },
]

const stack = [
  ['Host', 'Cloudflare Workers'],
  ['Framework', 'TanStack Start + Router + Query + Form'],
  ['Data', 'Convex'],
  ['Auth', 'Clerk'],
  ['UI', 'Tailwind v4 + shadcn/ui + Motion'],
]

function AboutPage() {
  return (
    <MarketingShell>
      <PageHeader
        kicker="About"
        title={`${site.name} is a marketplace for remixable software.`}
        description={site.description}
      />

      <section className="nj-shell grid gap-10 pb-20 lg:grid-cols-2">
        {decisions.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.05} as="article">
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">{item.body}</p>
          </Reveal>
        ))}
      </section>

      <section className="nj-shell pb-24">
        <Reveal>
          <p className="nj-kicker">Built on</p>
          <div className="mt-6 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
            {stack.map(([label, value]) => (
              <div key={label} className="bg-background p-5">
                <p className="font-mono text-[0.6875rem] tracking-[0.18em] text-muted-foreground uppercase">
                  {label}
                </p>
                <p className="mt-2 text-sm font-medium">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/catalog">Browse catalog</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/sell">Sell a one-off</Link>
            </Button>
          </div>
        </Reveal>
      </section>
    </MarketingShell>
  )
}
