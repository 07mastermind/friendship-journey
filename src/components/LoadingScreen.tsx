import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const LINE = 'preparing something for you…'

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true)
  const [typed, setTyped] = useState('')

  useEffect(() => {
    let i = 0
    const typeId = window.setInterval(() => {
      i += 1
      setTyped(LINE.slice(0, i))
      if (i >= LINE.length) window.clearInterval(typeId)
    }, 45)

    const hideTimer = window.setTimeout(() => setVisible(false), 2200)
    return () => {
      window.clearInterval(typeId)
      window.clearTimeout(hideTimer)
    }
  }, [])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
        >
          <motion.div
            className="h-14 w-14 rounded-full border border-white/15"
            style={{ borderTopColor: 'var(--color-violet-soft)' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
          />
          <p className="mt-6 font-mono text-sm tracking-wide text-ink-muted">
            {typed}
            <span className="animate-pulse">|</span>
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
