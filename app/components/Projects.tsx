'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { SectionReveal, SpotlightCard, TiltCard } from './InteractiveEffects'

const projects = [
  {
    id: 1,
    year: '2025',
    title: 'Distributed File System',
    summary: 'A resilient distributed storage system designed around fault tolerance, leader election, and recovery.',
    impact:
      'Explored how reliability, timing, and distributed coordination come together in systems built for high availability.',
    stack: ['Go', 'Docker', 'Kubernetes', 'Next.js'],
    links: {
      github: 'https://github.com/MPcooray/ds-new.git',
    },
  },
  {
    id: 2,
    year: '2025',
    title: 'FormLang++',
    summary: 'A domain-specific language that turns structured definitions into validated, responsive HTML forms.',
    impact:
      'Focused on parsing, compiler thinking, and developer tooling by connecting grammar design with practical UI generation.',
    stack: ['C', 'Lex', 'Yacc', 'JavaScript'],
    links: {
      github: 'https://github.com/MPcooray/formlangProject.git',
      demo: 'https://youtu.be/GuhBaKSSqrw?si=MG_n2lmNh3BvXMte',
    },
  },
  {
    id: 3,
    year: '2024',
    title: 'Laboratory Management System',
    summary: 'An operations-focused platform for handling patients, tests, and inventory with role-based control.',
    impact:
      'Combined backend structure and product thinking to improve clarity, access management, and day-to-day workflow efficiency.',
    stack: ['Spring Boot', 'PostgreSQL', 'Next.js', 'TypeScript'],
  },
  {
    id: 4,
    year: '2023',
    title: 'AquaMonitor',
    summary: 'An IoT fish tank monitoring system tracking temperature, water level, and turbidity in real time.',
    impact:
      'Brought hardware and software together through sensors, ESP32 integration, and a connected monitoring dashboard.',
    stack: ['ESP32', 'Arduino IDE', 'Firebase', 'React'],
  },
]

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)

  return (
    <section id="projects" ref={ref} className="section-shell px-4 py-24 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl">
        <SectionReveal className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow">Selected work</span>
            <h2 className="section-title mt-6 text-4xl font-semibold text-[color:var(--text)] sm:text-5xl">
              Systems built with structure and intent.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-[color:var(--muted)]">
            These projects reflect the kind of work I enjoy most: solving practical problems,
            blending technical depth with usability, and building things that stay reliable under
            pressure.
          </p>
        </SectionReveal>

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TiltCard className="h-full rounded-[2rem]">
                <SpotlightCard className="glass-panel group h-full rounded-[2rem]">
                  <motion.button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    whileHover={{ y: -4 }}
                    className="h-full w-full rounded-[2rem] p-7 text-left"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs uppercase tracking-[0.24em] text-[color:var(--accent)]">
                        {project.year}
                      </span>
                      <motion.span
                        className="text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]"
                        initial={{ x: 0 }}
                        whileHover={{ x: 6 }}
                      >
                        Tap for details
                      </motion.span>
                    </div>
                    <h3 className="mt-6 text-2xl font-semibold text-[color:var(--text)]">
                      {project.title}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">
                      {project.summary}
                    </p>
                    <p className="mt-5 text-sm leading-7 text-[color:var(--text)]">{project.impact}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <motion.span
                          key={item}
                          whileHover={{ y: -2 }}
                          className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]"
                        >
                          {item}
                        </motion.span>
                      ))}
                    </div>
                  </motion.button>
                </SpotlightCard>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ opacity: 0, y: 32, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.98 }}
                className="glass-panel max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] p-8"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--accent)]">
                      {selectedProject.year}
                    </p>
                    <h3 className="mt-3 text-3xl font-semibold text-[color:var(--text)]">
                      {selectedProject.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="rounded-full border border-white/10 px-3 py-1 text-lg text-[color:var(--muted)]"
                    aria-label="Close project details"
                  >
                    ×
                  </button>
                </div>

                <p className="mt-6 text-lg leading-8 text-[color:var(--text)]">
                  {selectedProject.summary}
                </p>
                <p className="mt-5 text-sm leading-8 text-[color:var(--muted)]">
                  {selectedProject.impact}
                </p>

                <div className="mt-8">
                  <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--muted)]">
                    Stack
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {selectedProject.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[color:var(--border)] bg-white/5 px-4 py-2 text-sm text-[color:var(--text)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {(selectedProject.links?.github || selectedProject.links?.demo) && (
                  <div className="mt-8 flex flex-wrap gap-4">
                    {selectedProject.links?.github && (
                      <a
                        href={selectedProject.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-[color:var(--border-strong)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--text)]"
                      >
                        View Code
                      </a>
                    )}
                    {selectedProject.links?.demo && (
                      <a
                        href={selectedProject.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-[color:var(--accent)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-950"
                      >
                        Watch Demo
                      </a>
                    )}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
