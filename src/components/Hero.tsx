import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

const TITLE = 'Happy Friendship Day'

export function Hero({ onBegin }: { onBegin: () => void }) {
  const [typed, setTyped] = useState('')

  useEffect(() => {
    let i = 0
    const id = window.setInterval(() => {
      i += 1
      setTyped(TITLE.slice(0, i))
      if (i >= TITLE.length) window.clearInterval(id)
    }, 60)
    return () => window.clearInterval(id)
  }, [])

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 text-center"
    >
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="mb-5 font-mono text-xs uppercase tracking-[0.35em] text-ink-muted"
      >
        a small journey, one chapter at a time
      </motion.p>

      <h1 className="font-display text-4xl font-medium leading-tight text-ink sm:text-6xl md:text-7xl">
        <span className="text-gradient">{typed}</span>
        <motion.span
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
          className="ml-1 inline-block text-rose"
        >
          {typed.length >= TITLE.length ? '❤' : '|'}
        </motion.span>
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.9 }}
        className="mx-auto mt-6 max-w-md whitespace-pre-line font-body text-base text-ink-muted sm:text-lg"
      >
        {"This isn't just a website.\nIt's a small journey through our friendship."}
      </motion.p>

      <motion.button
        type="button"
        onClick={onBegin}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(122,106,224,0.45)' }}
        whileTap={{ scale: 0.97 }}
        className="glass-strong mt-12 rounded-full px-8 py-4 font-body text-sm font-semibold tracking-wide text-ink shadow-lg shadow-black/30"
      >
        Begin the Journey
      </motion.button>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-8 flex flex-col items-center gap-2 text-ink-faint"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest">scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  )
}
