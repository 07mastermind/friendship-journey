import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Sparkles, X } from 'lucide-react'

export function EasterEgg({ triggerWord, message }: { triggerWord: string; message: string }) {
  const [found, setFound] = useState(false)
  const [, setBuffer] = useState('')

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key.length !== 1) return
      setBuffer((prev) => {
        const next = (prev + e.key).slice(-triggerWord.length).toLowerCase()
        if (next === triggerWord.toLowerCase()) {
          setFound(true)
          return ''
        }
        return next
      })
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [triggerWord])

  return (
    <AnimatePresence>
      {found && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="glass-strong fixed bottom-24 left-1/2 z-50 w-[90%] max-w-sm -translate-x-1/2 rounded-2xl p-5 text-center shadow-xl"
        >
          <button
            type="button"
            onClick={() => setFound(false)}
            className="absolute right-3 top-3 text-ink-faint"
            aria-label="Dismiss"
          >
            <X size={14} />
          </button>
          <Sparkles className="mx-auto mb-2 text-gold" size={22} />
          <p className="text-sm text-ink">{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
