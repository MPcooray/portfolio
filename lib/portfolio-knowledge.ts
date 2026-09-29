export const portfolioKnowledge = {
  summary:
    'Manula Cooray is a Sri Lankan athlete-engineer whose journey combines software systems, engineering, leadership, and competitive swimming.',
  education: [
    'BSc (Hons) in Computer Science at SLIIT.',
    'BEng (Hons) in Electrical and Electronic Engineering at the University of the West of England, completed with a second lower degree.',
    'MSc in Artificial Intelligence at Anglia Ruskin University, started in 2025 and continuing through 2026.',
  ],
  timeline: [
    'Ananda College from 2008 to 2022.',
    'Junior Prefect in 2012.',
    'Swimming Junior Vice Captain in 2019.',
    'Swimming Captain in 2020.',
    'SLIIT Swimming Vice Captain in 2024.',
    'SLIIT Swimming Captain in 2025.',
    'SLIIT Sports Council President in 2025.',
  ],
  projects: [
    'Distributed File System focused on resilience, fault tolerance, leader election, and recovery.',
    'FormLang++, a domain-specific language for generating validated responsive HTML forms.',
    'Laboratory Management System using Spring Boot, PostgreSQL, Next.js, and TypeScript.',
    'AquaMonitor, an IoT fish tank monitoring system using ESP32, sensors, Firebase, and React.',
    'AI-powered medical symptom checker with symptom search, diagnosis prediction, guidance, and doctor discovery.',
    'Vehicle detection system using ultrasonic sensors, LCD displays, LEDs, and buzzer alerts.',
    'Noise reduction filter research for digital signal processing work.',
    'Control system design involving plant modelling, controller design, and simulation.',
    'Cloud and systems work involving AWS EC2, SSH, SFTP, SCP, rsync, and OpenMP.',
  ],
  strengths: [
    'discipline built through competitive swimming',
    'leadership shaped by school and university captaincy and sports council roles',
    'interest in software systems, embedded thinking, artificial intelligence, and practical problem solving',
    'public speaking, team leadership, and event coordination',
  ],
  interests: [
    'software engineering',
    'AI-related work',
    'distributed systems',
    'embedded and systems-oriented roles',
    'technical leadership',
  ],
  contact: {
    email: 'manulacooray@gmail.com',
    linkedin: 'https://www.linkedin.com/in/manula-cooray-b5bb862b2/',
  },
}

export function buildPortfolioContext() {
  return `
You are Manula Cooray's portfolio assistant.

Your job:
- Answer questions about Manula clearly, confidently, and professionally.
- Use only the portfolio knowledge below.
- If a question goes beyond the provided information, say that you should not guess and offer the closest available answer.
- Keep answers concise but warm.
- If the user asks how to contact Manula, provide the contact details from the knowledge base.

Portfolio knowledge:

Summary:
${portfolioKnowledge.summary}

Education:
${portfolioKnowledge.education.map((item) => `- ${item}`).join('\n')}

Timeline:
${portfolioKnowledge.timeline.map((item) => `- ${item}`).join('\n')}

Projects:
${portfolioKnowledge.projects.map((item) => `- ${item}`).join('\n')}

Strengths:
${portfolioKnowledge.strengths.map((item) => `- ${item}`).join('\n')}

Career interests:
${portfolioKnowledge.interests.map((item) => `- ${item}`).join('\n')}

Contact:
- Email: ${portfolioKnowledge.contact.email}
- LinkedIn: ${portfolioKnowledge.contact.linkedin}
  `.trim()
}
