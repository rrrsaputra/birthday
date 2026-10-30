import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Welcome from './components/Welcome'
import Celebration from './components/Celebration'
import Appreciation from './components/Appreciation'
import Gallery from './components/gallery/Gallery'
import Letter from './components/Letter'
import WishCards from './components/WishCards'
import FinalSurprise from './components/FinalSurprise'
import NavDock from './components/NavDock'
import Footer from './components/Footer'
import FloatingDecor from './components/decor/FloatingDecor'
import MusicToggle from './components/MusicToggle'
import useBackgroundMusic from './hooks/useBackgroundMusic'
import { music } from './data/content'
import { celebrate, sideCannons } from './utils/confetti'

export default function App() {
  const [opened, setOpened] = useState(false)
  const bgm = useBackgroundMusic(music)

  const openSurprise = () => {
    bgm.play() // must start inside the click so browsers allow audio
    window.scrollTo({ top: 0 })
    setOpened(true)
    celebrate()
    setTimeout(() => sideCannons(1600), 400)
  }

  return (
    <>
      <AnimatePresence>{!opened && <Welcome key="welcome" onOpen={openSurprise} />}</AnimatePresence>

      {opened && (
        <>
          {/* gentle decorations drifting behind everything */}
          <div className="pointer-events-none fixed inset-0 -z-0">
            <FloatingDecor count={16} seed={11} opacity={0.55} />
          </div>

          <motion.main
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <Celebration />
            <Appreciation />
            <Gallery />
            <Letter />
            <WishCards />
            <FinalSurprise />
            <Footer />
          </motion.main>

          <NavDock />
          <MusicToggle playing={bgm.playing} onToggle={bgm.toggle} title={music.title} />
        </>
      )}
    </>
  )
}
