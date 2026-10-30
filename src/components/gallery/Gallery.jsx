import { useCallback, useState } from 'react'
import { Camera, RotateCcw } from 'lucide-react'
import { photos } from '../../data/content'
import useLocalStorage from '../../hooks/useLocalStorage'
import { Section, SectionHeading } from '../ui/Section'
import Lightbox from './Lightbox'
import Polaroid from './Polaroid'

const ROTATIONS = [-4, 3, -2, 4.5, -3, 2.5, -1.5, 3.5]

export default function Gallery() {
  // Edited captions are stored per photo src, so reordering photos stays safe.
  const [edited, setEdited] = useLocalStorage('birthday-captions', {})
  const [active, setActive] = useState(null)

  const captions = photos.map((p) => edited[p.src] ?? p.caption)
  const hasEdits = Object.keys(edited).length > 0

  const nav = useCallback(
    (dir) => setActive((i) => (i === null ? i : (i + dir + photos.length) % photos.length)),
    [],
  )
  const close = useCallback(() => setActive(null), [])

  return (
    <Section id="memories">
      <SectionHeading
        eyebrow="memory gallery"
        icon={Camera}
        title="Our Little Scrapbook"
        subtitle="A few snapshots of the fun so far — and a promise of many more to come."
      />

      <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-8 sm:gap-y-14 md:grid-cols-3">
        {photos.map((photo, i) => (
          <Polaroid
            key={photo.src}
            photo={photo}
            index={i}
            rotate={ROTATIONS[i % ROTATIONS.length]}
            caption={captions[i]}
            onOpen={() => setActive(i)}
            onCaptionChange={(text) => setEdited((prev) => ({ ...prev, [photo.src]: text }))}
          />
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center gap-2 text-center">
        <p className="font-hand text-xl text-lavender-500">✏️ tap any caption to write your own</p>
        {hasEdits && (
          <button
            id="reset-captions-btn"
            onClick={() => setEdited({})}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-cocoa-soft transition hover:bg-white/70"
          >
            <RotateCcw className="size-3.5" /> reset captions
          </button>
        )}
      </div>

      <Lightbox photos={photos} captions={captions} index={active} onClose={close} onNav={nav} />
    </Section>
  )
}
