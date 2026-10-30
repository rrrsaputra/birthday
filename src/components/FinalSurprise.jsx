import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { finale } from '../data/content'
import { celebrate, starBurst } from '../utils/confetti'
import { Sparkle, StarShape } from './decor/Shapes'
import Button from './ui/Button'

/** Twinkling star field for the dusk sky background. */
function StarField({ count = 40 }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: (i * 37.3) % 100,
        top: (i * 53.7) % 100,
        size: 2 + ((i * 7) % 4),
        delay: (i % 10) * 0.3,
      })),
    [count],
  )
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute animate-twinkle rounded-full bg-white"
          style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, animationDelay: `${s.delay}s` }}
        />
      ))}
    </div>
  )
}

/** Magical full-screen shower of shooting & falling stars. */
function StarShower({ runId }) {
  const stars = useMemo(
    () =>
      Array.from({ length: 34 }, (_, i) => ({
        id: `${runId}-${i}`,
        left: Math.random() * 100,
        size: 12 + Math.random() * 22,
        delay: Math.random() * 1.2,
        duration: 2.2 + Math.random() * 1.6,
        color: ['#fbe07c', '#ffefb0', '#fff8dc', '#cbbaf6', '#f9b0c3'][i % 5],
        spin: (Math.random() - 0.5) * 540,
        sparkle: i % 3 === 0,
      })),
    [runId],
  )
  const shooting = useMemo(
    () => Array.from({ length: 5 }, (_, i) => ({ id: `${runId}-s${i}`, top: 8 + i * 12, delay: 0.2 + i * 0.35 })),
    [runId],
  )

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[70] overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
      aria-hidden="true"
    >
      {shooting.map((s) => (
        <motion.span
          key={s.id}
          className="absolute h-[2px] w-40 rounded-full bg-gradient-to-r from-transparent via-white to-butter-200"
          style={{ top: `${s.top}%`, rotate: '-20deg', filter: 'drop-shadow(0 0 6px #fff8dc)' }}
          initial={{ left: '-20%', opacity: 0 }}
          animate={{ left: '120%', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.3, delay: s.delay, ease: 'easeIn' }}
        />
      ))}
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute -top-12"
          style={{ left: `${s.left}%`, filter: `drop-shadow(0 0 8px ${s.color})` }}
          initial={{ y: 0, opacity: 0, rotate: 0, scale: 0.4 }}
          animate={{ y: '115vh', opacity: [0, 1, 1, 0], rotate: s.spin, scale: [0.4, 1, 0.9] }}
          transition={{ duration: s.duration, delay: s.delay, ease: 'easeIn' }}
        >
          {s.sparkle ? (
            <Sparkle color={s.color} style={{ width: s.size, height: s.size }} />
          ) : (
            <StarShape color={s.color} style={{ width: s.size, height: s.size }} />
          )}
        </motion.div>
      ))}
    </motion.div>
  )
}

export default function FinalSurprise() {
  const [wished, setWished] = useState(false)
  const [runId, setRunId] = useState(0)
  const [showering, setShowering] = useState(false)
  const hideTimer = useRef(null)

  useEffect(() => () => clearTimeout(hideTimer.current), [])

  const makeWish = () => {
    setRunId((n) => n + 1)
    setShowering(true)
    setWished(true)
    starBurst()
    setTimeout(celebrate, 700)
    clearTimeout(hideTimer.current)
    hideTimer.current = setTimeout(() => setShowering(false), 4200)
  }

  const finalWords = finale.finalText.split(' ')

  return (
    <section
      id="finale"
      className="relative flex min-h-svh items-center justify-center overflow-hidden bg-gradient-to-b from-cream-100 via-lavender-300 to-lavender-500 px-5 py-28 text-center sm:px-8"
    >
      {/* dusk glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute bottom-[-20%] left-1/2 size-[80vmax] -translate-x-1/2 rounded-full bg-blush-300/50 blur-3xl" />
        <div className="absolute bottom-[-30%] left-[10%] size-[50vmax] rounded-full bg-peach-300/40 blur-3xl" />
      </div>
      <div className="absolute inset-x-0 bottom-0 top-1/4">
        <StarField />
      </div>

      <div className="relative mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 120, damping: 12 }}
          className="mx-auto mb-8 grid size-20 place-items-center rounded-full bg-white/30 backdrop-blur-md"
        >
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}>
            <StarShape color="#fbe07c" className="size-11 drop-shadow-[0_0_14px_rgba(251,224,124,0.9)]" />
          </motion.div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-4xl font-semibold leading-tight text-white drop-shadow-[0_4px_20px_rgba(91,61,76,0.35)] sm:text-6xl md:text-7xl"
        >
          {finale.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="mt-5 text-lg text-white/90 sm:text-xl"
        >
          {finale.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="mt-10"
        >
          <Button id="make-wish-btn" variant="dreamy" size="lg" onClick={makeWish}>
            {wished ? 'Make Another Wish ✨' : finale.button}
          </Button>
        </motion.div>

        <div className="mt-12 min-h-28">
          <AnimatePresence>
            {wished && (
              <motion.p
                key="final"
                className="font-hand text-4xl leading-tight text-white drop-shadow-[0_2px_12px_rgba(91,61,76,0.4)] sm:text-5xl"
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.8 } } }}
              >
                {finalWords.map((w, i) => (
                  <motion.span
                    key={i}
                    className="mr-[0.25em] inline-block"
                    variants={{
                      hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
                      show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6 } },
                    }}
                  >
                    {w}
                  </motion.span>
                ))}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>{showering && <StarShower key={runId} runId={runId} />}</AnimatePresence>
    </section>
  )
}
