import { Badge } from './ui/Badge';
import { Github, Twitter, Linkedin } from 'lucide-react';

const socials = [
	{ href: 'https://github.com/thiagosf', icon: Github, label: 'GitHub' },
	{ href: 'https://twitter.com/thiagosf', icon: Twitter, label: 'Twitter/X' },
	{ href: 'https://www.linkedin.com/in/thiagosf/', icon: Linkedin, label: 'LinkedIn' },
];

export default function HeroSection() {
	return (
		<header className="relative flex flex-col items-center justify-center min-h-screen py-16 text-center overflow-hidden">
			{/* Animated gradient orbs */}
			<div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
				<div className="absolute left-1/4 top-1/4 w-72 h-72 rounded-full blur-3xl opacity-60 bg-gradient-to-br from-primary/70 to-accent/60 animate-parallax-float" style={{ filter: 'blur(80px)' }} />
				<div className="absolute right-1/4 bottom-1/4 w-96 h-96 rounded-full blur-3xl opacity-40 bg-gradient-to-tr from-accent/70 to-primary/60 animate-float" style={{ filter: 'blur(100px)' }} />
				<div className="absolute left-1/2 top-2/3 w-60 h-60 rounded-full blur-2xl opacity-30 bg-gradient-to-tl from-primary/60 to-accent/70 animate-float" style={{ filter: 'blur(60px)' }} />
			</div>
			<div className="relative z-10 flex flex-col items-center w-full">
				<Badge className="mb-6 px-4 py-2 text-base bg-secondary/80 text-secondary-foreground font-medium rounded-full shadow-soft animate-float animate-delay-200">
					Thiago — Creative Frontend Developer
				</Badge>
				<h1 className="text-5xl md:text-8xl font-bold leading-tight mb-4 animate-slide-up animate-delay-300">
					Digital <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Craftsman</span>
				</h1>
				<p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-6 animate-fade-in animate-delay-400">
					Building exceptional web experiences with cutting-edge design and micro-interactions that captivate users.
				</p>
				<div className="flex gap-4 mt-6 animate-fade-in animate-delay-500" aria-label="Social links">
					{socials.map(({ href, icon: Icon, label }) => (
						<a
							key={href}
							href={href}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={label}
							className="transition-transform duration-200 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-ring rounded-full p-2 bg-card/60 shadow-soft hover:shadow-glow"
							tabIndex={0}
						>
							<Icon className="w-6 h-6" />
						</a>
					))}
				</div>
				<a
					href="#projects"
					className="mt-8 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 animate-bounce animate-delay-600"
				>
					View My Work
				</a>
			</div>
		</header>
	);
}
