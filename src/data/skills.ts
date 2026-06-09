export type SkillCategory = {
  category: string
  items: { name: string }[]
}

export const skills: SkillCategory[] = [
  {
    category: 'Frontend',
    items: [
      { name: 'Angular'},
      { name: 'TypeScript' },
      { name: 'JavaScript' },
      { name: 'Tailwind CSS'},
      { name: 'Bootstrap'},
      { name: 'React',},
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Java' },
      { name: 'Spring Boot'},
      { name: 'Microservices'},
    ],
  },
  {
    category: 'Database',
    items: [
      { name: 'MySQL'},
      { name: 'PostgreSQL'},
    ],
  },
  {
    category: 'Tools & DevOps',
    items: [
      { name: 'Git'},
      { name: 'Docker'},
      { name: 'Nacos'},
      { name: 'AWS'},
      { name: 'CI/CD'},
      { name: 'Linux'},
      { name: 'Kubernetes'},
      { name: 'Jenkins'},
    ],
  },
]
