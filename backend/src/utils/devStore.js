export const devStore = {
  profile: {
    name: 'Anushka Rao',
    headline: 'Full-Stack Software Engineer & Distributed Systems Architect',
    bio: 'Passionate software engineer experienced in engineering high-performance web applications, robust cloud microservices, and elegant developer platforms. Dedicated to clean code, security best practices, and delightful user experiences.',
    email: 'anushkarao.cse@gmail.com',
    location: 'San Francisco, CA / Remote',
    github: 'https://github.com/anushka12-rao',
    linkedin: 'https://linkedin.com',
    resumeUrl: 'https://example.com/resume.pdf'
  },
  projects: [
    {
      _id: 'p1',
      title: 'CloudScale Analytics Engine',
      slug: 'cloudscale-analytics-engine',
      description: 'A real-time telemetry and streaming analytics platform capable of processing over 100,000 events/sec with sub-second dashboard visualization.',
      technologies: ['React', 'TypeScript', 'Node.js', 'Kafka', 'ClickHouse', 'Tailwind CSS'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      githubUrl: 'https://github.com/example/cloudscale',
      liveUrl: 'https://example.com/demo',
      featured: true,
      order: 1,
      published: true
    },
    {
      _id: 'p2',
      title: 'DevPulse - Workflow Orchestrator',
      slug: 'devpulse-workflow-orchestrator',
      description: 'An open-source developer tool for automated CI/CD pipeline orchestration, canary deployments, and zero-downtime microservice rollouts.',
      technologies: ['React', 'Express.js', 'Docker', 'Kubernetes', 'MongoDB', 'Redis'],
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      githubUrl: 'https://github.com/example/devpulse',
      liveUrl: 'https://example.com/devpulse',
      featured: true,
      order: 2,
      published: true
    },
    {
      _id: 'p3',
      title: 'CryptoVault Institutional Gateway',
      slug: 'cryptovault-gateway',
      description: 'High-security multi-party computation (MPC) cryptocurrency custodial wallet portal with biometric authentication and audit tracing.',
      technologies: ['React', 'Node.js', 'Web3', 'PostgreSQL', 'Tailwind CSS'],
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80',
      githubUrl: 'https://github.com/example/cryptovault',
      liveUrl: 'https://example.com/vault',
      featured: true,
      order: 3,
      published: true
    },
    {
      _id: 'p4',
      title: 'Internal Admin Engine (Draft)',
      slug: 'internal-admin-engine-draft',
      description: 'Draft internal tooling project not yet visible to the public.',
      technologies: ['Express', 'MongoDB'],
      featured: false,
      order: 4,
      published: false
    }
  ],
  technologies: [
    { _id: 't1', name: 'JavaScript (ES2024+)', category: 'Languages', icon: 'Code2', order: 1, visible: true },
    { _id: 't2', name: 'TypeScript', category: 'Languages', icon: 'FileCode', order: 2, visible: true },
    { _id: 't3', name: 'Python', category: 'Languages', icon: 'Terminal', order: 3, visible: true },
    { _id: 't4', name: 'SQL & Go', category: 'Languages', icon: 'Cpu', order: 4, visible: true },
    { _id: 't5', name: 'React.js', category: 'Frontend', icon: 'Atom', order: 5, visible: true },
    { _id: 't6', name: 'Vite & Next.js', category: 'Frontend', icon: 'Layers', order: 6, visible: true },
    { _id: 't7', name: 'Tailwind CSS', category: 'Frontend', icon: 'Palette', order: 7, visible: true },
    { _id: 't8', name: 'Framer Motion', category: 'Frontend', icon: 'Sparkles', order: 8, visible: true },
    { _id: 't9', name: 'Node.js & Express', category: 'Backend', icon: 'Server', order: 9, visible: true },
    { _id: 't10', name: 'MongoDB & Mongoose', category: 'Backend', icon: 'Database', order: 10, visible: true },
    { _id: 't11', name: 'PostgreSQL & Prisma', category: 'Backend', icon: 'Boxes', order: 11, visible: true },
    { _id: 't12', name: 'REST & GraphQL APIs', category: 'Backend', icon: 'Network', order: 12, visible: true },
    { _id: 't13', name: 'Docker & Kubernetes', category: 'Tools', icon: 'Box', order: 13, visible: true },
    { _id: 't14', name: 'AWS Cloud & Cloudflare', category: 'Tools', icon: 'Cloud', order: 14, visible: true },
    { _id: 't15', name: 'Git & GitHub Actions', category: 'Tools', icon: 'GitBranch', order: 15, visible: true },
    { _id: 't16', name: 'Jest, Vitest & Cypress', category: 'Tools', icon: 'CheckCircle', order: 16, visible: true }
  ],
  achievements: [
    {
      _id: 'a1',
      title: 'AWS Certified Solutions Architect – Associate',
      organization: 'Amazon Web Services',
      description: 'Demonstrated advanced knowledge in architecting secure, resilient, high-performing, and cost-optimized cloud architectures on AWS.',
      date: '2024-03',
      certificateUrl: 'https://aws.amazon.com/certification/',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
      order: 1,
      visible: true
    },
    {
      _id: 'a2',
      title: '1st Place Winner - Global FinTech Hackathon',
      organization: 'FinTech Disrupt Summit',
      description: 'Built an autonomous real-time fraud detection gateway leveraging streaming graph neural networks across 50,000 simulated accounts.',
      date: '2023-09',
      certificateUrl: 'https://example.com/certificate/fintech',
      image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=600&q=80',
      order: 2,
      visible: true
    }
  ],
  messages: []
};
