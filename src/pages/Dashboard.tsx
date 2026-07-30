import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TrendingUp, TrendingDown, Terminal, BarChart3, RefreshCw,
  Zap, Shield, LogOut, ChevronRight, Activity, DollarSign,
  Search, Cpu,
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

/* ─── Sparkline ──────────────────────────────────────────────────────── */
function Sparkline({ data, up, width = 80, height = 32 }: { data: number[]; up: boolean; width?: number; height?: number }) {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * width,
    height - ((v - min) / range) * height,
  ])
  const path = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
  const fillPath = `${path} L${width},${height} L0,${height} Z`
  const color = up ? '#C9F028' : '#ef4444'

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
      <path d={fillPath} fill={`url(#spark-${up ? 'up' : 'dn'})`} opacity="0.2" />
      <path d={path} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <linearGradient id="spark-up" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C9F028" />
          <stop offset="100%" stopColor="#C9F028" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="spark-dn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}

/* ─── Portfolio chart ───────────────────────────────────────────────── */
const CHART_DATA = [
  112400, 114200, 113800, 116500, 118200, 116800, 120100,
  119300, 121800, 120500, 122400, 121700, 124832,
]

function PortfolioChart() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)
  const W = 600, H = 120
  const min = Math.min(...CHART_DATA)
  const max = Math.max(...CHART_DATA)
  const range = max - min

  const pts = CHART_DATA.map((v, i) => [
    (i / (CHART_DATA.length - 1)) * W,
    H - ((v - min) / range) * (H - 16) - 8,
  ])
  const linePath = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
  const fillPath = `${linePath} L${W},${H} L0,${H} Z`

  return (
    <div className="relative w-full" style={{ aspectRatio: '600/120' }}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-full"
        onMouseLeave={() => setHoverIdx(null)}
      >
        <defs>
          <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C9F028" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#C9F028" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={fillPath} fill="url(#chartFill)" />
        <path d={linePath} stroke="#C9F028" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />

        {/* Hover dots */}
        {pts.map(([x, y], i) => (
          <circle
            key={i}
            cx={x} cy={y} r="14"
            fill="transparent"
            onMouseEnter={() => setHoverIdx(i)}
          />
        ))}
        {hoverIdx !== null && (
          <>
            <line
              x1={pts[hoverIdx][0]} y1="0"
              x2={pts[hoverIdx][0]} y2={H}
              stroke="rgba(201,240,40,0.2)" strokeWidth="1" strokeDasharray="3,3"
            />
            <circle cx={pts[hoverIdx][0]} cy={pts[hoverIdx][1]} r="4" fill="#C9F028" />
          </>
        )}
      </svg>
      {hoverIdx !== null && (
        <div
          className="absolute pointer-events-none glass px-2.5 py-1.5 rounded-lg text-xs font-mono text-[#C9F028] border border-[#C9F028]/20"
          style={{
            left: `${(pts[hoverIdx][0] / W) * 100}%`,
            top: `${(pts[hoverIdx][1] / H) * 100}%`,
            transform: 'translate(-50%, -130%)',
          }}
        >
          ${CHART_DATA[hoverIdx].toLocaleString()}
        </div>
      )}
    </div>
  )
}

/* ─── Data ────────────────────────────────────────────────────────────  */
const PORTFOLIO = {
  equity: '$124,832.40',
  dayPnl: '+$2,341.12',
  dayPct: '+1.91%',
  totalPnl: '+$18,432.40',
  totalPct: '+17.3%',
}

const POSITIONS = [
  { ticker: 'AAPL', shares: 42, price: '$224.50', value: '$9,429', pnl: '+$842', pct: '+9.8%', up: true, spark: [145, 148, 152, 149, 155, 158, 162, 160, 165, 168, 170, 172, 175] },
  { ticker: 'NVDA', shares: 15, price: '$131.20', value: '$1,968', pnl: '+$324', pct: '+19.7%', up: true, spark: [88, 92, 91, 95, 98, 103, 108, 112, 118, 124, 128, 130, 131] },
  { ticker: 'TSLA', shares: 28, price: '$182.40', value: '$5,107', pnl: '-$203', pct: '-3.8%', up: false, spark: [195, 192, 188, 190, 186, 184, 183, 185, 183, 181, 182, 183, 182] },
  { ticker: 'MSFT', shares: 20, price: '$415.80', value: '$8,316', pnl: '+$1,116', pct: '+15.5%', up: true, spark: [350, 355, 362, 368, 374, 378, 382, 386, 390, 398, 405, 411, 415] },
  { ticker: 'AMZN', shares: 35, price: '$214.30', value: '$7,500', pnl: '+$620', pct: '+9.0%', up: true, spark: [192, 195, 198, 200, 202, 204, 205, 207, 208, 210, 211, 213, 214] },
]

const MCP_TOOLS = [
  { name: 'robinhood_get_portfolio', calls: 142, status: 'ready' },
  { name: 'robinhood_place_order', calls: 38, status: 'ready' },
  { name: 'robinhood_scan_options', calls: 91, status: 'ready' },
  { name: 'robinhood_get_quote', calls: 2841, status: 'ready' },
  { name: 'robinhood_get_positions', calls: 204, status: 'ready' },
  { name: 'robinhood_cancel_order', calls: 12, status: 'ready' },
  { name: 'robinhood_stream_quotes', calls: 503, status: 'ready' },
  { name: 'robinhood_get_account', calls: 89, status: 'ready' },
]

const AGENT_LOG = [
  { ts: '14:32:01', level: 'info', msg: 'Session token refreshed (proactive)' },
  { ts: '14:31:55', level: 'exec', msg: 'robinhood_get_quote("NVDA") → $131.20' },
  { ts: '14:31:42', level: 'exec', msg: 'robinhood_scan_options("AAPL", expiry: "2025-08")' },
  { ts: '14:31:38', level: 'info', msg: '847 option contracts loaded' },
  { ts: '14:30:12', level: 'exec', msg: 'robinhood_get_portfolio() → equity: $124,832.40' },
  { ts: '14:29:55', level: 'info', msg: 'Agent session initialized via MetaMask' },
  { ts: '14:29:42', level: 'info', msg: 'MCP server connected — 50 tools active' },
]

type Tab = 'portfolio' | 'tools' | 'terminal'

/* ─── Main ─────────────────────────────────────────────────────────── */
export default function Dashboard() {
  const [tab, setTab] = useState<Tab>('portfolio')
  const [scanTicker, setScanTicker] = useState('')
  const [scanResult, setScanResult] = useState<string | null>(null)
  const [scanning, setScanning] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [toolFilter, setToolFilter] = useState('')
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!scanTicker.trim()) return
    setScanning(true)
    setScanResult(null)
    await new Promise(r => setTimeout(r, 1200))
    const t = scanTicker.toUpperCase()
    setScanResult(
      `> robinhood_scan_options("${t}", expiry: "2025-08")\n` +
      `  Scanning ${Math.floor(Math.random() * 600 + 400)} contracts...\n` +
      `  Top call: ${t} $${(Math.random() * 20 + 180).toFixed(0)} Aug 15 @ $3.40 (IV: 34.2%)\n` +
      `  Top put:  ${t} $${(Math.random() * 10 + 160).toFixed(0)} Aug 15 @ $2.10 (IV: 31.8%)\n` +
      `  Delta neutral suggested: ratio 1.2 call / 1.0 put\n` +
      `  Session: valid for 3h 42m`
    )
    setScanning(false)
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await new Promise(r => setTimeout(r, 900))
    setRefreshing(false)
  }

  const handleLogout = () => { logout(); navigate('/') }
  const walletIcon = user?.walletType === 'metamask' ? '🦊' : user?.walletType === 'phantom' ? '👻' : '✉️'

  const TABS: { id: Tab; label: string; Icon: typeof BarChart3 }[] = [
    { id: 'portfolio', label: 'Portfolio', Icon: BarChart3 },
    { id: 'tools', label: 'MCP Tools', Icon: Cpu },
    { id: 'terminal', label: 'Agent Log', Icon: Terminal },
  ]

  return (
    <div className="min-h-screen pt-16 pb-16 relative">
      <div className="absolute inset-0 grid-pattern opacity-25 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] rounded-full bg-[#C9F028] opacity-[0.018] blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#C9F028] pulse-dot" />
              <span className="text-xs font-mono text-[#C9F028]">LIVE SESSION</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#f0f0f8]">Command Center</h1>
            <p className="text-sm text-[#55556a] mt-0.5">
              {walletIcon} Connected as{' '}
              <span className="font-mono text-[#8888a8]">{user?.displayName}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="glass rounded-lg px-3 py-2 flex items-center gap-2">
              <Shield size={14} className="text-[#C9F028]" />
              <span className="text-xs text-[#8888a8] font-mono">50 tools active</span>
            </div>
            <motion.button
              onClick={handleRefresh}
              whileTap={{ scale: 0.93 }}
              className="glass rounded-lg p-2.5 border border-white/8 hover:border-white/15 transition-colors"
            >
              <RefreshCw size={15} className={`text-[#8888a8] ${refreshing ? 'spinner' : ''}`} />
            </motion.button>
            <button
              onClick={handleLogout}
              className="btn-secondary py-2 px-4 text-sm flex items-center gap-1.5"
            >
              <LogOut size={14} /> Sign out
            </button>
          </div>
        </motion.div>

        {/* Summary cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: 'Portfolio Value', value: PORTFOLIO.equity, Icon: DollarSign, color: '#C9F028', sub: null },
            { label: "Today's Gain", value: PORTFOLIO.dayPnl, Icon: TrendingUp, color: '#C9F028', sub: PORTFOLIO.dayPct },
            { label: 'Total Return', value: PORTFOLIO.totalPnl, Icon: BarChart3, color: '#7b61ff', sub: PORTFOLIO.totalPct },
            { label: 'MCP Tool Calls', value: '3,316', Icon: Activity, color: '#00d4ff', sub: 'today' },
          ].map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + i * 0.05 }}
              whileHover={{ y: -2 }}
              className="glass rounded-xl p-4 sm:p-5 border border-white/5"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-[#55556a] uppercase tracking-wider">{c.label}</span>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${c.color}12` }}>
                  <c.Icon size={14} style={{ color: c.color }} />
                </div>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-[#f0f0f8]">{c.value}</div>
              {c.sub && <div className="text-xs mt-1 font-mono" style={{ color: c.color }}>{c.sub}</div>}
            </motion.div>
          ))}
        </motion.div>

        {/* Portfolio chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass rounded-2xl p-6 border border-white/5 mb-6"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-sm font-semibold text-[#f0f0f8]">Portfolio Value</h2>
              <p className="text-xs text-[#55556a] mt-0.5">13-day performance</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#C9F028]">
              <TrendingUp size={13} />
              +11.1% period
            </div>
          </div>
          <PortfolioChart />
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1.5 mb-5">
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={{
                background: tab === id ? 'rgba(201,240,40,0.08)' : 'rgba(255,255,255,0.03)',
                color: tab === id ? '#C9F028' : '#55556a',
                border: `1px solid ${tab === id ? 'rgba(201,240,40,0.2)' : 'rgba(255,255,255,0.06)'}`,
              }}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {/* ── Portfolio tab ── */}
            {tab === 'portfolio' && (
              <div className="glass rounded-2xl overflow-hidden border border-white/5">
                <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-[#f0f0f8]">Open Positions</h2>
                  <span className="text-xs text-[#55556a] font-mono">{POSITIONS.length} holdings</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/5">
                        {['Ticker', 'Shares', 'Price', 'Value', 'P&L', '7d chart'].map(h => (
                          <th key={h} className="px-5 py-3 text-left text-[10px] uppercase tracking-wider text-[#55556a] font-medium">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {POSITIONS.map((p, i) => (
                        <motion.tr
                          key={p.ticker}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="border-b border-white/4 hover:bg-white/2 transition-colors"
                        >
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg bg-white/6 flex items-center justify-center text-xs font-bold text-[#f0f0f8]">
                                {p.ticker[0]}
                              </div>
                              <span className="font-mono font-semibold text-[#f0f0f8] text-sm">{p.ticker}</span>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-sm text-[#8888a8]">{p.shares}</td>
                          <td className="px-5 py-4 text-sm font-mono text-[#f0f0f8]">{p.price}</td>
                          <td className="px-5 py-4 text-sm font-mono text-[#f0f0f8]">{p.value}</td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-1.5">
                              {p.up ? <TrendingUp size={12} className="text-[#C9F028]" /> : <TrendingDown size={12} className="text-red-400" />}
                              <span className={`text-sm font-mono ${p.up ? 'text-[#C9F028]' : 'text-red-400'}`}>
                                {p.pnl} <span className="text-xs opacity-70">({p.pct})</span>
                              </span>
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <Sparkline data={p.spark} up={p.up} />
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── MCP Tools tab ── */}
            {tab === 'tools' && (
              <div className="space-y-4">
                {/* Options scanner */}
                <div className="glass rounded-2xl p-6 border border-white/5">
                  <h2 className="text-sm font-semibold text-[#f0f0f8] mb-4 flex items-center gap-2">
                    <Zap size={15} className="text-[#C9F028]" />
                    Live Options Scanner
                  </h2>
                  <form onSubmit={handleScan} className="flex gap-3 mb-4">
                    <div className="relative flex-1">
                      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#55556a]" />
                      <input
                        value={scanTicker}
                        onChange={e => setScanTicker(e.target.value.toUpperCase())}
                        placeholder="Enter ticker (e.g. AAPL)"
                        className="input-field pl-9 font-mono"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={scanning || !scanTicker.trim()}
                      whileTap={{ scale: 0.96 }}
                      className="btn-primary px-5 py-2.5 flex items-center gap-2 text-sm disabled:opacity-50"
                    >
                      {scanning ? <div className="w-3.5 h-3.5 border-2 border-[#050508]/40 border-t-[#050508] rounded-full spinner" /> : <Zap size={14} />}
                      {scanning ? 'Scanning...' : 'Scan'}
                    </motion.button>
                  </form>
                  <AnimatePresence>
                    {scanResult && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="rounded-xl bg-[#060610] border border-white/8 p-4 font-mono text-xs leading-6 whitespace-pre text-[#7b61ff]"
                      >
                        {scanResult}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Tool list */}
                <div className="glass rounded-2xl p-6 border border-white/5">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-semibold text-[#f0f0f8]">Active MCP Tools</h2>
                    <div className="relative">
                      <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#55556a]" />
                      <input
                        value={toolFilter}
                        onChange={e => setToolFilter(e.target.value)}
                        placeholder="Filter tools..."
                        className="input-field pl-7 text-xs py-1.5 w-40"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    {MCP_TOOLS.filter(t => t.name.includes(toolFilter.toLowerCase())).map((tool, i) => (
                      <motion.div
                        key={tool.name}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="flex items-center justify-between py-2.5 px-4 rounded-xl bg-white/3 hover:bg-white/5 transition-colors border border-white/4"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C9F028]" />
                          <span className="font-mono text-xs text-[#f0f0f8]">{tool.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-[#55556a] font-mono">{tool.calls.toLocaleString()} calls</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C9F028]/10 text-[#C9F028] font-mono">ready</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── Terminal tab ── */}
            {tab === 'terminal' && (
              <div className="glass rounded-2xl overflow-hidden border border-white/5">
                <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/5 bg-white/2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#C9F028]/50" />
                  </div>
                  <span className="ml-2 text-xs font-mono text-[#55556a]">hoodscan.agent.log</span>
                  <div className="ml-auto flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9F028] pulse-dot" />
                    <span className="text-xs font-mono text-[#C9F028]">streaming</span>
                  </div>
                </div>
                <div className="p-5 font-mono text-xs space-y-2.5 min-h-[320px]">
                  {AGENT_LOG.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="flex gap-4 items-start"
                    >
                      <span className="text-[#55556a] flex-shrink-0 tabular-nums">{line.ts}</span>
                      <span className={`flex-shrink-0 uppercase text-[10px] px-1.5 py-0.5 rounded font-bold ${
                        line.level === 'exec' ? 'bg-[#7b61ff]/15 text-[#7b61ff]' : 'bg-[#C9F028]/10 text-[#C9F028]'
                      }`}>
                        {line.level}
                      </span>
                      <span className="text-[#8888a8]">{line.msg}</span>
                    </motion.div>
                  ))}
                  <div className="flex gap-4 items-center">
                    <span className="text-[#55556a] tabular-nums">14:32:05</span>
                    <span className="text-[#C9F028] cursor-blink">_</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Disclaimer */}
        <p className="mt-8 text-xs text-[#55556a] text-center leading-relaxed">
          Demo portfolio data shown for illustration. Connect to a real Robinhood account via{' '}
          <code className="font-mono text-[#8888a8]">npx robinhood-for-agents onboard</code>.{' '}
          <ChevronRight size={11} className="inline" />
          <a href="https://github.com/hoodscanworld/hoodscanworld.github.io" target="_blank" rel="noopener noreferrer" className="text-[#8888a8] hover:text-[#C9F028] transition-colors">
            View on GitHub
          </a>
        </p>
      </div>
    </div>
  )
}
