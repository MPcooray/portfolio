import Link from 'next/link'
import { blogArticles, mediumProfile } from './articles'

const featuredThemes = [
  {
    title: 'Engineering with athlete discipline',
    summary:
      'Reflections on consistency, standards, and the kind of mindset high-performance sport can bring into technical work.',
    category: 'Mindset',
  },
  {
    title: 'Learning across software, hardware, and AI',
    summary:
      'Notes from building across computer science, electrical engineering, and AI without losing practical focus.',
    category: 'Engineering',
  },
  {
    title: 'Leadership lessons from sport',
    summary:
      'Thoughts on pressure, responsibility, and what it means to lead people before you lead projects.',
    category: 'Leadership',
  },
]

const writingSignals = [
  { label: 'Published pieces', value: '7+' },
  { label: 'Core themes', value: '4' },
  { label: 'Voice', value: 'Practical + personal' },
]

const plannedSeries = [
  'Lessons from swimming that changed how I build',
  'Why I chose a path across engineering, computing, and AI',
  'What student leadership taught me about real accountability',
  'Building systems that stay calm under pressure',
]

export default function Home() {
  return (
    <main className="section-shell min-h-screen px-4 pb-24 pt-10 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl">
        <header className="glass-panel rounded-full border border-[color:var(--border-strong)] px-6 py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[color:var(--muted)]">
                Manula Cooray
              </p>
              <p className="mt-1 text-sm font-medium text-[color:var(--text)]">
                Journal
              </p>
            </div>
            <nav className="flex flex-wrap gap-5 text-sm text-[color:var(--muted)]">
              <a href="https://manulacooray.com" className="hover:text-[color:var(--text)]">
                Portfolio
              </a>
              <a href="#medium-archive" className="hover:text-[color:var(--text)]">
                Medium
              </a>
              <a href="#coming-next" className="hover:text-[color:var(--text)]">
                Ideas
              </a>
            </nav>
          </div>
        </header>

        <section className="grid gap-10 pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <span className="eyebrow">Journal</span>
            <h1 className="section-title mt-6 max-w-[12ch] text-5xl font-semibold leading-[0.92] text-[color:var(--text)] sm:text-6xl lg:text-7xl">
              Writing on engineering, AI, leadership, and discipline.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-[color:var(--muted)] sm:text-lg">
              This space is for the thinking behind the work: ideas from software and systems,
              lessons from competitive swimming, and reflections on leadership, pressure, and
              growth.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="https://manulacooray.com"
                className="rounded-full border border-[color:var(--border-strong)] px-7 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--text)]"
              >
                Back to Portfolio
              </a>
              <a
                href={mediumProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[color:var(--accent)] px-7 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-slate-950"
              >
                Visit Medium
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {writingSignals.map((signal) => (
                <div key={signal.label} className="glass-panel rounded-[1.5rem] p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
                    {signal.label}
                  </p>
                  <p className="mt-3 text-xl font-semibold text-[color:var(--text)]">
                    {signal.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5">
            <div className="glass-panel rounded-[2rem] p-8">
              <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--accent)]">
                Why this journal exists
              </p>
              <p className="mt-5 text-lg leading-8 text-[color:var(--text)]">
                I use this space to connect technical ideas with lived experience: how systems are
                built, how people grow, and how discipline from sport carries into engineering.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {['Software systems', 'Artificial intelligence', 'Embedded thinking', 'Leadership', 'Swimming', 'Lessons learned'].map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full border border-[color:var(--border)] bg-white/5 px-4 py-2 text-sm text-[color:var(--text)]"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass-panel rounded-[2rem] p-8">
              <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--accent)]">
                Start here
              </p>
              <h2 className="mt-4 text-2xl font-semibold text-[color:var(--text)]">
                Understanding Microservice Architecture
              </h2>
              <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
                A strong first article for readers who want to understand how your writing handles
                technical depth without losing clarity.
              </p>
              <a
                href="/articles/microservice-architecture"
                className="mt-6 inline-flex rounded-full border border-[color:var(--border-strong)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--text)]"
              >
                Read Summary
              </a>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="eyebrow">Featured themes</span>
              <h2 className="section-title mt-5 text-4xl font-semibold text-[color:var(--text)] sm:text-5xl">
                A clear editorial direction.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-8 text-[color:var(--muted)]">
              Even before every article is published here, the journal should already communicate
              what you think about and what kind of perspective you bring.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {featuredThemes.map((theme) => (
              <article key={theme.title} className="glass-panel rounded-[2rem] p-7">
                <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--accent)]">
                  {theme.category}
                </p>
                <h3 className="mt-5 text-2xl font-semibold text-[color:var(--text)]">
                  {theme.title}
                </h3>
                <p className="mt-4 text-sm leading-8 text-[color:var(--muted)]">
                  {theme.summary}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="medium-archive" className="mt-20 grid gap-8 lg:grid-cols-[0.76fr_1.24fr]">
          <div className="glass-panel rounded-[2rem] p-8">
            <span className="eyebrow">Medium archive</span>
            <h2 className="section-title mt-6 text-4xl font-semibold text-[color:var(--text)]">
              Published writing, now connected to the portfolio.
            </h2>
            <p className="mt-6 text-base leading-8 text-[color:var(--muted)]">
              Your Medium writing already adds depth to your brand. This section gives it a cleaner
              home here, while still linking readers out to the original posts.
            </p>
            <a
              href={mediumProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex rounded-full border border-[color:var(--border-strong)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--text)]"
            >
              Open Medium Profile
            </a>
          </div>

          <div className="glass-panel rounded-[2rem] p-8">
            <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--accent)]">
              Published articles
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {blogArticles.map((post) => (
                <Link
                  key={post.slug}
                  href={`/articles/${post.slug}`}
                  className="block rounded-[1.4rem] border border-white/10 bg-black/20 px-5 py-5"
                >
                  <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--accent)]">
                    {post.type}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold leading-8 text-[color:var(--text)]">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">{post.note}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="coming-next" className="mt-20">
          <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="eyebrow">Coming next</span>
              <h2 className="section-title mt-5 text-4xl font-semibold text-[color:var(--text)] sm:text-5xl">
                Ideas worth turning into series.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-8 text-[color:var(--muted)]">
              This gives the journal forward momentum and shows readers the perspective you want to
              keep developing over time.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {plannedSeries.map((item) => (
              <div
                key={item}
                className="glass-panel rounded-[1.6rem] px-5 py-5 text-base leading-7 text-[color:var(--text)]"
              >
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
