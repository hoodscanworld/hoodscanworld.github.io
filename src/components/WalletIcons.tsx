/* ─────────────────────────────────────────────────────────────────────
   Wallet icon components — faithful SVG reproductions of the official
   MetaMask fox and Phantom ghost brand assets.
   MetaMask SVG © ConsenSys / MetaMask (MIT-compatible brand use).
   Phantom SVG © Phantom Technologies (fair-use brand reference).
──────────────────────────────────────────────────────────────────── */

/* ─── MetaMask Fox ─────────────────────────────────────────────────── */
export function MetaMaskIcon({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* ── Outer helmet / ears (drawn first, bottom layer) ── */}
      <polygon fill="#E17726" stroke="#E17726" strokeWidth="0.25" strokeLinejoin="round"
        points="32.9582,1 19.8241,10.7183 22.2665,4.99099"/>
      <polygon fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinejoin="round"
        points="2.04858,1 12.7396,4.99099 15.0707,10.809"/>

      {/* ── Inner ears (cream) ── */}
      <polygon fill="#D7C1B3" stroke="#D7C1B3" strokeWidth="0.25" strokeLinejoin="round"
        points="22.2665,4.99099 19.8241,10.7183 25.0695,14.5867"/>
      <polygon fill="#D7C1B3" stroke="#D7C1B3" strokeWidth="0.25" strokeLinejoin="round"
        points="12.7396,4.99099 9.93715,14.5867 15.0707,10.809"/>

      {/* ── Face outer side panels ── */}
      <polygon fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinejoin="round"
        points="9.93715,14.5867 7.77186,17.8513 15.1815,18.1885 14.9285,10.2097"/>
      <polygon fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinejoin="round"
        points="25.0695,14.5867 20.0541,10.1211 19.9133,18.1885 27.2338,17.8513"/>

      {/* ── Center face fill (cream) ── */}
      <polygon fill="#D7C1B3" stroke="#D7C1B3" strokeWidth="0.25" strokeLinejoin="round"
        points="14.9285,10.2097 20.0541,10.1211 19.9133,18.1885 17.5,21.3 15.1815,18.1885"/>

      {/* ── Left eye area (cream bg) ── */}
      <polygon fill="#D7C1B3" stroke="#D7C1B3" strokeWidth="0.25" strokeLinejoin="round"
        points="9.33,17.0 10.5,16.4 13.2,17.8 12.2,20.1 9.8,20.6 7.77186,17.8513"/>
      {/* ── Right eye area (cream bg) ── */}
      <polygon fill="#D7C1B3" stroke="#D7C1B3" strokeWidth="0.25" strokeLinejoin="round"
        points="25.7,17.0 27.2338,17.8513 25.2,20.6 22.8,20.1 21.8,17.8 24.5,16.4"/>

      {/* ── Left eye dark ── */}
      <polygon fill="#233447" stroke="#233447" strokeWidth="0.25" strokeLinejoin="round"
        points="9.8,17.2 10.9,16.6 12.8,18.0 12.0,20.0 9.9,20.4 8.2,18.2"/>
      {/* ── Right eye dark ── */}
      <polygon fill="#233447" stroke="#233447" strokeWidth="0.25" strokeLinejoin="round"
        points="25.2,17.2 26.8,18.2 25.1,20.4 23.0,20.0 22.2,18.0 24.1,16.6"/>

      {/* ── Eye left highlight (white glint) ── */}
      <polygon fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="0.1" strokeLinejoin="round"
        points="10.4,17.1 11.4,16.8 12.2,17.6 11.6,18.4 10.2,18.3"/>
      {/* ── Eye right highlight ── */}
      <polygon fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="0.1" strokeLinejoin="round"
        points="23.8,17.1 24.4,18.3 23.4,18.4 22.8,17.6 23.6,16.8"/>

      {/* ── Face lower center (fills jaw) ── */}
      <polygon fill="#D7C1B3" stroke="#D7C1B3" strokeWidth="0.25" strokeLinejoin="round"
        points="15.1815,18.1885 17.5,21.3 19.9133,18.1885 24.0574,23.7119 20.2833,27.1433 17.5,27.9 14.7227,27.1433 10.9492,23.7119"/>

      {/* ── Nose bridge ── */}
      <polygon fill="#763D16" stroke="#763D16" strokeWidth="0.25" strokeLinejoin="round"
        points="15.9,20.8 17.5,21.3 19.1,20.8 19.9133,18.1885 17.5,19.3 15.1815,18.1885"/>

      {/* ── Jaw outer right ── */}
      <polygon fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinejoin="round"
        points="28.2263,23.5334 24.6498,29.3838 32.2567,31.5162 34.4898,23.6526"/>
      {/* ── Jaw outer left ── */}
      <polygon fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinejoin="round"
        points="0.522827,23.6526 2.74357,31.5162 10.3397,29.3838 6.77472,23.5334"/>

      {/* ── Jaw inner (amber overlaps) ── */}
      <polygon fill="#CD6116" stroke="#CD6116" strokeWidth="0.25" strokeLinejoin="round"
        points="19.9133,18.1885 27.2338,17.8513 28.2263,23.5334 24.0574,23.7119"/>
      <polygon fill="#CD6116" stroke="#CD6116" strokeWidth="0.25" strokeLinejoin="round"
        points="7.77186,17.8513 15.1815,18.1885 10.9492,23.7119 6.77472,23.5334"/>

      {/* ── Chin lower (E4751F) ── */}
      <polygon fill="#E4751F" stroke="#E4751F" strokeWidth="0.25" strokeLinejoin="round"
        points="19.9133,18.1885 24.0574,23.7119 20.2833,27.1433"/>
      <polygon fill="#E4751F" stroke="#E4751F" strokeWidth="0.25" strokeLinejoin="round"
        points="10.9492,23.7119 15.1815,18.1885 14.7227,27.1433"/>

      {/* ── Small lower jaw triangles ── */}
      <polygon fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinejoin="round"
        points="10.3397,29.3838 14.7227,27.1433 10.9492,23.7119"/>
      <polygon fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinejoin="round"
        points="20.2833,27.1433 24.6498,29.3838 24.0574,23.7119"/>

      {/* ── Chin overlap (dark amber) ── */}
      <polygon fill="#CD6116" stroke="#CD6116" strokeWidth="0.25" strokeLinejoin="round"
        points="14.7227,27.1433 17.5,27.9 20.2833,27.1433 17.5,24.5"/>

      {/* ── Center bottom chin (bright orange) ── */}
      <polygon fill="#F6851B" stroke="#F6851B" strokeWidth="0.25" strokeLinejoin="round"
        points="10.3397,29.3838 17.5,31.2 14.7227,27.1433"/>
      <polygon fill="#F6851B" stroke="#F6851B" strokeWidth="0.25" strokeLinejoin="round"
        points="20.2833,27.1433 17.5,31.2 24.6498,29.3838"/>
      <polygon fill="#F6851B" stroke="#F6851B" strokeWidth="0.25" strokeLinejoin="round"
        points="14.7227,27.1433 17.5,31.2 20.2833,27.1433 17.5,27.9"/>

      {/* ── Bottom jaw outer dark (#763D16) ── */}
      <polygon fill="#763D16" stroke="#763D16" strokeWidth="0.25" strokeLinejoin="round"
        points="32.2567,31.5162 24.6498,29.3838 28.2263,23.5334 34.4898,23.6526"/>
      <polygon fill="#763D16" stroke="#763D16" strokeWidth="0.25" strokeLinejoin="round"
        points="2.74357,31.5162 0.522827,23.6526 6.77472,23.5334 10.3397,29.3838"/>

      {/* ── Neck/chin bottom center (#C0AD9E) ── */}
      <polygon fill="#C0AD9E" stroke="#C0AD9E" strokeWidth="0.25" strokeLinejoin="round"
        points="17.5,31.2 10.3397,29.3838 14.7227,27.1433"/>
      <polygon fill="#C0AD9E" stroke="#C0AD9E" strokeWidth="0.25" strokeLinejoin="round"
        points="17.5,31.2 20.2833,27.1433 24.6498,29.3838"/>
    </svg>
  )
}

/* ─── Phantom Ghost ────────────────────────────────────────────────── */
export function PhantomIcon({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="phantom-bg" x1="64" y1="0" x2="64" y2="128" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#534BB1"/>
          <stop offset="100%" stopColor="#551BF9"/>
        </linearGradient>
        <clipPath id="phantom-clip">
          <rect width="128" height="128" rx="26"/>
        </clipPath>
      </defs>

      {/* Background */}
      <rect width="128" height="128" rx="26" fill="url(#phantom-bg)"/>

      {/* Ghost body — rounded top head, 3 prong bottom */}
      <path fill="white"
        d="
          M 64 18
          C 38 18 18 38 18 62
          L 18 106
          L 31 94
          L 44 106
          L 57 94
          L 64 100
          L 71 94
          L 84 106
          L 97 94
          L 110 106
          L 110 62
          C 110 38 90 18 64 18 Z
        "
      />

      {/* Left eye — dark oval with white glint */}
      <ellipse fill="#534BB1" cx="46" cy="65" rx="11" ry="13"/>
      <ellipse fill="white"   cx="49" cy="61" rx="4"  ry="5"/>

      {/* Right eye — dark oval with white glint */}
      <ellipse fill="#534BB1" cx="82" cy="65" rx="11" ry="13"/>
      <ellipse fill="white"   cx="85" cy="61" rx="4"  ry="5"/>

      {/* Subtle shadow under ghost */}
      <path fill="rgba(83,75,177,0.35)"
        d="M 18 106 L 31 94 L 44 106 L 57 94 L 64 100 L 71 94 L 84 106 L 97 94 L 110 106 L 110 110 L 18 110 Z"/>
    </svg>
  )
}
