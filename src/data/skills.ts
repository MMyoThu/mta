export type SkillCategory = {
  category: string
  items: { name: string; level: number }[]
}

export const skills: SkillCategory[] = [
  {
    category: 'Frontend',
    items: [
      { name: 'Angular', level: 96 },
      { name: 'TypeScript', level: 93 },
      { name: 'JavaScript', level: 92 },
      { name: 'HTML5', level: 97 },
      { name: 'CSS3', level: 95 },
      { name: 'Bootstrap', level: 88 },
      { name: 'React', level: 87 },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Java', level: 94 },
      { name: 'Spring Boot', level: 92 },
      { name: 'REST APIs', level: 91 },
      { name: 'Microservices', level: 89 },
      { name: 'Dubbo', level: 86 },
    ],
  },
  {
    category: 'Database',
    items: [
      { name: 'MySQL', level: 93 },
      { name: 'PostgreSQL', level: 90 },
      { name: 'Oracle', level: 85 },
    ],
  },
  {
    category: 'Tools & DevOps',
    items: [
      { name: 'Git', level: 94 },
      { name: 'GitHub', level: 94 },
      { name: 'Docker', level: 88 },
      { name: 'Kubernetes', level: 84 },
      { name: 'Jenkins', level: 82 },
      { name: 'Nacos', level: 80 },
      { name: 'AWS', level: 85 },
      { name: 'CI/CD', level: 89 },
      { name: 'Linux', level: 90 },
    ],
  },
]
