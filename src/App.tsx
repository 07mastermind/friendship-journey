import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { content } from './data/content'
import { AuroraBackground } from './components/AuroraBackground'
import { FloatingElements } from './components/FloatingElements'
import { CursorGlow } from './components/CursorGlow'
import { ScrollProgressBar } from './components/ScrollProgressBar'
import { LoadingScreen } from './components/LoadingScreen'
import { MusicToggle } from './components/MusicToggle'
import { ThemeToggle } from './components/ThemeToggle'
import { Hero } from './components/Hero'
import { Timeline } from './components/Timeline'
import { Gallery } from './components/Gallery'
import { Counter } from './components/Counter'
import { FunFacts } from './components/FunFacts'
import { SecretMessage } from './components/SecretMessage'
import { ReasonsGrid } from './components/ReasonsGrid'
import { MemoryMap } from './components/MemoryMap'
import { QuoteCarousel } from './components/QuoteCarousel'
import { Finale } from './components/Finale'
import { EasterEgg } from './components/EasterEgg'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [journeyStarted, setJourneyStarted] = useState(false)

  return (
    <>
      <AnimatePresence>{loading && <LoadingScreen onDone={() => setLoading(false)} />}</AnimatePresence>

      {!loading && (
        <div className="relative min-h-screen">
          <AuroraBackground />
          <FloatingElements />
          <CursorGlow />
          <ScrollProgressBar />
          <MusicToggle src={content.music.src} title={content.music.title} />
          <ThemeToggle />
          <EasterEgg triggerWord={content.easterEgg.triggerWord} message={content.easterEgg.message} />

          <main>
            <Hero onBegin={() => setJourneyStarted(true)} />

            <AnimatePresence>
              {journeyStarted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <Timeline events={content.timeline} />
                  <Gallery photos={content.gallery} />
                  <Counter startDate={content.friendshipStartDate} />
                  <FunFacts facts={content.funFacts} />
                  <SecretMessage
                    correctNickname={content.secretMessage.correctNickname}
                    hint={content.secretMessage.hint}
                    letter={content.secretMessage.letter}
                  />
                  <ReasonsGrid reasons={content.reasons} />
                  <MemoryMap markers={content.mapMarkers} />
                  <QuoteCarousel quotes={content.quotes} />
                  <Finale message={content.finaleMessage} friendName={content.friendName} />
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          <footer className="relative py-10 text-center font-mono text-[11px] uppercase tracking-widest text-ink-faint">
            made with care, for {content.friendName}
          </footer>
        </div>
      )}
    </>
  )
}
