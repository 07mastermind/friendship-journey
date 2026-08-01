import { useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Camera, Coffee, IceCream, Laugh, MessageCircleHeart, Plane, Sparkles } from 'lucide-react'
import type { FunFact } from '../data/types'
import { SectionHeading } from './SectionHeading'

const ICONS: Record<FunFact['icon'], typeof Laugh> = {
  laugh: Laugh,
  camera: Camera,
  plane: Plane,
  joke: Sparkles,
  call: MessageCircleHeart,
  coffee: Coffee,
  icecream: IceCream,
}

function CountUp({ value, duration = 1.4 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    let raf = 0
    function tick(now: number) {
      const progress = Math.min((now - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * value))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration])

  return <span ref={ref}>{display.toLocaleString()}</span>
}

export function FunFacts({ facts }: { facts: FunFact[] }) {
  return (
    <section id="fun-facts" className="relative mx-auto max-w-5xl px-6 py-24">
      <SectionHeading eyebrow="Chapter Four" title="A Little Math on Us" subtitle="Rough numbers. Real memories." />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {facts.map((fact, i) => {
          const Icon = ICONS[fact.icon]
          return (
            <motion.div
              key={fact.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.06 }}
              className="glass flex flex-col items-center rounded-2xl px-4 py-8 text-center"
            >
              <Icon className="mb-3 text-teal" size={26} strokeWidth={1.6} />
              <span className="font-mono text-2xl font-semibold text-ink sm:text-3xl">
                <CountUp value={fact.value} />
                {fact.suffix ?? ''}
              </span>
              <span className="mt-2 text-xs leading-snug text-ink-muted">{fact.label}</span>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
