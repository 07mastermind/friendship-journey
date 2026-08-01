import { motion } from 'framer-motion'
import { useFriendshipCounter } from '../hooks/useFriendshipCounter'
import { SectionHeading } from './SectionHeading'

function CounterBlock({ value, label }: { value: number; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass flex w-24 flex-col items-center rounded-2xl py-6 sm:w-32"
    >
      <span className="font-mono text-3xl font-semibold text-gradient sm:text-4xl">
        {value.toLocaleString()}
      </span>
      <span className="mt-1 text-[11px] uppercase tracking-widest text-ink-muted">{label}</span>
    </motion.div>
  )
}

export function Counter({ startDate }: { startDate: string }) {
  const { years, months, days } = useFriendshipCounter(startDate)

  return (
    <section id="counter" className="relative mx-auto max-w-3xl px-6 py-24 text-center">
      <SectionHeading eyebrow="Chapter Three" title="We've Been Creating Memories For" />
      <div className="flex items-center justify-center gap-3 sm:gap-6">
        <CounterBlock value={years} label={years === 1 ? 'Year' : 'Years'} />
        <CounterBlock value={months} label={months === 1 ? 'Month' : 'Months'} />
        <CounterBlock value={days} label={days === 1 ? 'Day' : 'Days'} />
      </div>
      <p className="mt-8 font-body text-sm text-ink-faint">and still counting, every single second</p>
    </section>
  )
}
