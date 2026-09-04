import { useEffect, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { fadeIn, interactiveMotion, motionEase, navIndicatorTransition, tapPress } from '../../motion/presets'
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
  const [activeHref, setActiveHref] = useState('#about')

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 880) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const elements = navLinks
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((element): element is HTMLElement => element !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        const top = visible[0]
        if (top) {
          setActiveHref(`#${top.target.id}`)
        }
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: [0.12, 0.35, 0.6] },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <motion.header
      className={`navbar ${isMenuOpen ? 'is-open' : ''}`}
      variants={fadeIn}
      initial="hidden"
      animate="visible"
    >
      <div className="navbar__inner">
        <motion.a className="navbar__brand" href="#hero" onClick={closeMenu} whileHover={{ scale: 1.01 }} whileTap={tapPress}>
          <span className="navbar__mark" aria-hidden="true">
            M
          </span>
          <div>
            <p className="navbar__name">Myo Thu Aung</p>
            <p className="navbar__label">Senior Java Developer</p>
          </div>
        </motion.a>

        <LayoutGroup>
          <nav className="navbar__nav navbar__nav--desktop" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className={activeHref === link.href ? 'is-active' : undefined}
                whileHover={{ y: -1 }}
                whileTap={tapPress}
              >
                {activeHref === link.href ? (
                  <motion.span className="navbar__indicator" layoutId="nav-active" transition={navIndicatorTransition} />
                ) : null}
                <span>{link.label}</span>
              </motion.a>
            ))}
          </nav>
        </LayoutGroup>

        <div className="navbar__actions navbar__actions--desktop">
          <motion.button
            type="button"
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            whileHover={{ y: -1 }}
            whileTap={tapPress}
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === 'dark' ? (
                <motion.span
                  key="sun"
                  className="theme-toggle__icon"
                  initial={{ opacity: 0, rotate: -50, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 50, scale: 0.7 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M12 4.25a.75.75 0 0 1 .75.75v1.1a.75.75 0 0 1-1.5 0V5a.75.75 0 0 1 .75-.75Zm0 12.9a.75.75 0 0 1 .75.75v1.1a.75.75 0 0 1-1.5 0v-1.1a.75.75 0 0 1 .75-.75ZM5 11.25a.75.75 0 0 1 .75.75H6.85a.75.75 0 0 1 0 1.5H5.75A.75.75 0 0 1 5 12.75V12a.75.75 0 0 1 0-.75Zm12.15 0a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-1.1a.75.75 0 0 1 0-1.5h1.1ZM7.4 6.34a.75.75 0 0 1 1.06 0l.78.78a.75.75 0 1 1-1.06 1.06l-.78-.78a.75.75 0 0 1 0-1.06Zm7.36 7.36a.75.75 0 0 1 1.06 0l.78.78a.75.75 0 1 1-1.06 1.06l-.78-.78a.75.75 0 0 1 0-1.06ZM7.4 16.6a.75.75 0 0 1 1.06 0l.78.78a.75.75 0 0 1-1.06 1.06l-.78-.78a.75.75 0 0 1 0-1.06Zm7.36-7.36a.75.75 0 0 1 1.06 0l.78.78a.75.75 0 1 1-1.06 1.06l-.78-.78a.75.75 0 0 1 0-1.06ZM12 8.25a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5Z"
                    />
                  </svg>
                </motion.span>
              ) : (
                <motion.span
                  key="moon"
                  className="theme-toggle__icon"
                  initial={{ opacity: 0, rotate: -50, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 50, scale: 0.7 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M21.752 15.002A9.718 9.718 0 0 1 12 21.75c-5.385 0-9.75-4.365-9.75-9.75 0-4.433 2.85-8.166 6.81-9.491a.75.75 0 0 1 .896.936A7.5 7.5 0 1 0 20.805 14.92a.75.75 0 0 1 .947.082Z"
                    />
                  </svg>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
          <motion.a className="button button--ghost" href="#contact" {...interactiveMotion}>
            Hire Me
          </motion.a>
        </div>

        <motion.button
          type="button"
          className={`navbar__toggle ${isMenuOpen ? 'is-open' : ''}`}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          whileTap={tapPress}
        >
          <span></span>
          <span></span>
          <span></span>
        </motion.button>

        <AnimatePresence>
          {isMenuOpen ? (
            <motion.div
              className="navbar__mobile-panel"
              id="mobile-navigation"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: motionEase }}
            >
              <nav className="navbar__nav" aria-label="Mobile navigation">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className={activeHref === link.href ? 'is-active' : undefined}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * index, duration: 0.22, ease: motionEase }}
                    whileHover={{ x: 4 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              <div className="navbar__actions navbar__actions--mobile">
                <motion.button
                  type="button"
                  className="theme-toggle"
                  onClick={() => {
                    onToggleTheme()
                    closeMenu()
                  }}
                  aria-label="Toggle theme"
                  whileTap={tapPress}
                >
                  {theme === 'dark' ? 'Light mode' : 'Dark mode'}
                </motion.button>
                <motion.a className="button button--primary" href="#contact" onClick={closeMenu} {...interactiveMotion}>
                  Hire Me
                </motion.a>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

export default Navbar
