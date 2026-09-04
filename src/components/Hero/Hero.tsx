import { useEffect, useMemo, useState } from 'react'
import { motion } from 'motion/react'
import profileImage from '../../assets/images/profile.jpg'
import cartoonImage from '../../assets/images/profilecartoon.png'
import {
  fadeUp,
  floatTransition,
  gameCardHover,
  hoverLift,
  stagger,
  tapPress,
} from '../../motion/presets'
import './Hero.css'

const Hero = () => {
  const titles = useMemo(() => ['Java', 'Spring Boot', 'REST APIs', 'Microservices', 'MyBatis', 'Angular', 'React', 'Docker', 'JPA', 'JavaScript', 'TypeScript', 'Bootstrap', 'Tailwind CSS', 'CI/CD', 'Jenkins'], [])
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
      <motion.div className="hero__content" variants={stagger} initial="hidden" animate="visible">
        <motion.p className="hero__badge" variants={fadeUp}>
          Available for collaboration
        </motion.p>
        <motion.p className="hero__eyebrow" variants={fadeUp}>
          Senior Java Developer
        </motion.p>
        <motion.h1 variants={fadeUp}>
          Building secure systems
          <span> with quiet confidence.</span>
        </motion.h1>
        <motion.p className="hero__intro" variants={fadeUp}>
          I’m Myo Thu Aung — a software developer specializing in Java backend and website development, with experience
          building secure, scalable applications using Java, Spring Boot, REST APIs, and relational databases.
        </motion.p>
        <motion.div className="hero__typing" variants={fadeUp}>
          <span>Currently fluent in</span>
          <strong>
            {typed}
            <i className="hero__cursor" aria-hidden="true" />
          </strong>
        </motion.div>
        <motion.div className="hero__actions" variants={fadeUp}>
          <motion.a href="#projects" className="button button--primary" whileHover={hoverLift} whileTap={tapPress}>
            View my work
          </motion.a>
          <motion.a href="#contact" className="button button--secondary" whileHover={hoverLift} whileTap={tapPress}>
            Get in touch
          </motion.a>
        </motion.div>
        <motion.p className="hero__play" variants={fadeUp}>
          Or unwind with a game:
          <motion.a href="/game" whileHover={gameCardHover} whileTap={tapPress}>
            Tic-tac-toe
          </motion.a>
          <motion.a href="/memory" whileHover={gameCardHover} whileTap={tapPress}>
            Stack Match
          </motion.a>
        </motion.p>
      </motion.div>

      <motion.div className="hero__visual" variants={stagger} initial="hidden" animate="visible">
        <motion.div variants={fadeUp}>
          <motion.div
            className="hero__frame"
            animate={{ y: [0, -7, 0] }}
            transition={floatTransition}
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
          </motion.div>
        </motion.div>

        <motion.div className="hero__stats" variants={stagger}>
          <motion.article variants={fadeUp} whileHover={{ y: -3 }}>
            <strong>4+</strong>
            <span>Years building</span>
          </motion.article>
          <motion.article variants={fadeUp} whileHover={{ y: -3 }}>
            <strong>3</strong>
            <span>Banking products</span>
          </motion.article>
          <motion.article variants={fadeUp} whileHover={{ y: -3 }}>
            <strong>Full-stack</strong>
            <span>Java & Angular</span>
          </motion.article>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
