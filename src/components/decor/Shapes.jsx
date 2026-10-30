/**
 * Hand-drawn style decorative SVG shapes.
 * All accept `className`, `color`, and any other svg props.
 */

export function Sparkle({ color = 'currentColor', className = '', ...props }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...props}>
      <path
        d="M12 0C13 7 17 11 24 12C17 13 13 17 12 24C11 17 7 13 0 12C7 11 11 7 12 0Z"
        fill={color}
      />
    </svg>
  )
}

export function StarShape({ color = 'currentColor', className = '', ...props }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...props}>
      <path
        d="M12 1.8l2.9 6.2 6.7.8-5 4.6 1.3 6.7L12 16.8l-5.9 3.3 1.3-6.7-5-4.6 6.7-.8z"
        fill={color}
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Flower({ color = '#f9b0c3', center = '#ffefb0', className = '', ...props }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" {...props}>
      {[0, 72, 144, 216, 288].map((r) => (
        <ellipse key={r} cx="20" cy="10.5" rx="7" ry="9.5" fill={color} transform={`rotate(${r} 20 20)`} />
      ))}
      <circle cx="20" cy="20" r="5.2" fill={center} />
      <circle cx="18.6" cy="18.6" r="1.4" fill="#fff" opacity="0.7" />
    </svg>
  )
}

export function Butterfly({ color = '#cbbaf6', accent = '#f9b0c3', className = '', ...props }) {
  const wing = (
    <>
      <path d="M24 20 C14 1 1 4 3.5 14 C5.5 22 16 23 24 20 Z" fill={color} />
      <path d="M24 21 C14 24 5 34 11.5 37.5 C18 40 22 30 24 21 Z" fill={accent} />
      <circle cx="11" cy="12" r="2.2" fill="#fff" opacity="0.7" />
    </>
  )
  return (
    <svg viewBox="0 0 48 40" className={className} aria-hidden="true" {...props}>
      <g className="wing">{wing}</g>
      <g className="wing">
        <g transform="matrix(-1 0 0 1 48 0)">{wing}</g>
      </g>
      <ellipse cx="24" cy="21" rx="1.6" ry="8" fill="#5b3d4c" />
      <path d="M23.5 13.5 C22 9 20 7.5 18.5 7" stroke="#5b3d4c" strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M24.5 13.5 C26 9 28 7.5 29.5 7" stroke="#5b3d4c" strokeWidth="1" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export function Bow({ color = '#f38ba7', knot = '#cc4f75', className = '', ...props }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" {...props}>
      <path d="M24 22 C15 8 3 8 3 17 C3 26 15 26 24 22 Z" fill={color} />
      <path d="M24 22 C33 8 45 8 45 17 C45 26 33 26 24 22 Z" fill={color} />
      <path d="M9 15 C12 13 16 15 19 19" stroke="#fff" strokeOpacity=".5" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M22 23 L15 42 L20 39 L23 44 Z" fill={knot} opacity=".85" />
      <path d="M26 23 L33 42 L28 39 L25 44 Z" fill={knot} opacity=".85" />
      <circle cx="24" cy="22" r="4.5" fill={knot} />
    </svg>
  )
}

export function HeartShape({ color = '#f9b0c3', className = '', ...props }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...props}>
      <path
        d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.1 0 3.5 1.1 4.3 2.4.4.7 1.6.7 2 0 .8-1.3 2.2-2.4 4.3-2.4 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z"
        fill={color}
      />
    </svg>
  )
}

/** A wavy frosting drip, used on the cake tiers. */
export function Drip({ color, className = '' }) {
  return (
    <svg viewBox="0 0 200 30" preserveAspectRatio="none" className={className} aria-hidden="true">
      <path
        d="M0,0 H200 V8 C196,8 195,20 190,20 C185,20 186,8 180,8 C172,8 174,26 166,26 C158,26 160,8 152,8 C146,8 147,16 142,16 C137,16 138,8 130,8 C121,8 123,24 114,24 C105,24 107,8 98,8 C92,8 93,18 87,18 C81,18 82,8 75,8 C66,8 68,28 59,28 C50,28 52,8 44,8 C38,8 39,16 33,16 C27,16 28,8 21,8 C13,8 15,22 8,22 C2,22 3,8 0,8 Z"
        fill={color}
      />
    </svg>
  )
}
