import { useEffect, useState } from 'react'
import { skills } from '../../data/skills'
import './Skills.css'

const Skills = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.2 },
    )

    const element = document.querySelector('.skills')
    if (element) observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [])

  return (
    <section className="skills" id="skills">
      <div className="section-title">
        <span />
        <h2>Skills</h2>
      </div>
      <p className="section-subtitle">
        I work across frontend, backend, database, and DevOps technologies to deliver full-stack applications with strong team practices.
      </p>

      <div className="skills__grid">
        {skills.map((group) => (
          <div key={group.category} className={`skills__group ${visible ? 'visible' : ''}`}>
            <h3>{group.category}</h3>
            <div className="skills__list">
              {group.items.map((skill) => (
                <div key={skill.name} className="skill-card">
                  <span className="skill-card__level">{skill.level}%</span>
                  <span className="skill-card__name">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
