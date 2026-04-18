'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function MouseGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [mounted])

  if (!mounted || !isHovering) return null

  return (
    <motion.div
      className="pointer-events-none fixed z-0"
      style={{
        left: mousePosition.x,
        top: mousePosition.y,
        transform: 'translate(-50%, -50%)',
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 0.35 }}
      transition={{ type: 'spring', stiffness: 140, damping: 18 }}
    >
      <div className="h-80 w-80 rounded-full bg-[rgba(217,179,108,0.18)] blur-3xl" />
      <motion.div
        className="absolute inset-0 h-56 w-56 rounded-full bg-[rgba(75,106,92,0.16)] blur-2xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop
      const winHeightPx =
        document.documentElement.scrollHeight - document.documentElement.clientHeight
      setScrollProgress(scrollPx / winHeightPx)
    }

    window.addEventListener('scroll', updateScrollProgress)
    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [mounted])

  if (!mounted) return null

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[9999] h-[3px] origin-left bg-gradient-to-r from-[var(--track)] via-[var(--accent)] to-[var(--accent-strong)]"
      style={{ scaleX: scrollProgress }}
      initial={{ scaleX: 0 }}
    />
  )
}

export function MagneticButton({ children, className, ...props }: any) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const xSpring = useSpring(x, { damping: 15, stiffness: 150 })
  const ySpring = useSpring(y, { damping: 15, stiffness: 150 })

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((event.clientX - centerX) * 0.22)
    y.set((event.clientY - centerY) * 0.22)
  }

  return (
    <motion.div
      className={className}
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function TiltCard({ children, className, ...props }: any) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [scale, setScale] = useState(1)

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    setRotateX((event.clientY - centerY) / 14)
    setRotateY((centerX - event.clientX) / 14)
    setScale(1.015)
  }

  return (
    <motion.div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setRotateX(0)
        setRotateY(0)
        setScale(1)
      }}
      animate={{ rotateX, rotateY, scale }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      style={{ transformStyle: 'preserve-3d', perspective: '1200px' }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function SectionReveal({
  children,
  className,
  delay = 0,
  distance = 28,
}: {
  children: ReactNode
  className?: string
  delay?: number
  distance?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function FloatingOrb({
  className,
  duration = 7,
}: {
  className?: string
  duration?: number
}) {
  return (
    <motion.div
      aria-hidden="true"
      className={className}
      animate={{
        y: [0, -16, 0, 10, 0],
        x: [0, 10, -8, 0],
        scale: [1, 1.05, 0.98, 1],
      }}
      transition={{
        duration,
        ease: 'easeInOut',
        repeat: Infinity,
      }}
    />
  )
}

export function ScrollCue() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
      className="mt-12 flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]"
    >
      <span>Scroll to explore</span>
      <span className="relative flex h-10 w-6 items-start justify-center rounded-full border border-[color:var(--border-strong)]">
        <motion.span
          className="mt-2 h-2 w-2 rounded-full bg-[color:var(--accent)]"
          animate={{ y: [0, 12, 0], opacity: [0.9, 0.35, 0.9] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </span>
    </motion.div>
  )
}

export function SpotlightCard({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const x = useMotionValue(50)
  const y = useMotionValue(50)

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={(event) => {
        const rect = ref.current?.getBoundingClientRect()
        if (!rect) return
        x.set(((event.clientX - rect.left) / rect.width) * 100)
        y.set(((event.clientY - rect.top) / rect.height) * 100)
      }}
      style={{
        backgroundImage:
          'radial-gradient(circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(217,179,108,0.12), transparent 34%)',
        ['--spotlight-x' as string]: x,
        ['--spotlight-y' as string]: y,
      }}
    >
      {children}
    </motion.div>
  )
}

export function TypewriterText({
  text,
  className,
  speed = 36,
  startDelay = 250,
}: {
  text: string
  className?: string
  speed?: number
  startDelay?: number
}) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    setDisplayed('')
    let interval: number | undefined

    const startTimer = window.setTimeout(() => {
      let index = 0

      interval = window.setInterval(() => {
        index += 1
        setDisplayed(text.slice(0, index))

        if (index >= text.length) {
          window.clearInterval(interval)
        }
      }, speed)
    }, startDelay)

    return () => {
      window.clearTimeout(startTimer)
      if (interval) window.clearInterval(interval)
    }
  }, [speed, startDelay, text])

  const isComplete = displayed.length >= text.length

  return (
    <span className={className}>
      {displayed}
      <motion.span
        aria-hidden="true"
        className="ml-[0.04em] inline-block text-[color:var(--accent)]"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
      >
        {isComplete ? '' : '|'}
      </motion.span>
    </span>
  )
}
