'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'manula-terminal-booted'

export default function BootSequence() {
  const [visible, setVisible] = useState(false)
  const [text, setText] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (window.sessionStorage.getItem(STORAGE_KEY)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.sessionStorage.setItem(STORAGE_KEY, '1')
      return
    }

    const stamp = new Date().toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    const script = `Last login: ${stamp} on ttys001\n[ ok ] session ready.\nguest@manula:~$ `
    let index = 0
    let finished = false
    let timer = 0
    let hideTimer = 0

    const finish = () => {
      if (finished) return
      finished = true
      window.clearInterval(timer)
      window.sessionStorage.setItem(STORAGE_KEY, '1')
      setDone(true)
      hideTimer = window.setTimeout(() => setVisible(false), 420)
    }

    setVisible(true)
    timer = window.setInterval(() => {
      index += 1
      setText(script.slice(0, index))
      if (index >= script.length) {
        window.clearInterval(timer)
        hideTimer = window.setTimeout(finish, 700)
      }
    }, 18)

    window.addEventListener('keydown', finish)
    window.addEventListener('pointerdown', finish)

    return () => {
      window.clearInterval(timer)
      window.clearTimeout(hideTimer)
      window.removeEventListener('keydown', finish)
      window.removeEventListener('pointerdown', finish)
    }
  }, [])

  if (!visible) return null

  return (
    <div className={`boot-screen ${done ? 'boot-screen-hide' : ''}`} role="status">
      <div className="mac-titlebar">
        <div className="mac-lights" aria-hidden="true">
          <span className="mac-dot mac-dot-close" />
          <span className="mac-dot mac-dot-min" />
          <span className="mac-dot mac-dot-zoom" />
        </div>
        <p className="mac-title">zsh — manula@portfolio</p>
      </div>
      <pre className="boot-copy">
        {text}
        <span className="prompt-caret" />
      </pre>
      <p className="boot-skip">press any key to skip</p>
    </div>
  )
}
