'use client'
import { useId } from 'react'

/**
 * Agenient wordmark — the brand IS the name (locked 2026-09-02, Patrick).
 * Two variants, both Montserrat 800, "Agen" emerald + "ient" violet, sparkle for the i-dot:
 *   - "stretch": STATIC, sparkle rotated 45°, FULL-height i. Main static lockup (Patrick's favorite).
 *   - "spin":    ANIMATED, sparkle spins one full turn / 15s, shaved i (scaleY .8). Header/hero.
 * All geometry is in `em`, so a single `size` (the font-size) scales the whole mark, sparkle and
 * offsets included — faithful to the approved source at 140px. `dark` swaps to the brighter tints.
 * See brand notes: STRETCH keeps its full i on purpose; SPIN/SPARKLE shave it (intentional).
 */
export type AgenientVariant = 'stretch' | 'spin'

export default function AgenientWordmark({
  variant = 'stretch',
  size = '140px',
  dark = false,
  title = 'Agenient',
  className,
  style,
}: {
  variant?: AgenientVariant
  size?: string
  dark?: boolean
  title?: string
  className?: string
  style?: React.CSSProperties
}) {
  const uid = useId().replace(/:/g, '')
  const gradId = `agGrad-${uid}`
  const em = dark ? '#34d39e' : '#10b981'
  const vi = dark ? '#8b6bf0' : '#6d28d9'
  const spin = variant === 'spin'
  const starSize = spin ? '0.886em' : '0.857em' // 124px / 120px @140px
  const starTop = spin ? '-0.45em' : '-0.436em' // -63px / -61px @140px

  return (
    <span
      className={className}
      role="img"
      aria-label={title}
      style={{
        fontFamily: "'Montserrat','Segoe UI',Arial,sans-serif",
        fontWeight: 800,
        fontSize: size,
        letterSpacing: '-0.0286em',
        lineHeight: 1,
        whiteSpace: 'nowrap',
        display: 'inline-block',
        ...style,
      }}
    >
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
        <defs>
          <linearGradient
            id={gradId}
            x1="0" y1="0.5" x2="1" y2="0.5"
            gradientTransform={spin ? undefined : 'rotate(-45 0.5 0.5)'}
          >
            <stop offset="0" stopColor={em} />
            <stop offset="0.2" stopColor={em} />
            <stop offset="0.8" stopColor={vi} />
            <stop offset="1" stopColor={vi} />
          </linearGradient>
        </defs>
      </svg>
      <span style={{ color: em }}>Agen</span>
      <span style={{ color: vi }}>
        <span style={{ position: 'relative', display: 'inline-block' }}>
          <span
            style={
              spin
                ? { display: 'inline-block', transform: 'scaleY(0.8)', transformOrigin: 'center 85.45%', verticalAlign: 'baseline' }
                : undefined
            }
          >
            {'ı'}
          </span>
          <svg
            viewBox="0 0 100 100"
            aria-hidden
            style={{ position: 'absolute', width: starSize, height: starSize, left: '50%', transform: 'translateX(-50%)', top: starTop }}
          >
            <g
              transform={spin ? undefined : 'rotate(45 50 50)'}
              style={spin ? { transformBox: 'fill-box', transformOrigin: 'center', animation: 'agSpin 15s linear infinite' } : undefined}
            >
              <path d="M50 4 C56 40 60 44 96 50 C60 56 56 60 50 96 C44 60 40 56 4 50 C40 44 44 40 50 4 Z" fill={`url(#${gradId})`} />
            </g>
          </svg>
        </span>
        ent
      </span>
      {spin ? <style>{'@keyframes agSpin{to{transform:rotate(360deg)}}'}</style> : null}
    </span>
  )
}
