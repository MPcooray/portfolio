'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const skills = [
    { name: 'C', category: 'Programming' },
    { name: 'C++', category: 'Programming' },
    { name: 'Java', category: 'Programming' },
    { name: 'MySQL', category: 'Database' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'HTML', category: 'Web' },
    { name: 'CSS', category: 'Web' },
    { name: 'Creativity', category: 'Soft Skills' },
    { name: 'Digital Marketing', category: 'Soft Skills' },
    { name: 'Negotiation', category: 'Soft Skills' },
    { name: 'Critical Thinking', category: 'Soft Skills' },
    { name: 'Leadership', category: 'Soft Skills' }
  ]

  const categories = [...new Set(skills.map(skill => skill.category))]

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-blue-900/20 to-gray-900" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto px-4 relative z-10"
      >
        <h2 className="text-4xl font-bold mb-12 text-white text-center">
          About Me
          <div className="w-24 h-1 bg-blue-400 mx-auto mt-4 rounded-full" />
        </h2>

        <div className="flex flex-col md:flex-row gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-1/3"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur-2xl opacity-50 animate-pulse" />
              <Image
                src="/me.jpg"
                width={300}
                height={300}
                alt="Manula Cooray"
                className="rounded-lg shadow-lg mx-auto relative z-10 border-4 border-blue-500/20 object-cover"
                priority
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="md:w-2/3"
          >
            <p className="text-gray-300 leading-relaxed mb-8 text-lg">
              I am an enthusiastic and driven Computer Science and Electrical & Electronics Engineering student with a passion for turning innovative ideas into reality. An extrovert by nature, I thrive in dynamic environments that challenge my problem-solving skills and push me to learn and grow. I value integrity, teamwork, and hard work, and I&apos;m always on the lookout for opportunities to make an impact through technology. Whether it's designing complex systems, tackling tough challenges, or leading a team to success, I approach every endeavor with curiosity and determination.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="text-2xl font-semibold mb-6 text-blue-400">Education</h3>
            <div className="space-y-6">
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-colors">
                <h4 className="text-xl font-semibold text-white mb-2">BSc (Hons) in Computer Science</h4>
                <p className="text-gray-300">Sri Lanka Institute of Information Technology (SLIIT)</p>
                <p className="text-blue-400">2023–2027</p>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-colors">
                <h4 className="text-xl font-semibold text-white mb-2">BEng (Hons) in Electrical and Electronic Engineering</h4>
                <p className="text-gray-300">University of the West of England</p>
                <p className="text-blue-400">2024–2025</p>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-colors">
                <h4 className="text-xl font-semibold text-white mb-2">Higher Diploma in Engineering Technology</h4>
                <p className="text-gray-300">University of the West of England</p>
                <p className="text-blue-400">2023–2024</p>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-colors">
                <h4 className="text-xl font-semibold text-white mb-2">G.C.E. Advanced Level Examination</h4>
                <p className="text-gray-300">Ananda College, Colombo 10</p>
                <p className="text-blue-400">2008–2022</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h3 className="text-2xl font-semibold mb-6 text-blue-400">Skills</h3>
            <div className="space-y-6">
              {categories.map((category, index) => (
                <div key={category} className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-blue-500/20">
                  <h4 className="text-xl font-semibold text-white mb-4">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills
                      .filter(skill => skill.category === category)
                      .map((skill, i) => (
                        <motion.span
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={inView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ duration: 0.5, delay: 0.1 * i }}
                          className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm"
                        >
                          {skill.name}
                        </motion.span>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

