import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Terminal, Brain, TrendingUp, Shield, Globe, Lock, Zap, ChevronRight } from 'lucide-react'

const FEATURES = [
  {
    icon: Terminal,
    title: '50+ MCP Tools',
    color: '#C9F028',
    badge: 'Core',
    desc: 'Full market access from any MCP-compatible agent. Place orders, scan options chains, stream live quotes, all via typed function calls.',
    detail: [
      'Portfolio management: positions, P&L, history, dividends, watchlist',
      'Market data: quotes, fundamentals, news, movers, sector performance',
      'Order execution: market and limit orders, cancel, order history',
      'Options: full chains, Greeks, IV rank, multi-leg orders',
      'Crypto: BTC, ETH, SOL, DOGE and all Robinhood Crypto assets',
      'Deep data: technical indicators, analyst ratings, insider trades',
    ],
  },
  {
    icon: Brain,
    title: 'Multi-Agent Ready',
    color: '#7b61ff',
    badge: 'Compatibility',
    desc: 'Native support for Claude Code, Codex, OpenClaw, and any standard MCP client. One install, every agent, zero re-configuration.',
    detail: [
      'First-class Claude Code integration with pre-built tool wrappers',
      'Codex and OpenAI Agents SDK support out of the box',
      'OpenClaw and Claude Desktop native compatibility',
      'Any MCP-compliant agent works without modification',
      'Unified MCP interface - one server, every agent',
    ],
  },
  {
    icon: TrendingUp,
    title: 'Options Intelligence',
    color: '#00d4ff',
    badge: 'Advanced',
    desc: 'Full options chain scanning, Greeks analysis, and multi-leg order construction. AI-native contract selection with IV and delta filters.',
    detail: [
      'Real-time options chains for any expiration date',
      'IV rank and IV percentile per ticker',
      'Delta, gamma, theta, vega per contract',
      'Multi-leg order construction and execution',
      'AI-native contract scoring by IV and delta filters',
    ],
  },
  {
    icon: Shield,
    title: 'Self-Renewing Sessions',
    color: '#C9F028',
    badge: 'Reliability',
    desc: 'Tokens refresh proactively before expiry and auto-recover on 401. Your agent never hits a re-auth wall mid-strategy.',
    detail: [
      'Proactive token refresh before session expiry',
      'Automatic 401 recovery without agent interruption',
      'Zero manual re-authentication required',
      'Works unattended in production CI environments',
      'Heartbeat monitoring with configurable refresh intervals',
    ],
  },
  {
    icon: Globe,
    title: 'Portfolio Scanner',
    color: '#7b61ff',
    badge: 'Analytics',
    desc: 'Real-time P&L tracking, position aggregation, FIFO realized gains calculation, and risk exposure summaries across all holdings.',
    detail: [
      'Live position P&L with unrealized and realized breakdowns',
      'FIFO realized gains calculation for tax accuracy',
      'Risk exposure summary across all equity and crypto holdings',
      'Portfolio history with configurable time spans',
      'Day change and total return since inception',
    ],
  },
  {
    icon: Lock,
    title: 'Pluggable Token Store',
    color: '#00d4ff',
    badge: 'Security',
    desc: 'OS keychain by default. Encrypted file mode for Docker and headless deployments. Zero credentials in plain text, ever.',
    detail: [
      'macOS Keychain, Linux Secret Service, Windows Credential Manager',
      'AES-256 encrypted file mode for Docker and containerized envs',
      'Zero Robinhood credentials stored in plain text',
      'Session token only - your password is never saved',
      'Pluggable interface: bring your own credential backend',
    ],
  },
]

export default function Features() {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>Features | HOODSCAN AI Trading Intelligence</title>
        <meta name="description" content="HOODSCAN features: 50+ MCP tools, multi-agent support, options intelligence, self-renewing sessions, portfolio scanner, and pluggable token store." />
        <link rel="canonical" href="https://hoodscan.world/features" />
        <meta property="og:title" content="Features | HOODSCAN AI Trading Intelligence" />
        <meta property="og:description" content="50+ MCP tools, multi-agent support, options intelligence, self-renewing sessions, portfolio scanner, and secure token storage." />
        <meta property="og:url" content="https://hoodscan.world/features" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://hoodscan.world/og-image.png" />
      </Helmet>

      <div className="min-h-screen pt-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-[#C9F028] opacity-[0.015] blur-[160px] pointer-events-none" />

        {/* Header */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-14 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 glass-green rounded-full px-4 py-1.5 mb-6">
              <Zap size={13} className="text-[#C9F028]" />
              <span className="text-xs font-mono text-[#C9F028]">Platform Features</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#f0f0f8] mb-5 leading-tight">
              Everything an agent needs.<br />
              <span className="gradient-text-green">Nothing it doesn't.</span>
            </h1>
            <p className="text-[#8888a8] max-w-lg mx-auto text-sm leading-relaxed">
              Designed for programmatic consumption. Every tool is typed, every session is self-healing, every credential is stored securely.
            </p>
          </motion.div>
        </section>

        {/* Feature cards */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => {
              const isOpen = expanded === i
              const Icon = f.icon
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="glass rounded-2xl border border-white/5 overflow-hidden cursor-pointer"
                  style={{ borderColor: isOpen ? `${f.color}28` : undefined }}
                  onClick={() => setExpanded(isOpen ? null : i)}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{ background: `${f.color}12` }}>
                        <Icon size={20} style={{ color: f.color }} />
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded border"
                        style={{ background: `${f.color}10`, borderColor: `${f.color}25`, color: f.color }}>
                        {f.badge}
                      </span>
                    </div>
                    <h3 className="font-semibold text-[#f0f0f8] mb-2">{f.title}</h3>
                    <p className="text-sm text-[#8888a8] leading-relaxed">{f.desc}</p>

                    <button className="flex items-center gap-1 mt-4 text-xs font-medium transition-colors"
                      style={{ color: isOpen ? f.color : '#55556a' }}>
                      {isOpen ? 'Less detail' : 'More detail'}
                      <ChevronRight size={12} className={`transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                    </button>
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 border-t border-white/5 pt-4">
                          <ul className="space-y-2">
                            {f.detail.map(d => (
                              <li key={d} className="flex items-start gap-2 text-xs text-[#8888a8]">
                                <span className="flex-shrink-0 mt-1 w-1 h-1 rounded-full" style={{ background: f.color }} />
                                {d}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 sm:p-10 border border-white/5 text-center"
          >
            <h2 className="text-2xl font-bold text-[#f0f0f8] mb-3">Try it in the live demo</h2>
            <p className="text-[#8888a8] text-sm mb-7 max-w-sm mx-auto">
              Explore all MCP tools, run the live market scanner, and test the agent terminal without logging in.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/demo" className="btn-primary flex items-center justify-center gap-2 py-3 px-7 group">
                Open Demo
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/how-to" className="btn-secondary flex items-center justify-center gap-2 py-3 px-7">
                Read the Docs
                <ChevronRight size={15} />
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  )
}
