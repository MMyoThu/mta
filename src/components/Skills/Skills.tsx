import { useEffect, useRef, useState } from 'react'
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
import './Skills.css'

const skillIcons: Record<string, string> = {
  Angular: iconAngular,
  TypeScript: iconTypescript,
  JavaScript: iconJavascript,
  Bootstrap: iconBootstrap,
  React: iconReact,
  Java: iconJava,
  'Spring Boot': iconSpringboot,
  'Spring MVC': iconSpringboot,
  'Spring Security': iconSpringboot,
  'Spring Data JPA': iconSpringboot,
  'REST API': iconMicroservice,
  'REST APIs': iconMicroservice,
  'RESTful APIs': iconMicroservice,
  MyBatis: iconJava,
  'JPA / Hibernate': iconSpringboot,
  Hibernate: iconJava,
  SQL: iconMysql,
  Microservices: iconMicroservice,
  'Microservices Architecture': iconMicroservice,
  Dubbo: iconMicroservice,
  MySQL: iconMysql,
  PostgreSQL: iconPostgresql,
  Oracle: iconMysql,
  Git: iconGit,
  GitHub: iconGitHub,
  GitLab: iconGit,
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
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = sectionRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.16 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="skills" id="skills" ref={sectionRef}>
      <div className="section-heading">
        <p className="section-kicker">
          <span>02</span> Toolkit
        </p>
        <h2>Skills</h2>
      </div>
      <p className="section-subtitle">
        I work across Java backend, websites, databases, and DevOps to deliver secure, maintainable applications.
      </p>

      <div className={`skills__grid ${visible ? 'is-visible' : ''}`}>
        {skills.map((group) => (
          <article key={group.category} className="skills__group">
            <h3>{group.category}</h3>
            <div className="skills__list">
              {group.items.map((skill) => (
                <div key={`${group.category}-${skill.name}`} className="skill-chip">
                  <span className="skill-chip__icon">
                    {skillIcons[skill.name] ? (
                      <img src={skillIcons[skill.name]} alt="" />
                    ) : (
                      <em aria-hidden="true">{skill.name.charAt(0)}</em>
                    )}
                  </span>
                  <span className="skill-chip__name">{skill.name}</span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Skills
