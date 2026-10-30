import { motion } from 'framer-motion'

const VARIANTS = {
  primary:
    'text-white bg-gradient-to-r from-blush-400 via-blush-500 to-lavender-400 shadow-[0_12px_30px_-10px_rgba(232,105,142,0.65)] hover:shadow-[0_16px_40px_-10px_rgba(232,105,142,0.75)]',
  soft: 'text-cocoa bg-white/80 border border-blush-200 shadow-soft hover:bg-white',
  dreamy:
    'text-cocoa bg-gradient-to-r from-butter-200 via-peach-200 to-blush-200 shadow-[0_12px_30px_-12px_rgba(249,160,122,0.7)]',
}

/**
 * Rounded, bouncy, shimmering button used across the site.
 */
export default function Button({
  children,
  icon: Icon,
  variant = 'primary',
  size = 'md',
  shimmer = true,
  className = '',
  ...props
}) {
  const sizes = {
    md: 'px-6 py-3 text-sm sm:text-base',
    lg: 'px-8 py-4 text-base sm:text-lg',
  }
  return (
    <motion.button
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
      className={`${shimmer ? 'shimmer' : ''} inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-[box-shadow,background-color] disabled:cursor-not-allowed disabled:opacity-60 ${VARIANTS[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="size-5 shrink-0" strokeWidth={2.2} />}
      <span>{children}</span>
    </motion.button>
  )
}
