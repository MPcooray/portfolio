'use client'

import { useEffect, useState } from 'react'

const swatches = ['#141414', '#e25b4a', '#e89a4a', '#e4d15a', '#3dcc78', '#5ec8b8', '#c49adf', '#8d9a90']

export default function TerminalStatus() {
  const [time, setTime] = useState('--:--:--')

  useEffect(() => {
    const tick = () => {
      setTime(new Date().toLocaleTimeString('en-GB', { hour12: false }))
    }

    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <footer className="terminal-status">
      <span className="live-dot">● live</span>
      <span className="hidden sm:inline">~</span>
      <span className="hidden sm:inline">portfolio</span>
      <span className="text-[color:var(--accent)]">green</span>
      <span className="swatches hidden sm:inline-flex" aria-hidden="true">
        {swatches.map((color) => (
          <i key={color} style={{ background: color }} />
        ))}
      </span>
      <span className="ml-auto tabular-nums text-[color:var(--text)]">{time}</span>
      <span className="hidden md:inline">tab complete · ↑ history</span>
    </footer>
  )
}
