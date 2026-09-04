import { createFileRoute, Link } from '@tanstack/react-router'

import { MarketingShell, PageHeader } from '#/components/marketing-shell'
import { Reveal } from '#/components/motion/reveal'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '#/components/ui/accordion'
import { Button } from '#/components/ui/button'
import { faqJsonLd, seoHead } from '#/lib/seo'
import { site } from '#/lib/site'

const faqs = [
  {
    question: 'What is Remixware?',
    answer:
      'A marketplace of one-off, security-vetted software you can buy and remix. Each listing must include agent.md and docs before it can go public.',
  },
  {
    question: 'What does the security check badge mean?',
    answer:
      'Dependency audit, secrets scan, and an authz review all passed. Listings without a passed badge do not appear in the catalog.',
  },
  {
    question: 'Why require agent.md?',
    answer:
      'Remixes are often done with coding agents. agent.md is the contract that keeps ownership checks, rate limits, and safe edit boundaries intact after you fork.',
  },
  {
    question: 'Can I sell on Remixware?',
    answer:
      'Yes. Use /sell to submit title, repo, agent.md, and docs. This scaffold queues the submission as a stub; the live vetting pipeline lands next.',
  },
  {
    question: 'Do I need Convex and Clerk to browse?',
    answer:
      'No. The marketing site and catalog run with zero keys. Convex and Clerk unlock /app and authenticated seller flows.',
  },
  {
    question: 'What stack is this built on?',
    answer:
      'TanStack Start on Cloudflare Workers, Convex for data, Clerk for accounts, Stripe for checkout (when wired), Tailwind + shadcn/ui.',
  },
] as const

export const Route = createFileRoute('/faq')({
  head: () =>
    seoHead({
      title: 'FAQ',
      path: '/faq',
      description: `Common questions about buying, selling and remixing on ${site.name}.`,
      jsonLd: faqJsonLd(faqs),
    }),
  component: FaqPage,
})

function FaqPage() {
  return (
    <MarketingShell>
      <PageHeader
        kicker="FAQ"
        title="Straight answers."
        description="How the catalog, security badge, and seller submit flow work."
      />

      <section className="nj-shell pb-24">
        <Reveal>
          <Accordion type="single" collapsible className="mx-auto max-w-3xl">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>

        <Reveal className="mx-auto mt-14 flex max-w-3xl flex-wrap gap-3">
          <Button asChild>
            <Link to="/catalog">Browse catalog</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/sell">Sell a one-off</Link>
          </Button>
        </Reveal>
      </section>
    </MarketingShell>
  )
}
