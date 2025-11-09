'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { TiltCard } from './InteractiveEffects'

const projects = [
  {
    id: 1,
    title: 'AquaMonitor',
    description: 'IoT Fish Tank Monitoring System (2023)',
    details: 'Tracks temperature, water level, and turbidity of fish tanks. Built using ESP32 microcontroller, Arduino IDE, Firebase, and web app.',
    techStack: ['ESP32', 'Arduino IDE', 'Firebase', 'React'],
    features: [
      'Real-time temperature monitoring',
      'Water level tracking',
      'Turbidity measurement',
      'Web dashboard for data visualization'
    ],
  },
  {
    id: 2,
    title: 'Laboratory Management System',
    description: 'Efficient Patient, Test, and Inventory Management (2024)',
    details: 'Features role-based access for efficient management. Built using Spring Boot, PostgreSQL, and Next.js.',
    techStack: ['Spring Boot', 'PostgreSQL', 'Next.js', 'TypeScript'],
    features: [
      'Role-based access control',
      'Patient record management',
      'Test result tracking',
      'Inventory management'
    ],
    github: 'https://github.com/yourusername/lab-management',
    demo: 'https://lab-management-demo.com'
  },
  {
    id: 3,
    title: 'Early Accident Detection System',
    description: 'Innovative Safety Solution (2024)',
    details: 'Details to be added.',
    techStack: ['C++', 'ESP32', 'React'],
    features: [
      'Real-time accident detection',
      'Alert system',
      'Video analysis',
      'Emergency response integration'
    ],
    github: 'https://github.com/yourusername/accident-detection',
    demo: 'https://accident-detection-demo.com'
  },
  {
    id: 4,
    title: 'FormLang++',
    description: 'Domain-Specific Language for Dynamic HTML Form Generation (2025)',
    details: 'Generates responsive and validated HTML forms from a custom DSL using Flex (Lex) and Bison (Yacc).Includes real-time form validation, styling, and support for various input types like text, number, email, date, dropdown, file uploads, and more.',
    techStack: ['C', 'Lex & Yacc', 'HTML', 'JavaScript'],
    features: [
      'DSL Parsing',
      'EBNF grammar',
      'Semantic actions',
      'Client-side validation',
      'Modular design'
    ],
    github: 'https://github.com/MPcooray/formlangProject.git',
    demo: 'https://youtu.be/GuhBaKSSqrw?si=MG_n2lmNh3BvXMte'
  },
  {
    id: 5,
    title: 'Distributed File System',
    description: 'Fault-Tolerant, Replicated Storage System (2025)',
    details: 'A scalable and resilient distributed file system with automatic leader election, file replication, and fault recovery. Developed using Go (Golang) and Next.js (React), with custom time synchronization via NTP and Lamport clocks.',
    techStack: ['Go', 'Next.js', 'Docker', 'Kubernetes'],
    features: [
      'Automatic leader election',
      'File replication',
      'Fault recovery',
      'Time synchronization',
      'High availability'
    ],
    github: 'https://github.com/MPcooray/ds-new.git',
    demo: 'https://distributed-fs-demo.com'
  }
]

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  return (
    <section id="projects" ref={ref} className="min-h-screen flex items-center justify-center py-20 bg-black">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-white">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <TiltCard
              key={project.id}
              className="bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer hover:scale-105 hover:bg-gray-700 border border-gray-700 hover:border-blue-500/50 relative overflow-hidden group"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedProject(project)}
            >
              <h3 className="text-2xl font-semibold mb-2 text-blue-400">{project.title}</h3>
              <p className="text-gray-300 mb-4">{project.description}</p>
              <p className="text-gray-400 line-clamp-2">{project.details}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.techStack?.slice(0, 3).map((tech, i) => (
                  <span key={i} className="text-sm bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
                {project.techStack?.length > 3 && (
                  <span className="text-sm text-gray-400">+{project.techStack.length - 3} more</span>
                )}
              </div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={false}
              />
            </TiltCard>
          ))}
        </div>

        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-800 rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-3xl font-bold text-blue-400">{selectedProject.title}</h3>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-xl text-gray-300 mb-4">{selectedProject.description}</p>
                <p className="text-gray-400 mb-6">{selectedProject.details}</p>
                
                <div className="mb-6">
                  <h4 className="text-xl font-semibold text-white mb-3">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack?.map((tech, i) => (
                      <span key={i} className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-xl font-semibold text-white mb-3">Key Features</h4>
                  <ul className="list-disc list-inside space-y-2">
                    {selectedProject.features?.map((feature, i) => (
                      <li key={i} className="text-gray-300">{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-4">
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
                    >
                      View on GitHub
                    </a>
                  )}
                  {selectedProject.demo && (
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

