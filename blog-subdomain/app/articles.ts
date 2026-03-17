export type BlogArticle = {
  slug: string
  title: string
  href: string
  type: string
  note: string
  excerpt: string
  readTime: string
  takeaways: string[]
  imageSrc?: string
  imageAlt?: string
}

export const mediumProfile = 'https://medium.com/@manulacooray'

export const blogArticles: BlogArticle[] = [
  {
    slug: 'graphics-visualization-module',
    title: 'How Graphics & Visualization Became the Most Unexpectedly Exciting Module of My Degree',
    href: 'https://medium.com/p/765405b66470',
    type: 'Reflection',
    note: 'A personal technical reflection on discovering unexpected excitement in graphics and visualization.',
    excerpt:
      'This piece captures the moment a module that initially felt mathematical and distant became one of the most engaging parts of the degree experience.',
    readTime: '4 min read',
    imageSrc: 'https://manulacooray.com/visualization.png',
    imageAlt: 'Preview image for the graphics and visualization article',
    takeaways: [
      'Unexpected subjects can become turning points when approached with curiosity.',
      'Visualization changes how technical concepts are felt, not just understood.',
      'Growth in engineering often comes from the modules we least expect to enjoy.',
    ],
  },
  {
    slug: 'microservice-architecture',
    title: 'Understanding Microservice Architecture: From Monolith to Modern Systems',
    href: 'https://medium.com/@manulacooray/understanding-microservice-architecture-from-monolith-to-modern-systems-6712530b3318',
    type: 'Architecture',
    note: 'A systems-focused piece on how software architecture evolves from monoliths toward scalable service-based design.',
    excerpt:
      'A practical introduction to the tradeoffs behind monoliths, services, and the architectural choices that shape modern software systems.',
    readTime: '6 min read',
    takeaways: [
      'Architecture is as much about tradeoffs as it is about scale.',
      'Microservices make sense when complexity, independence, and resilience matter.',
      'Clear system boundaries are essential before distribution adds value.',
    ],
  },
  {
    slug: 'careers-need-ai-integration',
    title: 'Why Every Career in Technology Now Requires AI Integration',
    href: 'https://medium.com/@manulacooray/why-every-career-in-technology-now-requires-ai-integration-9079c45fb476',
    type: 'AI',
    note: 'A broader perspective on why AI literacy is becoming fundamental across modern technical careers.',
    excerpt:
      'A forward-looking article on why AI is no longer a niche specialty, but a capability shaping expectations across the technology landscape.',
    readTime: '5 min read',
    takeaways: [
      'AI understanding is becoming a baseline skill across technical roles.',
      'Integration matters more than hype; real value comes from useful applications.',
      'Professionals who adapt early will be better positioned for future systems work.',
    ],
  },
  {
    slug: 'react-day-01-introduction',
    title: 'Day 01 - Introduction to React: The Future of Frontend Development',
    href: 'https://medium.com/@manulacooray/%EF%B8%8F-day-01-introduction-to-react-the-future-of-frontend-development-30cd783dd743',
    type: 'React Series',
    note: 'The opening piece in a React learning series, covering the bigger picture of why React matters.',
    excerpt:
      'An entry point into the React ecosystem focused on why component-driven thinking became so influential in modern frontend development.',
    readTime: '4 min read',
    takeaways: [
      'React changed frontend development by making UI composition scalable.',
      'The framework matters less than the mindset it encourages.',
      'Strong fundamentals make later ecosystem tools easier to understand.',
    ],
  },
  {
    slug: 'react-day-02-components',
    title: 'Day 02 - Understanding React Components: The Building Blocks of Every React App',
    href: 'https://medium.com/@manulacooray/%EF%B8%8F-day-02-understanding-react-components-the-building-blocks-of-every-react-app-7eb589f811d0',
    type: 'React Series',
    note: 'A practical introduction to components and the compositional mindset behind React applications.',
    excerpt:
      'A focused look at components as reusable building blocks and the foundation for structured, maintainable React interfaces.',
    readTime: '4 min read',
    takeaways: [
      'Components help turn UI into reusable, understandable units.',
      'Composition is one of React’s biggest strengths.',
      'Thinking in components improves both structure and readability.',
    ],
  },
  {
    slug: 'react-day-03-hooks',
    title: 'Day 03 - Understanding React Hooks: Bringing Life to Functional Components',
    href: 'https://medium.com/@manulacooray/%EF%B8%8F-day-03-understanding-react-hooks-bringing-life-to-functional-components-41f7b150673f',
    type: 'React Series',
    note: 'An accessible look at hooks and how they make functional React components dynamic and useful.',
    excerpt:
      'An explanation of how hooks moved state and lifecycle behavior into functional components, making React code more expressive.',
    readTime: '5 min read',
    takeaways: [
      'Hooks changed how React developers structure component logic.',
      'State and effects became more composable with functional components.',
      'Understanding hooks is key to writing modern React well.',
    ],
  },
  {
    slug: 'react-day-04-apis',
    title: 'Day 04 - Working with APIs in React: Bringing Your App to Life',
    href: 'https://medium.com/@manulacooray/%EF%B8%8F-day-04-working-with-apis-in-react-bringing-your-app-to-life-6d06f4c732f7',
    type: 'React Series',
    note: 'A hands-on walkthrough of using APIs to connect interface work to real application data.',
    excerpt:
      'A practical bridge between interface development and real-world data, showing how frontend applications become truly interactive.',
    readTime: '5 min read',
    takeaways: [
      'Real applications become valuable when connected to useful data.',
      'API handling is a foundational frontend skill.',
      'Clean data flow improves both UX and maintainability.',
    ],
  },
  {
    slug: 'react-day-05-ecosystem',
    title: 'Day 05 - The React Ecosystem: Node.js, Vite, Next.js, and More',
    href: 'https://medium.com/@manulacooray/%EF%B8%8F-day-05-the-react-ecosystem-node-js-vite-next-js-and-more-425e1744da55',
    type: 'React Series',
    note: 'A broader ecosystem overview that connects React development with the surrounding tooling landscape.',
    excerpt:
      'A wider look at the tooling around React and how frameworks, bundlers, and runtime choices shape the developer experience.',
    readTime: '5 min read',
    takeaways: [
      'React sits inside a broader ecosystem of tools, not in isolation.',
      'Choosing the right tool depends on project needs and workflow.',
      'Understanding the ecosystem helps developers make better architectural choices.',
    ],
  },
]
