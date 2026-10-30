import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { appreciation } from '../data/content'
import { Section, SectionHeading } from './ui/Section'

const TONES = {
  blush: { card: 'from-blush-100 to-cream-50', icon: 'bg-blush-200 text-blush-600', tape: 'bg-lavender-200' },
  lavender: { card: 'from-lavender-100 to-cream-50', icon: 'bg-lavender-200 text-lavender-500', tape: 'bg-butter-200' },
  butter: { card: 'from-butter-100 to-cream-50', icon: 'bg-butter-200 text-peach-400', tape: 'bg-blush-200' },
  peach: { card: 'from-peach-100 to-cream-50', icon: 'bg-peach-200 text-peach-400', tape: 'bg-lavender-200' },
}

const tilts = [-3, 2, -1.5, 3, -2.5, 1.5]

function AppreciationCard({ item, index }) {
  const tone = TONES[item.tone] ?? TONES.blush
  const Icon = item.icon
  const tilt = tilts[index % tilts.length]

  return (
    <motion.article
      initial={{ opacity: 0, y: 60, scale: 0.85, rotate: tilt * 3 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotate: tilt }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ delay: (index % 3) * 0.12, type: 'spring', stiffness: 140, damping: 14 }}
      whileHover={{ rotate: 0, y: -8, scale: 1.03 }}
      className={`grain relative rounded-[1.75rem] bg-gradient-to-br ${tone.card} p-7 pt-9 shadow-soft ring-1 ring-white/80 transition-shadow hover:shadow-dreamy`}
    >
      <span className={`washi -top-3 left-1/2 -translate-x-1/2 rotate-[-4deg] ${tone.tape}`} aria-hidden="true" />

      <div className="flex items-start justify-between">
        <motion.div
          className={`grid size-12 place-items-center rounded-2xl ${tone.icon}`}
          whileHover={{ rotate: [0, -12, 12, 0] }}
          transition={{ duration: 0.5 }}
        >
          <Icon className="size-6" strokeWidth={2} />
        </motion.div>
        <span className="text-3xl" aria-hidden="true">
          {item.emoji}
        </span>
      </div>

      <p className="mt-6 font-serif text-xl leading-snug text-cocoa sm:text-[1.35rem]">{item.text}</p>
      <p className="mt-4 font-hand text-lg text-cocoa-soft/80">— reason no. {index + 1}</p>
    </motion.article>
  )
}

export default function Appreciation() {
  return (
    <Section id="special">
      <SectionHeading
        eyebrow="a little appreciation"
        icon={Sparkles}
        title="A Few Things That Make You Special"
        subtitle="Just a tiny reminder of what everyone around you already knows."
      />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {appreciation.map((item, i) => (
          <AppreciationCard key={i} item={item} index={i} />
        ))}
      </div>
    </Section>
  )
}
