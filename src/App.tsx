import { useEffect, useState } from 'react'
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import Experience from './components/Experience/Experience'
import Footer from './components/Footer/Footer'
import Hero from './components/Hero/Hero'
import Hobbies from './components/Hobbies/Hobbies'
import Navbar from './components/Navbar/Navbar'
import Projects from './components/Projects/Projects'
import Skills from './components/Skills/Skills'
import Game from './components/Game/Game'
import MemoryGame from './components/Memory/MemoryGame'

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const storedTheme = localStorage.getItem('portfolio-theme')
    return storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : 'dark'
  })
  const [pathname, setPathname] = useState(() => window.location.pathname)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  useEffect(() => {
    const handleLocationChange = () => {
      setPathname(window.location.pathname)
    }

    window.addEventListener('popstate', handleLocationChange)
    return () => window.removeEventListener('popstate', handleLocationChange)
  }, [])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  const isGameRoute = pathname === '/game' || pathname === '/game/'
  const isMemoryRoute =
    pathname === '/memory' ||
    pathname === '/memory/' ||
    pathname === '/imposter' ||
    pathname === '/imposter/'
  const isHobbiesRoute = pathname === '/hobbies' || pathname === '/hobbies/'

  return (
    <div className="app">
      <div className="app-atmosphere" aria-hidden="true" />
      <div className="app-shell">
        {isHobbiesRoute ? (
          <Hobbies />
        ) : isMemoryRoute ? (
          <MemoryGame />
        ) : isGameRoute ? (
          <Game />
        ) : (
          <>
            <Navbar theme={theme} onToggleTheme={toggleTheme} />
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Contact />
            <Footer />
          </>
        )}
      </div>
    </div>
  )
}

export default App
