import { AnimatePresence, motion } from 'framer-motion'
import { Drip, Flower } from './decor/Shapes'

const CANDLE_COLORS = ['#f9b0c3', '#cbbaf6', '#fbe07c', '#ffbe9d', '#f38ba7', '#ad97ea', '#ffd9c4']

const SPRINKLES = [
  [12, 48, '#cbbaf6', 20], [24, 66, '#fbe07c', -30], [36, 44, '#ffffff', 60], [50, 70, '#f38ba7', 10],
  [62, 50, '#cbbaf6', -50], [76, 64, '#fbe07c', 40], [88, 46, '#ffffff', -10], [18, 80, '#ffbe9d', 70],
  [44, 84, '#cbbaf6', -20], [70, 82, '#f38ba7', 30], [84, 76, '#ffffff', -60],
]

function Smoke() {
  return (
    <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute left-1/2 block size-2.5 -translate-x-1/2 rounded-full bg-cocoa-soft/30 blur-[2px]"
          initial={{ opacity: 0.7, y: 0, x: 0, scale: 0.6 }}
          animate={{ opacity: 0, y: -46 - i * 8, x: (i - 1) * 8, scale: 2 }}
          transition={{ duration: 1.4, delay: i * 0.15, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

function Candle({ lit, index, onToggle }) {
  return (
    <motion.button
      type="button"
      id={`candle-${index + 1}`}
      onClick={onToggle}
      aria-label={lit ? `Blow out candle ${index + 1}` : `Relight candle ${index + 1}`}
      className="group relative flex flex-col items-center"
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 + index * 0.08, type: 'spring', stiffness: 300, damping: 15 }}
      whileHover={{ y: -3 }}
    >
      <div className="relative flex h-9 w-7 items-end justify-center">
        <AnimatePresence>
          {lit && (
            <motion.div
              key="flame"
              className="absolute bottom-[6px]"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0, y: -6, transition: { duration: 0.25 } }}
            >
              <div className="flame" style={{ animationDelay: `${index * -0.17}s` }} />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>{!lit && <Smoke key="smoke" />}</AnimatePresence>
        <div className="wick" />
      </div>
      <div className="candle-stick" style={{ '--c': CANDLE_COLORS[index % CANDLE_COLORS.length] }} />
    </motion.button>
  )
}

/**
 * A two-tier pastel cake with interactive candles.
 * @param {boolean[]} lit       state of each candle
 * @param {(i:number)=>void} onToggle  toggle a single candle
 * @param {boolean} gust        true while the "blow" animation is playing
 */
export default function Cake({ lit, onToggle, gust = false }) {
  const anyLit = lit.some(Boolean)

  return (
    <motion.div
      className="relative mx-auto w-[280px] select-none pt-6 sm:w-[340px]"
      animate={gust ? { rotate: [0, -1.5, 1.5, -1, 0] } : { rotate: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* warm candle glow */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-0 size-72 -translate-x-1/2 -translate-y-1/4 rounded-full bg-butter-200 blur-3xl"
        animate={{ opacity: anyLit ? 0.8 : 0 }}
        transition={{ duration: 0.8 }}
        aria-hidden="true"
      />

      {/* Top tier + candles */}
      <div className="relative mx-auto w-[64%]">
        <div className="absolute bottom-full left-0 right-0 flex translate-y-[4px] justify-evenly px-2">
          {lit.map((isLit, i) => (
            <Candle key={i} index={i} lit={isLit} onToggle={() => onToggle(i)} />
          ))}
        </div>

        <div className="relative h-[84px] overflow-hidden rounded-t-[22px] bg-gradient-to-b from-cream-50 to-cream-200 shadow-[inset_-10px_0_0_rgba(91,61,76,0.04)]">
          <Drip color="#f9b0c3" className="absolute left-0 top-0 h-7 w-full" />
          {SPRINKLES.map(([x, y, c, r], i) => (
            <span
              key={i}
              className="absolute h-1.5 w-3 rounded-full"
              style={{ left: `${x}%`, top: `${y}%`, background: c, transform: `rotate(${r}deg)`, boxShadow: '0 1px 0 rgba(0,0,0,.06)' }}
            />
          ))}
        </div>
      </div>

      {/* Bottom tier */}
      <div className="relative h-[120px] overflow-hidden rounded-t-[26px] bg-gradient-to-b from-blush-200 to-blush-300 shadow-[inset_-14px_0_0_rgba(91,61,76,0.05)]">
        <Drip color="#fff8ee" className="absolute left-0 top-0 h-8 w-full" />
        {/* ribbon band */}
        <div className="absolute bottom-5 left-0 right-0 h-9 bg-lavender-300">
          <div
            className="absolute inset-0 opacity-60"
            style={{ backgroundImage: 'radial-gradient(#fff 1.5px, transparent 1.8px)', backgroundSize: '14px 14px' }}
          />
        </div>
        <div className="absolute bottom-[22px] left-0 right-0 flex justify-around px-3">
          {[0, 1, 2, 3, 4].map((i) => (
            <Flower key={i} color={i % 2 ? '#fff8ee' : '#ffefb0'} center="#f38ba7" className="size-7" />
          ))}
        </div>
      </div>

      {/* Plate */}
      <div className="relative -mx-[7%] h-4 rounded-full bg-gradient-to-b from-white to-cream-200 shadow-[0_10px_20px_-6px_rgba(91,61,76,0.3)]" />
      <div className="mx-auto mt-2 h-3 w-3/4 rounded-full bg-cocoa/10 blur-md" aria-hidden="true" />
    </motion.div>
  )
}
