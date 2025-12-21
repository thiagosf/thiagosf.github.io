import { Github, Twitter, Linkedin } from 'lucide-react';

const socials = [
  { href: 'https://github.com/thiagosf', icon: Github, label: 'GitHub' },
  { href: 'https://twitter.com/thiagosf', icon: Twitter, label: 'Twitter/X' },
  { href: 'https://www.linkedin.com/in/thiagosf/', icon: Linkedin, label: 'LinkedIn' },
];

export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-2 py-6 text-sm text-muted-foreground">
      <div className="flex gap-4 mb-1">
        {socials.map(({ href, icon: Icon, label }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="transition-transform duration-200 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-ring rounded-full p-2"
          >
            <Icon className="w-5 h-5" />
          </a>
        ))}
      </div>
      <span>&copy; {new Date().getFullYear()} Thiago. All rights reserved.</span>
    </footer>
  );
}
