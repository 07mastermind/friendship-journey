import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'

export function MusicToggle({ src, title }: { src: string; title: string }) {
  const [enabled, setEnabled] = useState(false)
  const [volume, setVolume] = useLocalStorage('music-volume', 0.4)
  const [showSlider, setShowSlider] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState('Click to play music')
  const audioRef = useRef<HTMLAudioElement>(null)

  // Keep the audio element's volume in sync with the stored preference at all times,
  // so the slider takes effect immediately, whether playing or not.
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
      audioRef.current.muted = false
    }
  }, [volume])

  function handleAudioError() {
    setError('Could not load the music file.')
    setEnabled(false)
    setStatus('Audio load failed')
  }

  function handleToggle() {
    const audio = audioRef.current
    setError(null)

    if (!audio) {
      setError('Audio object is not ready yet.')
      setStatus('Audio unavailable')
      setEnabled(false)
      return
    }

    audio.volume = volume
    audio.muted = false
    audio.loop = true

    if (!enabled) {
      audio.currentTime = 0
      audio
        .play()
        .then(() => {
          setEnabled(true)
          setStatus('Music playing')
        })
        .catch(() => {
          setError('Browser blocked playback. Tap again to allow it.')
          setEnabled(false)
          setStatus('Playback blocked')
        })
    } else {
      audio.pause()
      setEnabled(false)
      setStatus('Music paused')
    }
  }

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" onError={handleAudioError} />

      <div
        className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3"
        onMouseEnter={() => setShowSlider(true)}
        onMouseLeave={() => setShowSlider(false)}
      >
        <AnimatePresence>
          {showSlider && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="glass flex items-center gap-2 rounded-full px-4 py-2"
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">vol</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                aria-label="Music volume"
                className="h-1 w-24 cursor-pointer accent-[var(--color-violet-soft)]"
              />
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                {enabled ? 'on' : 'paused'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={handleToggle}
          onFocus={() => setShowSlider(true)}
          className="glass flex h-12 w-12 items-center justify-center rounded-full text-ink shadow-lg shadow-black/30"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          aria-pressed={enabled}
          aria-label={enabled ? `Mute ${title}` : `Play ${title}`}
          title={enabled ? 'Mute music' : 'Play music'}
        >
          {enabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          {enabled && (
            <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[var(--color-violet-soft)]/20" />
          )}
        </motion.button>

        <div className="mt-2 w-full text-right text-[10px] uppercase tracking-widest text-ink-faint">
          {error ?? status}
        </div>
      </div>
    </>
  )
}
