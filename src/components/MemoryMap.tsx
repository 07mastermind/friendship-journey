import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import type { MapMarker } from '../data/types'
import { SectionHeading } from './SectionHeading'

export function MemoryMap({ markers }: { markers: MapMarker[] }) {
  const [active, setActive] = useState<MapMarker | null>(markers[0] ?? null)

  return (
    <section id="map" className="relative mx-auto max-w-4xl px-6 py-24">
      <SectionHeading
        eyebrow="Chapter Seven"
        title="Places We've Been"
        subtitle="Every pin is a memory worth revisiting."
      />

      <div className="glass relative aspect-[4/3] w-full overflow-hidden rounded-3xl sm:aspect-[16/9]">
        {/* Illustrated terrain, purely decorative SVG paths for an artful map feel */}
        <svg viewBox="0 0 100 75" className="absolute inset-0 h-full w-full opacity-40" preserveAspectRatio="none">
          <path d="M0 50 Q 20 30, 40 45 T 100 40 V75 H0 Z" fill="var(--color-violet)" opacity="0.25" />
          <path d="M0 60 Q 30 45, 55 58 T 100 55 V75 H0 Z" fill="var(--color-teal)" opacity="0.2" />
          <path d="M10 20 Q 30 5, 50 18 T 90 12" stroke="var(--color-gold)" strokeWidth="0.4" fill="none" opacity="0.5" />
        </svg>

        {markers.map((marker) => (
          <button
            key={marker.id}
            type="button"
            onClick={() => setActive(marker)}
            style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
            className="group absolute -translate-x-1/2 -translate-y-full"
            aria-label={`Show details for ${marker.place}`}
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              animate={active?.id === marker.id ? { y: [0, -4, 0] } : {}}
              transition={{ duration: 1.4, repeat: active?.id === marker.id ? Infinity : 0 }}
            >
              <MapPin
                size={28}
                className={active?.id === marker.id ? 'text-rose drop-shadow-[0_0_8px_rgba(234,126,160,0.7)]' : 'text-ink-muted'}
                fill={active?.id === marker.id ? 'var(--color-rose)' : 'transparent'}
              />
            </motion.div>
          </button>
        ))}
      </div>

      {active && (
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass mt-4 rounded-2xl p-5 text-center"
        >
          <h3 className="font-display text-lg text-ink">{active.place}</h3>
          <p className="mt-1 text-sm text-ink-muted">{active.note}</p>
        </motion.div>
      )}
    </section>
  )
}
