import { motion } from 'framer-motion'

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string
  title: string
  subtitle?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="mx-auto mb-12 max-w-2xl text-center"
    >
      <span className="font-mono text-xs uppercase tracking-[0.35em] text-teal">{eyebrow}</span>
      <h2 className="mt-3 font-display text-3xl font-medium text-ink sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-balance text-ink-muted">{subtitle}</p>}
    </motion.div>
  )
}
