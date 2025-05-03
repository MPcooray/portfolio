'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function Achievements() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const swimmingAchievements = [
    "South Asian Age Group Championship (2016): 3rd Place",
    "Asian Age Groups, Uzbekistan (2017): Selected",
    "Princess Chulabon Swimming Championship, Thailand (2017)",
    "Milo/Pram Malaysia Invitational Age Group Swimming Championship (2018)",
    "National Pool (2019)",
    "Multiple Colors and Merits from 2016 to 2024"
  ]

  const leadershipAchievements = [
    "Vice Captain (2024): SLIIT Swimming Team",
    "Junior Vice Captain (2019) and Captain (2020): Ananda College Swimming Team"
  ]

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center py-24 bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto px-4"
      >
        <h2 className="text-4xl font-bold mb-12 text-white text-center">Achievements</h2>
        <div className="mb-12">
          <h3 className="text-3xl font-semibold mb-6 text-blue-400 text-center">Honors & Awards</h3>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <h4 className="text-2xl font-semibold mb-4 text-white">Swimming Achievements</h4>
              <ul className="space-y-2">
                {swimmingAchievements.map((achievement, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start text-gray-300"
                    initial={{ opacity: 0, x: -50 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <span className="text-blue-400 mr-2">•</span>
                    <span>{achievement}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2">
              <h4 className="text-2xl font-semibold mb-4 text-white">Leadership</h4>
              <ul className="space-y-2">
                {leadershipAchievements.map((achievement, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start text-gray-300"
                    initial={{ opacity: 0, x: 50 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <span className="text-blue-400 mr-2">•</span>
                    <span>{achievement}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

