import { useState, FormEvent, useEffect, useRef } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, AlertCircle, ArrowRight, Wallet, Mail, Shield, Zap } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import Logo from '../components/Logo'
import { MetaMaskIcon, PhantomIcon } from '../components/WalletIcons'

/* ─── Market Data Rain Canvas ───────────────────────────────────────────
   Bloomberg-terminal style: columns of tickers, prices and % changes
   scrolling upward at different speeds. Directly themed to trading.
────────────────────────────────────────────────────────────────────── */
const TICKERS = [
  'AAPL', 'NVDA', 'TSLA', 'MSFT', 'AMZN', 'META', 'GOOG', 'AMD',
  'SPY', 'QQQ', 'COIN', 'PLTR', 'RBLX', 'SOFI', 'HOOD', 'ARM',
  'NFLX', 'DIS', 'UBER', 'LYFT', 'SNAP', 'TWTR', 'V', 'MA',
  'JPM', 'GS', 'BAC', 'BTC', 'ETH', 'SOL',
]

function randPrice() { return (80 + Math.random() * 400).toFixed(2) }
function randPct() {
  const v = ((Math.random() - 0.45) * 6).toFixed(2)
  return (parseFloat(v) >= 0 ? '+' : '') + v + '%'
}

type DataRow = { text: string; y: number; speed: number; color: string; alpha: number }

function MarketDataCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    let W = (canvas.width = canvas.offsetWidth)
    let H = (canvas.height = canvas.offsetHeight)
    let raf = 0

    const resize = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight }
    window.addEventListener('resize', resize)

    const COLS = Math.floor(W / 120)
    const rows: DataRow[][] = []

    // Initialise each column with staggered rows
    for (let c = 0; c < COLS; c++) {
      const col: DataRow[] = []
      const speed = 0.3 + Math.random() * 0.5
      const count = Math.ceil(H / 22) + 4
      for (let r = 0; r < count; r++) {
        const ticker = TICKERS[Math.floor(Math.random() * TICKERS.length)]
        const pct = randPct()
        const up = pct.startsWith('+')
        col.push({
          text: `${ticker}  ${randPrice()}  ${pct}`,
          y: r * 22 - count * 22 + Math.random() * H,
          speed,
          color: up ? 'rgba(201,240,40,' : 'rgba(239,68,68,',
          alpha: 0.06 + Math.random() * 0.09,
        })
      }
      rows.push(col)
    }

    const X_OFFSETS = Array.from({ length: COLS }, (_, c) => 10 + c * (W / COLS))

    let t = 0
    const tick = () => {
      t++
      ctx.clearRect(0, 0, W, H)
      ctx.font = `11px 'JetBrains Mono', monospace`
      ctx.textAlign = 'left'

      rows.forEach((col, ci) => {
        const x = X_OFFSETS[ci]
        col.forEach(row => {
          row.y += row.speed
          // Refresh text when row exits top
          if (row.y > H + 30) {
            const ticker = TICKERS[Math.floor(Math.random() * TICKERS.length)]
            const pct = randPct()
            const up = pct.startsWith('+')
            row.text = `${ticker}  ${randPrice()}  ${pct}`
            row.color = up ? 'rgba(201,240,40,' : 'rgba(239,68,68,'
            row.alpha = 0.05 + Math.random() * 0.09
            row.y = -20
          }
          ctx.fillStyle = row.color + row.alpha + ')'
          ctx.fillText(row.text, x, row.y)
        })
      })

      // Horizontal scan line moving down
      const scanY = ((t * 0.4) % (H + 60)) - 30
      const sg = ctx.createLinearGradient(0, scanY - 2, 0, scanY + 2)
      sg.addColorStop(0, 'rgba(201,240,40,0)')
      sg.addColorStop(0.5, 'rgba(201,240,40,0.06)')
      sg.addColorStop(1, 'rgba(201,240,40,0)')
      ctx.fillStyle = sg
      ctx.fillRect(0, scanY - 2, W, 4)

      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />
}

type Tab = 'email' | 'wallet'

export default function Login() {
  const [tab, setTab] = useState<Tab>('email')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState<string | null>(null)
  const { loginWithEmail, loginWithMetaMask, loginWithPhantom, error, clearError } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard'

  const handleEmail = async (e: FormEvent) => {
    e.preventDefault(); clearError(); setLoading('email')
    try { await loginWithEmail(email, password); navigate(from, { replace: true }) }
    catch { /* shown via AuthContext */ } finally { setLoading(null) }
  }
  const handleMetaMask = async () => {
    clearError(); setLoading('metamask')
    try { await loginWithMetaMask(); navigate(from, { replace: true }) }
    catch { } finally { setLoading(null) }
  }
  const handlePhantom = async () => {
    clearError(); setLoading('phantom')
    try { await loginWithPhantom(); navigate(from, { replace: true }) }
    catch { } finally { setLoading(null) }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-16 px-4 relative overflow-hidden bg-[#050508]">
      {/* Market data rain background */}
      <MarketDataCanvas />
      {/* Dark gradient overlay so the card is legible */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(5,5,8,0.82) 30%, rgba(5,5,8,0.95) 100%)' }} />
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-5">
            <Logo size="md" linkTo="/" />
          </div>
          <h1 className="text-2xl font-bold text-[#f0f0f8] mb-1.5">Welcome back</h1>
          <p className="text-sm text-[#8888a8]">Sign in to access your command center</p>
        </div>

        {/* Card */}
        <div className="glass rounded-2xl p-7 border border-white/8 shadow-2xl">

          {/* Tabs */}
          <div className="flex rounded-xl p-1 bg-white/4 mb-6">
            {(['email', 'wallet'] as Tab[]).map(t => (
              <button key={t} onClick={() => { setTab(t); clearError() }}
                className="flex-1 relative flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all"
                style={{ color: tab === t ? '#f0f0f8' : '#8888a8' }}>
                {tab === t && (
                  <motion.div layoutId="login-tab"
                    className="absolute inset-0 bg-[#111118] rounded-lg shadow-sm"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {t === 'email' ? <Mail size={15} /> : <Wallet size={15} />}
                  {t === 'email' ? 'Email' : 'Wallet'}
                </span>
              </button>
            ))}
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="flex items-start gap-2.5 bg-red-500/8 border border-red-500/20 rounded-xl px-4 py-3">
                <AlertCircle size={15} className="text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-red-400 leading-relaxed">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {tab === 'email' ? (
              <motion.form key="email" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }} transition={{ duration: 0.2 }} onSubmit={handleEmail} className="space-y-4">
                <div>
                  <label className="block text-xs text-[#55556a] mb-1.5 font-medium uppercase tracking-wider">Email</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                    placeholder="you@example.com" className="input-field" autoComplete="email" />
                </div>
                <div>
                  <label className="block text-xs text-[#55556a] mb-1.5 font-medium uppercase tracking-wider">Password</label>
                  <div className="relative">
                    <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                      required placeholder="••••••••" className="input-field pr-11" autoComplete="current-password" />
                    <button type="button" onClick={() => setShowPw(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#55556a] hover:text-[#f0f0f8] transition-colors">
                      {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <motion.button type="submit" disabled={!!loading} whileTap={{ scale: 0.98 }}
                  className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 mt-2 disabled:opacity-60 disabled:cursor-not-allowed">
                  {loading === 'email'
                    ? <div className="w-4 h-4 border-2 border-[#050508]/40 border-t-[#050508] rounded-full spinner" />
                    : <><span>Sign In</span><ArrowRight size={16} /></>}
                </motion.button>
              </motion.form>
            ) : (
              <motion.div key="wallet" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2 }} className="space-y-3">

                {/* MetaMask */}
                <motion.button onClick={handleMetaMask} disabled={!!loading} whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-3 p-4 rounded-xl border border-white/8 bg-white/2 hover:bg-white/4 hover:border-[#f6851b]/30 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-[#f6851b]/10 flex items-center justify-center flex-shrink-0">
                    <MetaMaskIcon size={28} />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-semibold text-[#f0f0f8] group-hover:text-[#f6851b] transition-colors">MetaMask</div>
                    <div className="text-xs text-[#55556a]">Ethereum wallet</div>
                  </div>
                  {loading === 'metamask'
                    ? <div className="w-4 h-4 border-2 border-[#f6851b]/40 border-t-[#f6851b] rounded-full spinner" />
                    : <ArrowRight size={15} className="text-[#55556a] group-hover:text-[#f6851b] transition-colors" />}
                </motion.button>

                {/* Phantom */}
                <motion.button onClick={handlePhantom} disabled={!!loading} whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-3 p-4 rounded-xl border border-white/8 bg-white/2 hover:bg-white/4 hover:border-[#ab9ff2]/30 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-[#ab9ff2]/10 flex items-center justify-center flex-shrink-0">
                    <PhantomIcon size={28} />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-semibold text-[#f0f0f8] group-hover:text-[#ab9ff2] transition-colors">Phantom</div>
                    <div className="text-xs text-[#55556a]">Solana wallet</div>
                  </div>
                  {loading === 'phantom'
                    ? <div className="w-4 h-4 border-2 border-[#ab9ff2]/40 border-t-[#ab9ff2] rounded-full spinner" />
                    : <ArrowRight size={15} className="text-[#55556a] group-hover:text-[#ab9ff2] transition-colors" />}
                </motion.button>

                <p className="text-[11px] text-[#55556a] text-center pt-1 leading-relaxed">
                  Sign a one-time auth message. No transaction submitted.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Trust row */}
        <div className="flex items-center justify-center gap-6 mt-5">
          <div className="flex items-center gap-1.5 text-xs text-[#55556a]">
            <Shield size={12} className="text-[#C9F028]" /> Non-custodial
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#55556a]">
            <Zap size={12} className="text-[#C9F028]" /> Instant access
          </div>
        </div>

        <p className="text-center text-xs text-[#55556a] mt-4">
          By signing in you agree to our{' '}
          <Link to="/cookies" className="text-[#8888a8] hover:text-[#C9F028] transition-colors underline underline-offset-2">Cookie Policy</Link>.{' '}
          New?{' '}
          <Link to="/how-to" className="text-[#8888a8] hover:text-[#C9F028] transition-colors underline underline-offset-2">Read the guide</Link>.
        </p>
      </motion.div>
    </div>
  )
}
