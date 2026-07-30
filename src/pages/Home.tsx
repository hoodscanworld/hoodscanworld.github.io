import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight, Zap, Shield, BarChart3, Brain, ChevronRight,
  Terminal, Globe, Lock, TrendingUp, Cpu, Layers
} from 'lucide-react'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
}

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
}

const stats = [
  { value: '50+', label: 'MCP Tools', icon: <Terminal size={18} /> },
  { value: '70+', label: 'Async Methods', icon: <Layers size={18} /> },
  { value: '4', label: 'AI Platforms', icon: <Brain size={18} /> },
  { value: '0ms', label: 'Auth Delay', icon: <Zap size={18} /> },
]

const features = [
  {
    icon: <Terminal size={22} />,
    title: '50 MCP Tools',
    description: 'Full market access from any MCP-compatible agent. Place orders, read portfolios, scan options chains, stream quotes.',
    color: '#00ff94',
  },
  {
    icon: <Brain size={22} />,
    title: 'Multi-Agent Ready',
    description: 'Native support for Claude Code, Codex, OpenClaw, and any MCP client. One install, every agent.',
    color: '#7b61ff',
  },
  {
    icon: <TrendingUp size={22} />,
    title: 'Options Intelligence',
    description: 'Full options chain scanning, Greeks analysis, and multi-leg order construction. AI-native contract selection.',
    color: '#00d4ff',
  },
  {
    icon: <Shield size={22} />,
    title: 'Self-Renewing Sessions',
    description: 'Tokens refresh proactively ahead of expiry and auto-recover on 401. No re-auth interruptions during trading.',
    color: '#00ff94',
  },
  {
    icon: <Globe size={22} />,
    title: 'Portfolio Scanner',
    description: 'Real-time P&L tracking, position aggregation, FIFO realized gains calculation, and risk exposure summaries.',
    color: '#7b61ff',
  },
  {
    icon: <Lock size={22} />,
    title: 'Pluggable Token Store',
    description: 'OS keychain by default. Encrypted file mode for Docker and headless deployments. Zero secrets in plain text.',
    color: '#00d4ff',
  },
]

const integrations = [
  { name: 'Claude Code', status: 'Native MCP', color: '#00ff94' },
  { name: 'Codex', status: 'Native MCP', color: '#7b61ff' },
  { name: 'OpenClaw', status: 'Skill + MCP', color: '#00d4ff' },
  { name: 'Claude Desktop', status: 'MCP Config', color: '#00ff94' },
  { name: 'MetaMask', status: 'Wallet Auth', color: '#f6851b' },
  { name: 'Phantom', status: 'Wallet Auth', color: '#ab9ff2' },
]

const terminalLines = [
  { text: '$ hoodscan login --agent claude-code', color: '#00ff94', delay: 0 },
  { text: '  Authenticating with Robinhood...', color: '#8888a8', delay: 0.4 },
  { text: '  Session stored in OS keychain', color: '#8888a8', delay: 0.8 },
  { text: '  50 MCP tools registered', color: '#00ff94', delay: 1.2 },
  { text: '', color: '', delay: 1.5 },
  { text: '> robinhood_get_portfolio()', color: '#f0f0f8', delay: 1.8 },
  { text: '  { equity: "$124,832.40", day_pnl: "+$2,341.12" }', color: '#7b61ff', delay: 2.3 },
  { text: '> robinhood_scan_options("AAPL", expiry: "2025-08")', color: '#f0f0f8', delay: 2.7 },
  { text: '  Scanning 847 contracts...', color: '#8888a8', delay: 3.0 },
]

export default function Home() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 grid-pattern opacity-100" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-[#00ff94] opacity-[0.03] blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-[#7b61ff] opacity-[0.04] blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[#00d4ff] opacity-[0.03] blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Copy */}
            <motion.div
              variants={stagger}
              initial="initial"
              animate="animate"
              className="text-center lg:text-left"
            >
              {/* Badge */}
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-6">
                <div className="flex items-center gap-2 glass-green rounded-full px-4 py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ff94] pulse-dot" />
                  <span className="text-xs font-mono text-[#00ff94] tracking-wider">
                    MCP v2.0 Live
                  </span>
                </div>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6"
              >
                <span className="text-[#f0f0f8]">AI Trading</span>
                <br />
                <span className="gradient-text-green text-glow-green">
                  Intelligence
                </span>
                <br />
                <span className="text-[#f0f0f8]">Unleashed.</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-base sm:text-lg text-[#8888a8] leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0"
              >
                HOODSCAN gives autonomous AI agents direct access to Robinhood markets via 50 MCP tools and a 70-method TypeScript client library. Self-renewing sessions, zero re-auth, infinite uptime.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
              >
                <Link
                  to="/login"
                  className="btn-primary flex items-center justify-center gap-2 text-base py-3 px-7"
                >
                  Launch App
                  <ArrowRight size={17} />
                </Link>
                <Link
                  to="/how-to"
                  className="btn-secondary flex items-center justify-center gap-2 text-base py-3 px-7"
                >
                  Read the Docs
                  <ChevronRight size={17} />
                </Link>
              </motion.div>

              {/* Quick install */}
              <motion.div variants={fadeUp} className="mt-8">
                <p className="text-xs text-[#55556a] mb-2 font-mono">Quick install:</p>
                <div className="inline-flex items-center gap-3 glass rounded-lg px-4 py-2.5 font-mono text-sm">
                  <span className="text-[#00ff94]">$</span>
                  <span className="text-[#f0f0f8]">npx robinhood-for-agents onboard</span>
                  <button
                    onClick={() => navigator.clipboard?.writeText('npx robinhood-for-agents onboard')}
                    className="ml-2 text-[#55556a] hover:text-[#00ff94] transition-colors"
                    title="Copy"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" />
                      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Terminal */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="glass rounded-xl border border-white/8 overflow-hidden neon-border-green">
                {/* Terminal header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8 bg-white/2">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-[#00ff94]/60" />
                  <span className="ml-3 text-xs font-mono text-[#55556a]">hoodscan terminal</span>
                  <div className="ml-auto flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00ff94] pulse-dot" />
                    <span className="text-xs font-mono text-[#00ff94]">LIVE</span>
                  </div>
                </div>
                {/* Terminal body */}
                <div className="p-5 font-mono text-sm space-y-1 min-h-[300px]">
                  {terminalLines.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: line.delay + 0.3, duration: 0.3 }}
                      style={{ color: line.color || 'transparent' }}
                      className="leading-6"
                    >
                      {line.text || '\u00A0'}
                    </motion.div>
                  ))}
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3.2 }}
                    className="cursor-blink text-[#00ff94]"
                  >
                    _
                  </motion.span>
                </div>
              </div>
              {/* Glow orb behind terminal */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#00ff94] opacity-[0.04] blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-white/5 bg-[#0d0d14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center text-center"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[#00ff94]/60">{stat.icon}</span>
                  <span className="text-3xl font-bold text-[#f0f0f8] gradient-text-green">
                    {stat.value}
                  </span>
                </div>
                <span className="text-xs text-[#55556a] tracking-wider uppercase">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#f0f0f8] mb-4">
              Everything your agent needs
            </h2>
            <p className="text-[#8888a8] max-w-xl mx-auto">
              From simple portfolio reads to complex options strategies. HOODSCAN handles the infrastructure so your agent handles alpha.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="glass rounded-xl p-6 hover:border-[#00ff94]/20 transition-all duration-300 group"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: `${feat.color}14`, color: feat.color }}
                >
                  {feat.icon}
                </div>
                <h3 className="font-semibold text-[#f0f0f8] mb-2 text-[15px]">{feat.title}</h3>
                <p className="text-sm text-[#8888a8] leading-relaxed">{feat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20 bg-[#0d0d14] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-[#f0f0f8] mb-3">
              Works everywhere
            </h2>
            <p className="text-[#8888a8] text-sm">
              Native integration with every major AI coding agent and wallet provider.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {integrations.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="glass rounded-xl p-4 text-center"
              >
                <div
                  className="text-sm font-semibold mb-1"
                  style={{ color: item.color }}
                >
                  {item.name}
                </div>
                <div className="text-xs text-[#55556a] font-mono">{item.status}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works strip */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#f0f0f8] mb-4">
              Up in 60 seconds
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-8 relative">
            {[
              { step: '01', icon: <Terminal size={20} />, title: 'Install', desc: 'Run npx robinhood-for-agents onboard. Interactive setup handles everything.' },
              { step: '02', icon: <Cpu size={20} />, title: 'Connect Agent', desc: 'Claude Code, Codex, or any MCP client. One command registers all 50 tools.' },
              { step: '03', icon: <BarChart3 size={20} />, title: 'Trade', desc: 'Your agent now has full market access. Portfolio reads, order placement, options scanning.' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="relative"
              >
                <div className="glass rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-xs text-[#00ff94]/50">{item.step}</span>
                    <div className="w-8 h-8 rounded-lg bg-[#00ff94]/10 flex items-center justify-center text-[#00ff94]">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="font-semibold text-[#f0f0f8] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#8888a8] leading-relaxed">{item.desc}</p>
                </div>
                {i < 2 && (
                  <div className="hidden sm:block absolute top-1/2 -right-4 -translate-y-1/2 text-[#55556a]">
                    <ChevronRight size={18} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00ff94]/3 to-transparent" />
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f0f0f8] mb-4">
            Ready to give your agent an edge?
          </h2>
          <p className="text-[#8888a8] mb-8 text-base leading-relaxed">
            Join the next generation of autonomous trading. Connect your wallet or sign in to access the full HOODSCAN platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="btn-primary flex items-center justify-center gap-2 text-base py-3.5 px-8"
            >
              Get Started Free
              <ArrowRight size={17} />
            </Link>
            <Link
              to="/about"
              className="btn-secondary flex items-center justify-center gap-2 text-base py-3.5 px-8"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
