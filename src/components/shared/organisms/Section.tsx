import React, { forwardRef } from 'react'

export type SectionProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode
  /** Custom class for the inner content container (defaults to max-w-5xl) */
  containerClassName?: string
  /** Optional background node that will be rendered outside the inner container (useful for overlays) */
  background?: React.ReactNode
}

export const Section = forwardRef<HTMLDivElement, SectionProps>(
  ({ children, className = '', containerClassName, background, ...rest }, ref) => {
    const base =
      'min-h-screen py-8 px-8 sm:px-12 md:p-16 lg:px-24 bg-transparent dark:bg-transparent relative overflow-hidden'

    const container = containerClassName ?? 'max-w-5xl mx-auto relative z-10'

    return (
      <section ref={ref as React.Ref<HTMLDivElement>} className={`${base} ${className}`} {...rest}>
        {background}
        <div className={container}>{children}</div>
      </section>
    )
  },
)

Section.displayName = 'Section'

export default Section
