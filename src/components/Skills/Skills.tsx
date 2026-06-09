import { useEffect, useState } from 'react'
import { skills } from '../../data/skills'
import iconAngular from '../../assets/icons/frontend/angular.jpg'
import iconBootstrap from '../../assets/icons/frontend/bootstrap.jpg'
import iconJavascript from '../../assets/icons/frontend/javascript.jpg'
import iconReact from '../../assets/icons/frontend/react.jpg'
import iconTypescript from '../../assets/icons/frontend/typescript.jpg'
import iconMicroservice from '../../assets/icons/backend/microservice.jpg'
import iconJava from '../../assets/icons/backend/java.jpg'
import iconSpringboot from '../../assets/icons/backend/springboot.jpg'
import iconMysql from '../../assets/icons/database/mysql.jpg'
import iconPostgresql from '../../assets/icons/database/postgresql.jpg'
import iconGit from '../../assets/icons/devops/git.jpg'
import iconDocker from '../../assets/icons/devops/docker.jpg'
import iconCicd from '../../assets/icons/devops/cicd.jpg'
import iconAws from '../../assets/icons/devops/aws.jpg'
import iconKubernetes from '../../assets/icons/devops/kubernetes.jpg'
import iconJenkins from '../../assets/icons/devops/jenkins.jpg'
import iconLinux from '../../assets/icons/devops/linux.jpg'
import iconGitHub from '../../assets/icons/github.svg'
import iconDefault from '../../assets/vite.svg'
import './Skills.css'

const skillIcons: Record<string, string> = {
  Angular: iconAngular,
  TypeScript: iconTypescript,
  JavaScript: iconJavascript,
  HTML5: iconDefault,
  CSS3: iconDefault,
  Bootstrap: iconBootstrap,
  React: iconReact,
  Java: iconJava,
  'Spring Boot': iconSpringboot,
  'REST APIs': iconMicroservice,
  Microservices: iconMicroservice,
  Dubbo: iconMicroservice,
  MySQL: iconMysql,
  PostgreSQL: iconPostgresql,
  Oracle: iconMysql,
  Git: iconGit,
  GitHub: iconGitHub,
  Docker: iconDocker,
  Kubernetes: iconKubernetes,
  Jenkins: iconJenkins,
  Nacos: iconKubernetes,
  AWS: iconAws,
  'CI/CD': iconCicd,
  Linux: iconLinux,
}

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
                  <div className="skill-card__media">
                    <img src={skillIcons[skill.name] ?? iconDefault} alt={`${skill.name} logo`} />
                  </div>
                  <div className="skill-card__content">
                    <span className="skill-card__name">{skill.name}</span>
                    <span className="skill-card__level">{skill.level}%</span>
                  </div>
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
