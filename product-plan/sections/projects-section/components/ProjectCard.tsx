import { ExternalLink, Github } from "lucide-react"
import type { Project } from "../types"

interface TechChipProps {
  tech: string
}

function TechChip({ tech }: TechChipProps) {
  return (
    <span className="px-0 py-0.5 text-[9px] font-medium uppercase tracking-[0.15em] text-stone-400 dark:text-stone-600 cursor-default">
      {tech}
    </span>
  )
}

interface ProjectCardProps {
  project: Project
  index: number
  isVisible: boolean
  onDemoClick?: (id: string) => void
  onSourceClick?: (id: string) => void
}

export function ProjectCard({
  project,
  index,
  isVisible,
  onDemoClick,
  onSourceClick,
}: ProjectCardProps) {
  return (
    <div
      className={`group relative border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-8 transition-all duration-700 hover:border-lime-500/50 dark:hover:border-lime-400/50 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Context Header */}
      <div className="flex justify-between items-start mb-6">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">
          {project.year} — {project.type}
        </span>

        {/* Actions Inline */}
        <div className="flex gap-3">
          {project.githubUrl && (
            <button
              onClick={() => onSourceClick?.(project.id)}
              className="text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors duration-200"
              aria-label="View Source"
            >
              <Github size={16} />
            </button>
          )}
          {project.demoUrl && (
            <button
              onClick={() => onDemoClick?.(project.id)}
              className="text-stone-400 hover:text-lime-500 transition-colors duration-200"
              aria-label="View Demo"
            >
              <ExternalLink size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100 tracking-tight group-hover:text-lime-500 dark:group-hover:text-lime-400 transition-colors duration-300">
          {project.title}
        </h3>

        <p className="text-stone-600 dark:text-stone-400 leading-relaxed min-h-[4.5rem]">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-x-4 gap-y-1 pt-6 border-t border-stone-100 dark:border-stone-800/50">
          {project.techStack.map((tech) => (
            <TechChip key={tech} tech={tech} />
          ))}
        </div>
      </div>

      {/* Subtle interactive accent */}
      <div className="absolute bottom-0 right-0 w-1 h-1 bg-lime-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  )
}
