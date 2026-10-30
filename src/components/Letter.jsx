import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Mail, MailOpen } from 'lucide-react'
import { birthday, letter } from '../data/content'
import { Bow, Flower, Sparkle } from './decor/Shapes'
import { Section, SectionHeading } from './ui/Section'

/** Scalloped postage stamp for the corner of the letter. */
function Stamp() {
  return (
    <div
      className="absolute right-5 top-5 rotate-6 bg-white p-1.5 shadow-soft sm:right-8 sm:top-8"
      style={{
        WebkitMask: 'radial-gradient(circle 4px at 4px 4px, transparent 98%, #000) -4px -4px / 10px 10px',
        mask: 'radial-gradient(circle 4px at 4px 4px, transparent 98%, #000) -4px -4px / 10px 10px',
      }}
      aria-hidden="true"
    >
      <div className="flex size-16 flex-col items-center justify-center gap-0.5 bg-gradient-to-br from-blush-100 to-lavender-100 sm:size-20">
        <Bow className="size-8 sm:size-10" />
        <span className="font-sans text-[9px] font-bold tracking-widest text-blush-500">{birthday.shortDate}</span>
      </div>
    </div>
  )
}

function Envelope({ stage, onOpen }) {
  const [flapBehind, setFlapBehind] = useState(false)
  const opening = stage === 'opening'

  useEffect(() => {
    if (!opening) return setFlapBehind(false)
    const t = setTimeout(() => setFlapBehind(true), 300)
    return () => clearTimeout(t)
  }, [opening])

  return (
    <motion.div
      key="envelope"
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 60, scale: 0.85, transition: { duration: 0.5 } }}
      className="flex flex-col items-center"
    >
      <motion.button
        type="button"
        id="open-letter-btn"
        onClick={onOpen}
        disabled={opening}
        aria-label="Open the letter"
        className="perspective relative mt-16 block aspect-[3/2] w-[min(86vw,420px)]"
        animate={opening ? { y: 20 } : { y: [0, -10, 0] }}
        transition={opening ? { duration: 0.5 } : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={opening ? undefined : { rotate: -1.5, scale: 1.02 }}
      >
        {/* inside / back */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-peach-300 to-peach-200 shadow-dreamy" />

        {/* letter peeking out */}
        <motion.div
          className="letter-paper absolute inset-x-[7%] bottom-[5%] top-[6%] z-10 rounded-lg px-6 pt-5 text-left shadow-md"
          animate={{ y: opening ? '-52%' : '0%' }}
          transition={{ delay: opening ? 0.55 : 0, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="pl-6 font-hand text-2xl text-blush-500">{letter.greeting}</p>
          <div className="mt-2 space-y-2.5 pl-6" aria-hidden="true">
            <div className="h-1.5 w-11/12 rounded bg-cocoa/10" />
            <div className="h-1.5 w-4/5 rounded bg-cocoa/10" />
            <div className="h-1.5 w-2/3 rounded bg-cocoa/10" />
          </div>
        </motion.div>

        {/* front pocket */}
        <div
          className="absolute inset-0 z-20 rounded-2xl bg-gradient-to-br from-blush-200 via-blush-100 to-peach-200"
          style={{ clipPath: 'polygon(0 0, 50% 56%, 100% 0, 100% 100%, 0 100%)' }}
        >
          <div
            className="absolute inset-0 opacity-50"
            style={{ backgroundImage: 'radial-gradient(#fff 1.2px, transparent 1.5px)', backgroundSize: '16px 16px' }}
          />
        </div>
        <p className="absolute inset-x-0 bottom-[10%] z-20 text-center font-hand text-xl text-cocoa/80 sm:text-2xl">
          {letter.envelopeLabel}
        </p>
        <Flower color="#fff8ee" center="#f9b0c3" className="absolute bottom-3 left-4 z-20 size-8 opacity-90" />
        <Sparkle color="#fff" className="absolute bottom-6 right-6 z-20 size-5 animate-twinkle" />

        {/* flap */}
        <motion.div
          className="absolute inset-x-0 top-0 h-[60%] origin-top rounded-t-2xl bg-gradient-to-b from-blush-300 to-blush-200"
          style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)', zIndex: flapBehind ? 5 : 30 }}
          animate={{ rotateX: opening ? 180 : 0 }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
        />

        {/* wax seal */}
        <motion.div
          className="absolute left-1/2 top-[52%] z-40 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gradient-to-br from-blush-400 to-blush-600 shadow-[0_6px_14px_-4px_rgba(204,79,117,0.7),inset_0_-3px_0_rgba(0,0,0,0.12)]"
          animate={opening ? { scale: 0, opacity: 0, rotate: 90 } : { scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Sparkle color="#fff8ee" className="size-6" />
        </motion.div>
      </motion.button>

      <p className="mt-8 inline-flex items-center gap-2 font-hand text-2xl text-lavender-500">
        <Mail className="size-5" /> {letter.tapHint}
      </p>
    </motion.div>
  )
}

function LetterCard({ onClose }) {
  const ref = useRef(null)

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <motion.div
      key="letter"
      ref={ref}
      className="scroll-mt-10"
      initial={{ opacity: 0, y: 80, scale: 0.92, rotate: -2 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
      exit={{ opacity: 0, y: 40, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 90, damping: 16 }}
    >
      <article className="letter-paper relative mx-auto max-w-2xl rounded-2xl pb-[calc(var(--line)*2)] pl-14 pr-6 pt-[calc(var(--line)*2)] shadow-dreamy sm:pl-20 sm:pr-14 sm:[--line:38px]">
        <span className="washi -top-3 left-8 -rotate-6 bg-lavender-200" aria-hidden="true" />
        <span className="washi -top-3 right-10 rotate-3 bg-butter-200" aria-hidden="true" />
        <Stamp />

        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.18, delayChildren: 0.4 } } }}
          className="font-hand text-[1.35rem] leading-[var(--line)] text-cocoa sm:text-[1.55rem]"
        >
          <motion.p variants={item} className="mb-[var(--line)] pr-20 text-[1.9rem] font-bold text-blush-500 sm:text-[2.2rem]">
            {letter.greeting}
          </motion.p>
          {letter.paragraphs.map((p, i) => (
            <motion.p key={i} variants={item} className="mb-[var(--line)]">
              {p}
            </motion.p>
          ))}
          <motion.div variants={item} className="text-right">
            <p>{letter.closing}</p>
            <p className="inline-block -rotate-2 text-[1.8rem] font-bold text-lavender-500 sm:text-[2.1rem]">
              {letter.signature ?? birthday.from}
            </p>
          </motion.div>
        </motion.div>

        <Flower color="#fdd0dc" center="#fbe07c" className="absolute -bottom-5 -left-5 size-14 rotate-12 drop-shadow" />
        <Sparkle color="#fbe07c" className="absolute -right-3 bottom-16 size-7 animate-twinkle" />
      </article>

      <div className="mt-10 text-center">
        <button
          id="close-letter-btn"
          onClick={onClose}
          className="inline-flex items-center gap-2 rounded-full border border-blush-200 bg-white/80 px-5 py-2.5 text-sm font-semibold text-cocoa shadow-soft transition hover:-translate-y-0.5 hover:bg-white"
        >
          <MailOpen className="size-4 text-blush-500" /> Fold it back into the envelope
        </button>
      </div>
    </motion.div>
  )
}

export default function Letter() {
  const [stage, setStage] = useState('closed') // closed → opening → open

  useEffect(() => {
    if (stage !== 'opening') return
    const t = setTimeout(() => setStage('open'), 1700)
    return () => clearTimeout(t)
  }, [stage])

  return (
    <Section id="letter">
      <SectionHeading
        eyebrow="a letter for you"
        icon={Mail}
        title="Something I Wanted to Say"
        subtitle="Written with care (and a few typos fixed). Go on, open it."
      />
      <AnimatePresence mode="wait">
        {stage === 'open' ? (
          <LetterCard key="card" onClose={() => setStage('closed')} />
        ) : (
          <Envelope key="env" stage={stage} onOpen={() => setStage('opening')} />
        )}
      </AnimatePresence>
    </Section>
  )
}
