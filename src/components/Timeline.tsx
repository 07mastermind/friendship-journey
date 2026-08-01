import { motion } from 'framer-motion'
import type { TimelineEvent } from '../data/types'
import { SectionHeading } from './SectionHeading'

const emotionBadges = ['✨', '❤️', '🥲', '🤗', '🌈']
const emotionLabels = ['Spark', 'Heart', 'Memory', 'Warmth', 'Glow']

function TimelineCard({ event, index }: { event: TimelineEvent; index: number }) {
  const fromLeft = index % 2 === 0
  const badge = emotionBadges[index % emotionBadges.length]
  const label = emotionLabels[index % emotionLabels.length]

  return (
    <div className="relative flex flex-col items-center gap-6 py-10 md:flex-row md:gap-12">
      <motion.div
        initial={{ opacity: 0, x: fromLeft ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className={`glass w-full max-w-md rounded-3xl p-6 md:w-[calc(50%-3rem)] ${
          fromLeft ? 'md:mr-auto md:text-right' : 'md:ml-auto'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-gold">{event.date}</span>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-ink-muted shadow-[0_12px_32px_-18px_rgba(236,189,107,0.85)]">
            <span className="text-base">{badge}</span>
            <span>{label}</span>
          </div>
        </div>

        <h3 className="mt-4 font-display text-xl font-medium text-ink">{event.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">{event.description}</p>

        {event.image && (
          <div className="mt-4 relative aspect-video overflow-hidden rounded-3xl bg-white/5 shadow-[0_20px_80px_-48px_rgba(255,255,255,0.35)]">
            <img
              src={event.image}
              alt={event.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="pointer-events-none absolute left-4 top-4 rounded-full bg-rose/20 px-3 py-1 text-xs uppercase tracking-[0.28em] text-rose"
            >
              emotive
            </motion.span>
            <motion.span
              className="pointer-events-none absolute -bottom-4 right-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-violet-soft/20 text-xl text-violet-soft shadow-[0_0_40px_6px_rgba(169,156,242,0.15)]"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              ❤️
            </motion.span>
          </div>
        )}
      </motion.div>

      {/* Constellation node */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 md:block"
      >
        <span className="relative flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-gold)] shadow-[0_0_16px_4px_rgba(236,189,107,0.55)]">
          <span className="absolute h-full w-full animate-ping rounded-full bg-[var(--color-gold)]/60" />
        </span>
      </motion.div>
    </div>
  )
}

export function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <section id="timeline" className="relative mx-auto max-w-4xl px-6 py-24">
      <SectionHeading
        eyebrow="Chapter One"
        title="The Journey So Far"
        subtitle="Every friendship has a thread running through it. Here's ours."
      />

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-10 z-0 hidden md:block">
          <div className="mx-auto h-40 max-w-4xl">
            <div className="absolute left-[15%] top-5 h-16 w-16 rounded-full bg-rose/20 blur-3xl animate-drift" />
            <div className="absolute left-[75%] top-16 h-12 w-12 rounded-full bg-violet-soft/25 blur-3xl animate-twinkle" />
            <div className="absolute left-[50%] top-6 h-20 w-20 -translate-x-1/2 rounded-full bg-gold/15 blur-3xl animate-drift" />
          </div>
        </div>

        {/* the connecting thread */}
        <div
          className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 md:block"
          style={{
            background:
              'linear-gradient(180deg, transparent, var(--color-violet-soft) 8%, var(--color-gold) 50%, var(--color-rose) 92%, transparent)',
            opacity: 0.5,
          }}
        />
        <div
          className="absolute left-6 top-0 h-full w-px md:hidden"
          style={{
            background:
              'linear-gradient(180deg, transparent, var(--color-violet-soft) 8%, var(--color-gold) 50%, var(--color-rose) 92%, transparent)',
            opacity: 0.5,
          }}
        />
        {events.map((event, i) => (
          <TimelineCard key={event.id} event={event} index={i} />
        ))}
      </div>
    </section>
  )
}
