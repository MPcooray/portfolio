'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
        text: "Hi! I'm Manula's chatbot. Ask me about his educational qualifications, sports achievements, job interests, or just chat!",
        sender: 'bot',
        timestamp: new Date()
      }
    ])
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase().trim()

    // Educational qualifications
    if (message.includes('education') || message.includes('qualification') || message.includes('degree') || message.includes('study') || message.includes('university') || message.includes('college')) {
      return "Manula's educational qualifications include:\n\n" +
        "• BSc (Hons) in Computer Science at SLIIT (2023–2027)\n" +
        "• MSc in Artificial Intelligence at Anglia Ruskin University (2025 Sep–2026 Sep)\n" +
        "• BEng (Hons) in Electrical and Electronic Engineering at University of the West of England (2024–2025)\n" +
        "• Higher Diploma in Engineering Technology at University of the West of England (2023–2024)\n" +
        "• G.C.E. Advanced Level Examination at Ananda College, Colombo 10 (2008–2022)"
    }

    // Sports achievements
    if (message.includes('sport') || message.includes('swimming') || message.includes('achievement') || message.includes('championship') || message.includes('captain') || message.includes('leadership')) {
      return "Manula's sports achievements include:\n\n" +
        "Swimming Achievements:\n" +
        "• South Asian Age Group Championship (2016): 3rd Place\n" +
        "• Asian Age Groups, Uzbekistan (2017): Selected\n" +
        "• Princess Chulabon Swimming Championship, Thailand (2017)\n" +
        "• Milo/Pram Malaysia Invitational Age Group Swimming Championship (2018)\n" +
        "• National Pool (2019)\n" +
        "• Multiple Colors and Merits from 2016 to 2024\n\n" +
        "Leadership Positions:\n" +
        "• Sport Council President (2025-Present): SLIIT\n" +
        "• Captain (2025-Present): SLIIT Swimming Team\n" +
        "• Vice Captain (2024): SLIIT Swimming Team\n" +
        "• Junior Vice Captain (2019) and Captain (2020): Ananda College Swimming Team"
    }

    // Job interests
    if (message.includes('job') || message.includes('career') || message.includes('position') || message.includes('role') || message.includes('work') || message.includes('interested') || message.includes('software engineer') || message.includes('embedded') || message.includes('qa') || message.includes('quality assurance')) {
      return "Manula is interested in the following job positions:\n\n" +
        "• Software Engineer (SE)\n" +
        "• Embedded System Engineer\n" +
        "• QA (Quality Assurance)\n\n" +
        "Feel free to reach out if you have opportunities in these areas!"
    }

    // Greetings
    if (message.match(/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)/)) {
      return "Hello! How can I help you today? You can ask me about Manula's education, sports achievements, job interests, or just chat!"
    }

    // How are you / How's it going
    if (message.match(/(how are you|how's it going|how are things|what's up|how do you do)/)) {
      return "I'm doing great, thanks for asking! I'm here to help you learn more about Manula. What would you like to know?"
    }

    // Thank you
    if (message.match(/(thank|thanks|appreciate)/)) {
      return "You're welcome! Is there anything else you'd like to know?"
    }

    // Goodbye
    if (message.match(/(bye|goodbye|see you|farewell|exit|quit)/)) {
      return "Goodbye! Feel free to come back anytime if you have more questions!"
    }

    // Default responses for general chat
    const defaultResponses = [
      "That's interesting! Is there anything specific you'd like to know about Manula?",
      "I'm here to help! You can ask me about Manula's education, sports achievements, or job interests.",
      "Feel free to ask me about Manula's qualifications, achievements, or career interests!",
      "I'd be happy to tell you more about Manula. What would you like to know?",
      "That's a great question! You can ask me about Manula's educational background, sports achievements, or the types of jobs he's interested in."
    ]

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')

    // Simulate bot thinking
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getBotResponse(input),
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
    }, 500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-2xl z-[9999] flex items-center justify-center transition-all cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{ position: 'fixed' }}
        aria-label="Open chatbot"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-4 w-96 h-[500px] bg-gray-800 rounded-lg shadow-2xl z-[9999] flex flex-col border border-blue-500/20"
          >
            {/* Header */}
            <div className="bg-blue-500 p-4 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <span className="text-blue-500 font-bold text-lg">M</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Manula's Assistant</h3>
                  <p className="text-blue-100 text-xs">Online</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-700 text-gray-100'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSend}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
