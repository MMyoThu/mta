import { experience } from '../../data/experience'
import './Experience.css'

const Experience = () => {
  return (
    <section className="experience" id="experience">
      <div className="section-title">
        <span />
        <h2>Experience</h2>
      </div>
      <div className="experience__timeline">
        {experience.map((item) => (
          <article key={item.title} className="experience__item fade-up">
            <div className="experience__header">
              <div>
                <h3>{item.title}</h3>
                <p className="experience__company">{item.company}</p>
              </div>
              <span>{item.period}</span>
            </div>
            <ul>
              {item.summary.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <div className="experience__tech">
              {item.technologies.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Experience
