import { useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import confetti from 'canvas-confetti'
import { Heart } from 'lucide-react'
import { ShareButton } from './ShareButton'

export function Finale({ message, friendName }: { message: string; friendName: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [fired, setFired] = useState(false)

  function launchConfetti() {
    const colors = ['#7a6ae0', '#ea7ea0', '#ecbd6b', '#52d6c9']
    confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 }, colors })
    confetti({ particleCount: 60, angle: 60, spread: 70, origin: { x: 0 }, colors })
    confetti({ particleCount: 60, angle: 120, spread: 70, origin: { x: 1 }, colors })
  }

  if (inView && !fired) {
    setFired(true)
    launchConfetti()
  }

  return (
    <section
      id="finale"
      ref={ref}
      className="relative flex min-h-[80vh] flex-col items-center justify-center px-6 py-24 text-center"
    >
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, type: 'spring' }}
      >
        <Heart size={48} className="mx-auto text-rose" fill="var(--color-rose)" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="mt-6 font-display text-3xl font-medium text-ink sm:text-5xl"
      >
        <span className="text-gradient">{message}</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-4 max-w-md text-ink-muted"
      >
        Here's to {friendName}, and to every chapter of this friendship still unwritten.
      </motion.p>

      <motion.button
        type="button"
        onClick={launchConfetti}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="glass mt-10 rounded-full px-6 py-3 text-sm font-medium text-ink"
      >
        Celebrate again ✨
      </motion.button>

      <div className="mt-6">
        <ShareButton />
      </div>
    </section>
  )
}
