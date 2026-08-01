import { useEffect, useRef } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'

/**
 * Signature background: a slow-moving aurora that shifts hue across four
 * "chapters" of the journey (dawn -> day -> dusk -> night), plus a lightweight
 * twinkling starfield rendered on canvas for performance.
 */
export function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { scrollYProgress } = useScroll()

  // Chapter hue journey: violet dawn -> gold day -> rose dusk -> deep teal/violet night
  const backgroundImage = useTransform(
    scrollYProgress,
    [0, 0.25, 0.55, 0.8, 1],
    [
      'radial-gradient(circle at 20% 20%, rgba(122,106,224,0.35), transparent 60%), radial-gradient(circle at 80% 30%, rgba(82,214,201,0.18), transparent 55%)',
      'radial-gradient(circle at 30% 15%, rgba(236,189,107,0.28), transparent 60%), radial-gradient(circle at 75% 60%, rgba(122,106,224,0.22), transparent 55%)',
      'radial-gradient(circle at 70% 20%, rgba(234,126,160,0.32), transparent 60%), radial-gradient(circle at 20% 70%, rgba(236,189,107,0.2), transparent 55%)',
      'radial-gradient(circle at 50% 30%, rgba(82,214,201,0.3), transparent 60%), radial-gradient(circle at 30% 80%, rgba(122,106,224,0.3), transparent 55%)',
      'radial-gradient(circle at 50% 50%, rgba(122,106,224,0.35), transparent 65%), radial-gradient(circle at 60% 20%, rgba(234,126,160,0.2), transparent 55%)',
    ],
  )

  useMotionValueEvent(scrollYProgress, 'change', () => {
    /* reserved for future chapter-based side effects */
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const STAR_COUNT = width < 640 ? 60 : 110

    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.4 + 0.3,
      phase: Math.random() * Math.PI * 2,
      speed: 0.4 + Math.random() * 0.6,
    }))

    let raf = 0
    let t = 0

    function draw() {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)
      for (const s of stars) {
        const twinkle = prefersReducedMotion ? 0.7 : 0.5 + 0.5 * Math.sin(t * s.speed + s.phase)
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(244, 241, 236, ${0.15 + twinkle * 0.55})`
        ctx.fill()
      }
      t += 0.02
      raf = requestAnimationFrame(draw)
    }

    draw()

    function onResize() {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-void" aria-hidden="true">
      <motion.div className="absolute inset-0" style={{ backgroundImage }} transition={{ duration: 0.6 }} />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,transparent,rgba(10,11,20,0.4)_70%,rgba(10,11,20,0.9)_100%)]" />
    </div>
  )
}
