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
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    setMessages([
      {
        id: 1,
        text: "Hi, I'm Manula's assistant. Ask about his story, education, projects, swimming journey, leadership roles, or career direction.",
        sender: 'bot',
        timestamp: new Date(),
      },
    ])
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isSending) return

    const currentInput = input
    const userMessage: Message = {
      id: messages.length + 1,
      text: currentInput,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((previous) => [...previous, userMessage])
    setInput('')
    setIsSending(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: currentInput }),
      })

      const data = await response.json()

      const botResponse: Message = {
        id: userMessage.id + 1,
        text:
          typeof data?.text === 'string' && data.text.trim()
            ? data.text
            : data?.error || 'The assistant could not answer right now. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
      }

      setMessages((previous) => [...previous, botResponse])
    } catch {
      setMessages((previous) => [
        ...previous,
        {
          id: userMessage.id + 1,
          text: 'The assistant could not connect right now. Please try again in a moment.',
          sender: 'bot',
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsSending(false)
    }
  }

  if (!mounted) return null

  return (
    <>
      <motion.button
        onClick={() => setIsOpen((value) => !value)}
        className="fixed bottom-1 right-2 z-[100] flex h-8 items-center justify-center border border-[color:var(--border-strong)] bg-[color:var(--surface-strong)] px-3 text-xs text-[color:var(--accent)]"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        aria-label="Open chatbot"
      >
        <span>{isOpen ? '[ close ]' : '[ ask ]'}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            className="fixed bottom-[7.5rem] right-4 z-[100] flex h-[min(500px,calc(100vh-10rem))] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden border border-[color:var(--border-strong)] border-t-2 border-t-[color:var(--accent)] bg-[color:var(--surface-strong)] shadow-[0_28px_80px_rgba(0,0,0,0.38)]"
          >
            <div className="border-b border-white/10 px-5 py-4">
              <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">
                Manula&apos;s Assistant
              </p>
              <p className="mt-2 text-sm text-[color:var(--text)]">
                AI-powered answers about story, studies, projects, sport, and leadership.
              </p>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] border px-4 py-3 text-sm leading-7 ${
                      message.sender === 'user'
                        ? 'border-[color:var(--accent)] bg-[color:var(--accent)] text-[color:var(--ink)]'
                        : 'border-[color:var(--border)] bg-black/30 text-[color:var(--text)]'
                    }`}
                  >
                    <p className="whitespace-pre-line">{message.text}</p>
                  </div>
                </div>
              ))}
              {isSending && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] border border-[color:var(--border)] bg-black/30 px-4 py-3 text-sm leading-7 text-[color:var(--text)]">
                    <motion.div
                      className="flex items-center gap-2"
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
                    >
                      <span className="h-2 w-2 rounded-full bg-[color:var(--accent)]" />
                      <span className="h-2 w-2 rounded-full bg-[color:var(--accent)]/80" />
                      <span className="h-2 w-2 rounded-full bg-[color:var(--accent)]/60" />
                    </motion.div>
                  </div>
                </div>
              )}
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
                  placeholder="Ask about Manula"
                  className="flex-1 border border-[color:var(--border)] bg-black/40 px-4 py-3 font-[family-name:var(--font-geist-mono)] text-sm text-[color:var(--text)] outline-none focus:border-[color:var(--accent)]"
                  disabled={isSending}
                />
                <button
                  onClick={handleSend}
                  disabled={isSending}
                  className="border border-[color:var(--accent)] bg-[color:var(--accent)] px-4 py-3 text-sm text-[color:var(--ink)]"
                >
                  {isSending ? '...' : 'Send'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
