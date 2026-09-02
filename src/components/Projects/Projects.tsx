import { useMemo, useState } from 'react'
import { projects } from '../../data/projects'
import './Projects.css'

const Projects = () => {
  const categories = useMemo(() => {
    const techs = new Set<string>()
    projects.forEach((project) => project.tech.forEach((tech) => techs.add(tech)))
    const rest = Array.from(techs)
      .filter((tech) => tech !== 'POS')
      .sort()
    return techs.has('POS') ? ['All', 'POS', ...rest] : ['All', ...rest]
  }, [])

  const [activeFilter, setActiveFilter] = useState('All')
  const filteredProjects = useMemo(
    () => projects.filter((project) => activeFilter === 'All' || project.tech.includes(activeFilter)),
    [activeFilter],
  )

  return (
    <section className="projects" id="projects">
      <div className="section-heading">
        <p className="section-kicker">
          <span>04</span> Selected work
        </p>
        <h2>Projects</h2>
      </div>
      <p className="section-subtitle">
        Banking and fintech products, plus freelance POS systems built with JavaScript, Angular, React, and Java.
      </p>

      <div className="projects__filters">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`project-filter ${activeFilter === category ? 'active' : ''}`}
            onClick={() => setActiveFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="projects__grid">
        {filteredProjects.map((project, index) => (
          <article key={project.id} className="project-card fade-up">
            <div className="project-card__body">
              <span className="project-card__index">{String(index + 1).padStart(2, '0')}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-card__tech">
                {project.tech.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Projects
