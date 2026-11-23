import type { CSSProperties } from 'react'

/** Soft, blurred colour fields. Each post picks one palette and a layout from a hash of its path. */
const PALETTES: string[][] = [
  [
    '#f3eefc',
    '#c7c9f7',
    '#9ccbf9',
    '#fbf7fd',
  ], // lavender / sky
  [
    '#8bc34a',
    '#5ec7b2',
    '#1d6fe0',
    '#a6d8ec',
  ], // lime / teal / blue
  [
    '#22d3ee',
    '#2563c9',
    '#e8fbff',
    '#5fe3f0',
  ], // cyan / cobalt / white
  [
    '#fbd3b0',
    '#f49fb6',
    '#b9a3f4',
    '#fff3e8',
  ], // peach / rose / lilac
  [
    '#f7c95a',
    '#f0853a',
    '#e0523b',
    '#fde9b8',
  ], // amber / tangerine
  [
    '#c4f1d9',
    '#2fbf8c',
    '#0c6f6a',
    '#eefcf5',
  ], // mint / emerald
  [
    '#6366f1',
    '#a78bfa',
    '#1e1b4b',
    '#d6ccff',
  ], // indigo / violet
  [
    '#ffd6e7',
    '#ff7aa8',
    '#7c3aed',
    '#ffe9f2',
  ], // pink / magenta
]

function hash(input: string): number {
  let h = 2166136261
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/** Deterministic pseudo-random numbers in [0, 1), seeded by the post. */
function random(seed: number) {
  let s = seed || 1
  return () => {
    s ^= s << 13
    s ^= s >>> 17
    s ^= s << 5
    return ((s >>> 0) % 10000) / 10000
  }
}

export function GradientArt({ seed, className = '' }: { seed: string, className?: string }) {
  const h = hash(seed)
  const rand = random(h)
  const [c0, c1, c2, c3] = PALETTES[h % PALETTES.length]
  const pct = (min: number, max: number) => `${Math.round(min + rand() * (max - min))}%`
  const angle = Math.round(rand() * 360)

  const field: CSSProperties = {
    backgroundColor: c1,
    backgroundImage: [
      `radial-gradient(ellipse at ${pct(0, 40)} ${pct(0, 40)}, ${c3} 0%, transparent 55%)`,
      `radial-gradient(ellipse at ${pct(60, 100)} ${pct(60, 100)}, ${c2} 0%, transparent 60%)`,
      `radial-gradient(ellipse at ${pct(20, 80)} ${pct(30, 90)}, ${c0} 0%, transparent 50%)`,
      `conic-gradient(from ${angle}deg at ${pct(30, 70)} ${pct(30, 70)}, ${c0}, ${c1}, ${c2}, ${c1}, ${c0})`,
    ].join(', '),
  }

  // A long, bright streak sweeping across the field, like light through glass.
  const streak: CSSProperties = {
    background: `linear-gradient(90deg, transparent, ${c3} 45%, #ffffff 50%, ${c3} 55%, transparent)`,
    transform: `rotate(${Math.round(-60 + rand() * 120)}deg) translateX(${pct(-30, 30)})`,
    opacity: 0.55 + rand() * 0.3,
  }

  return (
    <div aria-hidden="true" className={`relative overflow-hidden ${className}`} style={{ backgroundColor: c1 }}>
      <div
        className="absolute -inset-[20%] blur-3xl transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-3"
        style={field}
      />
      <div className="absolute inset-y-[-50%] left-1/4 w-1/3 blur-2xl mix-blend-soft-light" style={streak} />
    </div>
  )
}
