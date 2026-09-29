'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

type Line = { id: number; kind: 'cmd' | 'out'; text: string }

type Place = {
  keys: string[]
  id: string
  label: string
  href?: string
}

const places: Place[] = [
  { keys: ['home', '~'], id: 'home', label: 'home' },
  { keys: ['profile', 'about'], id: 'about', label: 'profile' },
  { keys: ['story'], id: 'story', label: 'story' },
  { keys: ['work', 'projects'], id: 'projects', label: 'work' },
  { keys: ['results', 'achievements'], id: 'achievements', label: 'results' },
  { keys: ['contact'], id: 'contact', label: 'contact' },
  { keys: ['journal', 'blog'], id: 'blog', label: 'journal', href: '/blog' },
]

const commands = ['help', 'ls', 'cd', 'open', 'whoami', 'neofetch', 'contact', 'clear', 'pwd', 'date', 'echo', 'history', 'logout']

const helpText = [
  'help            list commands',
  'ls              list sections',
  'cd <section>    open a section',
  'open <section>  same as cd',
  'whoami          who this session belongs to',
  'neofetch        session summary',
  'contact         email, phone, linkedin',
  'pwd             current path',
  'date            local time',
  'echo <text>     print text',
  'history         previous commands',
  'clear           clear this pane',
  'tab             complete a command',
].join('\n')

function findPlace(name: string) {
  const key = name.trim().toLowerCase()
  return places.find((place) => place.keys.includes(key) || place.label === key || place.id === key)
}

export default function PortfolioShell() {
  const router = useRouter()
  const pathname = usePathname()
  const inputRef = useRef<HTMLInputElement>(null)
  const logRef = useRef<HTMLDivElement>(null)
  const [input, setInput] = useState('')
  const [lines, setLines] = useState<Line[]>([])
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [cwd, setCwd] = useState('~')
  const idRef = useRef(1)
  const historyRef = useRef<string[]>([])

  useEffect(() => {
    historyRef.current = history
  }, [history])

  useEffect(() => {
    if (pathname.startsWith('/blog')) setCwd('~/journal')
  }, [pathname])

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight })
  }, [lines])

  const push = (entries: Array<Omit<Line, 'id'>>) => {
    setLines((current) => {
      const next = [
        ...current,
        ...entries.map((entry) => {
          idRef.current += 1
          return { ...entry, id: idRef.current }
        }),
      ]
      return next.slice(-48)
    })
  }

  const go = (place: Place) => {
    setCwd(place.id === 'home' ? '~' : `~/${place.label}`)
    const path = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname

    if (place.href) {
      if (path !== place.href) router.push(place.href)
      return
    }

    if (path !== '/') {
      router.push(place.id === 'home' ? '/' : `/#${place.id}`)
      return
    }

    const element = document.getElementById(place.id)
    if (!element) return
    const top = element.getBoundingClientRect().top + window.scrollY - 128
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
  }

  const run = (raw: string) => {
    const command = raw.trim()
    const prompt = `guest@manula:${cwd}$`
    if (!command) return

    const [name, ...rest] = command.split(/\s+/)
    const arg = rest.join(' ')
    const key = name.toLowerCase()
    const output: string[] = []

    if (key === 'clear') {
      setLines([])
      return
    }

    if (key === 'help') output.push(helpText)
    else if (key === 'ls') output.push(places.map((place) => place.label).join('   '))
    else if (key === 'whoami') {
      output.push('Manula Cooray')
      output.push('athlete-engineer · Sri Lanka')
      output.push('Computer science student, engineering graduate, swimmer, and student leader.')
    } else if (key === 'neofetch') {
      output.push('guest@manula')
      output.push('-------------')
      output.push('name      Manula Cooray')
      output.push('role      athlete-engineer')
      output.push('shell     zsh')
      output.push('theme     green')
      output.push('place     Sri Lanka')
      output.push('focus     software systems, embedded thinking, AI')
    } else if (key === 'contact') {
      output.push('email      manulacooray@gmail.com')
      output.push('phone      +94 70 255 7227')
      output.push('linkedin   manula-cooray-b5bb862b2')
    } else if (key === 'pwd') output.push(cwd === '~' ? '/home' : `/home/${cwd.replace('~/', '')}`)
    else if (key === 'date') output.push(new Date().toString())
    else if (key === 'echo') output.push(arg)
    else if (key === 'history') {
      const previous = historyRef.current
      output.push(previous.length ? previous.map((item, index) => `${index + 1}  ${item}`).join('\n') : 'history: empty')
    } else if (key === 'logout') {
      output.push('zsh: logout refused')
      output.push('this session stays open.')
    } else if (key === 'cd' || key === 'open') {
      const place = findPlace(arg || 'home')
      if (!place) output.push(`zsh: no such section: ${arg}`)
      else go(place)
    } else if (findPlace(key) && !arg) {
      go(findPlace(key) as Place)
    } else {
      output.push(`zsh: command not found: ${name}`)
      output.push('try help')
    }

    push([
      { kind: 'cmd', text: `${prompt} ${command}` },
      ...output.filter(Boolean).map((text) => ({ kind: 'out' as const, text })),
    ])
  }

  useEffect(() => {
    const onSignal = (event: Event) => {
      const action = (event as CustomEvent<{ action: string }>).detail?.action
      if (action === 'logout') run('logout')
      if (action === 'scanlines') {
        const off = document.body.classList.contains('scanlines-off')
        push([{ kind: 'out', text: off ? 'scanlines off' : 'scanlines on' }])
      }
      if (action === 'zoom-failed') push([{ kind: 'out', text: 'fullscreen is unavailable in this browser.' }])
    }

    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      const typing = target && ['INPUT', 'TEXTAREA'].includes(target.tagName)
      if (event.key === '/' && !typing && !event.metaKey && !event.ctrlKey) {
        event.preventDefault()
        inputRef.current?.focus()
      }
    }

    window.addEventListener('mac-terminal', onSignal)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('mac-terminal', onSignal)
      window.removeEventListener('keydown', onKey)
    }
  })

  const complete = () => {
    const trimmed = input
    const parts = trimmed.split(/\s+/)
    const pool = parts.length <= 1 ? commands : places.flatMap((place) => place.keys)
    const current = parts.length <= 1 ? trimmed : parts[parts.length - 1]
    const matches = pool.filter((item, index, list) => list.indexOf(item) === index && item.startsWith(current.toLowerCase()))

    if (matches.length === 1) {
      const next = parts.length <= 1 ? `${matches[0]} ` : `${parts.slice(0, -1).join(' ')} ${matches[0]} `
      setInput(next)
      return
    }

    if (matches.length > 1) {
      push([{ kind: 'out', text: matches.join('   ') }])
    }
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    const command = input.trim()
    if (!command) return
    setHistory((current) => [...current, command])
    setHistoryIndex(-1)
    setInput('')
    run(command)
  }

  const prompt = `guest@manula:${cwd}$`

  return (
    <>
      {lines.length > 0 && (
        <div ref={logRef} className="terminal-log" aria-live="polite">
          {lines.map((line) => (
            <p key={line.id} className={line.kind === 'cmd' ? 'text-[color:var(--accent)]' : 'text-[color:var(--text)]'}>
              {line.text}
            </p>
          ))}
        </div>
      )}
      <form className="terminal-prompt" onSubmit={onSubmit}>
        <label className="flex min-w-0 flex-1 items-center gap-2">
          <span className="shrink-0 text-[color:var(--accent)] sm:hidden">{cwd}$</span>
          <span className="hidden shrink-0 text-[color:var(--accent)] sm:inline">{prompt}</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(event) => {
              setInput(event.target.value)
              setHistoryIndex(-1)
            }}
            onKeyDown={(event) => {
              if (event.key === 'Tab') {
                event.preventDefault()
                complete()
              }
              if (event.key === 'ArrowUp') {
                event.preventDefault()
                const previous = history
                if (!previous.length) return
                const nextIndex = historyIndex < 0 ? previous.length - 1 : Math.max(0, historyIndex - 1)
                setHistoryIndex(nextIndex)
                setInput(previous[nextIndex])
              }
              if (event.key === 'ArrowDown') {
                event.preventDefault()
                if (historyIndex < 0) return
                const nextIndex = historyIndex + 1
                if (nextIndex >= history.length) {
                  setHistoryIndex(-1)
                  setInput('')
                  return
                }
                setHistoryIndex(nextIndex)
                setInput(history[nextIndex])
              }
              if (event.key === 'l' && event.ctrlKey) {
                event.preventDefault()
                setLines([])
              }
            }}
            aria-label="Terminal command"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            placeholder="help"
            className="min-w-0 flex-1 bg-transparent text-[color:var(--text)] outline-none placeholder:text-[color:var(--muted)]"
          />
        </label>
      </form>
    </>
  )
}
