import { Link } from '@tanstack/react-router'
import { cn } from '#/lib/utils'
import { site } from '#/lib/site'

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn('size-7', className)}>
      <path d="M8 10c6 0 10 4 10 10" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M24 22c-6 0-10-4-10-10" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="8" cy="10" r="2.4" fill="currentColor" />
      <circle cx="24" cy="22" r="2.4" fill="currentColor" />
    </svg>
  )
}

export function Wordmark({ className, to = '/' }: { className?: string; to?: string }) {
  return (
    <Link to={to} className={cn('group inline-flex items-center gap-2.5 text-foreground no-underline', className)}>
      <BrandMark className="text-primary transition-transform duration-300 group-hover:-rotate-6" />
      <span className="font-display text-xl font-semibold tracking-tight">{site.name}</span>
    </Link>
  )
}
