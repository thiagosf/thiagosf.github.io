import { ArrowDown, ArrowUpRight, RotateCcw } from 'lucide-react'
import { useRef, useState } from 'react'
import type { PointerEvent } from 'react'

import { Signature } from '../../shared/Signature'
import type { HeroSectionProps } from './types'

export function HeroSection({ data }: HeroSectionProps) {
  const [drawing, setDrawing] = useState(0)
  const [outline, setOutline] = useState(false)
  const artRef = useRef<HTMLDivElement>(null)
  function moveSignature(event: PointerEvent<HTMLDivElement>) {
    if (
      event.pointerType !== 'mouse' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return
    const bounds = event.currentTarget.getBoundingClientRect()
    artRef.current?.style.setProperty(
      '--pointer-x',
      `${(event.clientX - bounds.left - bounds.width / 2) * 0.025}px`,
    )
    artRef.current?.style.setProperty(
      '--pointer-y',
      `${(event.clientY - bounds.top - bounds.height / 2) * 0.025}px`,
    )
  }
  function resetPosition() {
    artRef.current?.style.setProperty('--pointer-x', '0px')
    artRef.current?.style.setProperty('--pointer-y', '0px')
  }
  return (
    <section id="home" className="hero page-width" aria-labelledby="hero-title">
      <div className="hero-topline">
        <span>
          <i /> Frontend craft. Full-stack thinking.
        </span>
        <span>Independent mind / Collaborative spirit</span>
      </div>
      <div className="hero-layout">
        <div className="hero-copy">
          <p className="eyebrow">Hello, I’m Thiago.</p>
          <h1 id="hero-title">
            Code with <br />
            <span>character.</span>
          </h1>
          <p className="hero-description">{data.introduction.description}</p>
          <a className="primary-link" href="#projects">
            Explore my work <ArrowDown size={18} />
          </a>
          <div className="hero-socials">
            {Object.entries(data.socialLinks).map(([name, url]) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={
                  name === 'github'
                    ? 'GitHub'
                    : name === 'linkedin'
                      ? 'LinkedIn'
                      : 'Twitter'
                }
              >
                {name === 'github'
                  ? 'GitHub'
                  : name === 'linkedin'
                    ? 'LinkedIn'
                    : 'Twitter'}
                <ArrowUpRight size={13} />
              </a>
            ))}
          </div>
        </div>
        <div
          className={`signature-stage ${outline ? 'is-outline' : ''}`}
          onPointerMove={moveSignature}
          onPointerLeave={resetPosition}
        >
          <div className="stage-top">
            <span>THE PERSONAL TOUCH</span>
            <span aria-hidden="true">↙</span>
          </div>
          <div className="signature-guides" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="signature-art" ref={artRef}>
            <Signature key={drawing} animated />
            <Signature className="signature-ghost" />
          </div>
          <div className="stage-caption">
            <span>A signature. Written in code.</span>
            <span className="stage-coordinate" aria-hidden="true">
              TSF — 01
            </span>
          </div>
          <div className="stage-controls">
            <button onClick={() => setDrawing(drawing + 1)}>
              <RotateCcw size={14} /> Replay signature
            </button>
            <button aria-pressed={outline} onClick={() => setOutline(!outline)}>
              {outline ? '●' : '○'} Outline
            </button>
          </div>
        </div>
      </div>
      <div className="hero-bottom">
        <span>{data.introduction.title}</span>
        <span>
          React <b>/</b> TypeScript <b>/</b> Vue <b>/</b> Node.js
        </span>
        <a href="#experience">
          A little more about me <ArrowDown size={14} />
        </a>
      </div>
    </section>
  )
}
