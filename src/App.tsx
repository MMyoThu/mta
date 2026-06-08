import { useEffect, useState } from 'react'
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import Experience from './components/Experience/Experience'
import Footer from './components/Footer/Footer'
import Hero from './components/Hero/Hero'
import Navbar from './components/Navbar/Navbar'
import Projects from './components/Projects/Projects'
import Skills from './components/Skills/Skills'

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const storedTheme = localStorage.getItem('portfolio-theme') as 'dark' | 'light' | null
    if (storedTheme) {
      setTheme(storedTheme)
    }
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div className="app-shell">
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
