import { ShieldAlertIcon, ShieldCheckIcon, ShieldQuestionIcon } from 'lucide-react'

import { Badge } from '#/components/ui/badge'
import type { VettingStatus } from '#/lib/listings'
import { cn } from '#/lib/utils'

const copy: Record<
  VettingStatus,
  { label: string; detail: string; icon: typeof ShieldCheckIcon; className: string }
> = {
  passed: {
    label: 'Security check passed',
    detail: 'Dependency audit, secrets scan, and authz review signed off.',
    icon: ShieldCheckIcon,
    className: 'border-primary/40 bg-primary/12 text-primary',
  },
  pending: {
    label: 'Security check pending',
    detail: 'This listing is waiting on the Remixware review queue.',
    icon: ShieldQuestionIcon,
    className: 'border-border bg-secondary text-secondary-foreground',
  },
  failed: {
    label: 'Security check failed',
    detail: 'Not eligible for the public catalog until issues are resolved.',
    icon: ShieldAlertIcon,
    className: 'border-destructive/40 bg-destructive/10 text-destructive',
  },
}

export function VettingBadge({
  status,
  className,
  showDetail = false,
}: {
  status: VettingStatus
  className?: string
  showDetail?: boolean
}) {
  const meta = copy[status]
  const Icon = meta.icon

  return (
    <div className={cn('inline-flex flex-col gap-1.5', className)}>
      <Badge variant="outline" className={cn('gap-1.5 font-mono tracking-wide', meta.className)}>
        <Icon className="size-3.5" aria-hidden />
        {meta.label}
      </Badge>
      {showDetail ? (
        <p className="max-w-md text-xs leading-relaxed text-muted-foreground">{meta.detail}</p>
      ) : null}
    </div>
  )
}
