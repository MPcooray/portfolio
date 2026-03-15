'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'Profile' },
  { id: 'projects', label: 'Work' },
  { id: 'achievements', label: 'Results' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24)

      const current = navItems.find((item) => {
        const element = document.getElementById(item.id)
        if (!element) return false

        const rect = element.getBoundingClientRect()
        return rect.top <= 140 && rect.bottom >= 140
      })

      setActiveSection(current?.id ?? 'home')
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (!element) return

    const offset = 92
    const elementPosition = element.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top: Math.max(0, elementPosition), behavior: 'smooth' })
    setActiveSection(sectionId)
    setIsOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.45 }}
      className="fixed inset-x-0 top-0 z-[100]"
    >
      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <div
          className={`rounded-full border px-4 py-3 transition-all duration-300 md:px-6 ${
            scrolled
              ? 'glass-panel border-[color:var(--border-strong)]'
              : 'border-transparent bg-transparent'
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => scrollToSection('home')}
              className="text-left"
              aria-label="Scroll to top"
            >
              <span className="block text-xs uppercase tracking-[0.35em] text-[color:var(--muted)]">
                Manula Cooray
              </span>
              <span className="block text-sm font-medium text-[color:var(--text)]">
                Athlete Engineer
              </span>
            </button>

            <div className="hidden items-center gap-2 md:flex">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative rounded-full px-4 py-2 text-sm ${
                    activeSection === item.id
                      ? 'text-[color:var(--text)]'
                      : 'text-[color:var(--muted)] hover:text-[color:var(--text)]'
                  }`}
                >
                  {activeSection === item.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full border border-[color:var(--border-strong)] bg-white/5"
                      transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              ))}
            </div>

            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border)] text-[color:var(--text)] md:hidden"
              onClick={() => setIsOpen((value) => !value)}
              aria-label="Toggle navigation"
            >
              <span className="text-lg">{isOpen ? '×' : '≡'}</span>
            </button>
          </div>

          {isOpen && (
            <div className="mt-4 space-y-2 border-t border-white/10 pt-4 md:hidden">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full rounded-2xl px-4 py-3 text-left text-sm ${
                    activeSection === item.id
                      ? 'bg-white/10 text-[color:var(--text)]'
                      : 'text-[color:var(--muted)]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  )
}
