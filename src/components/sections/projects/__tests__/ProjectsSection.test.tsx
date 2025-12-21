import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProjectsSection } from '../ProjectsSection';
import type { Project } from '../../../../types/projects';

// Mock IntersectionObserver
(global as any).IntersectionObserver = class {
    observe() { }
    unobserve() { }
    disconnect() { }
} as any;

const mockProjects: Project[] = [
    {
        id: 'p-1',
        title: 'Project Alpha',
        description: 'A cutting edge project.',
        year: '2024',
        type: 'Web App',
        techStack: ['React', 'TypeScript'],
        previewUrl: 'https://example.com/p1.png',
        demoUrl: 'https://p1.demo',
        githubUrl: 'https://github.com/p1'
    },
    {
        id: 'p-2',
        title: 'Project Beta',
        description: 'An experimental tool.',
        year: '2023',
        type: 'CLI',
        techStack: ['Go', 'Cobra'],
        previewUrl: 'https://example.com/p2.png',
        githubUrl: 'https://github.com/p2'
    }
];

describe('ProjectsSection', () => {
    it('renders all project cards', () => {
        render(<ProjectsSection projects={mockProjects} />);

        expect(screen.getByText('Project Alpha')).toBeInTheDocument();
        expect(screen.getByText('Project Beta')).toBeInTheDocument();
        expect(screen.getByText('2024 — Web App')).toBeInTheDocument();
        expect(screen.getByText('2023 — CLI')).toBeInTheDocument();
    });

    it('renders project descriptions', () => {
        render(<ProjectsSection projects={mockProjects} />);

        expect(screen.getByText('A cutting edge project.')).toBeInTheDocument();
        expect(screen.getByText('An experimental tool.')).toBeInTheDocument();
    });

    it('renders tech stack tags', () => {
        render(<ProjectsSection projects={mockProjects} />);

        expect(screen.getByText('REACT')).toBeInTheDocument();
        expect(screen.getByText('TYPESCRIPT')).toBeInTheDocument();
        expect(screen.getByText('GO')).toBeInTheDocument();
        expect(screen.getByText('COBRA')).toBeInTheDocument();
    });

    it('calls onDemoClick when demo button is clicked', () => {
        const onDemoClick = vi.fn();
        render(<ProjectsSection projects={mockProjects} onDemoClick={onDemoClick} />);

        const demoButton = screen.getByLabelText('View Demo');
        fireEvent.click(demoButton);

        expect(onDemoClick).toHaveBeenCalledWith('p-1');
    });

    it('calls onSourceClick when source button is clicked', () => {
        const onSourceClick = vi.fn();
        render(<ProjectsSection projects={mockProjects} onSourceClick={onSourceClick} />);

        const sourceButtons = screen.getAllByLabelText('View Source');
        fireEvent.click(sourceButtons[0]);

        expect(onSourceClick).toHaveBeenCalledWith('p-1');
    });

    it('hides demo/source buttons when URLs are missing', () => {
        render(<ProjectsSection projects={mockProjects} />);

        // Project Beta has no demoUrl
        const p2 = screen.getByText('Project Beta').closest('div');
        expect(p2?.querySelector('[aria-label="View Demo"]')).toBeNull();
    });

    it('shows empty state when no projects are provided', () => {
        render(<ProjectsSection projects={[]} />);

        expect(screen.getByText(/no projects to display/i)).toBeInTheDocument();
    });
});
