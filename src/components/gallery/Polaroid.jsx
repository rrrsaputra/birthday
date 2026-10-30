import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Pencil } from 'lucide-react'

const TAPE_COLORS = ['bg-blush-200', 'bg-lavender-200', 'bg-butter-200', 'bg-peach-200']

/**
 * Plain-text inline editor. Kept uncontrolled so the caret never jumps.
 */
export function EditableCaption({ id, value, onChange, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current && document.activeElement !== ref.current) ref.current.textContent = value
  }, [value])

  return (
    <p
      ref={ref}
      id={id}
      role="textbox"
      aria-label="Edit photo caption"
      contentEditable="true"
      suppressContentEditableWarning
      spellCheck={false}
      data-placeholder="write a caption…"
      onBlur={(e) => onChange(e.currentTarget.textContent.trim())}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault()
          e.currentTarget.blur()
        }
      }}
      onPaste={(e) => {
        e.preventDefault()
        document.execCommand('insertText', false, e.clipboardData.getData('text/plain'))
      }}
      className={`cursor-text px-1 transition-colors ${className}`}
    />
  )
}

/**
 * A single polaroid: tilted, taped, clickable image + editable caption.
 */
export default function Polaroid({ photo, caption, index, rotate, onOpen, onCaptionChange }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 50, rotate: rotate * 2.5, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, rotate, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: (index % 3) * 0.1, type: 'spring', stiffness: 120, damping: 14 }}
      whileHover={{ rotate: 0, scale: 1.04, y: -6, zIndex: 10 }}
      className="group relative bg-white p-3 pb-4 shadow-polaroid sm:p-4 sm:pb-5"
    >
      <span
        className={`washi -top-3 left-1/2 -translate-x-1/2 ${TAPE_COLORS[index % TAPE_COLORS.length]}`}
        style={{ rotate: `${index % 2 ? 6 : -5}deg` }}
        aria-hidden="true"
      />
      <button
        type="button"
        id={`photo-${index + 1}`}
        onClick={onOpen}
        className="block w-full overflow-hidden bg-cream-200"
        aria-label={`Open photo: ${caption || photo.alt}`}
      >
        <img
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </button>
      <figcaption className="relative mt-3 text-center font-hand text-xl leading-tight text-cocoa sm:text-2xl">
        <EditableCaption id={`caption-${index + 1}`} value={caption} onChange={onCaptionChange} />
        <Pencil
          className="absolute -right-1 top-1 size-3.5 text-cocoa-soft opacity-0 transition-opacity group-hover:opacity-60"
          aria-hidden="true"
        />
      </figcaption>
    </motion.figure>
  )
}
