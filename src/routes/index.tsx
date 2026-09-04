import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRightIcon, FileCode2Icon, ShieldCheckIcon, SparklesIcon } from 'lucide-react'

import { ListingCard } from '#/components/listing-card'
import { MarketingShell } from '#/components/marketing-shell'
import { Hero } from '#/components/marketing/hero'
import { Reveal } from '#/components/motion/reveal'
import { Button } from '#/components/ui/button'
import { listCatalog } from '#/lib/listings'
import { organizationJsonLd, seoHead } from '#/lib/seo'
import { site } from '#/lib/site'

export const Route = createFileRoute('/')({
  head: () =>
    seoHead({
      title: site.name,
      path: '/',
      jsonLd: organizationJsonLd(),
    }),
  component: LandingPage,
})

const pillars = [
  {
    icon: ShieldCheckIcon,
    title: 'Security check badge',
    body: 'Nothing reaches the catalog until deps, secrets, and authz review pass. The badge is the receipt.',
  },
  {
    icon: FileCode2Icon,
    title: 'agent.md + docs required',
    body: 'Every listing must ship an agent contract and documentation so remixes stay intentional, not accidental.',
  },
  {
    icon: SparklesIcon,
    title: 'One-off, buy to remix',
    body: 'Not a subscription SaaS aisle — finished slices of software you own and reshape into your product.',
  },
]

function LandingPage() {
  const featured = listCatalog().slice(0, 4)

  return (
    <MarketingShell>
      <Hero />

      <section className="nj-shell py-24">
        <Reveal>
          <p className="nj-kicker">Why Remixware</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold text-balance md:text-5xl">
            Marketplace rules that keep remixes safe.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
          {pillars.map((item, index) => (
            <Reveal
              key={item.title}
              as="article"
              delay={index * 0.05}
              className="bg-background p-7 transition-colors hover:bg-card"
            >
              <item.icon className="size-5 text-primary" />
              <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="nj-shell pb-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal>
            <p className="nj-kicker">Featured</p>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">From the catalog</h2>
          </Reveal>
          <Button asChild variant="outline">
            <Link to="/catalog">
              Full catalog
              <ArrowRightIcon className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
          {featured.map((listing, index) => (
            <Reveal key={listing.slug} delay={index * 0.04}>
              <ListingCard listing={listing} className="h-full" />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="nj-shell pb-28">
        <div className="nj-rule" />
        <Reveal className="grid gap-8 pt-16 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="max-w-xl text-3xl font-semibold text-balance md:text-4xl">
              Have a one-off ready to sell?
            </h2>
            <p className="mt-4 max-w-lg text-muted-foreground">
              Submit agent.md, docs, and your repo. We run the security check before anything goes
              public.
            </p>
          </div>
          <Button asChild size="lg">
            <Link to="/sell">Submit for vetting</Link>
          </Button>
        </Reveal>
      </section>
    </MarketingShell>
  )
}
