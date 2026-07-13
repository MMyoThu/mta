import { useEffect, useState } from 'react'
import './Navbar.css'

type NavbarProps = {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

const Navbar = ({ theme, onToggleTheme }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 880) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="navbar">
      <div className="navbar__brand">
        <span className="navbar__mark" aria-hidden="true"></span>
        <div>
          <p className="navbar__name">Myo Thu Aung</p>
          <p className="navbar__label">Full Stack Web Developer</p>
        </div>
      </div>

      <button
        type="button"
        className={`navbar__toggle ${isMenuOpen ? 'is-open' : ''}`}
        onClick={() => setIsMenuOpen((prev) => !prev)}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-navigation"
        aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`navbar__mobile-panel ${isMenuOpen ? 'is-open' : ''}`} id="mobile-navigation">
        <nav className="navbar__nav" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="navbar__actions navbar__actions--mobile">
          <button
            type="button"
            className="theme-toggle"
            onClick={() => {
              onToggleTheme()
              closeMenu()
            }}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <a className="button button--ghost" href="#contact" onClick={closeMenu}>
            Hire Me
          </a>
        </div>
      </div>

      <div className="navbar__actions navbar__actions--desktop">
        <button type="button" className="theme-toggle" onClick={onToggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <a className="button button--ghost" href="#contact">
          Hire Me
        </a>
      </div>
    </header>
  )
}

export default Navbar
