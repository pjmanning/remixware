import { Link } from '@tanstack/react-router'
import type { ErrorComponentProps } from '@tanstack/react-router'
import { Button } from '#/components/ui/button'
import { MarketingShell } from '#/components/marketing-shell'

export function DefaultCatchBoundary({ error, reset }: ErrorComponentProps) {
  const router = useRouter()
  return (
    <MarketingShell>
      <div className="nj-shell flex min-h-[62vh] flex-col items-center justify-center py-24 text-center">
        <p className="nj-kicker">Something broke</p>
        <h1 className="mt-4 text-4xl font-semibold md:text-6xl">That didn&apos;t go to plan.</h1>
        <p className="mt-5 max-w-md text-muted-foreground text-pretty">The error has been reported. You can retry, or head back to safe ground.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button onClick={() => { reset(); void router.invalidate() }}>Try again</Button>
          <Button asChild variant="outline"><Link to="/">Back home</Link></Button>
        </div>
      </div>
    </MarketingShell>
  )
}
