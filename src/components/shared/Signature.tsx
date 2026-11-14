import { SignatureArtwork, SIGNATURE_VIEW_BOX } from './SignatureArtwork'

interface SignatureProps {
  className?: string
  animated?: boolean
}

export function Signature({
  className = '',
  animated = false,
}: SignatureProps) {
  return (
    <svg
      viewBox={SIGNATURE_VIEW_BOX}
      fill="none"
      className={`signature ${animated ? 'signature-animated' : ''} ${className}`}
      aria-hidden="true"
    >
      <SignatureArtwork />
    </svg>
  )
}
