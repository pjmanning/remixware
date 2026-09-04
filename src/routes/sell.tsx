import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { CheckCircle2Icon, Loader2Icon } from 'lucide-react'

import { MarketingShell, PageHeader } from '#/components/marketing-shell'
import { Reveal } from '#/components/motion/reveal'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { Textarea } from '#/components/ui/textarea'
import { seoHead } from '#/lib/seo'
import { site } from '#/lib/site'

export const Route = createFileRoute('/sell')({
  head: () =>
    seoHead({
      title: 'Sell',
      path: '/sell',
      description: `Submit one-off software to ${site.name}. Listings require agent.md, docs, and a security check.`,
    }),
  component: SellPage,
})

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PRICE_RE = /^\d+(\.\d{1,2})?$/
const URL_RE = /^https?:\/\/\S+$/i

function FieldError({ errors }: { errors: Array<unknown> }) {
  const message = errors.find((error): error is string => typeof error === 'string')
  if (!message) return null
  return <p className="mt-1.5 text-xs text-destructive">{message}</p>
}

function SellPage() {
  const [submitted, setSubmitted] = useState(false)

  const form = useForm({
    defaultValues: {
      title: '',
      summary: '',
      priceUsd: '',
      agentMd: '',
      docs: '',
      repoUrl: '',
      email: '',
    },
    onSubmit: async () => {
      // Stub: Convex persistence + vetting queue come next.
      await new Promise((resolve) => setTimeout(resolve, 400))
      setSubmitted(true)
    },
  })

  return (
    <MarketingShell>
      <PageHeader
        kicker="Sell"
        title="List a one-off. Pass the security check."
        description="Every Remixware listing needs agent.md, docs, and a clean security review before it hits the catalog."
      />

      <section className="nj-shell pb-24">
        <Reveal className="mx-auto max-w-2xl">
          {submitted ? (
            <div className="flex flex-col items-start rounded-xl border border-primary/40 bg-card/60 p-8">
              <CheckCircle2Icon className="size-7 text-primary" />
              <h2 className="mt-5 text-2xl font-semibold">Submission received (stub)</h2>
              <p className="mt-2 text-muted-foreground">
                This form is a Day 0 stub. Next we store submissions in Convex, run the security
                checklist, and email you when the vetting badge flips to passed.
              </p>
              <Button
                variant="outline"
                className="mt-7"
                onClick={() => {
                  form.reset()
                  setSubmitted(false)
                }}
              >
                Submit another
              </Button>
            </div>
          ) : (
            <form
              className="space-y-6"
              onSubmit={(event) => {
                event.preventDefault()
                event.stopPropagation()
                void form.handleSubmit()
              }}
            >
              <form.Field
                name="title"
                validators={{
                  onBlur: ({ value }) =>
                    value.trim().length < 3 ? 'Title needs at least 3 characters' : undefined,
                }}
              >
                {(field) => (
                  <div>
                    <Label htmlFor={field.name}>Title</Label>
                    <Input
                      id={field.name}
                      className="mt-2"
                      placeholder="Invoice Rail"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) => field.handleChange(event.target.value)}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </div>
                )}
              </form.Field>

              <form.Field
                name="summary"
                validators={{
                  onBlur: ({ value }) =>
                    value.trim().length < 20 ? 'Give buyers a real summary' : undefined,
                }}
              >
                {(field) => (
                  <div>
                    <Label htmlFor={field.name}>Summary</Label>
                    <Textarea
                      id={field.name}
                      className="mt-2"
                      rows={3}
                      placeholder="What buyers get when they remix this."
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) => field.handleChange(event.target.value)}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </div>
                )}
              </form.Field>

              <div className="grid gap-6 sm:grid-cols-2">
                <form.Field
                  name="priceUsd"
                  validators={{
                    onBlur: ({ value }) =>
                      PRICE_RE.test(value.trim()) ? undefined : 'Enter a price like 79 or 149.00',
                  }}
                >
                  {(field) => (
                    <div>
                      <Label htmlFor={field.name}>Price (USD)</Label>
                      <Input
                        id={field.name}
                        className="mt-2"
                        placeholder="149"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) => field.handleChange(event.target.value)}
                      />
                      <FieldError errors={field.state.meta.errors} />
                    </div>
                  )}
                </form.Field>

                <form.Field
                  name="email"
                  validators={{
                    onBlur: ({ value }) =>
                      EMAIL_RE.test(value.trim()) ? undefined : 'Valid email required',
                  }}
                >
                  {(field) => (
                    <div>
                      <Label htmlFor={field.name}>Seller email</Label>
                      <Input
                        id={field.name}
                        type="email"
                        className="mt-2"
                        placeholder="you@studio.dev"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) => field.handleChange(event.target.value)}
                      />
                      <FieldError errors={field.state.meta.errors} />
                    </div>
                  )}
                </form.Field>
              </div>

              <form.Field
                name="repoUrl"
                validators={{
                  onBlur: ({ value }) =>
                    URL_RE.test(value.trim()) ? undefined : 'Provide a repository URL',
                }}
              >
                {(field) => (
                  <div>
                    <Label htmlFor={field.name}>Repository URL</Label>
                    <Input
                      id={field.name}
                      className="mt-2"
                      placeholder="https://github.com/you/one-off"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) => field.handleChange(event.target.value)}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </div>
                )}
              </form.Field>

              <form.Field
                name="agentMd"
                validators={{
                  onBlur: ({ value }) =>
                    value.trim().length < 40
                      ? 'Paste a real agent.md — required for every listing'
                      : undefined,
                }}
              >
                {(field) => (
                  <div>
                    <Label htmlFor={field.name}>agent.md (required)</Label>
                    <Textarea
                      id={field.name}
                      className="mt-2 font-mono text-sm"
                      rows={8}
                      placeholder="# agent.md — …"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) => field.handleChange(event.target.value)}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </div>
                )}
              </form.Field>

              <form.Field
                name="docs"
                validators={{
                  onBlur: ({ value }) =>
                    value.trim().length < 40 ? 'Include at least one docs section' : undefined,
                }}
              >
                {(field) => (
                  <div>
                    <Label htmlFor={field.name}>Docs (required)</Label>
                    <Textarea
                      id={field.name}
                      className="mt-2"
                      rows={6}
                      placeholder="Architecture, security, remix guide…"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) => field.handleChange(event.target.value)}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </div>
                )}
              </form.Field>

              <div className="rounded-xl border border-border bg-secondary/40 p-4 text-sm text-muted-foreground">
                After submit, Remixware runs a security check (deps, secrets, authz). Only listings
                with a passed badge appear in the catalog.
              </div>

              <form.Subscribe selector={(state) => state.isSubmitting}>
                {(isSubmitting) => (
                  <Button type="submit" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2Icon className="size-4 animate-spin" />
                        Submitting…
                      </>
                    ) : (
                      'Submit for vetting'
                    )}
                  </Button>
                )}
              </form.Subscribe>
            </form>
          )}
        </Reveal>
      </section>
    </MarketingShell>
  )
}
