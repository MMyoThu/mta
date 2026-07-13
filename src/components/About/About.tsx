import './About.css'

const About = () => {
  return (
    <section className="about" id="about">
      <div className="section-title">
        <span />
        <h2>About Me</h2>
      </div>
      <p className="section-subtitle">
        I am a professional web developer with a strong problem-solving mindset who builds clean, user-friendly applications for enterprise and e-wallet products.
      </p>

      <div className="about__grid fade-up">
        <div className="about__card">
          <h3>Experience</h3>
          <p>3+ years of developing modern applications across web and mobile ecosystems.</p>
        </div>
        <div className="about__card">
          <h3>Mindset</h3>
          <p>Approach every project with curiosity, discipline, and attention to scalable architecture.</p>
        </div>
        <div className="about__card">
          <h3>Learning</h3>
          <p>Always exploring new frameworks, cloud capabilities, and automation tools to deliver fast value.</p>
        </div>
        <div className="about__card">
          <h3>Focus</h3>
          <p>Clean code, maintainable solutions, and intuitive user experiences are core priorities.</p>
        </div>
      </div>
    </section>
  )
}

export default About
