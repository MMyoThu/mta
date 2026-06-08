import './Navbar.css'

type NavbarProps = {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

const Navbar = ({ theme, onToggleTheme }: NavbarProps) => {
  return (
    <header className="navbar">
      <div className="navbar__brand">
        <span className="navbar__mark" aria-hidden="true"></span>
        <div>
          <p className="navbar__name">Myo Thu Aung</p>
          <p className="navbar__label">Full Stack Web Developer</p>
        </div>
      </div>

      <nav className="navbar__nav" aria-label="Primary navigation">
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#experience">Experience</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>

      <div className="navbar__actions">
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
