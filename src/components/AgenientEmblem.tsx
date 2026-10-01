'use client'
import { useId } from 'react'

/**
 * Agenient main logo — the AAMS compass medallion from the app (aams-app/public/aams-logo-v15-animated-240s.svg,
 * the rotating edition of the v14 emblem shown on the AAMS login page). Same geometry and gradients; the
 * sunburst ring turns once every 240s like the source. The source used SMIL <animateTransform>, which ignores
 * prefers-reduced-motion, so the rotation is a CSS animation here (`.agenient-emblem-spin` in globals.css)
 * and stops when reduced motion is requested.
 *
 * `size` is the medallion's pixel size. `name` adds the "Agenient" name beside it (nav/footer lockup).
 */
const SUNBURST = [
  '120.00,3.00 115.50,18.00 124.50,18.00', '150.28,6.99 142.05,20.31 150.75,22.64',
  '178.50,18.68 167.10,29.42 174.90,33.92', '202.73,37.27 188.94,44.69 195.31,51.06',
  '221.32,61.50 206.08,65.10 210.58,72.90', '233.01,89.72 217.36,89.25 219.69,97.95',
  '237.00,120.00 222.00,115.50 222.00,124.50', '233.01,150.28 219.69,142.05 217.36,150.75',
  '221.32,178.50 210.58,167.10 206.08,174.90', '202.73,202.73 195.31,188.94 188.94,195.31',
  '178.50,221.32 174.90,206.08 167.10,210.58', '150.28,233.01 150.75,217.36 142.05,219.69',
  '120.00,237.00 124.50,222.00 115.50,222.00', '89.72,233.01 97.95,219.69 89.25,217.36',
  '61.50,221.32 72.90,210.58 65.10,206.08', '37.27,202.73 51.06,195.31 44.69,188.94',
  '18.68,178.50 33.92,174.90 29.42,167.10', '6.99,150.28 22.64,150.75 20.31,142.05',
  '3.00,120.00 18.00,124.50 18.00,115.50', '6.99,89.72 20.31,97.95 22.64,89.25',
  '18.68,61.50 29.42,72.90 33.92,65.10', '37.27,37.27 44.69,51.06 51.06,44.69',
  '61.50,18.68 65.10,33.92 72.90,29.42', '89.72,6.99 89.25,22.64 97.95,20.31',
]
const DIAGONALS = [
  '163.84,76.16 124.24,124.24 115.76,115.76', '163.84,163.84 115.76,124.24 124.24,115.76',
  '76.16,163.84 115.76,115.76 124.24,124.24', '76.16,76.16 124.24,115.76 115.76,124.24',
]
const CARDINALS = [
  '120.00,30.00 126.00,120.00 114.00,120.00', '210.00,120.00 120.00,126.00 120.00,114.00',
  '120.00,210.00 114.00,120.00 126.00,120.00', '30.00,120.00 120.00,114.00 120.00,126.00',
]

export default function AgenientEmblem({
  size = 48,
  name = false,
  nameSize,
  title = 'Agenient',
  className,
}: {
  size?: number
  name?: boolean
  nameSize?: string
  title?: string
  className?: string
}) {
  const uid = useId().replace(/:/g, '')
  const bg = `agEmBg-${uid}`, gold = `agEmGold-${uid}`, dim = `agEmDim-${uid}`

  return (
    <span className={`inline-flex items-center ${className ?? ''}`} role="img" aria-label={title} style={{ gap: size * 0.28 }}>
      <svg viewBox="0 0 240 240" width={size} height={size} aria-hidden style={{ flexShrink: 0, filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.35))' }}>
        <defs>
          <radialGradient id={bg} cx="32%" cy="28%" r="80%">
            <stop offset="0%" stopColor="#1f3454" />
            <stop offset="60%" stopColor="#0f1d35" />
            <stop offset="100%" stopColor="#070d1c" />
          </radialGradient>
          <linearGradient id={gold} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f4dc8a" />
            <stop offset="55%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#a47e1f" />
          </linearGradient>
          <linearGradient id={dim} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c8a64e" />
            <stop offset="100%" stopColor="#8a6c1d" />
          </linearGradient>
        </defs>
        <circle cx="120" cy="120" r="118" fill={`url(#${bg})`} />
        <g className="agenient-emblem-spin" fill={`url(#${gold})`}>
          {SUNBURST.map((p) => <polygon key={p} points={p} />)}
        </g>
        <g fill={`url(#${dim})`}>
          {DIAGONALS.map((p) => <polygon key={p} points={p} />)}
        </g>
        <g fill={`url(#${gold})`}>
          {CARDINALS.map((p) => <polygon key={p} points={p} />)}
        </g>
      </svg>
      {name ? (
        <span
          aria-hidden
          style={{
            fontFamily: "var(--font-montserrat),'Montserrat','Segoe UI',Arial,sans-serif",
            fontWeight: 800,
            fontSize: nameSize ?? `${Math.round(size * 0.62)}px`,
            letterSpacing: '-0.02em',
            lineHeight: 1,
            color: '#F2EAD9', // warm ivory, matches the wordmark's 'Agen'
            whiteSpace: 'nowrap',
          }}
        >
          Agenient
        </span>
      ) : null}
    </span>
  )
}
