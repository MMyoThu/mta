import { motion } from 'motion/react'
import SectionHeader from '../../motion/SectionHeader'
import { cardHover, fadeUp, stagger, tapPress, viewportOnce } from '../../motion/presets'
import './About.css'

const highlights = [
  {
    index: '01',
    title: 'Experience',
    body: 'Senior Java Developer at A Bank, previously Full-Stack Developer at Blue Stone Solution, with freelance POS and web work across JavaScript, Angular, React, and Java.',
  },
  {
    index: '02',
    title: 'Specialization',
    body: 'Backend services, API integrations, database optimization, RabbitMQ processing, and production support for banking and fintech systems.',
  },
  {
    index: '03',
    title: 'Education',
    body: 'Bachelor of Computer Science from Computer University (Monywa) and Java Developer certification from Java Developer Class (JDC).',
  },
  {
    index: '04',
    title: 'Focus',
    body: 'Clean, maintainable solutions for real-world problems, with a strong interest in fullstack development and DevOps.',
  },
]

const extraPages = [
  { href: '/hobbies', label: 'More' },
]

const About = () => {
  return (
    <section className="about" id="about">
      <SectionHeader
        index="01"
        kicker="Introduction"
        title="About Me"
        subtitle="Software developer specializing in Java backend and website development. Skilled in designing backend services, developing API integrations, optimizing database operations, and troubleshooting production issues. Experienced with React, JavaScript, TypeScript, Docker, Git, and cloud deployment."
      />

      <motion.div
        className="about__grid"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {highlights.map((item) => (
          <motion.article key={item.title} className="about__card" variants={fadeUp} whileHover={cardHover} whileTap={tapPress}>
            <span>{item.index}</span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </motion.article>
        ))}
      </motion.div>

      <motion.p
        className="about__more"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <span>Away from work</span>
        {extraPages.map((page) => (
          <motion.a key={page.href} href={page.href} className="about__more-link" whileHover={{ y: -1 }} whileTap={tapPress}>
            {page.label}
          </motion.a>
        ))}
      </motion.p>
    </section>
  )
}

export default About
