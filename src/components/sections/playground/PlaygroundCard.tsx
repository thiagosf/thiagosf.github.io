import { Github, Star, Code2, ExternalLink } from 'lucide-react'
import type { PlaygroundItem } from './types'

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

interface PlaygroundCardProps {
    item: PlaygroundItem
    index: number
    isVisible: boolean
}

export function PlaygroundCard({
    item,
    index,
    isVisible
}: PlaygroundCardProps) {
    return (
        <div
            className={`group relative border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-8 transition-all duration-1000 hover:border-lime-500/50 dark:hover:border-lime-400/50 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
            style={{ transitionDelay: `${index * 150}ms` }}
        >
            {/* Context Header */}
            <div className="flex justify-between items-start mb-6">
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">
                        {item.year} — {item.type}
                    </span>
                    {item.language && (
                        <span className="text-[9px] font-medium text-lime-600 dark:text-lime-500/70 uppercase tracking-wider">
                            {item.language}
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    {item.stars !== undefined && (
                        <div className="flex items-center gap-1.5 text-stone-400 dark:text-stone-500">
                            <Star size={12} className="fill-current" />
                            <span className="text-[10px] font-bold">{item.stars}</span>
                        </div>
                    )}
                    {item.githubUrl && (
                        <a
                            href={item.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors duration-200"
                            aria-label="View Source"
                        >
                            <Github size={16} />
                        </a>
                    )}
                    {item.demoUrl && (
                        <a
                            href={item.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors duration-200"
                            aria-label="View Demo"
                        >
                            <ExternalLink size={16} />
                        </a>
                    )}
                </div>
            </div>

            <div className="space-y-4">
                <div
                    className="flex items-center gap-2 group-hover:text-lime-500 dark:group-hover:text-lime-400 transition-colors duration-300"
                >
                    <Code2 size={18} className="text-stone-300 dark:text-stone-700 group-hover:text-lime-500 dark:group-hover:text-lime-400 transition-colors duration-300" />
                    <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
                        {item.title}
                    </h3>
                </div>

                <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-sm min-h-[4rem]">
                    {item.description}
                </p>

                <div className="flex flex-wrap gap-x-4 gap-y-1 pt-6 border-t border-stone-100 dark:border-stone-800/50">
                    {item.techStack.map((tech) => (
                        <TechChip key={tech} tech={tech} />
                    ))}
                </div>
            </div>

            {/* Subtle interactive accent */}
            <div className="absolute bottom-0 right-0 w-1 h-1 bg-lime-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
    )
}
