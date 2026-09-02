import { experience } from '../../data/experience'
import './Experience.css'

const Experience = () => {
  return (
    <section className="experience" id="experience">
      <div className="section-heading">
        <p className="section-kicker">
          <span>03</span> Timeline
        </p>
        <h2>Experience</h2>
      </div>
      <p className="section-subtitle">
        Banking systems, recycle-to-earn fintech, and freelance web work — from A Bank to Blue Stone Solution.
      </p>

      <div className="experience__timeline">
        {experience.map((item, index) => (
          <article key={`${item.company}-${item.period}`} className="experience__item fade-up">
            <span className="experience__index">{String(index + 1).padStart(2, '0')}</span>
            <div className="experience__header">
              <div>
                <h3>{item.title}</h3>
                <p className="experience__company">
                  {item.company}
                  {item.location ? ` · ${item.location}` : ''}
                </p>
              </div>
              <span className="experience__period">{item.period}</span>
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
