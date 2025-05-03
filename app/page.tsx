import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Achievements from './components/Achievements'
import Contact from './components/Contact'

export default function Home() {
  return (
    <main className="bg-gray-900">
      <Hero />
      <About />
      <Projects />
      <Achievements />
      <Contact />
    </main>
  )
}

