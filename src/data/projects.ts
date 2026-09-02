export type Project = {
  id: string
  title: string
  description: string
  tech: string[]
  githubUrl: string
}

export const projects: Project[] = [
  {
    id: 'a-plus-wallet',
    title: 'A Plus Wallet, Agent & Merchant',
    description:
      'Secure, scalable banking applications for A Bank covering customer wallet, agent, and merchant flows. Built backend services with Java, Spring Boot, REST APIs, and MyBatis, plus RabbitMQ-based async processing for production reliability.',
    tech: ['Java', 'Spring Boot', 'REST API', 'MyBatis', 'RabbitMQ', 'MySQL'],
    githubUrl: 'https://github.com/MMyoThu',
  },
  {
    id: 'r2e-crypto-wallet',
    title: 'R2E Crypto Wallet & Portal',
    description:
      'Recycle-to-Earn crypto wallet application and portal where users earn rewards for recycling. Built with Angular, Ionic, and Java, including REST APIs, business logic, and database operations for secure cryptocurrency transactions.',
    tech: ['Java', 'Angular', 'Ionic', 'REST API', 'MySQL'],
    githubUrl: 'https://github.com/MMyoThu',
  },
  {
    id: 'mifos-microfinance',
    title: 'Mifos Microfinance',
    description:
      'Customized and enhanced Mifos microfinance solutions by developing backend services and application features based on institutional requirements, supporting financial services for underserved communities.',
    tech: ['Java', 'REST API', 'MySQL', 'Mifos', 'Hibernate'],
    githubUrl: 'https://github.com/MMyoThu',
  },
]
