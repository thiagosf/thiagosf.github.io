import ProjectCard from './ProjectCard';

// TODO: Replace with curated projects from thiagosf.net
const projects = [
  {
    title: 'Project One',
    description: 'A modern web app that solves X with Y. Fast, accessible, and beautiful.',
    tech: ['React', 'TypeScript', 'Tailwind'],
    live: '#',
    code: '#',
  },
  {
    title: 'Project Two',
    description: 'Open-source tool for Z. Focused on performance and developer experience.',
    tech: ['Next.js', 'Node.js', 'Vercel'],
    live: '#',
    code: '#',
  },
  // Add 2–4 more as needed
];

export default function ProjectsSection() {
  return (
    <section className="py-12 px-4 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in animate-delay-400" aria-label="Side Projects">
      {projects.map((project, i) => (
        <ProjectCard key={i} {...project} index={i} />
      ))}
    </section>
  );
}
