export type ExperienceItem = {
  title: string
  company: string
  period: string
  summary: string[]
  technologies: string[]
}

export const experience: ExperienceItem[] = [
  {
    title: 'Software Developer',
    company: 'Enterprise Solutions',
    period: '2021 - Present',
    summary: [
      'Built enterprise-grade web applications with Angular, and Java Spring Boot.',
      'Designed REST APIs, microservices, and payment integration flows.',
      'Collaborated with teams to deploy solutions on Kubernetes and AWS.',
    ],
    technologies: ['Angular','React', 'Spring Boot', 'Kubernetes', 'AWS'],
  },
  {
    title: 'Full Stack Developer',
    company: 'Cloud Application Studio',
    period: '2019 - 2021',
    summary: [
      'Delivered responsive user experiences using modern web practices.',
      'Created scalable backend services with Java, Spring Boot, and Dubbo.',
      'Implemented CI/CD pipelines and infrastructure automation.',
    ],
    technologies: ['Java', 'Spring Boot', 'Dubbo', 'Docker', 'CI/CD'],
  },
]
