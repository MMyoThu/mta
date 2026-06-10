import { useMemo, useState } from 'react'
import { projects } from '../../data/projects'
import './Projects.css'

const Projects = () => {
  const categories = useMemo(() => {
    const techs = new Set<string>()
    projects.forEach((project) => project.tech.forEach((tech) => techs.add(tech)))
    return ['All', ...Array.from(techs).sort()]
  }, [])

  const [activeFilter, setActiveFilter] = useState('All')
  const filteredProjects = useMemo(
    () => projects.filter((project) => activeFilter === 'All' || project.tech.includes(activeFilter)),
    [activeFilter],
  )

  return (
    <section className="projects" id="projects">
      <div className="section-title">
        <span />
        <h2>Projects</h2>
      </div>
      <p className="section-subtitle">
        Portfolio projects showcasing solutions built with modern stacks, cloud-ready deployments, and strong business logic.
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
        {filteredProjects.map((project) => (
          <article key={project.id} className="project-card fade-up">
            <div className="project-card__body">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-card__tech">
                {project.tech.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              <div className="project-card__actions">
                <a href={project.demoUrl} className="button button--primary" target="_blank" rel="noreferrer">
                  Live Demo
                </a>
                <a href={project.githubUrl} className="button button--secondary" target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Projects
