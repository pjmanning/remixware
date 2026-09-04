import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { ArrowLeftIcon } from 'lucide-react'
import { useState } from 'react'

import { MarketingShell } from '#/components/marketing-shell'
import { Reveal } from '#/components/motion/reveal'
import { Button } from '#/components/ui/button'
import { VettingBadge } from '#/components/vetting-badge'
import { formatPrice, getListing } from '#/lib/listings'
import { seoHead } from '#/lib/seo'

export const Route = createFileRoute('/catalog/$slug')({
  loader: ({ params }) => {
    const listing = getListing(params.slug)
    if (!listing || listing.vetted !== 'passed') throw notFound()
    return listing
  },
  head: ({ loaderData }) =>
    seoHead({
      title: loaderData?.title ?? 'Listing',
      path: `/catalog/${loaderData?.slug ?? ''}`,
      description: loaderData?.summary,
    }),
  component: ListingDetailPage,
})

type Tab = 'overview' | 'agent' | 'docs'

function ListingDetailPage() {
  const listing = Route.useLoaderData()
  const [tab, setTab] = useState<Tab>('overview')
  const [docSlug, setDocSlug] = useState(listing.docs[0].slug)
  const activeDoc = listing.docs.find((doc) => doc.slug === docSlug) ?? listing.docs[0]

  return (
    <MarketingShell>
      <div className="nj-shell pt-10 pb-6 md:pt-16">
        <Button asChild variant="ghost" size="sm" className="-ml-2 mb-8">
          <Link to="/catalog">
            <ArrowLeftIcon className="size-4" />
            Catalog
          </Link>
        </Button>

        <Reveal>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="nj-kicker">{listing.category}</p>
              <h1 className="mt-3 max-w-3xl text-4xl font-semibold text-balance md:text-6xl">
                {listing.title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
                {listing.summary}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card/80 p-5 backdrop-blur-sm">
              <p className="font-display text-3xl font-semibold">{formatPrice(listing)}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                One-time purchase · by {listing.seller}
              </p>
              <Button className="mt-4 w-full" size="lg" disabled>
                Buy to remix
              </Button>
              <p className="mt-2 text-center text-xs text-muted-foreground">Checkout wiring next</p>
            </div>
          </div>
        </Reveal>

        <div className="mt-8">
          <VettingBadge status={listing.vetted} showDetail />
          {listing.vettedAt ? (
            <p className="mt-2 font-mono text-xs tracking-wide text-muted-foreground">
              Reviewed {listing.vettedAt}
            </p>
          ) : null}
        </div>

        <div className="nj-rule mt-10" />
      </div>

      <section className="nj-shell pb-24">
        <div className="flex flex-wrap gap-2 border-b border-border pb-3">
          {(
            [
              ['overview', 'Overview'],
              ['agent', 'agent.md'],
              ['docs', 'Docs'],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={
                tab === id
                  ? 'rounded-md bg-primary px-3 py-1.5 font-mono text-xs tracking-wide text-primary-foreground'
                  : 'rounded-md px-3 py-1.5 font-mono text-xs tracking-wide text-muted-foreground hover:text-foreground'
              }
            >
              {label}
            </button>
          ))}
        </div>

        {tab === 'overview' ? (
          <Reveal className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h2 className="text-2xl font-semibold">What you get</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                A complete, remixable package: source, agent.md for coding agents, and docs that
                explain architecture and security. Remixware only lists software that passed the
                security check.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">/</span>
                  Required <code className="font-mono text-foreground">agent.md</code> contract
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">/</span>
                  Docs covering architecture and security
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">/</span>
                  {listing.securitySummary}
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Stack</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {listing.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-border px-2.5 py-1 font-mono text-xs tracking-wide"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ) : null}

        {tab === 'agent' ? (
          <Reveal className="mt-8">
            <h2 className="text-2xl font-semibold">agent.md</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Required on every listing. Agents should follow this before editing the remix.
            </p>
            <pre className="mt-6 overflow-x-auto rounded-xl border border-border bg-card p-5 font-mono text-sm leading-relaxed text-foreground whitespace-pre-wrap">
              {listing.agentMd.trim()}
            </pre>
          </Reveal>
        ) : null}

        {tab === 'docs' ? (
          <Reveal className="mt-8 grid gap-8 lg:grid-cols-[14rem_1fr]">
            <nav className="flex flex-row gap-2 lg:flex-col">
              {listing.docs.map((doc) => (
                <button
                  key={doc.slug}
                  type="button"
                  onClick={() => setDocSlug(doc.slug)}
                  className={
                    activeDoc.slug === doc.slug
                      ? 'rounded-md bg-secondary px-3 py-2 text-left text-sm text-foreground'
                      : 'rounded-md px-3 py-2 text-left text-sm text-muted-foreground hover:text-foreground'
                  }
                >
                  {doc.title}
                </button>
              ))}
            </nav>
            <article>
              <h2 className="text-2xl font-semibold">{activeDoc.title}</h2>
              <div className="mt-4 space-y-4 text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {activeDoc.body.trim()}
              </div>
            </article>
          </Reveal>
        ) : null}
      </section>
    </MarketingShell>
  )
}
