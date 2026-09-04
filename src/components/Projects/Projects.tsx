import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { projects } from '../../data/projects'
import SectionHeader from '../../motion/SectionHeader'
import { fadeUp, projectCard, projectZoom, stagger, tapPress, viewportOnce } from '../../motion/presets'
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
      <SectionHeader
        index="04"
        kicker="Selected work"
        title="Projects"
        subtitle="Banking and fintech products, plus freelance POS systems built with JavaScript, Angular, React, and Java."
      />

      <motion.div
        className="projects__filters"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {categories.map((category) => (
          <motion.button
            key={category}
            type="button"
            className={`project-filter ${activeFilter === category ? 'active' : ''}`}
            onClick={() => setActiveFilter(category)}
            variants={fadeUp}
            whileHover={{ y: -1, scale: 1.03 }}
            whileTap={tapPress}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      <motion.div
        className="projects__grid"
        key={activeFilter}
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {filteredProjects.map((project, index) => (
          <motion.article
            key={project.id}
            className="project-card"
            variants={projectCard}
            whileHover="hovered"
            whileTap={tapPress}
          >
            <motion.div className="project-card__body" variants={projectZoom}>
              <span className="project-card__index">{String(index + 1).padStart(2, '0')}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-card__tech">
                {project.tech.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </motion.div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}

export default Projects
