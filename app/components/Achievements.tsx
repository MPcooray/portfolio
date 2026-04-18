'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { SectionReveal, TiltCard } from './InteractiveEffects'

const swimming = [
  'South Asian Age Group Championship 2016, 3rd place',
  'Selected for Asian Age Groups in Uzbekistan, 2017',
  'Competed in Princess Chulabhorn Swimming Championship, Thailand, 2017',
  'Competed in Milo Malaysia Invitational Age Group Championship, 2018',
  'National pool competition experience, 2019',
  'Multiple colours and merits earned across 2016 to 2024',
]

const leadership = [
  'Sport Council President at SLIIT',
  'Captain of the SLIIT Swimming Team',
  'Vice Captain of the SLIIT Swimming Team in 2024',
  'Junior Vice Captain in 2019 and Captain in 2020 at Ananda College Swimming Team',
]

export default function Achievements() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section id="achievements" ref={ref} className="section-shell px-4 py-24 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl">
        <div className="glass-panel relative overflow-hidden rounded-[2.25rem] p-6 sm:p-8 lg:p-10">
          <div className="absolute inset-0">
            <motion.div
              className="absolute inset-0"
              animate={{ scale: [1, 1.04, 1], y: [0, -10, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Image
                src="/swim1.jpg"
                alt="Manula competing in swimming"
                fill
                className="object-cover opacity-20"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b1116] via-[#0b1116]/92 to-[#0b1116]/70" />
          </div>

          <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <SectionReveal>
              <span className="eyebrow">Results and leadership</span>
              <h2 className="section-title mt-6 text-4xl font-semibold text-[color:var(--text)] sm:text-5xl">
                Performance built long before race day.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-[color:var(--muted)]">
                Sport gave me more than medals. It taught me pacing, standards, recovery, and the
                responsibility of leading by example. That same mindset shapes how I learn, build,
                and collaborate.
              </p>
            </SectionReveal>

            <div className="grid gap-6">
              <TiltCard>
                <motion.div
                initial={{ opacity: 0, x: 28 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="rounded-[1.8rem] border border-white/10 bg-black/20 p-6"
              >
                <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--accent)]">
                  Swimming
                </p>
                <div className="mt-5 space-y-4">
                  {swimming.map((item) => (
                    <div key={item} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-[color:var(--accent)]" />
                      <p className="text-sm leading-7 text-[color:var(--text)]">{item}</p>
                    </div>
                  ))}
                </div>
                </motion.div>
              </TiltCard>

              <TiltCard>
                <motion.div
                initial={{ opacity: 0, x: 28 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-[1.8rem] border border-white/10 bg-black/20 p-6"
              >
                <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--accent)]">
                  Leadership
                </p>
                <div className="mt-5 space-y-4">
                  {leadership.map((item) => (
                    <div key={item} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-[color:var(--track)]" />
                      <p className="text-sm leading-7 text-[color:var(--text)]">{item}</p>
                    </div>
                  ))}
                </div>
                </motion.div>
              </TiltCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
