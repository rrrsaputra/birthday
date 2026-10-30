import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Music, VolumeX } from 'lucide-react'

/** Little animated equalizer bars. */
function Bars({ active }) {
  return (
    <span className="flex h-4 items-end gap-[3px]" aria-hidden="true">
      {[0.9, 0.5, 1, 0.7].map((h, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-blush-500"
          animate={active ? { height: ['30%', `${h * 100}%`, '45%', `${h * 80}%`, '30%'] } : { height: '25%' }}
          transition={active ? { duration: 1.1 + i * 0.15, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.3 }}
        />
      ))}
    </span>
  )
}

/**
 * Floating music toggle (top-right). Shows a "now playing" label briefly.
 */
export default function MusicToggle({ playing, onToggle, title }) {
  const [showLabel, setShowLabel] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setShowLabel(false), 4500)
    return () => clearTimeout(t)
  }, [])

  return (
    <motion.div
      className="fixed right-4 top-4 z-40 flex items-center gap-2"
      style={{ marginTop: 'env(safe-area-inset-top)' }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, type: 'spring', stiffness: 160, damping: 16 }}
      onMouseEnter={() => setShowLabel(true)}
      onMouseLeave={() => setShowLabel(false)}
    >
      <AnimatePresence>
        {showLabel && (
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="glass hidden rounded-full px-4 py-2 text-xs font-semibold text-cocoa-soft shadow-soft sm:block"
          >
            {playing ? `♪ now playing: ${title}` : 'music is paused'}
          </motion.span>
        )}
      </AnimatePresence>

      <motion.button
        id="music-toggle-btn"
        type="button"
        onClick={onToggle}
        aria-label={playing ? 'Pause music' : 'Play music'}
        aria-pressed={playing}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="glass relative flex h-12 items-center gap-2 rounded-full px-4 text-cocoa shadow-dreamy"
      >
        {playing && (
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-blush-300"
            animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            aria-hidden="true"
          />
        )}
        {playing ? <Music className="size-5 text-blush-500" /> : <VolumeX className="size-5 text-cocoa-soft" />}
        <Bars active={playing} />
      </motion.button>
    </motion.div>
  )
}
