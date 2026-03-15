'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

const navItems = [
  { id: 'home', label: 'Home', type: 'section' as const },
  { id: 'about', label: 'Profile', type: 'section' as const },
  { id: 'story', label: 'Story', type: 'section' as const },
  { id: 'projects', label: 'Work', type: 'section' as const },
  { id: 'achievements', label: 'Results', type: 'section' as const },
  { id: 'contact', label: 'Contact', type: 'section' as const },
  { id: 'blog', label: 'Journal', type: 'route' as const, href: '/blog' },
]

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  useEffect(() => {
    if (!isHomePage) {
      setScrolled(true)
      return
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 24)

      const current = navItems
        .filter((item) => item.type === 'section')
        .find((item) => {
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
  }, [isHomePage])

  const scrollToSection = (sectionId: string) => {
    if (!isHomePage) {
      window.location.href = sectionId === 'home' ? '/' : `/#${sectionId}`
      return
    }

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
                <NavItem
                  key={item.id}
                  item={item}
                  activeSection={activeSection}
                  pathname={pathname}
                  onSectionClick={scrollToSection}
                />
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
                <MobileNavItem
                  key={item.id}
                  item={item}
                  activeSection={activeSection}
                  pathname={pathname}
                  onSectionClick={scrollToSection}
                  onClose={() => setIsOpen(false)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  )
}

function isActiveItem(
  item: (typeof navItems)[number],
  pathname: string,
  activeSection: string
) {
  if (item.type === 'route') {
    return pathname === item.href
  }

  return pathname === '/' && activeSection === item.id
}

function NavItem({
  item,
  activeSection,
  pathname,
  onSectionClick,
}: {
  item: (typeof navItems)[number]
  activeSection: string
  pathname: string
  onSectionClick: (sectionId: string) => void
}) {
  const active = isActiveItem(item, pathname, activeSection)
  const classes = `relative rounded-full px-4 py-2 text-sm ${
    active
      ? 'text-[color:var(--text)]'
      : 'text-[color:var(--muted)] hover:text-[color:var(--text)]'
  }`

  const content = (
    <>
      {active && (
        <motion.span
          layoutId="nav-pill"
          className="absolute inset-0 rounded-full border border-[color:var(--border-strong)] bg-white/5"
          transition={{ type: 'spring', stiffness: 380, damping: 34 }}
        />
      )}
      <span className="relative z-10">{item.label}</span>
    </>
  )

  if (item.type === 'route') {
    return (
      <Link href={item.href} className={classes}>
        {content}
      </Link>
    )
  }

  return (
    <button onClick={() => onSectionClick(item.id)} className={classes}>
      {content}
    </button>
  )
}

function MobileNavItem({
  item,
  activeSection,
  pathname,
  onSectionClick,
  onClose,
}: {
  item: (typeof navItems)[number]
  activeSection: string
  pathname: string
  onSectionClick: (sectionId: string) => void
  onClose: () => void
}) {
  const active = isActiveItem(item, pathname, activeSection)
  const classes = `block w-full rounded-2xl px-4 py-3 text-left text-sm ${
    active ? 'bg-white/10 text-[color:var(--text)]' : 'text-[color:var(--muted)]'
  }`

  if (item.type === 'route') {
    return (
      <Link href={item.href} className={classes} onClick={onClose}>
        {item.label}
      </Link>
    )
  }

  return (
    <button
      onClick={() => {
        onSectionClick(item.id)
        onClose()
      }}
      className={classes}
    >
      {item.label}
    </button>
  )
}
