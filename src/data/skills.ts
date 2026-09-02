export type SkillCategory = {
  category: string
  items: { name: string }[]
}

export const skills: SkillCategory[] = [
  {
    category: 'Languages & Frontend',
    items: [
      { name: 'JavaScript' },
      { name: 'TypeScript' },
      { name: 'SQL' },
      { name: 'Angular' },
      { name: 'React' },
      { name: 'Ionic' },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Java' },
      { name: 'Spring Boot' },
      { name: 'REST API' },
      { name: 'MyBatis' },
      { name: 'JPA / Hibernate' },
      { name: 'Microservices' },
    ],
  },
  {
    category: 'Data & Messaging',
    items: [
      { name: 'MySQL' },
      { name: 'PostgreSQL' },
      { name: 'Redis' },
      { name: 'RabbitMQ' },
    ],
  },
  {
    category: 'DevOps & Practices',
    items: [
      { name: 'Git' },
      { name: 'Docker' },
      { name: 'Flyway' },
      { name: 'CI/CD' },
      { name: 'Agile' },
    ],
  },
  {
    category: 'Languages',
    items: [
      { name: 'Burmese' },
      { name: 'English' },
    ],
  },
]
