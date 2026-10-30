import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Cake, Camera, Gift, Mail, Sparkles, Star } from 'lucide-react'

export const NAV_ITEMS = [
  { id: 'celebrate', label: 'Cake', icon: Cake },
  { id: 'special', label: 'You', icon: Sparkles },
  { id: 'memories', label: 'Memories', icon: Camera },
  { id: 'letter', label: 'Letter', icon: Mail },
  { id: 'wishes', label: 'Wishes', icon: Gift },
  { id: 'finale', label: 'Wish', icon: Star },
]

/** Floating pill navigation that highlights the section in view. */
export default function NavDock() {
  const [active, setActive] = useState('celebrate')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <motion.nav
      aria-label="Sections"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.8, type: 'spring', stiffness: 120, damping: 16 }}
      className="glass fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-full p-1.5 shadow-dreamy"
      style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
    >
      {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
        const isActive = active === id
        return (
          <a
            key={id}
            id={`nav-${id}`}
            href={`#${id}`}
            aria-label={label}
            aria-current={isActive ? 'true' : undefined}
            className="relative flex items-center gap-1.5 rounded-full px-3 py-2.5 text-xs font-semibold text-cocoa-soft transition-colors hover:text-cocoa"
          >
            {isActive && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blush-200 to-lavender-200"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <Icon className={`relative size-[18px] ${isActive ? 'text-blush-600' : ''}`} strokeWidth={2.2} />
            <span className={`relative hidden md:inline ${isActive ? 'text-cocoa' : ''}`}>{label}</span>
          </a>
        )
      })}
    </motion.nav>
  )
}
