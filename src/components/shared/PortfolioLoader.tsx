import type { CSSProperties } from 'react'

import { Signature } from './Signature'

interface PortfolioLoaderProps {
  progress: number
}

export function PortfolioLoader({
  progress,
}: PortfolioLoaderProps) {
  const percent = Math.round(progress * 100)

  return (
    <div
      className="portfolio-loader"
      role="status"
      aria-label="Loading portfolio"
    >
      <div
        className="portfolio-loader__mark"
        style={{ '--logo-progress': progress } as CSSProperties}
      >
        <Signature />
      </div>
      <div
        className="portfolio-loader__progress"
        role="progressbar"
        aria-label="Loading portfolio"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
      >
        <span>Getting the portfolio ready</span>
        <span className="portfolio-loader__percent">{percent}%</span>
      </div>
    </div>
  )
}
