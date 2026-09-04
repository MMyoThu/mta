import { motion } from 'motion/react'
import { experience } from '../../data/experience'
import SectionHeader from '../../motion/SectionHeader'
import { cardHover, fadeUp, motionEase, viewportOnce } from '../../motion/presets'
import './Experience.css'

const Experience = () => {
  return (
    <section className="experience" id="experience">
      <SectionHeader
        index="03"
        kicker="Timeline"
        title="Experience"
        subtitle="Banking systems, recycle-to-earn fintech, and freelance POS systems — from A Bank to Blue Stone Solution."
      />

      <div className="experience__timeline">
        <motion.span
          className="experience__line"
          aria-hidden="true"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, ease: motionEase }}
        />
        {experience.map((item, index) => (
          <motion.article
            key={`${item.company}-${item.period}`}
            className="experience__item"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.28 }}
            whileHover={cardHover}
          >
            <motion.span
              className="experience__dot"
              aria-hidden="true"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ type: 'spring', stiffness: 320, damping: 18, delay: 0.08 }}
            />
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
          </motion.article>
        ))}
      </div>
    </section>
  )
}

export default Experience
