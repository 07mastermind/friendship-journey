import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Gift, Lock, X } from 'lucide-react'
import { SectionHeading } from './SectionHeading'

export function SecretMessage({
  correctNickname,
  hint,
  letter,
}: {
  correctNickname: string
  hint: string
  letter: string[]
}) {
  const [open, setOpen] = useState(false)
  const [unlocked, setUnlocked] = useState(false)
  const [guess, setGuess] = useState('')
  const [error, setError] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (guess.trim().toLowerCase() === correctNickname.trim().toLowerCase()) {
      setUnlocked(true)
      setError(false)
    } else {
      setError(true)
    }
  }

  function close() {
    setOpen(false)
    setError(false)
  }

  return (
    <section id="secret" className="relative mx-auto max-w-2xl px-6 py-24 text-center">
      <SectionHeading eyebrow="Chapter Five" title="A Locked Message" subtitle="This one's just for you." />

      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.06, rotate: [0, -2, 2, 0] }}
        whileTap={{ scale: 0.95 }}
        className="glass-strong mx-auto flex h-28 w-28 items-center justify-center rounded-3xl shadow-lg shadow-black/30"
        aria-label="Open the secret gift box"
      >
        <Gift size={40} className="text-gold" strokeWidth={1.4} />
      </motion.button>
      <p className="mt-4 font-mono text-xs uppercase tracking-widest text-ink-faint">tap the box</p>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="glass-strong relative max-h-[85vh] w-full max-w-md overflow-y-auto rounded-3xl p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={close}
                className="absolute right-4 top-4 rounded-full bg-black/30 p-2 text-white"
                aria-label="Close"
              >
                <X size={16} />
              </button>

              {!unlocked ? (
                <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5 pt-4 text-center">
                  <Lock className="text-violet-soft" size={30} />
                  <p className="font-display text-xl text-ink">{hint}</p>
                  <input
                    value={guess}
                    onChange={(e) => {
                      setGuess(e.target.value)
                      setError(false)
                    }}
                    placeholder="Type it here"
                    className="w-full rounded-full border border-white/15 bg-white/5 px-5 py-3 text-center text-ink outline-none placeholder:text-ink-faint"
                    autoFocus
                  />
                  {error && <p className="text-sm text-rose">Not quite. Try again?</p>}
                  <button
                    type="submit"
                    className="rounded-full bg-[var(--color-violet)] px-6 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
                  >
                    Unlock
                  </button>
                </form>
              ) : (
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.35 } } }}
                  className="space-y-4 pt-6 text-left"
                >
                  {letter.map((line, i) => (
                    <motion.p
                      key={i}
                      variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                      className="font-display text-lg leading-relaxed text-ink"
                    >
                      {line}
                    </motion.p>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
