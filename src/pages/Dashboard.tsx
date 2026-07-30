import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp, TrendingDown, Terminal, BarChart3, RefreshCw,
  Zap, Shield, LogOut, ChevronRight, Activity, DollarSign
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const portfolio = {
  equity: '$124,832.40',
  dayPnl: '+$2,341.12',
  dayPct: '+1.91%',
  totalPnl: '+$18,432.40',
  totalPct: '+17.3%',
  positive: true,
}

const positions = [
  { ticker: 'AAPL', shares: 42, price: '$224.50', value: '$9,429', pnl: '+$842', pct: '+9.8%', up: true },
  { ticker: 'NVDA', shares: 15, price: '$131.20', value: '$1,968', pnl: '+$324', pct: '+19.7%', up: true },
  { ticker: 'TSLA', shares: 28, price: '$182.40', value: '$5,107', pnl: '-$203', pct: '-3.8%', up: false },
  { ticker: 'MSFT', shares: 20, price: '$415.80', value: '$8,316', pnl: '+$1,116', pct: '+15.5%', up: true },
  { ticker: 'AMZN', shares: 35, price: '$214.30', value: '$7,500', pnl: '+$620', pct: '+9.0%', up: true },
]

const mcpTools = [
  { name: 'robinhood_get_portfolio', status: 'ready', calls: 142 },
  { name: 'robinhood_place_order', status: 'ready', calls: 38 },
  { name: 'robinhood_scan_options', status: 'ready', calls: 91 },
  { name: 'robinhood_get_quote', status: 'ready', calls: 2841 },
  { name: 'robinhood_get_positions', status: 'ready', calls: 204 },
]

const agentLog = [
  { ts: '14:32:01', level: 'info', msg: 'Session token refreshed (proactive)' },
  { ts: '14:31:55', level: 'exec', msg: 'robinhood_get_quote("NVDA") -> $131.20' },
  { ts: '14:31:42', level: 'exec', msg: 'robinhood_scan_options("AAPL", expiry: "2025-08")' },
  { ts: '14:31:38', level: 'info', msg: '847 option contracts loaded' },
  { ts: '14:30:12', level: 'exec', msg: 'robinhood_get_portfolio() -> equity: $124,832.40' },
  { ts: '14:29:55', level: 'info', msg: 'Agent session initialized via MetaMask' },
]

type Tab = 'portfolio' | 'tools' | 'terminal'

export default function Dashboard() {
  const [tab, setTab] = useState<Tab>('portfolio')
  const [scanTicker, setScanTicker] = useState('')
  const [scanResult, setScanResult] = useState<string | null>(null)
  const [scanning, setScanning] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!scanTicker.trim()) return
    setScanning(true)
    setScanResult(null)
    await new Promise(r => setTimeout(r, 1400))
    const ticker = scanTicker.toUpperCase()
    setScanResult(
      `> robinhood_scan_options("${ticker}", expiry: "2025-08")\n` +
      `  Scanning ${Math.floor(Math.random() * 600 + 400)} contracts...\n` +
      `  Top call: ${ticker} $${(Math.random() * 20 + 180).toFixed(0)} Aug 15 @ $3.40 (IV: 34.2%)\n` +
      `  Top put:  ${ticker} $${(Math.random() * 10 + 160).toFixed(0)} Aug 15 @ $2.10 (IV: 31.8%)\n` +
      `  Delta neutral suggested: ratio 1.2 call / 1.0 put\n` +
      `  Session: valid for 3h 42m`
    )
    setScanning(false)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const walletIcon = user?.walletType === 'metamask' ? '🦊' : user?.walletType === 'phantom' ? '👻' : '✉️'

  return (
    <div className="min-h-screen pt-16 pb-12 relative">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] rounded-full bg-[#C9F028] opacity-[0.02] blur-[100px] pointer-events-none" />

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
            <h1 className="text-2xl sm:text-3xl font-bold text-[#f0f0f8]">
              Command Center
            </h1>
            <p className="text-sm text-[#55556a] mt-1">
              {walletIcon} Connected as{' '}
              <span className="font-mono text-[#8888a8]">{user?.displayName}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="glass rounded-lg px-3 py-2 flex items-center gap-2">
              <Shield size={14} className="text-[#C9F028]" />
              <span className="text-xs text-[#8888a8] font-mono">50 tools active</span>
            </div>
            <button
              onClick={handleLogout}
              className="btn-secondary py-2 px-4 text-sm flex items-center gap-1.5"
            >
              <LogOut size={14} />
              Sign out
            </button>
          </div>
        </motion.div>

        {/* Portfolio summary cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: 'Portfolio Value', value: portfolio.equity, icon: <DollarSign size={16} />, color: '#C9F028' },
            { label: "Today's Gain", value: portfolio.dayPnl, sub: portfolio.dayPct, icon: <TrendingUp size={16} />, color: '#C9F028', up: true },
            { label: 'Total Return', value: portfolio.totalPnl, sub: portfolio.totalPct, icon: <BarChart3 size={16} />, color: '#7b61ff', up: true },
            { label: 'MCP Tool Calls', value: '3,316', sub: 'today', icon: <Activity size={16} />, color: '#00d4ff' },
          ].map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.06 }}
              className="glass rounded-xl p-4 sm:p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-[#55556a] uppercase tracking-wider">{card.label}</span>
                <span style={{ color: card.color }}>{card.icon}</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-[#f0f0f8] font-mono">{card.value}</div>
              {card.sub && (
                <div className={`text-xs mt-1 font-mono ${card.up ? 'text-[#C9F028]' : 'text-[#55556a]'}`}>
                  {card.sub}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Main content tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Tab switcher */}
          <div className="flex gap-1 mb-6 bg-white/3 rounded-lg p-1 w-fit">
            {[
              { id: 'portfolio' as Tab, label: 'Positions', icon: <TrendingUp size={14} /> },
              { id: 'tools' as Tab, label: 'MCP Tools', icon: <Zap size={14} /> },
              { id: 'terminal' as Tab, label: 'Agent Log', icon: <Terminal size={14} /> },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  tab === t.id
                    ? 'bg-[#111118] text-[#C9F028] shadow'
                    : 'text-[#55556a] hover:text-[#8888a8]'
                }`}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>

          {tab === 'portfolio' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass rounded-xl overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#55556a] uppercase tracking-wider">Ticker</th>
                      <th className="text-right px-5 py-3.5 text-xs font-semibold text-[#55556a] uppercase tracking-wider">Shares</th>
                      <th className="text-right px-5 py-3.5 text-xs font-semibold text-[#55556a] uppercase tracking-wider hidden sm:table-cell">Price</th>
                      <th className="text-right px-5 py-3.5 text-xs font-semibold text-[#55556a] uppercase tracking-wider">Value</th>
                      <th className="text-right px-5 py-3.5 text-xs font-semibold text-[#55556a] uppercase tracking-wider">P&amp;L</th>
                    </tr>
                  </thead>
                  <tbody>
                    {positions.map((pos, i) => (
                      <motion.tr
                        key={pos.ticker}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="border-b border-white/3 hover:bg-white/2 transition-colors"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#C9F028]/8 flex items-center justify-center">
                              <span className="text-xs font-bold text-[#C9F028]">{pos.ticker[0]}</span>
                            </div>
                            <span className="font-semibold text-[#f0f0f8] text-sm font-mono">{pos.ticker}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-right text-sm text-[#8888a8] font-mono">{pos.shares}</td>
                        <td className="px-5 py-4 text-right text-sm text-[#8888a8] font-mono hidden sm:table-cell">{pos.price}</td>
                        <td className="px-5 py-4 text-right text-sm font-mono text-[#f0f0f8]">{pos.value}</td>
                        <td className="px-5 py-4 text-right">
                          <div className={`flex flex-col items-end ${pos.up ? 'text-[#C9F028]' : 'text-red-400'}`}>
                            <span className="text-sm font-mono font-semibold">{pos.pnl}</span>
                            <span className="text-xs opacity-70">{pos.pct}</span>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {tab === 'tools' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="glass rounded-xl p-5">
                <h3 className="font-semibold text-[#f0f0f8] mb-4 flex items-center gap-2">
                  <Zap size={16} className="text-[#C9F028]" />
                  Active MCP Tools
                  <span className="ml-auto text-xs font-mono text-[#55556a]">50 / 50 registered</span>
                </h3>
                <div className="space-y-2">
                  {mcpTools.map((tool, i) => (
                    <motion.div
                      key={tool.name}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-white/2 hover:bg-white/4 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C9F028] pulse-dot" />
                        <span className="font-mono text-xs sm:text-sm text-[#8888a8]">{tool.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-[#55556a] font-mono">{tool.calls.toLocaleString()} calls</span>
                        <span className="text-xs text-[#C9F028] bg-[#C9F028]/8 px-2 py-0.5 rounded font-mono">READY</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Options scanner */}
              <div className="glass rounded-xl p-5">
                <h3 className="font-semibold text-[#f0f0f8] mb-4 flex items-center gap-2">
                  <BarChart3 size={16} className="text-[#7b61ff]" />
                  Options Scanner
                </h3>
                <form onSubmit={handleScan} className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={scanTicker}
                    onChange={e => setScanTicker(e.target.value.toUpperCase())}
                    placeholder="Enter ticker (e.g. AAPL)"
                    className="input-field flex-1 font-mono text-sm uppercase"
                    maxLength={5}
                  />
                  <button
                    type="submit"
                    disabled={scanning}
                    className="btn-primary py-2.5 px-5 flex items-center gap-2 text-sm whitespace-nowrap"
                  >
                    {scanning ? (
                      <div className="w-3.5 h-3.5 border-2 border-[#050508]/40 border-t-[#050508] rounded-full spinner" />
                    ) : (
                      <RefreshCw size={14} />
                    )}
                    Scan
                  </button>
                </form>
                {scanResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#050508] border border-[#C9F028]/20 rounded-lg p-4 font-mono text-xs text-[#C9F028] whitespace-pre leading-6"
                  >
                    {scanResult}
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {tab === 'terminal' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass rounded-xl overflow-hidden"
            >
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/5 bg-white/2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#C9F028]/60" />
                <span className="ml-3 text-xs font-mono text-[#55556a]">hoodscan.agent.log</span>
                <div className="ml-auto flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9F028] pulse-dot" />
                  <span className="text-xs font-mono text-[#C9F028]">streaming</span>
                </div>
              </div>
              <div className="p-5 font-mono text-xs space-y-2 min-h-[280px]">
                {agentLog.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 items-start"
                  >
                    <span className="text-[#55556a] flex-shrink-0">{line.ts}</span>
                    <span className={`flex-shrink-0 uppercase text-[10px] px-1.5 py-0.5 rounded ${
                      line.level === 'exec' ? 'bg-[#7b61ff]/15 text-[#7b61ff]' :
                      'bg-[#C9F028]/10 text-[#C9F028]'
                    }`}>
                      {line.level}
                    </span>
                    <span className="text-[#8888a8]">{line.msg}</span>
                  </motion.div>
                ))}
                <div className="flex gap-4 items-center">
                  <span className="text-[#55556a]">14:32:05</span>
                  <span className="text-[#C9F028] cursor-blink">_</span>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Disclaimer */}
        <p className="mt-8 text-xs text-[#55556a] text-center leading-relaxed">
          Demo portfolio data shown for illustration only. Connect to a real Robinhood account via{' '}
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
