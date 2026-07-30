import { Link } from 'react-router-dom'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  linkTo?: string
}

export default function Logo({ size = 'md', linkTo = '/' }: LogoProps) {
  const sizes = {
    sm: { icon: 30, text: 'text-lg', gap: 'gap-2.5' },
    md: { icon: 38, text: 'text-xl', gap: 'gap-3' },
    lg: { icon: 56, text: 'text-3xl', gap: 'gap-3.5' },
  }
  const s = sizes[size]

  const inner = (
    <div className={`flex items-center ${s.gap} group`}>
      {/* Feather icon styled like Robinhood */}
      <div className="relative flex-shrink-0">
        <svg
          width={s.icon}
          height={s.icon}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Lime background rounded square */}
          <rect width="48" height="48" rx="10" fill="#C9F028" />
          {/* Feather/leaf shape - Robinhood inspired */}
          {/* Main feather body */}
          <path
            d="M30 6 C30 6 38 12 38 22 C38 30 32 35 26 38 L22 42 L20 40 C20 40 24 36 24 36 C18 33 14 27 14 20 C14 11 22 6 30 6 Z"
            fill="#050508"
          />
          {/* Feather spine / quill line */}
          <line
            x1="26"
            y1="38"
            x2="18"
            y2="8"
            stroke="#C9F028"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.7"
          />
          {/* Feather barbs - left side */}
          <path
            d="M18 22 C21 20 25 20 27 22"
            stroke="#C9F028"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.6"
            fill="none"
          />
          <path
            d="M17 27 C20 25 24 25 27 27"
            stroke="#C9F028"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.5"
            fill="none"
          />
          <path
            d="M19 17 C22 15 26 15 28 17"
            stroke="#C9F028"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.5"
            fill="none"
          />
          {/* Scan dot accent */}
          <circle cx="32" cy="11" r="2" fill="#C9F028" opacity="0.9" />
        </svg>
        {/* Subtle glow behind logo */}
        <div className="absolute inset-0 rounded-xl blur-lg bg-[#C9F028] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
      </div>

      {/* Wordmark */}
      <div className="flex flex-col leading-none">
        <span
          className={`font-black tracking-tight ${s.text} text-[#C9F028]`}
          style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.01em' }}
        >
          HOODSCAN
        </span>
        {size !== 'sm' && (
          <span className="text-[10px] text-[#55556a] tracking-[0.18em] uppercase font-mono mt-0.5">
            AI Trading Layer
          </span>
        )}
      </div>
    </div>
  )

  if (!linkTo) return inner
  return <Link to={linkTo}>{inner}</Link>
}
