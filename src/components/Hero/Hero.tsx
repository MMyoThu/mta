import { useEffect, useMemo, useState } from 'react'
import profileImage from '../../assets/images/profile.jpg'
import cartoonImage from '../../assets/images/profilecartoon.png'
import './Hero.css'

const Hero = () => {
  const titles = useMemo(() => ['Java', 'Spring Boot', 'REST APIs', 'MyBatis', 'Angular', 'React', 'Docker'], [])
  const [titleIndex, setTitleIndex] = useState(0)
  const [typed, setTyped] = useState('')
  const [phase, setPhase] = useState<'typing' | 'holding' | 'deleting'>('typing')
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const current = titles[titleIndex]
    const delay = phase === 'holding' ? 1400 : phase === 'deleting' ? 36 : 78

    const timeout = window.setTimeout(() => {
      if (phase === 'typing') {
        const next = current.slice(0, typed.length + 1)
        setTyped(next)
        if (next === current) setPhase('holding')
        return
      }

      if (phase === 'holding') {
        setPhase('deleting')
        return
      }

      const next = current.slice(0, Math.max(0, typed.length - 1))
      setTyped(next)
      if (next.length === 0) {
        setTitleIndex((prev) => (prev + 1) % titles.length)
        setPhase('typing')
      }
    }, delay)

    return () => window.clearTimeout(timeout)
  }, [phase, titleIndex, titles, typed])

  return (
    <section className="hero" id="hero">
      <div className="hero__content fade-up">
        <p className="hero__badge">Available for collaboration</p>
        <p className="hero__eyebrow">Senior Java Developer</p>
        <h1>
          Building secure systems
          <span> with quiet confidence.</span>
        </h1>
        <p className="hero__intro">
          I’m Myo Thu Aung — a software developer specializing in Java backend and website development, with experience
          building secure, scalable applications using Java, Spring Boot, REST APIs, and relational databases.
        </p>
        <div className="hero__typing">
          <span>Currently fluent in</span>
          <strong>
            {typed}
            <i className="hero__cursor" aria-hidden="true" />
          </strong>
        </div>
        <div className="hero__actions">
          <a href="#projects" className="button button--primary">
            View my work
          </a>
          <a href="#contact" className="button button--secondary">
            Get in touch
          </a>
        </div>
        <p className="hero__play">
          Or unwind with a game:
          <a href="/game">Tic-tac-toe</a>
          <a href="/imposter">Imposter</a>
        </p>
      </div>

      <div className="hero__visual fade-up">
        <div
          className="hero__frame"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="hero__orbit" aria-hidden="true" />
          <div className="hero__frame-inner">
            <img
              src={isHovered ? profileImage : cartoonImage}
              alt={isHovered ? 'Myo Thu Aung profile' : 'Cartoon profile illustration'}
            />
          </div>
          <div className="hero__frame-hint">Hover to meet the real me</div>
        </div>

        <div className="hero__stats">
          <article>
            <strong>4+</strong>
            <span>Years building</span>
          </article>
          <article>
            <strong>3</strong>
            <span>Banking products</span>
          </article>
          <article>
            <strong>Full-stack</strong>
            <span>Java & Angular</span>
          </article>
        </div>
      </div>
    </section>
  )
}

export default Hero
