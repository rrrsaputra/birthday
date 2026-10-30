/**
 * ✏️  EDIT ME!
 * ------------------------------------------------------------------
 * Everything personal on the website lives in this one file.
 * Change the name, photos, captions, letter, and wishes here —
 * no need to touch any component code.
 *
 * Photos: drop your images into /public/photos and update `src` below.
 * ------------------------------------------------------------------
 */
import {
  Smile,
  Sparkles,
  Sun,
  Rocket,
  Flower2,
  Star,
  Compass,
  Laugh,
  Trophy,
  Camera,
  PartyPopper,
  Heart,
} from 'lucide-react'

/* ── The basics ─────────────────────────────────────────────── */
export const birthday = {
  name: 'Karen', // ← her name
  from: 'Raka Dimas Saputra', // ← your name / signature
  dateLabel: 'Friday, November 06, 2026',
  shortDate: '06 · 11 · 2026',
  isoDate: '2026-11-06', // YYYY-MM-DD (used for the <time> tag)
  candles: 5, // number of candles on the cake
}

/* ── Background music ───────────────────────────────────────── */
/* Leave `src` empty to use the built-in music box "Happy Birthday".
 * Want your own song? Put an mp3 in /public/music/ and set e.g.
 *   src: '/music/song.mp3', title: 'Song Title – Artist'          */
export const music = {
  src: '',
  title: 'Happy Birthday (music box)',
  volume: 0.5, // 0 – 1
}

/* ── Welcome screen ─────────────────────────────────────────── */
export const welcome = {
  eyebrow: 'a little birthday universe',
  title: 'Hey, Birthday Girl! 🎀',
  subtitle: 'Guess what? Today is all about you!',
  button: 'Open Your Little Surprise',
  soundHint: 'turn your sound on 🎧',
}

/* ── Celebration / cake ─────────────────────────────────────── */
export const celebration = {
  intro: 'Another trip around the sun, and you made it look effortless.',
  blowButton: 'Blow Out the Candles',
  relightButton: 'Light Them Again',
  hint: 'psst… you can also tap each candle',
  wishMessage: 'Make a wish! ✨',
  wishSub: 'Close your eyes, think of something wonderful, and keep it a secret.',
}

/* ── A Few Things That Make You Special ─────────────────────── */
export const appreciation = [
  { text: 'Your smile makes ordinary days better.', icon: Smile, tone: 'blush', emoji: '🌷' },
  { text: 'Never stop being your wonderful self.', icon: Sparkles, tone: 'lavender', emoji: '🦋' },
  { text: 'You deserve all the happiness in the world.', icon: Sun, tone: 'butter', emoji: '🌼' },
  { text: 'Keep chasing the things that make you happy.', icon: Rocket, tone: 'peach', emoji: '🎈' },
  { text: 'The world is a little brighter with people like you in it.', icon: Star, tone: 'lavender', emoji: '⭐' },
  { text: 'Thank you for being the kind of friend everyone wishes they had.', icon: Flower2, tone: 'blush', emoji: '🎀' },
]

/* ── Memory gallery ─────────────────────────────────────────── */
/* Captions can also be edited live on the page (saved in the browser). */
export const photos = [
  { src: '/photos/memory-1.jpg', caption: 'coffee dates & endless chats ☕', alt: 'Two strawberry lattes and tulips on a cafe table' },
  { src: '/photos/memory-2.jpg', caption: 'the picnic we planned for weeks 🧺', alt: 'A pastel picnic in the park' },
  { src: '/photos/memory-3.jpg', caption: 'chasing sunsets, as always 🌅', alt: 'Pastel sunset over the beach' },
  { src: '/photos/memory-4.jpg', caption: 'core memories unlocked 📸', alt: 'Polaroids and a film camera' },
  { src: '/photos/memory-5.svg', caption: 'another year, more balloons 🎈', alt: 'Pastel balloons illustration' },
  { src: '/photos/memory-6.svg', caption: 'the night we stayed out too late 🌙', alt: 'Dusk sky with fairy lights illustration' },
]

/* ── A Letter for You (Bahasa Indonesia) ────────────────────── */
export const letter = {
  envelopeLabel: 'Untuk kamu, yang lagi ulang tahun',
  tapHint: 'tap to open',
  greeting: `Halo, ${birthday.name}! 🎀`,
  paragraphs: [
    'Selamat ulang tahun! Akhirnya hari ini datang juga — hari di mana kamu resmi boleh minta apa aja dan semua orang wajib bilang "iya". (Oke, nggak semua sih. Tapi hari ini aku bakal usahain. 😆)',
    'Jujur, aku sempet bingung mau kasih kado apa. Mau beli barang, takut nggak sesuai selera. Mau kasih bunga, nanti layu. Jadi aku bikin ini aja: satu semesta kecil, khusus buat kamu. Semoga cukup bikin kamu senyum — atau minimal ketawa lihat foto-foto di atas.',
    'Makasih ya udah jadi teman yang seru. Yang bisa diajak ngobrol dari hal penting sampai yang sama sekali nggak penting, yang sabar dengerin cerita random aku, dan yang selalu ada di saat-saat yang ternyata berarti banget. Kamu mungkin nggak sadar, tapi kehadiran kamu bikin banyak hari jadi lebih ringan.',
    'Di umur yang baru ini, aku doain semoga kamu selalu bahagia — bahagia yang beneran, bukan yang "aku gapapa kok" padahal kenapa-kenapa. Semoga sehat terus, biar bisa makan enak tanpa drama. Semoga semua yang lagi kamu perjuangin pelan-pelan ketemu jalannya, dan semua usaha kamu dibayar lunas sama hasil yang manis.',
    'Semoga tahun ini juga penuh pengalaman baru: tempat-tempat baru, orang-orang baik, dan cerita seru yang nanti bisa kita ketawain bareng. Kumpulin kenangan indah sebanyak-banyaknya, ya — yang bikin kamu senyum sendiri kalau inget.',
    'Jangan lupa istirahat, jangan terlalu keras sama diri sendiri, dan jangan berhenti jadi kamu yang sekarang. Soalnya versi kamu yang ini udah keren banget.',
    'Sekali lagi, selamat ulang tahun! Semoga harimu semanis kue yang (semoga) ada di depan kamu sekarang. 🍰',
  ],
  closing: 'Dengan banyak doa baik,',
  // signature defaults to birthday.from
}

/* ── Birthday wish cards (tap to flip) ──────────────────────── */
export const wishes = [
  { title: 'More adventures!', back: 'New places, spontaneous trips, and stories worth retelling.', icon: Compass, gradient: 'from-peach-200 via-peach-100 to-butter-100' },
  { title: 'More laughter!', back: 'The kind that makes your stomach hurt and your eyes water.', icon: Laugh, gradient: 'from-butter-200 via-butter-100 to-cream-100' },
  { title: 'More achievements!', back: 'Every goal you chase, caught — and celebrated loudly.', icon: Trophy, gradient: 'from-lavender-200 via-lavender-100 to-blush-100' },
  { title: 'More unforgettable memories!', back: 'Moments you’ll want to replay over and over again.', icon: Camera, gradient: 'from-blush-200 via-blush-100 to-peach-100' },
  { title: 'More happiness!', back: 'Big joys, small joys, and everything in between.', icon: Heart, gradient: 'from-blush-100 via-cream-100 to-lavender-100' },
  { title: 'More reasons to celebrate!', back: 'May this year give you a hundred tiny reasons to throw a party.', icon: PartyPopper, gradient: 'from-lavender-100 via-peach-100 to-butter-200' },
]

/* ── Final surprise ─────────────────────────────────────────── */
export const finale = {
  title: 'The world is lucky to have you!',
  subtitle: "Here's to another year of being amazing.",
  button: 'Make a Wish ✨',
  finalText: 'Stay happy, stay healthy, and keep shining!',
}
