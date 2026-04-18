'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  FloatingOrb,
  MagneticButton,
  ScrollCue,
  TiltCard,
  TypewriterText,
} from './InteractiveEffects'

const metrics = [
  { label: 'Disciplines', value: '3', detail: 'Code, engineering, swimming' },
  { label: 'Leadership', value: '4+', detail: 'Captaining teams and councils' },
  { label: 'Mindset', value: '100%', detail: 'Built on consistency and discipline' },
]

const identityLines = [
  'Athlete. Engineer. Leader.',
  'Built for pressure, precision, and progress.',
  'Calm systems. Competitive standards.',
]

const proofPoints = [
  'SLIIT Sports Council President',
  'Swimming Captain 2025',
  'Computer Science + Engineering',
  'MSc in Artificial Intelligence',
]

export default function Hero() {
  const [activeIdentity, setActiveIdentity] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIdentity((current) => (current + 1) % identityLines.length)
    }, 2600)

    return () => window.clearInterval(interval)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (!element) return

    const top = element.getBoundingClientRect().top + window.scrollY - 88
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="section-shell relative flex min-h-screen items-center overflow-hidden px-4 pb-16 pt-32 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0">
        <FloatingOrb className="absolute left-[12%] top-28 h-72 w-72 rounded-full bg-[color:var(--accent)]/10 blur-3xl" />
        <FloatingOrb
          duration={9}
          className="absolute bottom-16 right-[8%] h-80 w-80 rounded-full bg-[color:var(--track)]/18 blur-3xl"
        />
        <motion.div
          aria-hidden="true"
          className="absolute left-1/2 top-1/3 h-px w-[34rem] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{ opacity: [0.2, 0.5, 0.2], scaleX: [0.94, 1, 0.94] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(420px,0.92fr)] lg:items-start lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-[48rem] pt-4 lg:pt-12"
        >
          <span className="eyebrow">Modern athlete-engineer</span>
          <div className="mt-6 min-h-[2.5rem]">
            <motion.p
              key={identityLines[activeIdentity]}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="text-sm uppercase tracking-[0.28em] text-[color:var(--accent)] sm:text-base"
            >
              {identityLines[activeIdentity]}
            </motion.p>
          </div>
          <h1 className="section-title mt-4 max-w-[9ch] text-5xl font-semibold leading-[0.92] tracking-[-0.05em] text-[color:var(--text)] sm:text-6xl lg:text-[6rem]">
            <TypewriterText text="Systems, built with standards." />
          </h1>
          <p className="mt-7 max-w-[34rem] text-base leading-8 text-[color:var(--muted)] sm:text-lg">
            Computer science student, engineering graduate, swimmer, and student leader bringing
            calm execution and high standards to every system I build.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {proofPoints.map((point, index) => (
              <motion.span
                key={point}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.5, duration: 0.4 }}
                className="rounded-full border border-[color:var(--border)] bg-white/5 px-4 py-2 text-sm text-[color:var(--text)]"
              >
                {point}
              </motion.span>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <MagneticButton className="inline-flex">
              <Button
                onClick={() => scrollToSection('projects')}
                size="lg"
                className="shadow-[0_18px_45px_rgba(217,179,108,0.22)]"
              >
                Selected Work
              </Button>
            </MagneticButton>
            <MagneticButton className="inline-flex">
              <Button
                onClick={() => scrollToSection('contact')}
                variant="outline"
                size="lg"
              >
                Let&apos;s Connect
              </Button>
            </MagneticButton>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {metrics.map((metric, index) => (
              <TiltCard
                key={metric.label}
                className="rounded-[1.75rem]"
              >
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 * index, duration: 0.55 }}
                >
                  <Card className="rounded-[1.75rem]">
                    <CardContent className="p-5">
                      <p className="text-3xl font-semibold text-[color:var(--text)]">{metric.value}</p>
                      <p className="mt-3 text-sm uppercase tracking-[0.2em] text-[color:var(--accent)]">
                        {metric.label}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{metric.detail}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </TiltCard>
            ))}
          </div>

          <ScrollCue />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative lg:pt-24"
        >
          <TiltCard className="mx-auto max-w-[34rem]">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
              className="glass-panel relative overflow-hidden rounded-[2rem] border border-[color:var(--border-strong)] p-4"
            >
              <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[color:var(--accent)]/18 to-transparent" />
              <motion.div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent"
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem]">
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src="/me2.jpg"
                    alt="Portrait of Manula Cooray"
                    fill
                    priority
                    className="object-cover object-center"
                  />
                </motion.div>
              </div>
              <div className="relative mt-4 rounded-[1.4rem] border border-white/10 bg-black/20 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--muted)]">
                      Manula Cooray
                    </p>
                    <p className="mt-2 text-lg font-semibold text-[color:var(--text)]">
                      Athlete-engineer with a systems mindset
                    </p>
                  </div>
                  <span className="rounded-full border border-[color:var(--border)] px-3 py-1 text-xs uppercase tracking-[0.22em] text-[color:var(--accent)]">
                    Sri Lanka
                  </span>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[1rem] border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--muted)]">
                      Current focus
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[color:var(--text)]">
                      Software systems, embedded thinking, and AI-grounded problem solving.
                    </p>
                  </div>
                  <div className="rounded-[1rem] border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--muted)]">
                      Working style
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[color:var(--text)]">
                      Train hard, think clearly, execute with intent, and keep standards high.
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {proofPoints.slice(0, 3).map((point) => (
                    <span
                      key={point}
                      className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]"
                    >
                      {point}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  )
}
