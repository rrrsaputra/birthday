import { useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Sparkle, StarShape, Flower, Butterfly, Bow, HeartShape } from './Shapes'

/** Tiny seeded RNG so layouts stay stable between renders. */
function rng(seed) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

const PALETTE = ['#f9b0c3', '#cbbaf6', '#ffefb0', '#ffbe9d', '#fdd0dc', '#e2d8fc']

// Weighted list — hearts kept rare on purpose (friendship, not romance).
const KINDS = ['sparkle', 'sparkle', 'sparkle', 'star', 'star', 'flower', 'flower', 'butterfly', 'bow', 'heart']

function Piece({ kind, color, size }) {
  const style = { width: size, height: size }
  switch (kind) {
    case 'star':
      return <StarShape color={color} style={style} />
    case 'flower':
      return <Flower color={color} style={style} />
    case 'butterfly':
      return <Butterfly color={color} accent="#fdd0dc" style={{ width: size * 1.3, height: size }} />
    case 'bow':
      return <Bow color={color} knot="#e8698e" style={style} />
    case 'heart':
      return <HeartShape color={color} style={style} />
    default:
      return <Sparkle color={color} style={style} />
  }
}

/**
 * Scatters gently floating decorations inside the nearest positioned parent.
 * @param {number} count  number of pieces
 * @param {number} seed   change for a different layout
 * @param {string} className extra classes for the wrapper
 */
export default function FloatingDecor({ count = 18, seed = 7, className = '', opacity = 0.9 }) {
  const reduce = useReducedMotion()

  const pieces = useMemo(() => {
    const r = rng(seed)
    return Array.from({ length: count }, (_, i) => {
      const kind = KINDS[Math.floor(r() * KINDS.length)]
      return {
        id: i,
        kind,
        color: PALETTE[Math.floor(r() * PALETTE.length)],
        left: r() * 100,
        top: r() * 100,
        size: kind === 'sparkle' ? 10 + r() * 16 : 18 + r() * 22,
        duration: 6 + r() * 7,
        delay: r() * -10,
        drift: 10 + r() * 22,
        rotate: (r() - 0.5) * 40,
      }
    })
  }, [count, seed])

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{ left: `${p.left}%`, top: `${p.top}%`, opacity }}
          initial={{ rotate: p.rotate }}
          animate={
            reduce
              ? undefined
              : {
                  y: [0, -p.drift, 0],
                  x: p.kind === 'butterfly' ? [0, p.drift, -p.drift / 2, 0] : [0, p.drift / 4, 0],
                  rotate: [p.rotate, p.rotate + (p.kind === 'sparkle' ? 90 : 12), p.rotate],
                  scale: p.kind === 'sparkle' ? [0.7, 1.15, 0.7] : 1,
                }
          }
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Piece kind={p.kind} color={p.color} size={p.size} />
        </motion.div>
      ))}
    </div>
  )
}
