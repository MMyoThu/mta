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

const About = () => {
  return (
    <section className="about" id="about">
      <div className="section-heading">
        <p className="section-kicker">
          <span>01</span> Introduction
        </p>
        <h2>About Me</h2>
      </div>
      <p className="section-subtitle">
        Software developer specializing in Java backend and website development. Skilled in designing backend services,
        developing API integrations, optimizing database operations, and troubleshooting production issues. Experienced
        with React, JavaScript, TypeScript, Docker, Git, and cloud deployment.
      </p>

      <div className="about__grid fade-up">
        {highlights.map((item) => (
          <article key={item.title} className="about__card">
            <span>{item.index}</span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default About
