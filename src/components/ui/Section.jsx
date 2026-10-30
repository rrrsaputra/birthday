import { motion } from 'framer-motion'
import { Sparkle } from '../decor/Shapes'

/**
 * Section wrapper with consistent spacing + an anchor id for navigation.
 */
export function Section({ id, children, className = '' }) {
  return (
    <section id={id} className={`relative scroll-mt-6 px-5 py-20 sm:px-8 sm:py-28 ${className}`}>
      <div className="relative mx-auto max-w-6xl">{children}</div>
    </section>
  )
}

/**
 * Pretty, centered section heading with a small eyebrow + sparkles.
 */
export function SectionHeading({ eyebrow, title, subtitle, icon: Icon }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto mb-12 max-w-2xl text-center sm:mb-16"
    >
      {eyebrow && (
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blush-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-blush-500 shadow-soft backdrop-blur">
          {Icon && <Icon className="size-3.5" />}
          {eyebrow}
        </div>
      )}
      <h2 className="relative font-serif text-3xl font-semibold leading-tight text-cocoa sm:text-5xl">
        <Sparkle color="#fbe07c" className="absolute -left-2 -top-4 size-5 animate-twinkle sm:-left-8" />
        {title}
        <Sparkle
          color="#cbbaf6"
          className="absolute -right-1 -bottom-2 size-4 animate-twinkle sm:-right-6"
          style={{ animationDelay: '1.2s' }}
        />
      </h2>
      {subtitle && <p className="mt-4 text-base text-cocoa-soft sm:text-lg">{subtitle}</p>}
      <div className="mx-auto mt-6 flex items-center justify-center gap-2 text-blush-300" aria-hidden="true">
        <span className="h-px w-12 bg-gradient-to-r from-transparent to-blush-300" />
        <Sparkle color="currentColor" className="size-3" />
        <span className="h-px w-12 bg-gradient-to-l from-transparent to-blush-300" />
      </div>
    </motion.header>
  )
}
