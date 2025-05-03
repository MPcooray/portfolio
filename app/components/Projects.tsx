'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const projects = [
  {
    id: 1,
    title: 'AquaMonitor',
    description: 'IoT Fish Tank Monitoring System (2023)',
    details: 'Tracks temperature, water level, and turbidity of fish tanks. Built using ESP32 microcontroller, Arduino IDE, Firebase, and web app.'
  },
  {
    id: 2,
    title: 'Laboratory Management System',
    description: 'Efficient Patient, Test, and Inventory Management (2024)',
    details: 'Features role-based access for efficient management. Built using Spring Boot, PostgreSQL, and Next.js.'
  },
  {
    id: 3,
    title: 'Early Accident Detection System',
    description: 'Innovative Safety Solution (2024)',
    details: 'Details to be added.'
  }
]

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center py-20 bg-black">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-white">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-2xl font-semibold mb-2 text-blue-400">{project.title}</h3>
              <p className="text-gray-300 mb-4">{project.description}</p>
              <p className="text-gray-400">{project.details}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

