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
      viewBox="0 0 1176 589"
      fill="none"
      className={`signature ${animated ? 'signature-animated' : ''} ${className}`}
      aria-hidden="true"
    >
      <g
        transform="translate(-1386.629573 -591.501658)"
        stroke="currentColor"
        strokeWidth="37.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          pathLength="1"
          d="M1556,1038C1556,1038 1879.793,642.4 1759,614C1593.25,575.03 1308.967,852.192 1438,877.677C1596.232,908.929 1875.962,814.705 1988.111,772C2034.927,754.173 2304.699,641.301 2387,641"
        />
        <path
          pathLength="1"
          d="M1919,638C1919,638 1687.334,987.333 1748,1005C1829.481,1028.729 2123.127,831.962 2157,843C2202.9,857.957 2073.592,1092.78 2114.173,1156C2141.186,1198.082 2200.423,962.074 2255,889.677C2287.258,846.887 2389.042,809.829 2543,799"
        />
      </g>
    </svg>
  )
}
