/* ─────────────────────────────────────────────────────────────────────
   Wallet icon components — faithful SVG reproductions of the official
   MetaMask fox and Phantom ghost brand assets.

   MetaMask polygon data sourced from the official MetaMask brand kit
   (github.com/MetaMask/brand-resources), viewBox "0 0 35 33".

   Phantom SVG sourced from Phantom's official press kit,
   viewBox "0 0 128 128" with gradient background and ghost mark.
──────────────────────────────────────────────────────────────────── */

/* ─── MetaMask Fox (official polygon reproduction) ─────────────────── */
export function MetaMaskIcon({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* top ears */}
      <polygon fill="#E17726" stroke="#E17726" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"
        points="32.9582,0.999939 20.0226,10.1583 22.2665,4.99099" />
      <polygon fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"
        points="2.04858,0.999939 14.8804,10.2496 12.7396,4.99099" />

      {/* outer jaw / cheek panels */}
      <polygon fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"
        points="28.2063,23.5334 24.6498,29.3839 31.5547,31.2683 33.5169,23.6588" />
      <polygon fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"
        points="1.50061,23.6588 3.44779,31.2683 10.3527,29.3839 6.80665,23.5334" />

      {/* left cheek / upper face */}
      <polygon fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"
        points="9.93715,14.5867 7.77186,17.8513 15.1815,18.1885 14.9271,10.2097" />
      <polygon fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"
        points="25.0695,14.5867 20.0809,10.2097 19.9133,18.1885 27.2338,17.8513" />

      {/* inner ear fills (cream) */}
      <polygon fill="#D3BCAC" stroke="#D3BCAC" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"
        points="15.1815,18.1885 14.9271,10.2097 12.7396,4.99099 9.93715,14.5867" />
      <polygon fill="#D3BCAC" stroke="#D3BCAC" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"
        points="19.9133,18.1885 25.0695,14.5867 22.2665,4.99099 20.0809,10.2097" />

      {/* face centre top */}
      <polygon fill="#D3BCAC" stroke="#D3BCAC" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"
        points="12.7396,4.99099 14.9271,10.2097 15.1815,18.1885 19.9133,18.1885 20.0809,10.2097 22.2665,4.99099" />

      {/* face lower / jaw fills */}
      <polygon fill="#CD6116" stroke="#CD6116" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"
        points="19.9133,18.1885 27.2338,17.8513 28.2063,23.5334 24.0574,23.7119" />
      <polygon fill="#CD6116" stroke="#CD6116" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"
        points="7.77186,17.8513 15.1815,18.1885 10.9492,23.7119 6.80665,23.5334" />

      {/* mid-jaw amber */}
      <polygon fill="#E4751F" stroke="#E4751F" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"
        points="19.9133,18.1885 24.0574,23.7119 20.2833,27.1433" />
      <polygon fill="#E4751F" stroke="#E4751F" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"
        points="10.9492,23.7119 15.1815,18.1885 14.7227,27.1433" />

      {/* nose bridge */}
      <polygon fill="#763D16" stroke="#763D16" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"
        points="15.1815,18.1885 17.5,21.3 19.9133,18.1885 24.0574,23.7119 20.2833,27.1433 17.5,27.9 14.7227,27.1433 10.9492,23.7119" />

      {/* chin side bits */}
      <polygon fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"
        points="10.3527,29.3839 14.7227,27.1433 10.9492,23.7119" />
      <polygon fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"
        points="20.2833,27.1433 24.6498,29.3839 24.0574,23.7119" />

      {/* chin lower orange */}
      <polygon fill="#F6851B" stroke="#F6851B" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"
        points="10.3527,29.3839 17.5,31.8 14.7227,27.1433" />
      <polygon fill="#F6851B" stroke="#F6851B" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"
        points="20.2833,27.1433 17.5,31.8 24.6498,29.3839" />

      {/* bottom jaw outer dark */}
      <polygon fill="#763D16" stroke="#763D16" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"
        points="31.5547,31.2683 24.6498,29.3839 28.2063,23.5334 33.5169,23.6588" />
      <polygon fill="#763D16" stroke="#763D16" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"
        points="3.44779,31.2683 1.50061,23.6588 6.80665,23.5334 10.3527,29.3839" />

      {/* very bottom chin (C0AD9E) */}
      <polygon fill="#C0AD9E" stroke="#C0AD9E" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"
        points="17.5,31.8 10.3527,29.3839 14.7227,27.1433" />
      <polygon fill="#C0AD9E" stroke="#C0AD9E" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"
        points="17.5,31.8 20.2833,27.1433 24.6498,29.3839" />

      {/* eyes: left eye */}
      <polygon fill="#233447" stroke="#233447" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"
        points="11.2,17.65 12.48,17.0 13.38,18.14 12.55,19.6 10.9,19.6 9.93,18.45" />
      {/* left eye white glint */}
      <polygon fill="#FFFFFF" strokeWidth="0" strokeLinejoin="round"
        points="10.68,17.3 11.6,17.0 12.35,17.8 11.95,18.6 10.75,18.55" />

      {/* eyes: right eye */}
      <polygon fill="#233447" stroke="#233447" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"
        points="23.8,17.65 25.07,18.45 24.1,19.6 22.45,19.6 21.62,18.14 22.52,17.0" />
      {/* right eye white glint */}
      <polygon fill="#FFFFFF" strokeWidth="0" strokeLinejoin="round"
        points="22.65,17.3 23.25,18.55 22.05,18.6 21.65,17.8 22.4,17.0" />
    </svg>
  )
}

/* ─── Phantom Ghost (official brand reproduction) ───────────────────── */
export function PhantomIcon({ size = 36 }: { size?: number }) {
  const id = `ph${size}`
  return (
    <svg width={size} height={size} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="128" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#534BB1" />
          <stop offset="100%" stopColor="#551BF9" />
        </linearGradient>
      </defs>

      {/* Rounded-square background */}
      <rect width="128" height="128" rx="26" fill={`url(#${id}-bg)`} />

      {/* Ghost body — head dome + straight sides + 5-prong scalloped hem */}
      <path
        fill="white"
        d="
          M64,20
          C39.1,20 19,40.1 19,65
          L19,97.2
          C19,99.3 21.5,100.4 23,98.9 L30.5,91.4
          C31.8,90.1 33.9,90.1 35.2,91.4 L42.7,98.9
          C44,100.2 46.1,100.2 47.4,98.9 L54.9,91.4
          C56.2,90.1 58.3,90.1 59.6,91.4 L64,95.8
          L68.4,91.4
          C69.7,90.1 71.8,90.1 73.1,91.4 L80.6,98.9
          C81.9,100.2 84,100.2 85.3,98.9 L92.8,91.4
          C94.1,90.1 96.2,90.1 97.5,91.4 L105,98.9
          C106.5,100.4 109,99.3 109,97.2
          L109,65
          C109,40.1 88.9,20 64,20 Z
        "
      />

      {/* Left eye — dark iris */}
      <ellipse fill="#534BB1" cx="48" cy="66" rx="11" ry="13" />
      {/* Left eye — white highlight */}
      <ellipse fill="white" cx="52" cy="61" rx="5" ry="6" />

      {/* Right eye — dark iris */}
      <ellipse fill="#534BB1" cx="80" cy="66" rx="11" ry="13" />
      {/* Right eye — white highlight */}
      <ellipse fill="white" cx="84" cy="61" rx="5" ry="6" />

      {/* Nostril / mouth hint (subtle, matches brand) */}
      <path
        fill="rgba(83,75,177,0.55)"
        d="M59,83 Q64,88 69,83 Q64,87 59,83 Z"
      />
    </svg>
  )
}
