'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import emailjs from '@emailjs/browser'

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const serviceId = 'service_coio5dg' // Replace with your Service ID
    const templateId = 'template_e8emuyj' // Replace with your Template ID
    const publicKey = 'ZezWzT3g_XSdTUnxx' // Replace with your Public Key

    emailjs.sendForm(serviceId, templateId, e.currentTarget as HTMLFormElement, publicKey)
      .then((result) => {
        console.log('Email sent successfully!', result.text)
        alert('Your message has been sent!')
        setFormData({
          name: '',
          email: '',
          message: ''
        })
      }, (error: any) => {
        const errorMessage = error?.text || error?.message || 'Unknown error'
        console.error('Error sending email:', errorMessage)
        alert('Failed to send message. Please try again.')
      })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <section id="contact" ref={ref} className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-blue-900/20 to-gray-900" />

      <motion.div
        className="max-w-4xl mx-auto px-4 relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold mb-12 text-center text-white">
          Get in Touch
          <div className="w-24 h-1 bg-blue-400 mx-auto mt-4 rounded-full" />
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-blue-500/20">
              <h3 className="text-2xl font-semibold mb-6 text-blue-400">Contact Information</h3>
              <div className="space-y-4">
                <motion.a
                  href="mailto:manulacooray@gmail.com"
                  className="flex items-center text-gray-300 hover:text-blue-400 transition-colors group"
                  whileHover={{ x: 5 }}
                >
                  <span className="mr-3 text-blue-400 group-hover:scale-110 transition-transform">📧</span>
                  manulacooray@gmail.com
                </motion.a>
                <motion.p
                  className="flex items-center text-gray-300 group"
                  whileHover={{ x: 5 }}
                >
                  <span className="mr-3 text-blue-400 group-hover:scale-110 transition-transform">📞</span>
                  +94 70 255 7227
                </motion.p>
                <motion.p
                  className="flex items-start text-gray-300 group"
                  whileHover={{ x: 5 }}
                >
                  <span className="mr-3 text-blue-400 group-hover:scale-110 transition-transform mt-1">📍</span>
                  <span>03, Korathota, Mahadeniya, Athurugiriya</span>
                </motion.p>
                <motion.a
                  href="https://www.linkedin.com/in/manula-cooray-b5bb862b2/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-300 hover:text-blue-400 transition-colors group"
                  whileHover={{ x: 5 }}
                >
                  <span className="mr-3 text-blue-400 group-hover:scale-110 transition-transform">🌐</span>
                  LinkedIn Profile
                </motion.a>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-blue-500/20">
              <h4 className="text-xl font-semibold mb-4 text-blue-400">Languages</h4>
              <div className="flex gap-4">
                <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full">English</span>
                <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full">Sinhala</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6" suppressHydrationWarning>
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-blue-500/20">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-900/50 border border-blue-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-colors"
                      required
                      suppressHydrationWarning
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
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-900/50 border border-blue-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-colors"
                      required
                      suppressHydrationWarning
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 bg-gray-900/50 border border-blue-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-colors resize-none"
                      required
                      suppressHydrationWarning
                    />
                  </div>
                </div>
              </div>

              <motion.button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

