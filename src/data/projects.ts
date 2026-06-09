export type Project = {
  id: string
  title: string
  description: string
  image: string
  tech: string[]
  demoUrl: string
  githubUrl: string
}

export const projects: Project[] = [
  {
    id: 'meeting-management',
    title: 'Meeting Management System',
    description:
      'A scalable management platform for scheduling, tracking, and reporting meetings across enterprise teams.',
    image: '/src/assets/images/project1.png',
    tech: ['Angular', 'Spring Boot', 'MySQL', 'AWS'],
    demoUrl: '#contact',
    githubUrl: 'https://github.com',
  },
  {
    id: 'digital-wallet',
    title: 'Digital Wallet Application',
    description:
      'A secure digital wallet for transactions, balance insights, and fast account top-ups on mobile and web.',
    image: '/src/assets/images/project2.png',
    tech: ['React', 'Java', 'REST APIs', 'Kubernetes'],
    demoUrl: '#contact',
    githubUrl: 'https://github.com',
  },
  {
    id: 'mobile-banking',
    title: 'Mobile Banking Platform',
    description:
      'A responsive mobile banking interface with account management, transfers, and financial analytics.',
    image: '/src/assets/images/project3.png',
    tech: ['Angular', 'Spring Boot', 'PostgreSQL', 'Docker'],
    demoUrl: '#contact',
    githubUrl: 'https://github.com',
  },
  {
    id: 'employee-management',
    title: 'Employee Management System',
    description:
      'A comprehensive HR management solution with employee lifecycle tracking and performance dashboards.',
    image: '/src/assets/images/project4.png',
    tech: ['Java', 'Spring Boot', 'Oracle', 'Microservices'],
    demoUrl: '#contact',
    githubUrl: 'https://github.com',
  },
  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    description:
      'A polished online shopping experience with catalog management, secure checkout, and responsive design.',
    image: '/src/assets/images/project5.png',
    tech: ['Angular', 'Bootstrap', 'AWS', 'CI/CD'],
    demoUrl: '#contact',
    githubUrl: 'https://github.com',
  },
]
