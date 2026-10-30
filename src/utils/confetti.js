import confetti from 'canvas-confetti'

/** Pastel palette shared by every celebration effect. */
export const PASTELS = ['#f9b0c3', '#fdd0dc', '#cbbaf6', '#e2d8fc', '#ffefb0', '#ffd9c4', '#ffbe9d', '#ffffff']

const base = {
  colors: PASTELS,
  disableForReducedMotion: true,
  zIndex: 9999,
}

/** Emoji-shaped confetti (falls back gracefully on older browsers). */
let emojiShapes = null
function getEmojiShapes() {
  if (emojiShapes) return emojiShapes
  try {
    emojiShapes = ['🎀', '✨', '🌷', '⭐'].map((text) => confetti.shapeFromText({ text, scalar: 2 }))
  } catch {
    emojiShapes = []
  }
  return emojiShapes
}

/** A big, happy burst from the center of the screen. */
export function celebrate() {
  const count = 220
  const fire = (ratio, opts) =>
    confetti({ ...base, origin: { y: 0.65 }, particleCount: Math.floor(count * ratio), ...opts })

  fire(0.25, { spread: 26, startVelocity: 55 })
  fire(0.2, { spread: 60 })
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.9 })
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 })
  fire(0.1, { spread: 120, startVelocity: 45 })

  const shapes = getEmojiShapes()
  if (shapes.length) {
    confetti({ ...base, shapes, scalar: 2, particleCount: 24, spread: 110, origin: { y: 0.6 }, flat: true })
  }
}

/** Two side cannons that keep popping for `duration` ms. */
export function sideCannons(duration = 1800) {
  const end = Date.now() + duration
  ;(function frame() {
    confetti({ ...base, particleCount: 4, angle: 60, spread: 60, origin: { x: 0, y: 0.75 } })
    confetti({ ...base, particleCount: 4, angle: 120, spread: 60, origin: { x: 1, y: 0.75 } })
    if (Date.now() < end) requestAnimationFrame(frame)
  })()
}

/** Golden star burst used for the final wish. */
export function starBurst() {
  const stars = {
    ...base,
    spread: 360,
    ticks: 90,
    gravity: 0.35,
    decay: 0.94,
    startVelocity: 26,
    shapes: ['star'],
    colors: ['#fbe07c', '#ffefb0', '#fff8dc', '#ffbe9d', '#cbbaf6'],
  }
  const shoot = () => {
    confetti({ ...stars, particleCount: 40, scalar: 1.3, origin: { x: 0.5, y: 0.45 } })
    confetti({ ...stars, particleCount: 14, scalar: 0.8, shapes: ['circle'], origin: { x: 0.5, y: 0.45 } })
  }
  shoot()
  setTimeout(shoot, 180)
  setTimeout(shoot, 380)
}
