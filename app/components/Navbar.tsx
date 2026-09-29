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

    const offset = 128
    const elementPosition = element.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top: Math.max(0, elementPosition), behavior: 'smooth' })
    setActiveSection(sectionId)
    setIsOpen(false)
  }

  const signal = (action: 'logout' | 'scanlines' | 'zoom') => {
    if (action === 'zoom') {
      if (!document.fullscreenElement) {
        void document.documentElement.requestFullscreen?.().catch(() => {
          window.dispatchEvent(new CustomEvent('mac-terminal', { detail: { action: 'zoom-failed' } }))
        })
      } else {
        void document.exitFullscreen?.()
      }
      return
    }

    if (action === 'scanlines') {
      document.body.classList.toggle('scanlines-off')
    }

    window.dispatchEvent(new CustomEvent('mac-terminal', { detail: { action } }))
  }

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.45 }}
      className={`fixed inset-x-0 top-0 z-[100] border-b border-[color:var(--border)] bg-[#07140f] ${
        scrolled ? 'shadow-[0_12px_40px_rgba(0,0,0,0.28)]' : ''
      }`}
    >
      <div className="mac-titlebar">
        <div className="mac-lights" aria-label="Window controls">
          <button type="button" className="mac-dot mac-dot-close" aria-label="Close session" onClick={() => signal('logout')}>
            <span aria-hidden="true">×</span>
          </button>
          <button type="button" className="mac-dot mac-dot-min" aria-label="Toggle scanlines" onClick={() => signal('scanlines')}>
            <span aria-hidden="true">−</span>
          </button>
          <button type="button" className="mac-dot mac-dot-zoom" aria-label="Toggle fullscreen" onClick={() => signal('zoom')}>
            <span aria-hidden="true">+</span>
          </button>
        </div>
        <p className="mac-title">
          <span className="sm:hidden">zsh — portfolio</span>
          <span className="hidden sm:inline">zsh — manula@portfolio</span>
        </p>
        <button
          className="ml-auto inline-flex h-8 items-center border border-[color:var(--border)] px-3 text-xs text-[color:var(--accent)] md:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {isOpen ? '[ close ]' : '[ menu ]'}
        </button>
      </div>
      <div className="mx-auto hidden max-w-7xl items-center gap-1 px-4 py-2 md:flex lg:px-8">
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

      {isOpen && (
        <div className="space-y-1 border-t border-[color:var(--border)] px-4 py-3 md:hidden">
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
    </motion.nav>
  )
}

function isActiveItem(
  item: (typeof navItems)[number],
  pathname: string,
  activeSection: string
) {
  if (item.type === 'route') {
    const path = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname
    return path === item.href
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
  const classes = `relative px-3 py-2 text-sm ${
    active
      ? 'text-[color:var(--accent)]'
      : 'text-[color:var(--muted)] hover:text-[color:var(--text)]'
  }`

  const content = <span className="relative z-10">{active ? `[ ${item.label} ]` : item.label}</span>

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
  const classes = `block w-full px-3 py-2 text-left text-sm ${
    active ? 'text-[color:var(--accent)]' : 'text-[color:var(--muted)]'
  }`

  if (item.type === 'route') {
    return (
      <Link href={item.href} className={classes} onClick={onClose}>
        {active ? `[ ${item.label} ]` : item.label}
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
      {active ? `[ ${item.label} ]` : item.label}
    </button>
  )
}
