import { useCallback, useEffect, useRef, useState } from 'react'
import MusicBox from '../utils/musicBox'

/**
 * Background music controller.
 * - If `src` is set → plays that audio file on loop (with fade in/out).
 * - Otherwise → plays the built-in synthesized music box.
 * Pauses automatically while the tab is hidden.
 */
export default function useBackgroundMusic({ src = '', volume = 0.5 } = {}) {
  const [playing, setPlaying] = useState(false)
  const player = useRef(null)
  const wantsPlay = useRef(false)

  const getPlayer = useCallback(() => {
    if (player.current) return player.current

    if (src) {
      const audio = new Audio(src)
      audio.loop = true
      audio.preload = 'auto'
      audio.volume = 0
      let fade
      const fadeTo = (target, ms, done) => {
        clearInterval(fade)
        const step = (target - audio.volume) / (ms / 40)
        fade = setInterval(() => {
          const next = audio.volume + step
          if ((step >= 0 && next >= target) || (step < 0 && next <= target)) {
            audio.volume = target
            clearInterval(fade)
            done?.()
          } else audio.volume = Math.min(1, Math.max(0, next))
        }, 40)
      }
      player.current = {
        play: async () => {
          await audio.play()
          fadeTo(volume, 1200)
        },
        pause: async () => fadeTo(0, 500, () => audio.pause()),
      }
    } else {
      player.current = new MusicBox(volume)
    }
    return player.current
  }, [src, volume])

  const play = useCallback(async () => {
    wantsPlay.current = true
    try {
      await getPlayer().play()
      setPlaying(true)
    } catch (err) {
      console.warn('Music could not start:', err)
      setPlaying(false)
    }
  }, [getPlayer])

  const pause = useCallback(async () => {
    wantsPlay.current = false
    setPlaying(false)
    await player.current?.pause()
  }, [])

  const toggle = useCallback(() => (wantsPlay.current ? pause() : play()), [play, pause])

  // Be polite: pause when the tab is hidden, resume when back.
  useEffect(() => {
    const onVisibility = () => {
      if (!player.current || !wantsPlay.current) return
      if (document.hidden) {
        player.current.pause()
        setPlaying(false)
      } else {
        player.current.play().then(() => setPlaying(true)).catch(() => {})
      }
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  return { playing, play, pause, toggle }
}
