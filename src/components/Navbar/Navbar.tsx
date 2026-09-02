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
    <header className={`navbar ${isMenuOpen ? 'is-open' : ''}`}>
      <div className="navbar__inner">
        <a className="navbar__brand" href="#hero" onClick={closeMenu}>
          <span className="navbar__mark" aria-hidden="true">
            M
          </span>
          <div>
            <p className="navbar__name">Myo Thu Aung</p>
            <p className="navbar__label">Senior Java Developer</p>
          </div>
        </a>

        <nav className="navbar__nav navbar__nav--desktop" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="navbar__actions navbar__actions--desktop">
          <button type="button" className="theme-toggle" onClick={onToggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 4.25a.75.75 0 0 1 .75.75v1.1a.75.75 0 0 1-1.5 0V5a.75.75 0 0 1 .75-.75Zm0 12.9a.75.75 0 0 1 .75.75v1.1a.75.75 0 0 1-1.5 0v-1.1a.75.75 0 0 1 .75-.75ZM5 11.25a.75.75 0 0 1 .75.75H6.85a.75.75 0 0 1 0 1.5H5.75A.75.75 0 0 1 5 12.75V12a.75.75 0 0 1 0-.75Zm12.15 0a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-1.1a.75.75 0 0 1 0-1.5h1.1ZM7.4 6.34a.75.75 0 0 1 1.06 0l.78.78a.75.75 0 1 1-1.06 1.06l-.78-.78a.75.75 0 0 1 0-1.06Zm7.36 7.36a.75.75 0 0 1 1.06 0l.78.78a.75.75 0 1 1-1.06 1.06l-.78-.78a.75.75 0 0 1 0-1.06ZM7.4 16.6a.75.75 0 0 1 1.06 0l.78.78a.75.75 0 0 1-1.06 1.06l-.78-.78a.75.75 0 0 1 0-1.06Zm7.36-7.36a.75.75 0 0 1 1.06 0l.78.78a.75.75 0 1 1-1.06 1.06l-.78-.78a.75.75 0 0 1 0-1.06ZM12 8.25a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5Z"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M21.752 15.002A9.718 9.718 0 0 1 12 21.75c-5.385 0-9.75-4.365-9.75-9.75 0-4.433 2.85-8.166 6.81-9.491a.75.75 0 0 1 .896.936A7.5 7.5 0 1 0 20.805 14.92a.75.75 0 0 1 .947.082Z"
                />
              </svg>
            )}
          </button>
          <a className="button button--ghost" href="#contact">
            Hire Me
          </a>
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
          <nav className="navbar__nav" aria-label="Mobile navigation">
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
              {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </button>
            <a className="button button--primary" href="#contact" onClick={closeMenu}>
              Hire Me
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
