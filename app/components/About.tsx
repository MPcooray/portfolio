'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { SectionReveal, TiltCard } from './InteractiveEffects'

const pillars = [
  {
    title: 'Systems thinking',
    text: 'I like turning complexity into dependable systems, whether that means backend architecture, embedded workflows, or structured product thinking.',
  },
  {
    title: 'Competitive discipline',
    text: 'Competitive swimming shaped my discipline, composure under pressure, and respect for the standards built through repetition.',
  },
  {
    title: 'Leadership in motion',
    text: 'From captaining teams to leading the SLIIT Sports Council, I care about building momentum around people as much as around results.',
  },
]

const journey = [
  {
    period: '2023 - Present',
    title: 'BSc (Hons) in Computer Science',
    place: 'Sri Lanka Institute of Information Technology (SLIIT)',
  },
  {
    period: 'Completed',
    title: 'BEng (Hons) in Electrical and Electronic Engineering',
    place: 'University of the West of England — Second Lower division',
  },
  {
    period: '2025 - 2026',
    title: 'MSc in Artificial Intelligence',
    place: 'Anglia Ruskin University',
  },
]

const capabilities = [
  'C / C++',
  'Java',
  'React / Next.js',
  'Spring Boot',
  'PostgreSQL / MySQL',
  'AWS / SSH tooling',
  'Embedded systems',
  'Signal processing',
  'Problem solving',
  'Public speaking',
  'Team leadership',
]

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section id="about" ref={ref} className="section-shell px-4 py-24 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]"
        >
          <div className="space-y-6">
            <span className="eyebrow">Profile</span>
            <h2 className="section-title text-4xl font-semibold text-[color:var(--text)] sm:text-5xl">
              Engineered with discipline. Led with intent.
            </h2>
            <p className="max-w-xl text-base leading-8 text-[color:var(--muted)] sm:text-lg">
              I come from two environments that both demand precision: engineering and competitive
              sport. That combination shaped how I work today. I value structure, resilience,
              accountability, and the ability to stay composed while building toward ambitious
              goals.
            </p>
            <div className="grid gap-4">
              {pillars.map((pillar, index) => (
                <TiltCard
                  key={pillar.title}
                  className="glass-panel rounded-[1.5rem] p-5"
                >
                  <motion.div
                    initial={{ opacity: 0, x: -24 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.12 * index }}
                  >
                    <p className="text-sm uppercase tracking-[0.22em] text-[color:var(--accent)]">
                      {pillar.title}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[color:var(--text)]">{pillar.text}</p>
                  </motion.div>
                </TiltCard>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <SectionReveal className="glass-panel rounded-[2rem] p-6 sm:p-8" delay={0.08}>
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--muted)]">
                    Academic route
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-[color:var(--text)]">
                    Cross-disciplinary by choice
                  </h3>
                </div>
                <p className="max-w-sm text-sm leading-7 text-[color:var(--muted)]">
                  My path spans computer science, electrical and electronic engineering, and
                  postgraduate study in AI, giving me a practical foundation across software,
                  hardware, and intelligent systems.
                </p>
              </div>

              <div className="mt-8 space-y-5">
                {journey.map((item, index) => (
                  <motion.div
                    key={`${item.title}-${item.period}`}
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.14 * index }}
                    className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5"
                  >
                    <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--accent)]">
                      {item.period}
                    </p>
                    <h4 className="mt-2 text-lg font-semibold text-[color:var(--text)]">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-sm leading-7 text-[color:var(--muted)]">{item.place}</p>
                  </motion.div>
                ))}
              </div>
            </SectionReveal>

            <SectionReveal className="glass-panel rounded-[2rem] p-6 sm:p-8" delay={0.16}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-2xl font-semibold text-[color:var(--text)]">
                  Tools and strengths
                </h3>
                <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--muted)]">
                  Technical and human skills
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {capabilities.map((capability, index) => (
                  <motion.span
                    key={capability}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.35, delay: 0.02 * index }}
                    whileHover={{ y: -3, scale: 1.03 }}
                    className="rounded-full border border-[color:var(--border)] bg-white/5 px-4 py-2 text-sm text-[color:var(--text)]"
                  >
                    {capability}
                  </motion.span>
                ))}
              </div>
            </SectionReveal>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
