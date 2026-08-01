import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Quote } from '../data/types'

export function QuoteCarousel({ quotes }: { quotes: Quote[] }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => (i + 1) % quotes.length), 6000)
    return () => window.clearInterval(id)
  }, [quotes.length])

  const quote = quotes[index]
  if (!quote) return null

  return (
    <section id="quotes" className="relative mx-auto max-w-2xl px-6 py-20 text-center">
      <div className="relative min-h-[9rem]">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={quote.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-x-0"
          >
            <p className="font-display text-xl italic leading-relaxed text-ink sm:text-2xl">
              &ldquo;{quote.text}&rdquo;
            </p>
            {quote.attribution && (
              <cite className="mt-4 block font-mono text-xs not-italic uppercase tracking-widest text-ink-faint">
                — {quote.attribution}
              </cite>
            )}
          </motion.blockquote>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {quotes.map((q, i) => (
          <button
            key={q.id}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show quote ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? 'w-6 bg-[var(--color-gold)]' : 'w-1.5 bg-white/20'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
