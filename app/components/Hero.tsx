'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const metrics = [
  { label: 'Disciplines', value: '3', detail: 'Code, engineering, swimming' },
  { label: 'Leadership', value: '4+', detail: 'Captaining teams and councils' },
  { label: 'Mindset', value: '100%', detail: 'Built on consistency and discipline' },
]

export default function Hero() {
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
        <div className="absolute left-[12%] top-28 h-72 w-72 rounded-full bg-[color:var(--accent)]/10 blur-3xl" />
        <div className="absolute bottom-16 right-[8%] h-80 w-80 rounded-full bg-[color:var(--track)]/18 blur-3xl" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(420px,0.92fr)] lg:items-start lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-[48rem] pt-4 lg:pt-12"
        >
          <span className="eyebrow">Modern athlete-engineer</span>
          <h1 className="section-title mt-6 max-w-[11ch] text-5xl font-semibold leading-[0.92] tracking-[-0.05em] text-[color:var(--text)] sm:text-6xl lg:text-[6.35rem]">
            Building systems with the discipline of a competitor.
          </h1>
          <p className="mt-7 max-w-[40rem] text-base leading-8 text-[color:var(--muted)] sm:text-lg">
            I&apos;m Manula Cooray, a computer science student, engineering learner, swimmer, and
            student leader. I bring structure, calm, and competitive focus to every team and every
            product I help build.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button
              onClick={() => scrollToSection('projects')}
              size="lg"
              className="shadow-[0_18px_45px_rgba(217,179,108,0.22)]"
            >
              Selected Work
            </Button>
            <Button
              onClick={() => scrollToSection('contact')}
              variant="outline"
              size="lg"
            >
              Let&apos;s Connect
            </Button>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 * index, duration: 0.55 }}
                className="rounded-[1.75rem]"
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
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative lg:pt-24"
        >
          <div className="glass-panel relative mx-auto max-w-[34rem] overflow-hidden rounded-[2rem] border border-[color:var(--border-strong)] p-4">
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[color:var(--accent)]/18 to-transparent" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem]">
              <Image
                src="/me2.jpg"
                alt="Portrait of Manula Cooray"
                fill
                priority
                className="object-cover object-center"
              />
            </div>
            <div className="relative mt-4 grid gap-3 rounded-[1.4rem] border border-white/10 bg-black/20 p-4 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--muted)]">
                  Current focus
                </p>
                <p className="mt-2 text-sm leading-6 text-[color:var(--text)]">
                  Software systems, embedded thinking, and leadership shaped through high-performance
                  sport.
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--muted)]">
                  Approach
                </p>
                <p className="mt-2 text-sm leading-6 text-[color:var(--text)]">
                  Train hard, think clearly, execute with intent, and keep standards high.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
