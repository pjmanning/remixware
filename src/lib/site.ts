import { env, read } from './env'

/**
 * Single place to rebrand the template. Everything user-visible reads from here.
 */
export const site = {
  name: 'Remixware',
  tagline: 'Buy once. Remix forever.',
  description:
    'Remixware is a marketplace of one-off, security-vetted software you can buy and remix. Every listing ships with agent.md and docs.',
  /** Canonical origin, no trailing slash. Set VITE_SITE_URL before shipping. */
  url: (env.siteUrl ?? 'http://localhost:3000').replace(/\/+$/, ''),
  ogImage: '/og.png',
  twitter: '@remixware',
  contactEmail: 'hello@remixware.dev',
} as const

const featurebaseOrg = read(import.meta.env.VITE_FEATUREBASE_ORG)

/**
 * Optional integrations. The app must run with every one of these unset, so
 * always branch on `enabled` rather than assuming a value exists. Setting the
 * organization derives all three URLs; the explicit vars override it.
 */
export const featurebase = {
  organization: featurebaseOrg,
  feedbackUrl:
    read(import.meta.env.VITE_FEATUREBASE_FEEDBACK_URL) ??
    (featurebaseOrg ? `https://${featurebaseOrg}.featurebase.app` : undefined),
  changelogUrl:
    read(import.meta.env.VITE_FEATUREBASE_CHANGELOG_URL) ??
    (featurebaseOrg ? `https://${featurebaseOrg}.featurebase.app/changelog` : undefined),
  helpUrl:
    read(import.meta.env.VITE_FEATUREBASE_HELP_URL) ??
    (featurebaseOrg ? `https://${featurebaseOrg}.featurebase.app/help` : undefined),
  get enabled() {
    return Boolean(this.feedbackUrl ?? this.changelogUrl ?? this.helpUrl)
  },
}

export const nav = {
  marketing: [
    { label: 'Catalog', to: '/catalog' },
    { label: 'Sell', to: '/sell' },
    { label: 'Pricing', to: '/pricing' },
    { label: 'FAQ', to: '/faq' },
  ],
  legal: [
    { label: 'Privacy', to: '/privacy' },
    { label: 'Terms', to: '/terms' },
    { label: 'Contact', to: '/contact' },
  ],
} as const
