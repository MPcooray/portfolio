'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    setMessages([
      {
        id: 1,
        text: "Hi, I'm Manula's assistant. Ask about his studies, projects, swimming background, leadership, or the roles he's interested in.",
        sender: 'bot',
        timestamp: new Date(),
      },
    ])
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase().trim()

    if (
      message.includes('education') ||
      message.includes('qualification') ||
      message.includes('degree') ||
      message.includes('study')
    ) {
      return (
        "Manula's education includes:\n\n" +
        "• BSc (Hons) in Computer Science at SLIIT\n" +
        "• BEng (Hons) in Electrical and Electronic Engineering at UWE\n" +
        "• MSc in Artificial Intelligence at Anglia Ruskin University\n\n" +
        'He is intentionally combining software, electronics, and AI into one practical foundation.'
      )
    }

    if (
      message.includes('swimming') ||
      message.includes('sport') ||
      message.includes('captain') ||
      message.includes('leadership') ||
      message.includes('achievement')
    ) {
      return (
        "Manula's athlete background includes international age-group competition, national-level experience, and leadership roles including Sport Council President and swimming team captain at SLIIT."
      )
    }

    if (
      message.includes('project') ||
      message.includes('work') ||
      message.includes('build') ||
      message.includes('system')
    ) {
      return (
        'His portfolio highlights a distributed file system, a domain-specific language for dynamic form generation, a laboratory management platform, and an IoT monitoring system.'
      )
    }

    if (
      message.includes('job') ||
      message.includes('career') ||
      message.includes('role') ||
      message.includes('interested')
    ) {
      return (
        'Manula is especially interested in software engineering, embedded systems, and opportunities where technical depth, discipline, and teamwork matter.'
      )
    }

    if (message.match(/^(hi|hello|hey|good morning|good afternoon|good evening)/)) {
      return 'Hello. You can ask me about Manula’s studies, projects, athletic background, or career interests.'
    }

    if (message.match(/(thank|thanks)/)) {
      return 'Happy to help. Ask anything else you want to know about Manula.'
    }

    return 'I can help with Manula’s education, projects, swimming journey, leadership roles, and career direction.'
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((previous) => [...previous, userMessage])
    setInput('')

    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getBotResponse(input),
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages((previous) => [...previous, botResponse])
    }, 350)
  }

  if (!mounted) return null

  return (
    <>
      <motion.button
        onClick={() => setIsOpen((value) => !value)}
        className="fixed bottom-6 right-6 z-[9999] flex h-14 w-14 items-center justify-center rounded-full border border-[color:var(--border-strong)] bg-[rgba(15,23,31,0.94)] text-[color:var(--text)] shadow-[0_18px_50px_rgba(0,0,0,0.28)]"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        aria-label="Open chatbot"
      >
        {isOpen ? (
          <span className="text-xl leading-none">×</span>
        ) : (
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 10h8" />
            <path d="M8 14h5" />
            <path d="M12 3C7.582 3 4 6.134 4 10c0 2.07 1.027 3.93 2.66 5.211V20l3.064-2.043c.738.18 1.497.272 2.276.272 4.418 0 8-3.134 8-7s-3.582-8-8-8Z" />
          </svg>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            className="fixed bottom-24 right-4 z-[9999] flex h-[500px] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-[1.75rem] border border-[color:var(--border-strong)] bg-[rgba(13,19,25,0.96)] shadow-[0_28px_80px_rgba(0,0,0,0.38)] backdrop-blur-xl"
          >
            <div className="border-b border-white/10 px-5 py-4">
              <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">
                Manula&apos;s Assistant
              </p>
              <p className="mt-2 text-sm text-[color:var(--text)]">
                Quick answers about work, sport, study, and leadership.
              </p>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-7 ${
                      message.sender === 'user'
                        ? 'bg-[var(--accent)] text-slate-950'
                        : 'bg-white/6 text-[color:var(--text)]'
                    }`}
                  >
                    <p className="whitespace-pre-line">{message.text}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-white/10 p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                      event.preventDefault()
                      handleSend()
                    }
                  }}
                  placeholder="Ask something about Manula"
                  className="flex-1 rounded-full border border-[color:var(--border)] bg-black/20 px-4 py-3 text-sm text-[color:var(--text)] outline-none focus:border-[color:var(--accent)]"
                />
                <button
                  onClick={handleSend}
                  className="rounded-full bg-[var(--accent)] px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-slate-950"
                >
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
