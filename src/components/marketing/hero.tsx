import { Link } from '@tanstack/react-router'
import { ArrowRightIcon } from 'lucide-react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { useEffect } from 'react'

import { BrandMark } from '#/components/brand'
import { Button } from '#/components/ui/button'
import { site } from '#/lib/site'

/**
 * Motion #1 — hero entrance: the brand, headline and supporting rows arrive on
 * one staggered timeline so the page reads as a single composition.
 * Motion #2 — the aurora behind the hero tracks the pointer with a slow spring,
 * giving the full-bleed background depth without animating anything the eye
 * has to track.
 */

const rise = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.06 } },
}

const transition = { duration: 0.85, ease: [0.16, 1, 0.3, 1] } as const

function AuroraField() {
  const reduced = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const x = useSpring(pointerX, { stiffness: 40, damping: 22, mass: 1.2 })
  const y = useSpring(pointerY, { stiffness: 40, damping: 22, mass: 1.2 })
  const translate = useTransform([x, y], ([lx, ly]) => `translate3d(${lx}px, ${ly}px, 0)`)

  useEffect(() => {
    if (reduced) return
    const onMove = (event: PointerEvent) => {
      const cx = event.clientX / window.innerWidth - 0.5
      const cy = event.clientY / window.innerHeight - 0.5
      pointerX.set(cx * 60)
      pointerY.set(cy * 40)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [pointerX, pointerY, reduced])

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        style={reduced ? undefined : { transform: translate }}
        className="absolute -top-[38%] left-1/2 h-[110vh] w-[130vw] -translate-x-1/2 opacity-90"
      >
        <div className="absolute inset-0 bg-[radial-gradient(46%_38%_at_28%_38%,var(--nj-aurora-a),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(40%_34%_at_72%_30%,var(--nj-aurora-b),transparent_72%)]" />
      </motion.div>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <AuroraField />

      <motion.div
        data-reveal=""
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="nj-shell relative flex min-h-[86vh] flex-col justify-center py-24"
      >
        <motion.div variants={rise} transition={transition} className="flex items-center gap-4">
          <BrandMark className="size-14 text-primary drop-shadow-[0_0_28px_var(--nj-aurora-a)] sm:size-16" />
          <span className="nj-kicker">{site.name}</span>
        </motion.div>

        <motion.h1
          variants={rise}
          transition={transition}
          className="mt-10 max-w-[14ch] text-6xl leading-[0.94] font-semibold text-balance sm:text-7xl lg:text-[7.5rem]"
        >
          Buy once.{' '}
          <span className="text-primary [text-shadow:0_0_60px_var(--nj-aurora-a)]">Remix</span>{' '}
          forever.
        </motion.h1>

        <motion.p
          variants={rise}
          transition={transition}
          className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty sm:text-xl"
        >
          A marketplace of one-off, security-vetted software. Every listing ships with agent.md and
          docs so you can remix safely.
        </motion.p>

        <motion.div
          variants={rise}
          transition={transition}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Button asChild size="lg" className="group">
            <Link to="/catalog">
              Browse catalog
              <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/sell">Sell a one-off</Link>
          </Button>
        </motion.div>

        <motion.div
          variants={rise}
          transition={transition}
          className="mt-20 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase"
        >
          <span>Vetted listings</span>
          <span className="text-primary">/</span>
          <span>agent.md required</span>
          <span className="text-primary">/</span>
          <span>Docs included</span>
        </motion.div>
      </motion.div>
    </section>
  )
}
