'use client'

import { useEffect, useState } from 'react'
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

  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((event.clientX - centerX) * 0.22)
    y.set((event.clientY - centerY) * 0.22)
  }

  return (
    <motion.button
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
    </motion.button>
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
