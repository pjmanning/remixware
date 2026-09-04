import { createFileRoute } from '@tanstack/react-router'

import { ListingCard } from '#/components/listing-card'
import { MarketingShell, PageHeader } from '#/components/marketing-shell'
import { Reveal } from '#/components/motion/reveal'
import { listCatalog } from '#/lib/listings'
import { seoHead } from '#/lib/seo'
import { site } from '#/lib/site'

export const Route = createFileRoute('/catalog/')({
  head: () =>
    seoHead({
      title: 'Catalog',
      path: '/catalog',
      description: `Browse one-off, security-vetted software on ${site.name}. Every listing includes agent.md and docs.`,
    }),
  component: CatalogPage,
})

function CatalogPage() {
  const catalog = listCatalog()

  return (
    <MarketingShell>
      <PageHeader
        kicker="Catalog"
        title="One-off software, already vetted."
        description="Buy a finished slice, remix it into your product, and keep the agent.md contract so the next change stays safe."
      />

      <section className="nj-shell pb-24">
        {catalog.length === 0 ? (
          <p className="text-muted-foreground">No vetted listings yet. Check back soon.</p>
        ) : (
          <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
            {catalog.map((listing, index) => (
              <Reveal key={listing.slug} delay={index * 0.04}>
                <ListingCard listing={listing} className="h-full" />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </MarketingShell>
  )
}
