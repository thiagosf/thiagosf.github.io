import { Badge } from './ui/Badge';
import { Code, Zap, Feather, Accessibility, Rocket, TrendingUp } from 'lucide-react';

const skills = [
  { icon: Code, label: 'React' },
  { icon: Zap, label: 'TypeScript' },
  { icon: Feather, label: 'Tailwind' },
  { icon: Accessibility, label: 'Accessibility' },
  { icon: Rocket, label: 'Performance' },
  { icon: TrendingUp, label: 'Animations' },
];

export default function SkillsSection() {
  return (
    <section className="flex flex-wrap justify-center gap-3 py-8 animate-fade-in animate-delay-300" aria-label="Skills">
      {skills.map(({ icon: Icon, label }, i) => (
        <Badge
          key={label}
          className={`flex items-center gap-2 px-3 py-2 text-base bg-muted/80 text-muted-foreground rounded-full shadow-soft transition-transform duration-200 hover:-translate-y-1 hover:shadow-glow focus-visible:ring-2 focus-visible:ring-ring animate-scale-in`}
          style={{ animationDelay: `${100 + i * 80}ms` }}
        >
          <Icon className="w-4 h-4" />
          {label}
        </Badge>
      ))}
    </section>
  );
}
