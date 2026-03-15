import Hero from './components/Hero'
import About from './components/About'
import Story from './components/Story'
import Projects from './components/Projects'
import Achievements from './components/Achievements'
import Contact from './components/Contact'

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <About />
      <Story />
      <Projects />
      <Achievements />
      <Contact />
    </main>
  )
}
