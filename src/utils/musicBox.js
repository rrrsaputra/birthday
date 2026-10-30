/**
 * 🎵 A tiny synthesized music box — no audio files needed.
 * Plays a gentle, looping "Happy Birthday" (public domain melody)
 * with soft chords, a dreamy echo, and a little reverb.
 */

// [midi note, beats, chord?]  — key of F, played an octave up like a real music box
const MELODY = [
  [72, 0.75], [72, 0.25], [74, 1, 'F'], [72, 1], [77, 1], [76, 2, 'C7'],
  [72, 0.75], [72, 0.25], [74, 1, 'C7'], [72, 1], [79, 1], [77, 2, 'F'],
  [72, 0.75], [72, 0.25], [84, 1, 'F'], [81, 1], [77, 1], [76, 1, 'Bb'], [74, 2],
  [82, 0.75], [82, 0.25], [81, 1, 'F'], [77, 1], [79, 1, 'C7'], [77, 3, 'F'],
]

const CHORDS = {
  F: [53, 57, 60, 65],
  C7: [48, 52, 55, 58],
  Bb: [46, 50, 53, 58],
}

const BEAT = 0.52 // seconds per beat — slow & sweet
const LOOP_GAP = 2 // beats of rest between repeats
const LOOKAHEAD = 0.25 // seconds scheduled ahead

const freq = (midi) => 440 * 2 ** ((midi - 69) / 12)

function makeImpulse(ctx, seconds = 2.6, decay = 3) {
  const len = Math.floor(ctx.sampleRate * seconds)
  const buffer = ctx.createBuffer(2, len, ctx.sampleRate)
  for (let ch = 0; ch < 2; ch++) {
    const data = buffer.getChannelData(ch)
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len) ** decay
  }
  return buffer
}

export default class MusicBox {
  constructor(volume = 0.5) {
    this.volume = volume
    this.ctx = null
    this.timer = null
    this.noteIndex = 0
    this.nextTime = 0
  }

  #setup() {
    const Ctx = window.AudioContext || window.webkitAudioContext
    const ctx = new Ctx()
    this.ctx = ctx

    this.master = ctx.createGain()
    this.master.gain.value = 0.0001
    this.master.connect(ctx.destination)

    // soft high-cut so nothing sounds harsh
    this.tone = ctx.createBiquadFilter()
    this.tone.type = 'lowpass'
    this.tone.frequency.value = 5200
    this.tone.connect(this.master)

    // dreamy echo
    const delay = ctx.createDelay()
    delay.delayTime.value = BEAT * 0.75
    const feedback = ctx.createGain()
    feedback.gain.value = 0.28
    const delayFilter = ctx.createBiquadFilter()
    delayFilter.type = 'lowpass'
    delayFilter.frequency.value = 2200
    delay.connect(delayFilter).connect(feedback).connect(delay)
    const delayOut = ctx.createGain()
    delayOut.gain.value = 0.35
    delayFilter.connect(delayOut).connect(this.tone)

    // room reverb
    const reverb = ctx.createConvolver()
    reverb.buffer = makeImpulse(ctx)
    const reverbOut = ctx.createGain()
    reverbOut.gain.value = 0.45
    reverb.connect(reverbOut).connect(this.tone)

    // voices go here → dry + sends
    this.bus = ctx.createGain()
    this.bus.connect(this.tone)
    this.bus.connect(delay)
    this.bus.connect(reverb)
  }

  /** One music-box "tine": bright attack, bell-ish partials, long decay. */
  #pluck(midi, time, velocity = 0.22, length = 2.2) {
    const { ctx } = this
    const f = freq(midi)
    const partials = [
      [1, 1, length],
      [2, 0.28, length * 0.6],
      [4.2, 0.07, length * 0.25], // slightly inharmonic shimmer, like a metal tine
    ]
    partials.forEach(([mult, amp, dur]) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = f * mult
      gain.gain.setValueAtTime(0.0001, time)
      gain.gain.exponentialRampToValueAtTime(velocity * amp, time + 0.006)
      gain.gain.exponentialRampToValueAtTime(0.0001, time + dur)
      osc.connect(gain).connect(this.bus)
      osc.start(time)
      osc.stop(time + dur + 0.05)
    })
  }

  #schedule = () => {
    const { ctx } = this
    while (this.nextTime < ctx.currentTime + LOOKAHEAD) {
      const [midi, beats, chord] = MELODY[this.noteIndex]
      this.#pluck(midi, this.nextTime, 0.2)

      if (chord) {
        CHORDS[chord].forEach((m, i) => this.#pluck(m, this.nextTime + i * 0.07, 0.07, 2.8))
      }

      this.nextTime += beats * BEAT
      this.noteIndex++
      if (this.noteIndex >= MELODY.length) {
        this.noteIndex = 0
        this.nextTime += LOOP_GAP * BEAT
      }
    }
  }

  #fadeTo(value, seconds) {
    const g = this.master.gain
    const now = this.ctx.currentTime
    g.cancelScheduledValues(now)
    g.setValueAtTime(Math.max(g.value, 0.0001), now)
    g.exponentialRampToValueAtTime(Math.max(value, 0.0001), now + seconds)
  }

  /** Must be called from a user gesture (click/tap) the first time. */
  async play() {
    if (!this.ctx) this.#setup()
    if (this.ctx.state === 'suspended') await this.ctx.resume()
    if (!this.timer) {
      this.noteIndex = 0
      this.nextTime = this.ctx.currentTime + 0.15
      this.timer = setInterval(this.#schedule, 60)
      this.#schedule()
    }
    this.#fadeTo(this.volume, 1.2)
  }

  async pause() {
    if (!this.ctx) return
    this.#fadeTo(0.0001, 0.5)
    clearInterval(this.timer)
    this.timer = null
    await new Promise((r) => setTimeout(r, 550))
    if (!this.timer) await this.ctx.suspend()
  }
}
