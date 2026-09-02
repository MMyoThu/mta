export type ExperienceItem = {
  title: string
  company: string
  location: string
  period: string
  summary: string[]
  technologies: string[]
}

export const experience: ExperienceItem[] = [
  {
    title: 'Senior Java Developer',
    company: 'A Bank',
    location: 'Yangon, Myanmar',
    period: '11/2025 – Present',
    summary: [
      'Developed secure and scalable banking applications (A Plus Wallet, Agent, and Merchant) using Java, Spring Boot, REST APIs, and MyBatis.',
      'Designed and optimized backend services, database operations, and RabbitMQ-based asynchronous processing to improve system performance and reliability.',
      'Focused on backend development and production support, collaborating with cross-functional teams to deliver high-quality, business-critical banking solutions.',
    ],
    technologies: ['Java', 'Spring Boot', 'REST APIs', 'MyBatis', 'RabbitMQ', 'MySQL'],
  },
  {
    title: 'Full-Stack Developer',
    company: 'Blue Stone Solution',
    location: 'Yangon, Myanmar',
    period: '01/2024 – 10/2025',
    summary: [
      'Developed the R2E (Recycle-to-Earn) crypto wallet application and portal using Angular, Ionic, and Java, building REST APIs, business logic, and database operations for secure cryptocurrency transactions.',
      'Customized and enhanced Mifos microfinance solutions by developing backend services and application features based on business requirements.',
      'Contributed to cloud deployment workflows and production support, monitoring and troubleshooting issues after major releases to keep applications stable.',
    ],
    technologies: ['Java', 'Angular', 'Ionic', 'REST APIs', 'MySQL', 'Mifos'],
  },
  {
    title: 'Freelance Web Developer',
    company: 'Freelancer',
    location: 'Yangon, Myanmar',
    period: '02/2022 – 11/2025',
    summary: [
      'Delivered multiple point-of-sale (POS) systems for retail shops, restaurants, pharmacies, and cafes using JavaScript, Angular, React, and Java.',
      'Developed responsive cashier and admin screens, then integrated Java REST APIs for sales, inventory, receipts, and daily reports.',
      'Worked with clients to gather requirements, train staff on POS workflows, and provide ongoing maintenance and support.',
    ],
    technologies: ['JavaScript', 'Angular', 'React', 'Java', 'REST APIs'],
  },
  {
    title: 'Java Developer Certificate',
    company: 'Java Developer Class (JDC)',
    location: 'Yangon, Myanmar',
    period: '07/2023 – 12/2023',
    summary: [
      'Completed Java Developer training with emphasis on Java programming, OOP concepts, and Angular fundamentals.',
      'Strengthened practical understanding of backend architecture, application design, and modern development workflows.',
    ],
    technologies: ['Java', 'Angular', 'OOP'],
  },
  {
    title: 'Bachelor of Computer Science (BCSC)',
    company: 'Computer University (Monywa)',
    location: 'Monywa, Myanmar',
    period: '12/2018 – 03/2020',
    summary: [
      'Studied core computer science fundamentals including data structures, object-oriented programming, and software principles.',
    ],
    technologies: ['Data Structures', 'OOP', 'Computer Science'],
  },
]
