import type { SVGProps } from 'react'

type SiteIconName = 'arrow-up-right' | 'arrow-up' | 'star' | 'asterisk' | 'plus'

interface SiteIconProps extends SVGProps<SVGSVGElement> {
  name: SiteIconName
  size?: number
}

const paths: Record<SiteIconName, React.ReactNode> = {
  'arrow-up-right': (
    <>
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </>
  ),
  'arrow-up': (
    <>
      <path d="M12 19V5" />
      <path d="m5 12 7-7 7 7" />
    </>
  ),
  star: (
    <path d="m12 3 2.78 5.63 6.22.9-4.5 4.39 1.06 6.2L12 17.19l-5.56 2.93 1.06-6.2L3 9.53l6.22-.9L12 3Z" />
  ),
  asterisk: (
    <>
      <path d="M24 5v38" />
      <path d="M5 24h38" />
      <path d="m10.6 10.6 26.8 26.8" />
      <path d="m37.4 10.6-26.8 26.8" />
    </>
  ),
  plus: (
    <>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </>
  ),
}

/** Deterministic inline SVGs for small interface marks; surrounding controls keep their labels. */
export function SiteIcon({ name, size = 16, ...props }: SiteIconProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      viewBox={name === 'asterisk' ? '0 0 48 48' : '0 0 24 24'}
      fill={name === 'star' ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={name === 'asterisk' ? 2.4 : 1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {paths[name]}
    </svg>
  )
}
