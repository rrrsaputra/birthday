import { birthday } from '../data/content'
import { Sparkle } from './decor/Shapes'

export default function Footer() {
  return (
    <footer className="relative bg-lavender-500 px-6 pb-28 pt-10 text-center text-white/85">
      <div className="mx-auto flex max-w-md flex-col items-center gap-2">
        <Sparkle color="#ffefb0" className="size-5 animate-twinkle" />
        <p className="font-hand text-2xl">made with care &amp; a little bit of code</p>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
          for {birthday.name} · {birthday.shortDate}
        </p>
      </div>
    </footer>
  )
}
