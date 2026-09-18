import type { ReactNode } from 'react'

import { Signature } from '../shared/Signature'

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="studio">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <a
          href="#home"
          className="brand"
          aria-label="Thiago Silva Ferreira, home"
        >
          <Signature />
          <span>
            Thiago Silva Ferreira
            <span className="brand-role">Creative software developer</span>
          </span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#experience">Experience</a>
          <a href="#projects">Work</a>
          <a href="#playground">Playground</a>
          <a className="nav-contact" href="#contact">
            Let’s talk <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>
      <main id="main">{children}</main>
      <footer className="site-footer page-width">
        <span>© {new Date().getFullYear()} Thiago Silva Ferreira</span>
        <span>Built with intent. A little curiosity, too.</span>
        <a href="#home">Back to top ↑</a>
      </footer>
    </div>
  )
}
