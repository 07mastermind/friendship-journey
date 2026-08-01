import { useState } from 'react'
import { motion } from 'framer-motion'
import type { ReasonCard } from '../data/types'
import { SectionHeading } from './SectionHeading'

function FlipCard({ card, index }: { card: ReasonCard; index: number }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, delay: (index % 10) * 0.04 }}
      className="aspect-square [perspective:1000px]"
    >
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className="relative h-full w-full text-left [transform-style:preserve-3d] transition-transform duration-500"
        style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        aria-pressed={flipped}
        aria-label={`Reason number ${card.number}, tap to flip`}
      >
        <div className="glass absolute inset-0 flex items-center justify-center rounded-2xl [backface-visibility:hidden]">
          <span className="font-display text-2xl font-medium text-gold sm:text-3xl">{card.number}</span>
        </div>
        <div
          className="glass-strong absolute inset-0 flex items-center justify-center rounded-2xl p-3 text-center [backface-visibility:hidden]"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <span className="text-[11px] leading-snug text-ink sm:text-sm">{card.text}</span>
        </div>
      </button>
    </motion.div>
  )
}

export function ReasonsGrid({ reasons }: { reasons: ReasonCard[] }) {
  return (
    <section id="reasons" className="relative mx-auto max-w-4xl px-6 py-24">
      <SectionHeading
        eyebrow="Chapter Six"
        title="20 Reasons You're Amazing"
        subtitle="Tap a card to flip it."
      />
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-5 sm:gap-4">
        {reasons.map((card, i) => (
          <FlipCard key={card.id} card={card} index={i} />
        ))}
      </div>
    </section>
  )
}
