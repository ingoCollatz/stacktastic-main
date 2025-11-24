export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  techStack: string[];
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  category: 'web' | 'mobile' | 'desktop' | 'fullstack';
  status: 'live' | 'development' | 'completed';
  highlighted?: boolean;
}

export const projects: Project[] = [
  {
    id: 'fynn-handyman',
    title: 'Fynn Schomann Hausmeisterservice',
    subtitle: 'Professional Handyman Service Website',
    description: 'A modern, responsive business website for a Frankfurt-based handyman service, featuring comprehensive service listings, multi-channel contact integration, and German localization.',
    longDescription: 'Built a complete digital presence for a professional handyman service in Frankfurt, Germany. The website showcases six core service categories including Entrümpelung (clearance), cleaning services, property maintenance, winter services, assembly work, and garden care. Features a modern responsive design with mobile-first approach, integrated contact forms, WhatsApp integration, and comprehensive service documentation.',
    techStack: ['SvelteKit', 'TypeScript', 'Tailwind CSS', 'Docker', 'Vite'],
    features: [
      'Responsive mobile-first design',
      'German localization & content',
      'Multi-channel contact integration (Phone/WhatsApp/Email)',
      'Service portfolio with detailed descriptions',
      'Contact form with service selection',
      'Docker containerization for deployment',
      'SEO-optimized structure',
      'Professional business presentation'
    ],
    liveUrl: 'https://fynn.stacktastic.dev',
    githubUrl: 'https://github.com/ingoCollatz/fynn',
    category: 'web',
    status: 'live',
    highlighted: true
  }
];

export const getFeaturedProjects = () => projects.filter(project => project.highlighted);
export const getProjectById = (id: string) => projects.find(project => project.id === id);