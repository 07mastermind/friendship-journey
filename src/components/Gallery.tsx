import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import type { GalleryPhoto } from '../data/types'
import { SectionHeading } from './SectionHeading'

const ASPECT_CLASS: Record<NonNullable<GalleryPhoto['aspect']>, string> = {
  square: 'aspect-square',
  tall: 'aspect-[3/4]',
  wide: 'aspect-[4/3] sm:col-span-2',
}

export function Gallery({ photos }: { photos: GalleryPhoto[] }) {
  const [active, setActive] = useState<GalleryPhoto | null>(null)

  return (
    <section id="gallery" className="relative mx-auto max-w-5xl px-6 py-24">
      <SectionHeading
        eyebrow="Chapter Two"
        title="Memory Gallery"
        subtitle="A few frames from along the way. Tap any of them for the full story."
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {photos.map((photo, i) => (
          <motion.button
            type="button"
            key={photo.id}
            onClick={() => setActive(photo)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: (i % 6) * 0.06, type: 'spring', stiffness: 180 }}
            className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 text-left shadow-[0_24px_80px_-58px_rgba(255,255,255,0.45)] ${ASPECT_CLASS[photo.aspect ?? 'square']}`}
            aria-label={`Open photo: ${photo.caption}`}
          >
            <img
              src={photo.src}
              alt={photo.caption}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              onError={(e) => {
                e.currentTarget.style.opacity = '0'
              }}
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute left-4 top-4 rounded-full bg-rose/20 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-rose opacity-90 shadow-[0_14px_40px_-24px_rgba(234,126,160,0.95)]">
              tender
            </div>
            <div className="absolute right-4 bottom-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-violet-soft/25 text-lg text-violet-soft shadow-[0_0_20px_8px_rgba(169,156,242,0.22)]">
                💖
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-rose/60 to-transparent opacity-80" />
            <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_35%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
            <div className="absolute inset-x-0 bottom-0 flex justify-center pb-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="rounded-full bg-black/50 px-3 py-1 text-[11px] text-ink-muted backdrop-blur-sm">{photo.caption}</span>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={active.caption}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="glass-strong relative max-h-[85vh] max-w-3xl overflow-hidden rounded-[2rem]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                className="absolute right-3 top-3 z-10 rounded-full bg-black/40 p-2 text-white"
                aria-label="Close photo"
              >
                <X size={18} />
              </button>
              <motion.div
                className="absolute left-6 top-6 z-10 rounded-full bg-pink-200/20 px-3 py-2 text-sm text-rose shadow-[0_0_30px_2px_rgba(234,126,160,0.18)]"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                cherished
              </motion.div>
              <img src={active.src} alt={active.caption} className="max-h-[65vh] w-full object-cover" />
              <div className="p-5">
                <p className="font-display text-lg text-ink">{active.caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
