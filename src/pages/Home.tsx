import { Helmet } from 'react-helmet-async'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, Zap, Shield, Terminal, Globe, ChevronRight, Cpu,
  BarChart3, Activity, RefreshCw, BookOpen, TrendingUp, TrendingDown,
} from 'lucide-react'

/* ─── Candlestick Chart Background ──────────────────────────────────────
   A live-scrolling OHLC candlestick chart with EMA line, volume bars,
   a scanning beam and price labels, directly themed to HOODSCAN's
   core purpose: AI-native trading intelligence.
────────────────────────────────────────────────────────────────────── */
type Candle = { open: number; high: number; low: number; close: number; vol: number }

function genCandles(n: number, start = 210): Candle[] {
  const out: Candle[] = []
  let p = start
  for (let i = 0; i < n; i++) {
    const drift = (Math.random() - 0.47) * p * 0.018
    const o = p
    const c = p + drift
    const swing = Math.abs(drift) * (0.4 + Math.random() * 1.2)
    const h = Math.max(o, c) + swing * Math.random()
    const l = Math.min(o, c) - swing * Math.random()
    out.push({ open: o, high: h, low: l, close: c, vol: 0.2 + Math.random() * 0.8 })
    p = c
  }
  return out
}

function ema(vals: number[], k: number): number[] {
  const m = 2 / (k + 1)
  const r = [vals[0]]
  for (let i = 1; i < vals.length; i++) r.push(vals[i] * m + r[i - 1] * (1 - m))
  return r
}

function CandlestickCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    let W = (canvas.width = canvas.offsetWidth)
    let H = (canvas.height = canvas.offsetHeight)
    let raf = 0
    let t = 0

    // Generate 280 candles; we show a sliding window
    const ALL = genCandles(280)
    let offset = 0
    const VISIBLE = 70
    const CHART_H = H * 0.72
    const VOL_H = H * 0.12
    const CHART_TOP = H * 0.08

    const resize = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight }
    window.addEventListener('resize', resize)

    let beamX = W * 0.6
    let beamDir = -0.4

    const draw = () => {
      t++
      if (t % 4 === 0) {
        offset = Math.min(offset + 0.05, ALL.length - VISIBLE - 1)
        if (offset >= ALL.length - VISIBLE - 2) offset = 0
      }

      ctx.clearRect(0, 0, W, H)
      const start = Math.floor(offset)
      const visible = ALL.slice(start, start + VISIBLE)
      if (visible.length < 2) return

      const candleW = W / VISIBLE
      const bodyW = Math.max(2, candleW * 0.55)
      let minP = Math.min(...visible.map(c => c.low))
      let maxP = Math.max(...visible.map(c => c.high))
      const pad = (maxP - minP) * 0.1
      minP -= pad; maxP += pad
      const priceRange = maxP - minP
      const toY = (p: number) => CHART_TOP + (1 - (p - minP) / priceRange) * CHART_H

      const gridSteps = 5
      ctx.setLineDash([4, 8]); ctx.lineWidth = 0.5
      for (let g = 0; g <= gridSteps; g++) {
        const y = CHART_TOP + (g / gridSteps) * CHART_H
        const price = maxP - (g / gridSteps) * priceRange
        ctx.strokeStyle = 'rgba(255,255,255,0.04)'
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
        ctx.fillStyle = 'rgba(255,255,255,0.12)'
        ctx.font = `10px 'JetBrains Mono', monospace`
        ctx.textAlign = 'right'
        ctx.fillText(`$${price.toFixed(2)}`, W - 6, y - 3)
      }
      ctx.setLineDash([])

      const closes = visible.map(c => c.close)
      const emaVals = ema(closes, Math.min(20, closes.length))
      ctx.beginPath(); ctx.strokeStyle = 'rgba(123,97,255,0.35)'; ctx.lineWidth = 1.2
      emaVals.forEach((v, i) => { const x = i * candleW + candleW / 2; const y = toY(v); i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y) })
      ctx.stroke()

      const ema7 = ema(closes, Math.min(7, closes.length))
      ctx.beginPath(); ctx.strokeStyle = 'rgba(0,212,255,0.25)'; ctx.lineWidth = 0.8
      ema7.forEach((v, i) => { const x = i * candleW + candleW / 2; const y = toY(v); i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y) })
      ctx.stroke()

      visible.forEach((c, i) => {
        const x = i * candleW + candleW / 2
        const up = c.close >= c.open
        const bodyTop = toY(Math.max(c.open, c.close))
        const bodyBot = toY(Math.min(c.open, c.close))
        const bodyH = Math.max(1, bodyBot - bodyTop)
        const col = up ? 'rgba(201,240,40,' : 'rgba(239,68,68,'
        ctx.strokeStyle = up ? 'rgba(201,240,40,0.45)' : 'rgba(239,68,68,0.38)'; ctx.lineWidth = 0.8
        ctx.beginPath(); ctx.moveTo(x, toY(c.high)); ctx.lineTo(x, toY(c.low)); ctx.stroke()
        ctx.fillStyle = up ? col + '0.18)' : col + '0.14)'
        ctx.strokeStyle = up ? col + '0.55)' : col + '0.45)'; ctx.lineWidth = 0.8
        ctx.fillRect(x - bodyW / 2, bodyTop, bodyW, bodyH)
        ctx.strokeRect(x - bodyW / 2, bodyTop, bodyW, bodyH)
        const volBase = CHART_TOP + CHART_H + 8
        const volTop = volBase + (1 - c.vol) * VOL_H
        ctx.fillStyle = up ? 'rgba(201,240,40,0.12)' : 'rgba(239,68,68,0.10)'
        ctx.fillRect(x - bodyW / 2, volTop, bodyW, volBase + VOL_H - volTop)
      })

      const last = visible[visible.length - 1]
      if (last && t % 60 < 40) {
        const x = (VISIBLE - 1) * candleW + candleW / 2
        ctx.strokeStyle = 'rgba(201,240,40,0.8)'; ctx.lineWidth = 1; ctx.setLineDash([2, 2])
        ctx.beginPath(); ctx.moveTo(x, toY(last.high)); ctx.lineTo(x, toY(last.low)); ctx.stroke()
        ctx.setLineDash([])
      }

      beamX += beamDir
      if (beamX < W * 0.05 || beamX > W * 0.95) beamDir *= -1
      const grad = ctx.createLinearGradient(beamX - 40, 0, beamX + 40, 0)
      grad.addColorStop(0, 'rgba(201,240,40,0)'); grad.addColorStop(0.5, 'rgba(201,240,40,0.04)'); grad.addColorStop(1, 'rgba(201,240,40,0)')
      ctx.fillStyle = grad; ctx.fillRect(beamX - 40, CHART_TOP, 80, CHART_H + VOL_H + 8)
      ctx.strokeStyle = 'rgba(201,240,40,0.12)'; ctx.lineWidth = 1
      ctx.beginPath(); ctx.moveTo(beamX, CHART_TOP); ctx.lineTo(beamX, CHART_TOP + CHART_H); ctx.stroke()

      const beamIdx = Math.round((beamX / W) * VISIBLE)
      if (beamIdx >= 0 && beamIdx < visible.length) {
        const bCandle = visible[beamIdx]
        ctx.fillStyle = 'rgba(201,240,40,0.7)'; ctx.font = `bold 10px 'JetBrains Mono', monospace`; ctx.textAlign = 'left'
        ctx.fillText(`$${bCandle.close.toFixed(2)}`, beamX + 5, toY(bCandle.close) - 12)
      }

      ctx.fillStyle = 'rgba(255,255,255,0.06)'; ctx.font = `10px 'JetBrains Mono', monospace`; ctx.textAlign = 'left'
      ctx.fillText('HOODSCAN · DEMO FEED · 1m', 12, CHART_TOP + CHART_H + VOL_H + 18)

      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.85 }} />
}

/* ─── Typewriter ──────────────────────────────────────────────────────── */
function useTypewriter(words: string[], speed = 72, pause = 2000) {
  const [display, setDisplay] = useState('')
  const [wi, setWi] = useState(0)
  const [ci, setCi] = useState(0)
  const [del, setDel] = useState(false)

  useEffect(() => {
    const cur = words[wi]
    const id = setTimeout(() => {
      if (!del) {
        if (ci < cur.length) { setDisplay(cur.slice(0, ci + 1)); setCi(c => c + 1) }
        else setTimeout(() => setDel(true), pause)
      } else {
        if (ci > 0) { setDisplay(cur.slice(0, ci - 1)); setCi(c => c - 1) }
        else { setDel(false); setWi(i => (i + 1) % words.length) }
      }
    }, del ? speed / 2 : speed)
    return () => clearTimeout(id)
  }, [ci, del, wi, words, speed, pause])

  return display
}

/* ─── Animated Counter ────────────────────────────────────────────────── */
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      obs.disconnect()
      let v = 0; const step = to / 60
      const id = setInterval(() => { v = Math.min(v + step, to); setN(Math.floor(v)); if (v >= to) clearInterval(id) }, 16)
    })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [to])
  return <span ref={ref}>{n}{suffix}</span>
}

/* ─── Terminal Demo ─────────────────────────────────────────────────── */
const LINES = [
  { t: '$ hoodscan login --agent claude-code', c: '#C9F028' },
  { t: '  ✓ Robinhood session authenticated', c: '#55556a' },
  { t: '  ✓ 50 MCP tools registered', c: '#C9F028' },
  { t: '', c: '' },
  { t: '> robinhood_get_portfolio()', c: '#f0f0f8' },
  { t: '  { equity: "$124,832.40", day_pnl: "+$2,341.12" }', c: '#7b61ff' },
  { t: '> robinhood_scan_options("AAPL", expiry:"2025-08")', c: '#f0f0f8' },
  { t: '  Scanning 847 contracts...', c: '#55556a' },
  { t: '  Top call: AAPL $225 Aug15 @ $3.40  IV:34.2%', c: '#7b61ff' },
  { t: '  Delta neutral ratio: 1.2 call / 1.0 put ✓', c: '#C9F028' },
]

function TerminalDemo() {
  const [n, setN] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      obs.disconnect()
      let i = 0
      const id = setInterval(() => { i++; setN(i); if (i >= LINES.length) clearInterval(id) }, 310)
      return () => clearInterval(id)
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className="glass rounded-2xl overflow-hidden border border-white/8 shadow-2xl">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/40" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
          <div className="w-3 h-3 rounded-full bg-[#C9F028]/40" />
        </div>
        <span className="ml-2 text-xs font-mono text-[#55556a]">hoodscan · agent session</span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#C9F028] pulse-dot" />
          <span className="text-[10px] font-mono text-[#C9F028]">LIVE</span>
        </div>
      </div>
      <div className="p-5 font-mono text-sm leading-7 min-h-[260px]">
        {LINES.slice(0, n).map((l, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.15 }} style={{ color: l.c || 'transparent' }}>
            {l.t || '\u00A0'}
          </motion.div>
        ))}
        {n < LINES.length && <span className="text-[#C9F028] cursor-blink">_</span>}
      </div>
    </div>
  )
}

/* ─── Inline Product Preview ────────────────────────────────────────── */
type ScanSignal = 'BUY' | 'SELL' | 'HOLD' | 'WATCH'

const SCAN_BASE = [
  { ticker: 'NVDA', price: 891.20, changePct:  2.11, signal: 'BUY'  as ScanSignal },
  { ticker: 'AAPL', price: 217.40, changePct:  1.21, signal: 'HOLD' as ScanSignal },
  { ticker: 'PLTR', price:  28.44, changePct:  8.72, signal: 'BUY'  as ScanSignal },
  { ticker: 'TSLA', price: 237.80, changePct: -3.33, signal: 'WATCH' as ScanSignal },
  { ticker: 'SMCI', price: 912.40, changePct: 16.53, signal: 'BUY'  as ScanSignal },
  { ticker: 'INTC', price:  28.14, changePct: -5.82, signal: 'SELL' as ScanSignal },
  { ticker: 'META', price: 592.10, changePct:  1.09, signal: 'HOLD' as ScanSignal },
  { ticker: 'AMD',  price: 178.40, changePct: -1.71, signal: 'WATCH' as ScanSignal },
]

const SIG: Record<ScanSignal, string> = {
  BUY:   'bg-[#C9F028]/12 text-[#C9F028] border-[#C9F028]/25',
  HOLD:  'bg-white/5 text-[#8888a8] border-white/10',
  WATCH: 'bg-[#f97316]/10 text-[#f97316] border-[#f97316]/25',
  SELL:  'bg-red-500/10 text-red-400 border-red-500/25',
}

type ScanRow = typeof SCAN_BASE[0] & { updated: boolean }

function LiveScannerPreview() {
  const [rows, setRows] = useState<ScanRow[]>(SCAN_BASE.map(r => ({ ...r, updated: false })))

  useEffect(() => {
    const id = setInterval(() => {
      setRows(prev => prev.map(row => {
        if (Math.random() > 0.35) return { ...row, updated: false }
        const delta = (Math.random() - 0.48) * row.price * 0.004
        return { ...row, price: Math.max(0.01, row.price + delta), changePct: row.changePct + (Math.random() - 0.5) * 0.3, updated: true }
      }))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="overflow-hidden rounded-xl border border-white/8">
      <div className="grid grid-cols-4 px-4 py-2 border-b border-white/5 bg-white/2">
        {['Ticker', 'Price', 'Change', 'Signal'].map(h => (
          <span key={h} className="text-[10px] font-semibold uppercase tracking-widest text-[#55556a]">{h}</span>
        ))}
      </div>
      <div className="divide-y divide-white/4">
        {rows.map(row => {
          const up = row.changePct >= 0
          return (
            <motion.div
              key={row.ticker}
              animate={row.updated ? { backgroundColor: ['rgba(201,240,40,0.04)', 'rgba(0,0,0,0)'] } : {}}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-4 px-4 py-2.5 items-center"
            >
              <span className="text-sm font-mono font-bold text-[#f0f0f8]">{row.ticker}</span>
              <span className="text-sm font-mono text-[#f0f0f8]">${row.price.toFixed(2)}</span>
              <span className={`text-sm font-mono flex items-center gap-1 ${up ? 'text-[#C9F028]' : 'text-red-400'}`}>
                {up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                {up ? '+' : ''}{row.changePct.toFixed(2)}%
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border w-fit ${SIG[row.signal]}`}>{row.signal}</span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

const TOOL_CATS = [
  { id: 'portfolio', label: 'Portfolio', color: '#C9F028', icon: BarChart3, tools: ['get_portfolio', 'get_positions', 'get_cash', 'get_total_return', 'get_portfolio_history', 'get_dividends', 'get_watchlist', 'add_to_watchlist', 'get_position'] },
  { id: 'market',    label: 'Market',    color: '#00d4ff', icon: Globe,     tools: ['get_quote', 'get_quotes', 'search_stocks', 'get_fundamentals', 'get_news', 'get_top_movers', 'get_market_hours', 'get_sector_performance', 'get_earnings_calendar'] },
  { id: 'orders',    label: 'Orders',    color: '#7b61ff', icon: Zap,       tools: ['place_buy_order', 'place_sell_order', 'cancel_order', 'get_order_history', 'get_open_orders'] },
  { id: 'options',   label: 'Options',   color: '#f97316', icon: Activity,  tools: ['get_options_chain', 'get_options_positions', 'place_options_order', 'get_implied_volatility'] },
  { id: 'crypto',    label: 'Crypto',    color: '#a78bfa', icon: RefreshCw, tools: ['get_crypto_quote', 'buy_crypto', 'sell_crypto', 'get_crypto_positions'] },
  { id: 'data',      label: 'Data',      color: '#34d399', icon: BookOpen,  tools: ['get_historical_data', 'get_technical_indicators', 'get_analyst_ratings', 'get_institutional_holdings', 'get_short_interest', 'get_insider_trades'] },
  { id: 'account',   label: 'Account',   color: '#f43f5e', icon: Shield,    tools: ['get_account_info', 'get_tax_documents', 'get_notifications', 'get_transfer_history'] },
]

function ToolBrowserPreview() {
  const [active, setActive] = useState(0)
  const cat = TOOL_CATS[active]

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1.5">
        {TOOL_CATS.map((c, i) => {
          const Icon = c.icon
          return (
            <button
              key={c.id}
              onClick={() => setActive(i)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all"
              style={active === i
                ? { background: `${c.color}15`, borderColor: `${c.color}40`, color: c.color }
                : { background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)', color: '#55556a' }
              }
            >
              <Icon size={11} />
              {c.label}
            </button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={cat.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.15 }}
          className="rounded-xl border border-white/8 overflow-hidden"
        >
          <div className="px-3 py-2 border-b border-white/5 bg-white/2 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: cat.color }} />
            <span className="text-[10px] font-mono text-[#55556a]">{cat.tools.length} tools in {cat.label}</span>
          </div>
          <div className="divide-y divide-white/4">
            {cat.tools.slice(0, 5).map(name => (
              <div key={name} className="px-3 py-2 flex items-center gap-2 hover:bg-white/2 transition-colors">
                <code className="text-xs font-mono" style={{ color: cat.color }}>{name}</code>
              </div>
            ))}
            {cat.tools.length > 5 && (
              <div className="px-3 py-2">
                <span className="text-[10px] text-[#55556a] font-mono">+{cat.tools.length - 5} more</span>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function ProductPreview() {
  const [tab, setTab] = useState<'scanner' | 'tools' | 'terminal'>('scanner')

  const TABS = [
    { id: 'scanner',  label: 'Live Scanner' },
    { id: 'tools',    label: 'MCP Tools' },
    { id: 'terminal', label: 'Agent Terminal' },
  ] as const

  return (
    <div className="glass rounded-2xl border border-white/8 overflow-hidden">
      {/* Tab bar */}
      <div className="flex items-center border-b border-white/8 bg-white/2 px-4 gap-0">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`py-3 px-4 text-xs font-medium border-b-2 transition-all ${
              tab === t.id
                ? 'border-[#C9F028] text-[#C9F028]'
                : 'border-transparent text-[#55556a] hover:text-[#8888a8]'
            }`}
          >
            {t.label}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-1.5 pr-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9F028] pulse-dot" />
          <span className="text-[10px] font-mono text-[#C9F028]">live</span>
        </div>
      </div>

      {/* Tab content */}
      <div className="p-4">
        <AnimatePresence mode="wait">
          {tab === 'scanner' && (
            <motion.div key="scanner" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              <LiveScannerPreview />
            </motion.div>
          )}
          {tab === 'tools' && (
            <motion.div key="tools" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              <ToolBrowserPreview />
            </motion.div>
          )}
          {tab === 'terminal' && (
            <motion.div key="terminal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              <TerminalDemo />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="px-4 pb-4 pt-0">
        <Link
          to="/demo"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-white/8 text-xs text-[#8888a8] hover:border-[#C9F028]/25 hover:text-[#C9F028] transition-all"
        >
          Open full interactive demo
          <ChevronRight size={13} />
        </Link>
      </div>
    </div>
  )
}

/* ─── Stats ───────────────────────────────────────────────────────────── */
const STATS = [
  { to: 50, suffix: '+', label: 'MCP Tools', Icon: Terminal },
  { to: 70, suffix: '+', label: 'Async Methods', Icon: Zap },
  { to: 4,  suffix: '',  label: 'AI Platforms', Icon: Cpu },
  { to: 0,  suffix: 'ms', label: 'Auth Delay',  Icon: Shield },
]

/* ─── Main ─────────────────────────────────────────────────────────────  */
export default function Home() {
  const words = ['Trade autonomously.', 'Scan options chains.', 'Manage portfolios.', 'Build alpha.']
  const typed = useTypewriter(words)
  const heroRef = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 600], [0, -70])

  return (
    <>
      <Helmet>
        <title>HOODSCAN - AI-Native Trading Intelligence</title>
        <meta name="description" content="HOODSCAN: 50+ MCP tools for autonomous AI agents to trade, scan markets, and manage portfolios on Robinhood. Real-time market scanning and wallet-native authentication." />
        <link rel="canonical" href="https://hoodscan.world/" />
        <meta property="og:title" content="HOODSCAN - AI-Native Trading Intelligence" />
        <meta property="og:description" content="HOODSCAN: 50+ MCP tools for autonomous AI agents to trade, scan markets, and manage portfolios on Robinhood. Real-time market scanning and wallet-native authentication." />
        <meta property="og:url" content="https://hoodscan.world/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://hoodscan.world/og-image.png" />
      </Helmet>
      <div className="relative">

      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden" ref={heroRef}>
        {/* Live candlestick chart, pointer-events-none, no interaction blocking */}
        <CandlestickCanvas />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 80% at 30% 50%, rgba(5,5,8,0.55) 0%, rgba(5,5,8,0.88) 100%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #050508)' }} />

        <motion.div style={{ y: heroY }} className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* Left */}
            <div>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 glass-green rounded-full px-4 py-1.5 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9F028] pulse-dot" />
                <span className="text-xs font-mono text-[#C9F028]">AI-Native Trading Layer · v2.0</span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
                className="text-5xl sm:text-6xl font-bold text-[#f0f0f8] leading-[1.08] mb-6">
                Give your agent<br />
                <span className="gradient-text-green">market superpowers.</span>
              </motion.h1>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="h-9 mb-6">
                <span className="text-xl text-[#8888a8] font-mono">
                  {typed}<span className="text-[#C9F028] cursor-blink">|</span>
                </span>
              </motion.div>

              <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="text-[#8888a8] text-base leading-relaxed mb-10 max-w-md">
                HOODSCAN connects any MCP-compatible AI agent directly to Robinhood: 50+ typed tools, real-time market data, options intelligence, and self-renewing auth. One install. Every agent.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4">
                <Link to="/login" className="btn-primary flex items-center justify-center gap-2 text-base py-3.5 px-8 group">
                  Launch App
                  <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/how-to" className="btn-secondary flex items-center justify-center gap-2 text-base py-3.5 px-8">
                  Read the Docs
                  <ChevronRight size={16} />
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
                className="flex items-center gap-6 mt-10">
                {[{ Icon: Shield, label: 'MIT Licensed' }, { Icon: Zap, label: 'Zero Auth Delay' }, { Icon: Globe, label: 'Open Source' }].map(({ Icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <Icon size={13} className="text-[#C9F028]" />
                    <span className="text-xs text-[#55556a]">{label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: Terminal */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.7 }}>
              <TerminalDemo />
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-[#C9F028]/60" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-14 relative border-y border-white/4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map(({ to, suffix, label, Icon }, i) => (
              <motion.div key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="glass rounded-xl px-5 py-4 border border-white/5 flex items-center gap-4">
                <div className="w-9 h-9 rounded-lg bg-[#C9F028]/8 flex items-center justify-center flex-shrink-0">
                  <Icon size={17} className="text-[#C9F028]" />
                </div>
                <div>
                  <div className="text-2xl font-bold gradient-text-green font-mono leading-none">
                    <Counter to={to} suffix={suffix} />
                  </div>
                  <div className="text-xs text-[#55556a] mt-0.5">{label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Preview */}
      <section className="py-20 relative">
        <div className="absolute inset-0 grid-pattern opacity-15 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-10">
            <div className="inline-flex items-center gap-2 glass-green rounded-full px-4 py-1.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9F028] pulse-dot" />
              <span className="text-xs font-mono text-[#C9F028]">Live product</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#f0f0f8] mb-3">
              See it in action
            </h2>
            <p className="text-[#8888a8] max-w-md mx-auto text-sm">
              Real-time market scanner, full MCP tool browser, and live agent terminal. No login required.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <ProductPreview />
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#C9F028]/2 to-transparent pointer-events-none" />
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="relative max-w-2xl mx-auto px-4 text-center">
          <div className="glass rounded-3xl p-10 border border-[#C9F028]/12">
            <div className="inline-flex items-center gap-2 glass-green rounded-full px-3 py-1 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9F028] pulse-dot" />
              <span className="text-[11px] font-mono text-[#C9F028]">Open Source · MIT License</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#f0f0f8] mb-3">
              Ready to give your agent an edge?
            </h2>
            <p className="text-[#8888a8] mb-8 text-sm leading-relaxed max-w-md mx-auto">
              Connect your wallet and get 50+ live MCP tools on first run.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/login" className="btn-primary flex items-center justify-center gap-2 text-base py-3.5 px-8 group">
                Launch App
                <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="https://github.com/hoodscanworld/hoodscanworld.github.io" target="_blank" rel="noopener noreferrer"
                className="btn-secondary flex items-center justify-center gap-2 text-base py-3.5 px-8">
                View on GitHub
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      </div>
    </>
  )
}
