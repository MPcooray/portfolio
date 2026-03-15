'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'

const details = [
  { label: 'Email', value: 'manulacooray@gmail.com', href: 'mailto:manulacooray@gmail.com' },
  { label: 'Phone', value: '+94 70 255 7227', href: 'tel:+94702557227' },
  {
    label: 'LinkedIn',
    value: 'View LinkedIn profile',
    note: '@manula-cooray-b5bb862b2',
    href: 'https://www.linkedin.com/in/manula-cooray-b5bb862b2/',
  },
  { label: 'Languages', value: 'English / Sinhala' },
]

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSending, setIsSending] = useState(false)
  const [status, setStatus] = useState<{
    type: 'idle' | 'success' | 'error'
    message: string
  }>({ type: 'idle', message: '' })

  const openMailFallback = () => {
    const subject = encodeURIComponent(`Portfolio inquiry from ${formData.name}`)
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )
    window.location.href = `mailto:manulacooray@gmail.com?subject=${subject}&body=${body}`
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSending(true)
    setStatus({ type: 'idle', message: '' })

    const serviceId = 'service_coio5dg'
    const templateId = 'template_e8emuyj'
    const publicKey = 'ZezWzT3g_XSdTUnxx'
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      reply_to: formData.email,
      sender_name: formData.name,
      sender_email: formData.email,
      user_name: formData.name,
      user_email: formData.email,
      message: formData.message,
      user_message: formData.message,
      subject: `Portfolio inquiry from ${formData.name}`,
      to_name: 'Manula Cooray',
    }

    try {
      const emailjs = (await import('@emailjs/browser')).default
      await emailjs.send(serviceId, templateId, templateParams, publicKey)
      setFormData({ name: '', email: '', message: '' })
      setStatus({ type: 'success', message: 'Your message has been sent successfully.' })
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      console.warn('Email send fallback used:', message)
      setStatus({
        type: 'error',
        message:
          'Direct sending is unavailable right now. Your email app will open so you can send it manually.',
      })
      openMailFallback()
    } finally {
      setIsSending(false)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setFormData((previous) => ({ ...previous, [name]: value }))
  }

  return (
    <section id="contact" ref={ref} className="section-shell px-4 py-24 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="glass-panel rounded-[2rem] p-8"
          >
            <span className="eyebrow">Contact</span>
            <h2 className="section-title mt-6 text-4xl font-semibold text-[color:var(--text)] sm:text-5xl">
              Let&apos;s build something with standards.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-[color:var(--muted)]">
              I&apos;m open to conversations around software engineering, embedded systems, product
              building, and collaborative opportunities where discipline and execution matter.
            </p>

            <div className="mt-10 space-y-4">
              {details.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.4rem] border border-white/10 bg-black/20 px-5 py-4"
                >
                  <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="mt-2 inline-flex items-center gap-3 text-base text-[color:var(--text)] hover:text-[color:var(--accent)]"
                    >
                      {item.value}
                      {item.label === 'LinkedIn' && (
                        <span className="rounded-full border border-[color:var(--border)] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                          Open
                        </span>
                      )}
                    </a>
                  ) : (
                    <p className="mt-2 text-base text-[color:var(--text)]">{item.value}</p>
                  )}
                  {'note' in item && item.note ? (
                    <p className="mt-2 text-sm text-[color:var(--muted)]">{item.note}</p>
                  ) : null}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="glass-panel rounded-[2rem] p-8"
          >
            <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--muted)]">
              Send a message
            </p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-5" suppressHydrationWarning>
              <div>
                <label htmlFor="name" className="mb-2 block text-sm text-[color:var(--muted)]">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  suppressHydrationWarning
                  className="w-full rounded-[1rem] border border-[color:var(--border)] bg-black/20 px-4 py-3 text-[color:var(--text)] outline-none focus:border-[color:var(--accent)]"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm text-[color:var(--muted)]">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  suppressHydrationWarning
                  className="w-full rounded-[1rem] border border-[color:var(--border)] bg-black/20 px-4 py-3 text-[color:var(--text)] outline-none focus:border-[color:var(--accent)]"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm text-[color:var(--muted)]">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  suppressHydrationWarning
                  className="w-full rounded-[1rem] border border-[color:var(--border)] bg-black/20 px-4 py-3 text-[color:var(--text)] outline-none focus:border-[color:var(--accent)]"
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="rounded-full bg-[color:var(--accent)] px-7 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-slate-950"
              >
                {isSending ? 'Sending...' : 'Send Message'}
              </button>

              {status.type !== 'idle' && (
                <div
                  className={`rounded-[1rem] border px-4 py-3 text-sm leading-7 ${
                    status.type === 'success'
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200'
                      : 'border-amber-500/30 bg-amber-500/10 text-amber-100'
                  }`}
                >
                  {status.message}
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
