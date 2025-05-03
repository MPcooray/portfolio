'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center py-20 bg-black">
      <motion.div
        className="max-w-4xl mx-auto px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold mb-8 text-center text-white">Get in Touch</h2>
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold mb-4 text-blue-400">Contact Information</h3>
            <p className="flex items-center text-gray-300">
              <span className="mr-2" aria-hidden="true">📧</span>
              <a href="mailto:manulacooray@gmail.com" className="hover:text-blue-400 transition-colors">
                manulacooray@gmail.com
              </a>
            </p>
            <p className="flex items-center text-gray-300">
              <span className="mr-2" aria-hidden="true">📞</span>
              <span>+94 70 255 7227</span>
            </p>
            <p className="flex items-start text-gray-300">
              <span className="mr-2 mt-1" aria-hidden="true">📍</span>
              <span>03, Korathota, Mahadeniya, Athurugiriya</span>
            </p>
            <p className="flex items-center text-gray-300">
              <span className="mr-2" aria-hidden="true">🌐</span>
              <a href="https://www.linkedin.com/in/manula-cooray-b5bb862b2/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                LinkedIn Profile
              </a>
            </p>
            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-2 text-blue-400">Languages</h4>
              <p className="text-gray-300">English, Sinhala</p>
            </div>
          </div>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
                required
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </section>
  )
}

