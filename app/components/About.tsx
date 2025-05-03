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
    'C', 'C++', 'Java', 'MySQL', 'PostgreSQL', 'HTML', 'CSS',
    'Creativity', 'Digital Marketing', 'Negotiation', 'Critical Thinking', 'Leadership'
  ]

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center py-24 bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto px-4"
      >
        <h2 className="text-4xl font-bold mb-12 text-white text-center">About Me</h2>
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="md:w-1/3">
            <Image
              src="/me.jpg"
              width={300}
              height={300}
              alt="Manula Cooray"
              className="rounded-lg shadow-lg mx-auto"
              priority
            />
          </div>
          <div className="md:w-2/3">
            <p className="text-gray-300 leading-relaxed mb-8">
              I am an enthusiastic and driven Computer Science and Electrical & Electronics Engineering student with a passion for turning innovative ideas into reality. An extrovert by nature, I thrive in dynamic environments that challenge my problem-solving skills and push me to learn and grow. I value integrity, teamwork, and hard work, and I&apos;m always on the lookout for opportunities to make an impact through technology. Whether it's designing complex systems, tackling tough challenges, or leading a team to success, I approach every endeavor with curiosity and determination.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
          <h3 
  className="text-2xl font-semibold mb-4 text-blue-400" style={{ textAlign: "justify" }}>Education</h3>
            <ul className="space-y-4 text-gray-300">
              <li>
                <p className="font-semibold">BSc (Hons) in Computer Science</p>
                <p>Sri Lanka Institute of Information Technology (SLIIT), 2023–2027</p>
              </li>
              <li>
                <p className="font-semibold">BEng (Hons) in Electrical and Electronic Engineering</p>
                <p>University of the West of England, 2024–2025</p>
              </li>
              <li>
                <p className="font-semibold">Higher Diploma in Engineering Technology</p>
                <p>University of the West of England, 2023–2024</p>
              </li>
              <li>
                <p className="font-semibold">G.C.E. Advanced Level Examination (Physical Science Stream)</p>
                <p>Ananda College, Colombo 10, 2008–2022</p>
              </li>
            </ul>
          </div>
          <div className="md:w-1/2">
            <h3 className="text-2xl font-semibold mb-4 text-blue-400">Skills</h3>
            <div className="flex flex-wrap gap-4">
              {skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  className="bg-blue-500 text-white px-3 py-1 rounded-full"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

