import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Sparkle } from '../decor/Shapes'

/**
 * Full-screen photo viewer with keyboard (←/→/Esc) and swipe support.
 */
export default function Lightbox({ photos, captions, index, onClose, onNav }) {
  const open = index !== null
  const photo = open ? photos[index] : null

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNav(1)
      if (e.key === 'ArrowLeft') onNav(-1)
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose, onNav])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-cocoa/40 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button
            id="lightbox-close-btn"
            onClick={onClose}
            className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white/80 text-cocoa shadow-soft transition hover:rotate-90 hover:bg-white"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>

          <button
            id="lightbox-prev-btn"
            onClick={(e) => {
              e.stopPropagation()
              onNav(-1)
            }}
            className="absolute left-2 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/80 text-cocoa shadow-soft transition hover:scale-110 hover:bg-white sm:left-6"
            aria-label="Previous photo"
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            id="lightbox-next-btn"
            onClick={(e) => {
              e.stopPropagation()
              onNav(1)
            }}
            className="absolute right-2 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/80 text-cocoa shadow-soft transition hover:scale-110 hover:bg-white sm:right-6"
            aria-label="Next photo"
          >
            <ChevronRight className="size-6" />
          </button>

          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              onClick={(e) => e.stopPropagation()}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.4}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) onNav(1)
                else if (info.offset.x > 80) onNav(-1)
              }}
              initial={{ opacity: 0, scale: 0.85, rotate: -4, y: 20 }}
              animate={{ opacity: 1, scale: 1, rotate: -1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotate: 3 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="relative w-full max-w-[min(88vw,560px)] cursor-grab bg-white p-4 pb-6 shadow-2xl active:cursor-grabbing sm:p-5 sm:pb-8"
            >
              <span className="washi -top-3 left-1/2 -translate-x-1/2 -rotate-3 bg-blush-200" aria-hidden="true" />
              <img
                src={photo.src}
                alt={photo.alt}
                draggable={false}
                className="aspect-square max-h-[68vh] w-full select-none object-cover"
              />
              <figcaption className="mt-4 text-center font-hand text-2xl text-cocoa sm:text-3xl">
                {captions[index] || photo.caption}
              </figcaption>
              <p className="mt-1 text-center text-xs font-semibold tracking-[0.25em] text-cocoa-soft">
                {index + 1} / {photos.length}
              </p>
              <Sparkle color="#fbe07c" className="absolute -right-3 -top-3 size-8 animate-twinkle" />
              <Sparkle color="#cbbaf6" className="absolute -bottom-3 -left-3 size-6 animate-twinkle" style={{ animationDelay: '.7s' }} />
            </motion.figure>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
