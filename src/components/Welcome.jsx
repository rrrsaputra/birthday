import { motion } from 'framer-motion'
import { Gift } from 'lucide-react'
import { welcome } from '../data/content'
import FloatingDecor from './decor/FloatingDecor'
import { Bow, Sparkle } from './decor/Shapes'
import Button from './ui/Button'

const blobs = [
  { className: 'bg-blush-200 left-[-10%] top-[-10%] size-[55vmax]', x: [0, 60, 0], y: [0, 40, 0] },
  { className: 'bg-lavender-200 right-[-15%] top-[10%] size-[50vmax]', x: [0, -50, 0], y: [0, 60, 0] },
  { className: 'bg-butter-200 left-[10%] bottom-[-20%] size-[45vmax]', x: [0, 40, 0], y: [0, -50, 0] },
  { className: 'bg-peach-200 right-[0%] bottom-[-15%] size-[40vmax]', x: [0, -40, 0], y: [0, -30, 0] },
]

/** Splits text into individually animated letters (keeps emoji intact). */
function AnimatedTitle({ text }) {
  const words = text.split(' ')
  return (
    <h1 className="font-serif text-[2.6rem] font-semibold leading-[1.05] text-cocoa sm:text-6xl md:text-7xl">
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {Array.from(word).map((ch, ci) => (
            <motion.span
              key={ci}
              className="inline-block"
              initial={{ opacity: 0, y: 40, rotate: -8 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: 0.5 + (wi * 4 + ci) * 0.045, type: 'spring', stiffness: 260, damping: 16 }}
            >
              {ch}
            </motion.span>
          ))}
          {wi < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </h1>
  )
}

export default function Welcome({ onOpen }) {
  return (
    <motion.div
      key="welcome"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-cream-100 px-6"
      exit={{ opacity: 0, scale: 1.08, filter: 'blur(12px)' }}
      transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
    >
      {/* Animated dreamy background */}
      <div className="absolute inset-0" aria-hidden="true">
        {blobs.map((b, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full opacity-70 blur-3xl ${b.className}`}
            animate={{ x: b.x, y: b.y }}
            transition={{ duration: 14 + i * 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>
      <FloatingDecor count={26} seed={42} />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="glass grain relative w-full max-w-xl rounded-[2.5rem] px-6 pb-10 pt-14 text-center shadow-dreamy sm:px-12 sm:pb-12"
      >
        {/* Bow on top of the card, like a wrapped present */}
        <motion.div
          className="absolute -top-12 left-1/2 -translate-x-1/2"
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 12 }}
        >
          <div className="animate-wiggle">
            <Bow className="size-24 drop-shadow-[0_8px_16px_rgba(232,105,142,0.35)]" />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-5 font-hand text-2xl text-lavender-500"
        >
          ✦ {welcome.eyebrow} ✦
        </motion.p>

        <AnimatedTitle text={welcome.title} />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="mx-auto mt-5 max-w-sm text-lg text-cocoa-soft sm:text-xl"
        >
          {welcome.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="relative mt-10 inline-block"
        >
          {/* soft pulse ring */}
          <motion.span
            className="absolute inset-0 rounded-full bg-blush-300"
            animate={{ scale: [1, 1.25], opacity: [0.5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
            aria-hidden="true"
          />
          <Button id="open-surprise-btn" icon={Gift} size="lg" onClick={onOpen} className="relative">
            {welcome.button}
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6, duration: 0.6 }}
          className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-cocoa-soft/80"
        >
          {welcome.soundHint}
        </motion.p>

        <Sparkle color="#fbe07c" className="absolute bottom-6 left-6 size-6 animate-twinkle" />
        <Sparkle color="#cbbaf6" className="absolute right-8 top-10 size-5 animate-twinkle" style={{ animationDelay: '1s' }} />
      </motion.div>
    </motion.div>
  )
}
