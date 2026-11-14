import { SiteIcon } from '../../shared/atoms/SiteIcon'
import type { PlaygroundItem } from './types'

export function PlaygroundCard({
  item,
  index,
}: {
  item: PlaygroundItem
  index: number
  isVisible: boolean
}) {
  return (
    <article className="playground-item">
      <span className="experiment-number">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div>
        <p className="project-meta">
          {item.year} — {item.type}
        </p>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <div className="experiment-bottom">
          <span>
            {item.language}
            {item.stars !== undefined && (
              <span className="stars">
                {' '}
                <SiteIcon name="star" size={11} /> <span>{item.stars}</span>
              </span>
            )}
          </span>
          <div className="project-links">
            {item.demoUrl && (
              <a
                href={item.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Demo"
              >
                Try it <SiteIcon name="arrow-up-right" size={14} />
              </a>
            )}
            {item.githubUrl && (
              <a
                href={item.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Source"
              >
                Source <SiteIcon name="arrow-up-right" size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
