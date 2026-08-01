import { useMemo } from 'react'

const GLYPHS = ['✦', '✧', '♥', '✺', '·'] as const

interface Particle {
  id: number
  glyph: string
  left: number
  size: number
  delay: number
  duration: number
  opacity: number
}

/** Subtle ambient particles. Kept few in number and CSS-only for performance. */
export function FloatingElements({ count = 16 }: { count?: number }) {
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        glyph: GLYPHS[i % GLYPHS.length],
        left: Math.random() * 100,
        size: 10 + Math.random() * 14,
        delay: Math.random() * 6,
        duration: 8 + Math.random() * 10,
        opacity: 0.25 + Math.random() * 0.4,
      })),
    [count],
  )

  return (
    <div className="pointer-events-none fixed inset-0 -z-[5] overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute top-full animate-drift will-change-transform"
          style={{
            left: `${p.left}%`,
            fontSize: p.size,
            color: 'var(--color-violet-soft)',
            opacity: p.opacity,
            animation: `floatUp ${p.duration}s linear ${p.delay}s infinite`,
          }}
        >
          {p.glyph}
        </span>
      ))}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
          10% { opacity: var(--peak-opacity, 0.5); }
          90% { opacity: var(--peak-opacity, 0.5); }
          100% { transform: translateY(-110vh) translateX(20px) rotate(25deg); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
