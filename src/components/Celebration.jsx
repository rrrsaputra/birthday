import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CalendarDays, Flame, Wind } from 'lucide-react'
import { birthday, celebration } from '../data/content'
import { celebrate, sideCannons } from '../utils/confetti'
import Cake from './Cake'
import { Sparkle } from './decor/Shapes'
import Button from './ui/Button'

export default function Celebration() {
  const [lit, setLit] = useState(() => Array(birthday.candles).fill(true))
  const [gust, setGust] = useState(false)
  const [blowing, setBlowing] = useState(false)
  const timers = useRef([])
  const allOut = lit.every((l) => !l)
  const prevAllOut = useRef(allOut)

  // Celebrate the moment the last candle goes out.
  useEffect(() => {
    if (allOut && !prevAllOut.current) {
      celebrate()
      setTimeout(() => sideCannons(1400), 250)
    }
    prevAllOut.current = allOut
  }, [allOut])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const toggle = (i) => setLit((prev) => prev.map((v, idx) => (idx === i ? !v : v)))

  const blowAll = () => {
    if (blowing) return
    setBlowing(true)
    setGust(true)
    timers.current.push(setTimeout(() => setGust(false), 650))
    lit.forEach((_, i) => {
      timers.current.push(
        setTimeout(() => setLit((prev) => prev.map((v, idx) => (idx === i ? false : v))), 120 + i * 110),
      )
    })
    timers.current.push(setTimeout(() => setBlowing(false), 200 + lit.length * 110))
  }

  const relight = () => setLit(Array(birthday.candles).fill(true))

  return (
    <section id="celebrate" className="relative flex min-h-svh flex-col items-center justify-center px-5 pb-20 pt-24 text-center sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-2 text-sm font-semibold text-cocoa-soft shadow-soft backdrop-blur"
      >
        <CalendarDays className="size-4 text-blush-500" />
        <time dateTime={birthday.isoDate}>{birthday.dateLabel}</time>
      </motion.div>

      <h1 className="font-serif font-semibold uppercase leading-[0.95] text-cocoa">
        <motion.span
          className="block text-3xl tracking-[0.12em] sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Happy Birthday,
        </motion.span>
        <motion.span
          className="relative mt-2 inline-block text-6xl italic sm:text-8xl md:text-9xl"
          initial={{ opacity: 0, scale: 0.6, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.75, type: 'spring', stiffness: 160, damping: 12 }}
        >
          <span className="text-gradient px-2">{birthday.name}!</span>
          <Sparkle color="#fbe07c" className="absolute -right-4 -top-2 size-8 animate-twinkle sm:-right-8 sm:size-10" />
          <Sparkle color="#cbbaf6" className="absolute -left-4 bottom-2 size-6 animate-twinkle" style={{ animationDelay: '.8s' }} />
        </motion.span>
      </h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="mx-auto mt-6 max-w-md text-base text-cocoa-soft sm:text-lg"
      >
        {celebration.intro}
      </motion.p>

      {/* Cake card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="glass grain relative mt-12 w-full max-w-lg rounded-[2.5rem] px-6 pb-8 pt-12 shadow-dreamy sm:px-10"
      >
        <Cake lit={lit} onToggle={toggle} gust={gust} />

        <div className="mt-8 flex min-h-[7.5rem] flex-col items-center justify-start gap-3">
          <AnimatePresence mode="wait">
            {allOut ? (
              <motion.div
                key="wish"
                initial={{ opacity: 0, scale: 0.5, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 260, damping: 14 }}
                className="flex flex-col items-center"
              >
                <p className="font-serif text-4xl font-semibold italic text-gradient sm:text-5xl">{celebration.wishMessage}</p>
                <p className="mt-2 max-w-xs text-sm text-cocoa-soft">{celebration.wishSub}</p>
                <button
                  id="relight-candles-btn"
                  onClick={relight}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-blush-500 transition hover:bg-blush-100"
                >
                  <Flame className="size-4" /> {celebration.relightButton}
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="blow"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center gap-3"
              >
                <Button id="blow-candles-btn" icon={Wind} onClick={blowAll} disabled={blowing}>
                  {celebration.blowButton}
                </Button>
                <p className="font-hand text-xl text-lavender-500">{celebration.hint}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  )
}
