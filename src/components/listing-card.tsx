import { Link } from '@tanstack/react-router'
import { ArrowRightIcon } from 'lucide-react'

import { VettingBadge } from '#/components/vetting-badge'
import { formatPrice } from '#/lib/listings'
import type { Listing } from '#/lib/listings'
import { cn } from '#/lib/utils'

export function ListingCard({ listing, className }: { listing: Listing; className?: string }) {
  return (
    <Link
      to="/catalog/$slug"
      params={{ slug: listing.slug }}
      className={cn(
        'group flex flex-col gap-5 bg-background p-7 text-inherit no-underline transition-colors hover:bg-card',
        className,
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p className="font-mono text-[0.6875rem] tracking-[0.22em] text-muted-foreground uppercase">
          {listing.category}
        </p>
        <VettingBadge status={listing.vetted} />
      </div>

      <div>
        <h3 className="font-display text-xl font-semibold tracking-tight group-hover:text-primary">
          {listing.title}
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{listing.summary}</p>
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-2">
        {listing.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-border px-2 py-0.5 font-mono text-[0.6875rem] tracking-wide text-muted-foreground"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-border pt-4">
        <div>
          <p className="font-display text-2xl font-semibold">{formatPrice(listing)}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">by {listing.seller}</p>
        </div>
        <span className="inline-flex items-center gap-1 text-sm text-primary">
          View
          <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  )
}
