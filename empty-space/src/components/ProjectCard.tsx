import { Badge } from './ui/Badge';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  live?: string;
  code?: string;
  index?: number;
}

export default function ProjectCard({ title, description, tech, live, code, index = 0 }: ProjectCardProps) {
  return (
    <div
      className="relative bg-card text-card-foreground rounded-2xl shadow-soft hover:shadow-glow transition-shadow duration-300 p-6 flex flex-col gap-4 border border-border hover:-translate-y-1.5 hover:scale-[1.02] focus-within:ring-2 focus-within:ring-ring animate-slide-up"
      style={{ animationDelay: `${100 + index * 120}ms` }}
      tabIndex={0}
    >
      <div className="h-2 w-full bg-gradient-to-r from-primary to-accent rounded-t-xl mb-2" />
      <h3 className="text-xl font-semibold mb-1">{title}</h3>
      <p className="text-muted-foreground mb-2">{description}</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {tech.map((t) => (
          <Badge key={t} className="bg-muted text-muted-foreground px-2 py-1 text-xs">{t}</Badge>
        ))}
      </div>
      <div className="flex gap-3 mt-auto">
        {live && (
          <a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Live Demo"
            className="btn btn-primary flex items-center gap-1 px-3 py-2 rounded-lg font-medium transition-transform hover:-translate-y-0.5 hover:shadow-glow focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ExternalLink className="w-4 h-4" /> Live Demo
          </a>
        )}
        {code && (
          <a
            href={code}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Code on GitHub"
            className="btn btn-outline flex items-center gap-1 px-3 py-2 rounded-lg font-medium transition-transform hover:-translate-y-0.5 hover:shadow-glow focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Github className="w-4 h-4" /> Code
          </a>
        )}
      </div>
    </div>
  );
}
