'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function LightningEffect() {
  const [mounted, setMounted] = useState(false)
  const [lightningPositions, setLightningPositions] = useState<Array<{ x: number; y: number; id: number; rotation: number }>>([])
  const [particleData, setParticleData] = useState<Array<{ left: number; top: number; duration: number; delay: number }>>([])

  useEffect(() => {
    setMounted(true)
    // Generate particle positions only on client
    setParticleData(
      Array.from({ length: 20 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 2 + Math.random() * 2,
        delay: Math.random() * 2,
      }))
    )
  }, [])

  useEffect(() => {
    if (!mounted) return

    const createLightning = () => {
      const newLightning = {
        id: Date.now(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        rotation: Math.random() * 360,
      }
      setLightningPositions(prev => [...prev, newLightning])

      setTimeout(() => {
        setLightningPositions(prev => prev.filter(l => l.id !== newLightning.id))
      }, 300 + Math.random() * 200)
    }

    const interval = setInterval(() => {
      if (Math.random() > 0.3) {
        createLightning()
      }
    }, 1000 + Math.random() * 2000)

    return () => clearInterval(interval)
  }, [mounted])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-[1] overflow-hidden">
      {lightningPositions.map((lightning) => (
        <motion.div
          key={lightning.id}
          className="absolute"
          style={{
            left: `${lightning.x}%`,
            top: `${lightning.y}%`,
            width: '4px',
            height: '150px',
            background: 'linear-gradient(to bottom, transparent, #60a5fa, #3b82f6, #8b5cf6, transparent)',
            boxShadow: '0 0 20px #60a5fa, 0 0 40px #3b82f6, 0 0 60px #8b5cf6',
            transform: `rotate(${lightning.rotation || 0}deg)`,
            transformOrigin: 'top center',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 1, 0.8, 0], scale: [0, 1, 1.3, 1.1, 0] }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Lightning branch 1 */}
          <motion.div
            className="absolute"
            style={{
              top: '30%',
              left: '50%',
              width: '1px',
              height: '40px',
              background: 'linear-gradient(to bottom, transparent, #8b5cf6, transparent)',
              boxShadow: '0 0 5px #8b5cf6',
              transform: 'rotate(45deg)',
              transformOrigin: 'top center',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.2, delay: 0.1 }}
          />
          {/* Lightning branch 2 */}
          <motion.div
            className="absolute"
            style={{
              top: '60%',
              left: '50%',
              width: '1px',
              height: '30px',
              background: 'linear-gradient(to bottom, transparent, #60a5fa, transparent)',
              boxShadow: '0 0 5px #60a5fa',
              transform: 'rotate(-45deg)',
              transformOrigin: 'top center',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.2, delay: 0.15 }}
          />
        </motion.div>
      ))}
      
      {/* Glowing particles */}
      {mounted && particleData.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400 rounded-full"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            boxShadow: '0 0 15px #60a5fa, 0 0 30px #3b82f6',
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.3, 1.5, 0.3],
            x: [0, Math.sin(i) * 20, 0],
            y: [0, Math.cos(i) * 20, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
      
      {/* Floating orbs */}
      {mounted && Array.from({ length: 5 }).map((_, i) => {
        const orbData = particleData[i] || { left: 0, top: 0, duration: 3, delay: 0 }
        return (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${orbData.left}%`,
              top: `${orbData.top}%`,
              width: '100px',
              height: '100px',
              background: 'radial-gradient(circle, rgba(96, 165, 250, 0.3), rgba(139, 92, 246, 0.1))',
              filter: 'blur(40px)',
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
              x: [0, Math.sin(i * 2) * 100, 0],
              y: [0, Math.cos(i * 2) * 100, 0],
            }}
            transition={{
              duration: orbData.duration * 2,
              repeat: Infinity,
              delay: orbData.delay,
              ease: 'easeInOut',
            }}
          />
        )
      })}
    </div>
  )
}

