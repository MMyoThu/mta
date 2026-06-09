import { useEffect, useMemo, useState } from 'react'
import profileImage from '../../assets/images/profile.jpg'
import './Hero.css'

const Hero = () => {
  const titles = useMemo(() => ['Angular', 'Spring Boot', 'AWS', 'Microservices', 'React', 'Next', 'Node'], [])
  const [typed, setTyped] = useState('Angular')
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % titles.length)
    }, 2000)

    return () => window.clearInterval(interval)
  }, [titles.length])

  useEffect(() => {
    setTyped(titles[index])
  }, [index, titles])

  return (
    <section className="hero" id="hero">
      <div className="hero__content fade-up">
        <p className="hero__eyebrow">Full Stack Development</p>
        <h1>Hi, I’m Myo Thu Aung</h1>
        <p className="hero__role">Full Stack Web Developer</p>
        <p className="hero__intro">
          Passionate web developer with experience in building scalable web and mobile applications using Angular, React, Java Spring Boot, and modern cloud technologies.
        </p>
        <div className="hero__typing">
          <span>Expertise in</span>
          <strong>{typed}</strong>
        </div>
        <div className="hero__actions">
          <a href="/resume.pdf" download className="button button--primary">
            Download Resume
          </a>
          <a href="#contact" className="button button--secondary">
            Contact Me
          </a>
        </div>
      </div>

      <div className="hero__visual fade-up">
        <div className="hero__frame">
          <img src={profileImage} alt="Myo Thu Aung profile" />
        </div>
      </div>
    </section>
  )
}

export default Hero
