'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { SectionReveal, TiltCard } from './InteractiveEffects'

const milestones = [
  {
    year: '2002',
    title: 'Born on December 25',
    detail:
      'Born in Sri Lanka, Manula grew up with a curiosity for technology, a drive for leadership, and an early commitment to sport.',
  },
  {
    year: '2008 - 2022',
    title: 'Ananda College',
    detail:
      'Spent 14 formative years at one of Sri Lanka’s most respected schools, building discipline across academics, sport, and leadership.',
  },
  {
    year: '2012',
    title: 'Junior Prefect',
    detail:
      'Recognized early for responsibility, discipline, and leadership potential while still in primary school.',
  },
  {
    year: '2019',
    title: 'Swimming Junior Vice Captain',
    detail:
      'Began leading within the school swimming structure while supporting younger swimmers and team coordination.',
  },
  {
    year: '2020',
    title: 'Swimming Captain',
    detail:
      'Led the Ananda College swimming team, taking responsibility for standards, team morale, and representation.',
  },
  {
    year: '2024',
    title: 'SLIIT Swimming Vice Captain',
    detail:
      'Continued his leadership journey in university sport, carrying school-level competitive discipline into a new environment.',
  },
  {
    year: '2025',
    title: 'SLIIT Swimming Captain',
    detail:
      'Took full leadership of the university swimming team while balancing academic and technical growth.',
  },
  {
    year: '2025',
    title: 'SLIIT Sports Council President',
    detail:
      'Expanded from team leadership into broader sports leadership, representing the university sports community and helping guide key initiatives.',
  },
  {
    year: '2025 - 2026',
    title: 'MSc in Artificial Intelligence',
    detail:
      'Began postgraduate study in AI while building on foundations in computer science and electrical and electronic engineering.',
  },
]

export default function Story() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.12 })

  return (
    <section id="story" ref={ref} className="section-shell px-4 py-24 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl">
        <SectionReveal className="mb-14 max-w-3xl">
          <span className="eyebrow">Story</span>
          <h2 className="section-title mt-6 text-4xl font-semibold text-[color:var(--text)] sm:text-5xl">
            A timeline shaped by discipline, leadership, and technical ambition.
          </h2>
          <p className="mt-6 text-base leading-8 text-[color:var(--muted)] sm:text-lg">
            My journey has never been only about one lane. It has been built through long-term
            commitment to sport, growing responsibility in leadership, and a steady move toward
            engineering, computing, and AI.
          </p>
        </SectionReveal>

        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
          <SectionReveal delay={0.05}>
            <TiltCard className="glass-panel rounded-[2rem] p-8">
              <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--accent)]">
                The through-line
              </p>
              <p className="mt-5 text-base leading-8 text-[color:var(--text)]">
                The same mindset shows up across everything I do: train consistently, raise the
                standard, and take responsibility when it matters most.
              </p>
              <div className="mt-8 space-y-5">
                <motion.div whileHover={{ x: 4 }} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
                    Sport
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--text)]">
                    Competitive swimming built the discipline, patience, and resilience behind my
                    work ethic.
                  </p>
                </motion.div>
                <motion.div whileHover={{ x: 4 }} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
                    Leadership
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--text)]">
                    From junior leadership roles to university sports leadership, I learned how to
                    represent people, not just positions.
                  </p>
                </motion.div>
                <motion.div whileHover={{ x: 4 }} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
                    Technology
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--text)]">
                    My technical path grew from engineering fundamentals into software systems and now
                    toward AI-driven work.
                  </p>
                </motion.div>
              </div>
            </TiltCard>
          </SectionReveal>

          <div className="glass-panel rounded-[2rem] p-8">
            <div className="relative ml-2 border-l border-[color:var(--border-strong)] pl-8">
              <motion.div
                className="absolute bottom-0 left-0 top-0 w-px origin-top bg-gradient-to-b from-[color:var(--accent)] via-[color:var(--accent)]/60 to-transparent"
                initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : {}}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              />
              {milestones.map((milestone, index) => (
                <motion.div
                  key={`${milestone.year}-${milestone.title}`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="relative pb-10 last:pb-0"
                >
                  <motion.span
                    className="absolute -left-[2.55rem] top-1 h-4 w-4 rounded-full border border-[color:var(--border-strong)] bg-[color:var(--accent)]"
                    animate={{ scale: [1, 1.18, 1], boxShadow: ['0 0 0 rgba(217,179,108,0)', '0 0 18px rgba(217,179,108,0.28)', '0 0 0 rgba(217,179,108,0)'] }}
                    transition={{ duration: 2.6, repeat: Infinity, delay: index * 0.12, ease: 'easeInOut' }}
                  />
                  <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--accent)]">
                    {milestone.year}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-[color:var(--text)]">
                    {milestone.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-8 text-[color:var(--muted)]">
                    {milestone.detail}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
