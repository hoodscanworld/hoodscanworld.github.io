import { Link } from 'react-router-dom'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  linkTo?: string
}

export default function Logo({ size = 'md', linkTo = '/' }: LogoProps) {
  const sizes = {
    sm: { icon: 28, text: 'text-lg', gap: 'gap-2' },
    md: { icon: 36, text: 'text-xl', gap: 'gap-2.5' },
    lg: { icon: 52, text: 'text-3xl', gap: 'gap-3' },
  }
  const s = sizes[size]

  const inner = (
    <div className={`flex items-center ${s.gap} group`}>
      <div className="relative flex-shrink-0">
        <svg
          width={s.icon}
          height={s.icon}
          viewBox="0 0 52 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer hex ring */}
          <path
            d="M26 4 L46 15 L46 37 L26 48 L6 37 L6 15 Z"
            stroke="#00ff94"
            strokeWidth="1.5"
            fill="none"
            opacity="0.4"
          />
          {/* Inner hex */}
          <path
            d="M26 10 L40 18.5 L40 33.5 L26 42 L12 33.5 L12 18.5 Z"
            fill="rgba(0,255,148,0.06)"
            stroke="#00ff94"
            strokeWidth="1"
            opacity="0.7"
          />
          {/* Hood shape */}
          <path
            d="M26 14 C26 14 18 18 18 26 C18 30 20 33 22 35 L30 35 C32 33 34 30 34 26 C34 18 26 14 26 14 Z"
            fill="rgba(0,255,148,0.12)"
            stroke="#00ff94"
            strokeWidth="1.2"
          />
          {/* Scan line 1 */}
          <line x1="19" y1="24" x2="33" y2="24" stroke="#00ff94" strokeWidth="1.5" opacity="0.9" />
          {/* Scan line 2 */}
          <line x1="20" y1="28" x2="32" y2="28" stroke="#00ff94" strokeWidth="1" opacity="0.6" />
          {/* Scan line 3 */}
          <line x1="22" y1="32" x2="30" y2="32" stroke="#00ff94" strokeWidth="0.75" opacity="0.4" />
          {/* Center dot */}
          <circle cx="26" cy="20" r="2" fill="#00ff94" opacity="0.9" />
          {/* Corner accents */}
          <circle cx="6" cy="26" r="1.5" fill="#00ff94" opacity="0.5" />
          <circle cx="46" cy="26" r="1.5" fill="#00ff94" opacity="0.5" />
        </svg>
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full blur-md bg-[#00ff94] opacity-10 group-hover:opacity-20 transition-opacity" />
      </div>
      <div className="flex flex-col leading-none">
        <span
          className={`font-bold tracking-widest ${s.text} gradient-text-green`}
          style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.12em' }}
        >
          HOODSCAN
        </span>
        {size !== 'sm' && (
          <span className="text-[10px] text-[#55556a] tracking-[0.2em] uppercase font-mono mt-0.5">
            AI Trading Layer
          </span>
        )}
      </div>
    </div>
  )

  if (!linkTo) return inner
  return <Link to={linkTo}>{inner}</Link>
}
