import { SiteIcon } from '../../shared/atoms/SiteIcon'
import { PlaygroundGrid } from './PlaygroundGrid'
import type { PlaygroundSectionProps } from './types'

export function PlaygroundSection({ items }: PlaygroundSectionProps) {
  return (
    <section id="playground" className="playground-section">
      <div className="page-width playground-layout">
        <div className="section-intro">
          <p className="eyebrow">03 / The playground</p>
          <h2>
            Stay curious.
            <br />
            Make things.
          </h2>
          <p>
            A place for experiments, first attempts, and the occasional rabbit
            hole. Learning by building, always.
          </p>
          <span className="playground-asterisk">
            <SiteIcon name="asterisk" size={130} />
          </span>
        </div>
        <div>
          {items.length ? (
            <PlaygroundGrid items={items} isVisible />
          ) : (
            <p>
              No experiments found. Check back soon for new laboratory
              creations.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
