export type Project = {
  id: string
  title: string
  description: string
  tech: string[]
}

export const projects: Project[] = [
  {
    id: 'a-plus-wallet',
    title: 'A Plus Wallet, Agent & Merchant',
    description:
      'Secure, scalable banking applications for A Bank covering customer wallet, agent, and merchant flows. Built backend services with Java, Spring Boot, REST APIs, and MyBatis, plus RabbitMQ-based async processing for production reliability.',
    tech: ['Java', 'Spring Boot', 'REST API', 'MyBatis', 'RabbitMQ', 'MySQL'],
  },
  {
    id: 'r2e-crypto-wallet',
    title: 'R2E Crypto Wallet & Portal',
    description:
      'Recycle-to-Earn crypto wallet application and portal where users earn rewards for recycling. Built with Angular, Ionic, and Java, including REST APIs, business logic, and database operations for secure cryptocurrency transactions.',
    tech: ['Java', 'Angular', 'Ionic', 'REST API', 'MySQL'],
  },
  {
    id: 'mifos-microfinance',
    title: 'Mifos Microfinance',
    description:
      'Customized and enhanced Mifos microfinance solutions by developing backend services and application features based on institutional requirements, supporting financial services for underserved communities.',
    tech: ['Java', 'REST API', 'MySQL', 'Mifos', 'Hibernate'],
  },
  {
    id: 'retail-pos',
    title: 'Retail POS & Inventory',
    description:
      'Freelance point-of-sale system for retail shops covering barcode checkout, receipts, discounts, and live stock updates. Built the Angular counter UI and Java REST APIs for sales, inventory, and end-of-day reports.',
    tech: ['POS', 'Angular', 'JavaScript', 'Java', 'REST API', 'MySQL'],
  },
  {
    id: 'restaurant-pos',
    title: 'Restaurant Table POS',
    description:
      'Freelance restaurant POS for table orders, kitchen tickets, split bills, and takeaway. Built a React frontend for cashiers and wait staff, with Java backend services for menus, tables, and daily sales.',
    tech: ['POS', 'React', 'JavaScript', 'Java', 'REST API', 'MySQL'],
  },
  {
    id: 'mini-mart-pos',
    title: 'Mini Mart Checkout POS',
    description:
      'Freelance convenience-store POS for fast checkout, product search, low-stock alerts, and cashier shift closing. Delivered a JavaScript/Angular storefront with Java APIs for products, sales, and cash drawer totals.',
    tech: ['POS', 'JavaScript', 'Angular', 'Java', 'REST API', 'MySQL'],
  },
  {
    id: 'pharmacy-pos',
    title: 'Pharmacy POS & Stock Control',
    description:
      'Freelance pharmacy POS with batch/expiry tracking, supplier stock-in, and prescription-item sales. Built Angular screens for pharmacists and Java services to keep inventory accurate across counters.',
    tech: ['POS', 'Angular', 'Java', 'REST API', 'MySQL'],
  },
  {
    id: 'cafe-pos',
    title: 'Cafe & F&B POS',
    description:
      'Freelance cafe POS for counter orders, modifiers, combo sets, and quick reprint receipts. Implemented a React/JavaScript cashier flow and Java REST APIs for menu items, promotions, and shift reports.',
    tech: ['POS', 'React', 'JavaScript', 'Java', 'REST API'],
  },
  {
    id: 'wholesale-pos',
    title: 'Wholesale Billing POS',
    description:
      'Freelance wholesale billing POS for bulk sales, customer credit, and invoice history. Built Angular and React client screens with Java backend logic for pricing tiers, outstanding balances, and printable invoices.',
    tech: ['POS', 'Angular', 'React', 'Java', 'REST API', 'MySQL'],
  },
  {
    id: 'multi-counter-pos',
    title: 'Multi-Counter Shop POS',
    description:
      'Freelance multi-counter POS for shops running several cashiers at once. Shared product catalog, real-time stock, and consolidated daily sales across counters using JavaScript frontends and Java REST APIs.',
    tech: ['POS', 'JavaScript', 'Angular', 'React', 'Java', 'REST API', 'MySQL'],
  },
]
