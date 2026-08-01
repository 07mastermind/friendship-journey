import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'

export function ThemeToggle() {
  const [light, setLight] = useLocalStorage('theme-light', false)

  useEffect(() => {
    document.documentElement.classList.toggle('theme-light', light)
  }, [light])

  return (
    <motion.button
      type="button"
      onClick={() => setLight((v) => !v)}
      className="glass fixed bottom-6 left-6 z-40 flex h-12 w-12 items-center justify-center rounded-full text-ink shadow-lg shadow-black/30"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      aria-label={light ? 'Switch to dark mode' : 'Switch to light mode'}
      title={light ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {light ? <Moon size={18} /> : <Sun size={18} />}
    </motion.button>
  )
}
