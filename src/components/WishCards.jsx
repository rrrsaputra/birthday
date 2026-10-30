import { useState } from 'react'
import { motion } from 'framer-motion'
import { Gift, RefreshCw } from 'lucide-react'
import { wishes } from '../data/content'
import { Sparkle } from './decor/Shapes'
import { Section, SectionHeading } from './ui/Section'

function WishCard({ wish, index }) {
  const [flipped, setFlipped] = useState(false)
  const Icon = wish.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: index % 2 ? 6 : -6 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ delay: (index % 3) * 0.12, type: 'spring', stiffness: 130, damping: 14 }}
      className="perspective"
    >
      <motion.button
        type="button"
        id={`wish-card-${index + 1}`}
        onClick={() => setFlipped((f) => !f)}
        aria-pressed={flipped}
        aria-label={`${wish.title} — tap to flip`}
        className="preserve-3d relative block h-56 w-full text-left sm:h-60"
        animate={{ rotateY: flipped ? 180 : 0 }}
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 120, damping: 15 }}
      >
        {/* Front */}
        <div
          className={`backface-hidden grain absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[1.75rem] bg-gradient-to-br ${wish.gradient} p-6 shadow-soft ring-1 ring-white/80`}
        >
          <div className="flex items-start justify-between">
            <motion.div
              className="grid size-14 place-items-center rounded-2xl bg-white/70 text-blush-500 shadow-sm"
              animate={{ rotate: [0, -8, 8, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: index * 0.4 }}
            >
              <Icon className="size-7" strokeWidth={2} />
            </motion.div>
            <span className="font-serif text-5xl font-semibold italic text-white/80">0{index + 1}</span>
          </div>
          <div>
            <h3 className="font-serif text-2xl font-semibold leading-tight text-cocoa sm:text-[1.7rem]">{wish.title}</h3>
            <p className="mt-2 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.18em] text-cocoa-soft">
              <RefreshCw className="size-3" /> tap to flip
            </p>
          </div>
          <Sparkle color="#fff" className="absolute right-6 top-24 size-5 animate-twinkle" style={{ animationDelay: `${index * 0.3}s` }} />
        </div>

        {/* Back */}
        <div className="backface-hidden absolute inset-0 flex flex-col items-center justify-center rounded-[1.75rem] bg-gradient-to-br from-cream-50 to-blush-100 p-7 text-center shadow-soft ring-1 ring-blush-200 [transform:rotateY(180deg)]">
          <Sparkle color="#fbe07c" className="mb-3 size-7" />
          <p className="font-hand text-[1.7rem] leading-snug text-cocoa">{wish.back}</p>
        </div>
      </motion.button>
    </motion.div>
  )
}

export default function WishCards() {
  return (
    <Section id="wishes">
      <SectionHeading
        eyebrow="birthday wishes"
        icon={Gift}
        title="Wishing You a Year Full of…"
        subtitle="Six little wishes, wrapped up just for you. Tap each one to peek inside."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {wishes.map((wish, i) => (
          <WishCard key={i} wish={wish} index={i} />
        ))}
      </div>
    </Section>
  )
}
