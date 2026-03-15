'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const pillars = [
  {
    title: 'Systems thinking',
    text: 'I enjoy turning moving parts into dependable systems, whether that means backend logic, embedded workflows, or product structure.',
  },
  {
    title: 'Competitive discipline',
    text: 'Swimming taught me consistency, composure under pressure, and how daily standards shape long-term performance.',
  },
  {
    title: 'Leadership in motion',
    text: 'From sport council work to captaining teams, I like building momentum around people, not just around tasks.',
  },
]

const journey = [
  {
    period: '2023 - Present',
    title: 'BSc (Hons) in Computer Science',
    place: 'Sri Lanka Institute of Information Technology (SLIIT)',
  },
  {
    period: '2024 - 2025',
    title: 'BEng (Hons) in Electrical and Electronic Engineering',
    place: 'University of the West of England',
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
  'PostgreSQL / MySQL',
  'Embedded systems',
  'Problem solving',
  'Digital communication',
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
              Calm execution, ambitious direction.
            </h2>
            <p className="max-w-xl text-base leading-8 text-[color:var(--muted)] sm:text-lg">
              My work is shaped by two worlds that demand precision: engineering and performance
              sport. I care about building reliable systems, communicating clearly, and showing up
              with consistency when pressure is high.
            </p>
            <div className="grid gap-4">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, x: -24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.12 * index }}
                  className="glass-panel rounded-[1.5rem] p-5"
                >
                  <p className="text-sm uppercase tracking-[0.22em] text-[color:var(--accent)]">
                    {pillar.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--text)]">{pillar.text}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--muted)]">
                    Academic route
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-[color:var(--text)]">
                    Cross-disciplinary by design
                  </h3>
                </div>
                <p className="max-w-sm text-sm leading-7 text-[color:var(--muted)]">
                  I&apos;m intentionally combining computing, electronics, and AI to build a broad but
                  practical technical foundation.
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
            </div>

            <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-2xl font-semibold text-[color:var(--text)]">
                  Tools and strengths
                </h3>
                <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--muted)]">
                  Built for teams and systems
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {capabilities.map((capability) => (
                  <span
                    key={capability}
                    className="rounded-full border border-[color:var(--border)] bg-white/5 px-4 py-2 text-sm text-[color:var(--text)]"
                  >
                    {capability}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
