import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Target, Cpu, Users, ArrowRight, GitFork, Zap, Shield, Globe, ChevronDown } from 'lucide-react'

const VALUES = [
  {
    icon: Cpu,
    title: 'Agent-First Architecture',
    description: 'Every tool, every API, every data structure is designed for programmatic consumption by AI agents. Human interfaces are secondary to machine interfaces.',
    color: '#C9F028',
  },
  {
    icon: Shield,
    title: 'No Trust, Full Verify',
    description: 'Self-renewing sessions, OS keychain storage, encrypted file modes for Docker. We take zero shortcuts on authentication and credential safety.',
    color: '#7b61ff',
  },
  {
    icon: Globe,
    title: 'Open by Default',
    description: 'MIT licensed. The full source is on GitHub. Forkable, auditable, and extensible. We build in the open because the technology works better that way.',
    color: '#00d4ff',
  },
  {
    icon: Zap,
    title: 'Zero Friction Uptime',
    description: 'Token refresh happens proactively. 401 recovery is automatic. An agent running HOODSCAN never hits a re-auth wall mid-strategy.',
    color: '#C9F028',
  },
]

const TIMELINE = [
  {
    year: 'Jul 2026',
    label: 'HOODSCAN v2.0: Now Live',
    desc: 'Full interactive web dashboard, wallet-native authentication (MetaMask & Phantom), animated platform upgrade, and 50+ MCP tools fully stable in production.',
    color: '#C9F028',
    current: true,
  },
  {
    year: 'Q3 2026',
    label: 'Mobile Agent SDK',
    desc: 'iOS and Android native MCP client enabling on-the-go autonomous trading, push alerts for strategy triggers, and biometric session unlock.',
    color: '#7b61ff',
    current: false,
  },
  {
    year: 'Q4 2026',
    label: 'Options Strategy Builder',
    desc: 'Visual multi-leg options constructor, real-time backtesting engine, AI-powered Greeks optimization, and automated risk/reward scoring for every leg.',
    color: '#00d4ff',
    current: false,
  },
  {
    year: 'Q1 2027',
    label: 'DeFi & Cross-Chain',
    desc: 'Cross-chain swap routing, Solana DEX integration, EVM protocol support, and unified portfolio view across CEX and on-chain positions.',
    color: '#C9F028',
    current: false,
  },
  {
    year: 'Q2 2027+',
    label: 'HOODSCAN Pro',
    desc: 'Multi-account aggregation, institutional-grade risk analytics, white-label API for teams, and an agent marketplace for shared trading strategies.',
    color: '#7b61ff',
    current: false,
  },
]

const FAQS = [
  {
    q: 'Is HOODSCAN affiliated with Robinhood?',
    a: 'No. HOODSCAN is an independent open-source project. "Robinhood" is a trademark of Robinhood Markets, Inc. HOODSCAN is not affiliated with, endorsed by, or sponsored by Robinhood.',
  },
  {
    q: 'What AI agents does HOODSCAN support?',
    a: 'Any MCP-compatible agent works out of the box. Native first-class support is provided for Claude Code, Codex, OpenClaw, and Claude Desktop. The unified MCP interface means any agent following the spec will work.',
  },
  {
    q: 'How does authentication work?',
    a: 'HOODSCAN uses a browser-based one-time login to obtain a session token, then stores it in your OS keychain. The token is refreshed proactively before expiry, so your agent never hits an auth wall mid-trade.',
  },
  {
    q: 'Is it safe to use HOODSCAN with a real account?',
    a: 'HOODSCAN stores credentials locally in your OS keychain and never transmits them to a third-party server. That said, automated trading carries inherent risk. Use at your own discretion.',
  },
]

export default function About() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>About HOODSCAN | AI-Native Trading Intelligence Platform</title>
        <meta name="description" content="Learn about HOODSCAN, the open-source AI trading platform built for autonomous agents. MIT licensed, agent-first architecture, wallet-native authentication." />
        <link rel="canonical" href="https://hoodscan.world/about" />
        <meta property="og:title" content="About HOODSCAN | AI-Native Trading Intelligence Platform" />
        <meta property="og:description" content="Learn about HOODSCAN, the open-source AI trading platform built for autonomous agents. MIT licensed, agent-first architecture, wallet-native authentication." />
        <meta property="og:url" content="https://hoodscan.world/about" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://hoodscan.world/og-image.png" />
      </Helmet>
      <div className="min-h-screen pt-16 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-[#7b61ff] opacity-[0.02] blur-[140px] pointer-events-none" />

      {/* ── Hero ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 glass-green rounded-full px-4 py-1.5 mb-6">
            <Users size={13} className="text-[#C9F028]" />
            <span className="text-xs font-mono text-[#C9F028]">About HOODSCAN</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#f0f0f8] mb-6 leading-tight">
            The AI-native trading layer<br />
            <span className="gradient-text-green">built for agents, not dashboards.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#8888a8] max-w-2xl mx-auto leading-relaxed">
            HOODSCAN started as a technical answer to a simple question: why can't an AI agent just trade? Not via bloated middleware, not via screen scraping, but via a clean, typed, self-authenticating API that any MCP-compatible agent can call in milliseconds.
          </p>
        </motion.div>
      </section>

      {/* ── Mission ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 sm:p-12 border border-[#C9F028]/10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#C9F028] opacity-[0.03] blur-[80px] pointer-events-none" />
          <div className="flex items-start gap-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#C9F028]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Target size={20} className="text-[#C9F028]" />
            </div>
            <div>
              <div className="text-xs font-mono text-[#C9F028] mb-1 uppercase tracking-wider">Mission</div>
              <h2 className="text-2xl font-bold text-[#f0f0f8]">Autonomous trading, done right.</h2>
            </div>
          </div>
          <div className="space-y-4 text-[#8888a8] text-sm leading-relaxed">
            <p>
              The proliferation of capable AI agents has outpaced the tooling available to them. Most trading APIs are built for human dashboards: rate-limited, session-brittle, and hostile to programmatic access. HOODSCAN is the opposite: a purpose-built machine interface.
            </p>
            <p>
              Every design decision optimizes for agent reliability: proactive token refresh so sessions never expire mid-trade, typed responses so agents never parse ambiguous output, and a pluggable credential store so the same codebase works in a developer laptop keychain and a headless Docker container.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── Values ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold text-[#f0f0f8] mb-8 text-center"
        >
          What we believe
        </motion.h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -3 }}
              className="glass rounded-2xl p-6 border border-white/5 cursor-default"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${v.color}12` }}>
                <v.icon size={19} style={{ color: v.color }} />
              </div>
              <h3 className="font-semibold text-[#f0f0f8] mb-2">{v.title}</h3>
              <p className="text-sm text-[#8888a8] leading-relaxed">{v.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold text-[#f0f0f8] mb-10 text-center"
        >
          Roadmap
        </motion.h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[88px] sm:left-[100px] top-0 bottom-0 w-px bg-gradient-to-b from-[#C9F028]/40 via-[#7b61ff]/20 to-transparent" />

          <div className="space-y-8">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
                className="flex items-start gap-6"
              >
                {/* Year column */}
                <div className="w-20 flex-shrink-0 text-right pt-1">
                  <span className="text-[11px] font-mono leading-none" style={{ color: item.color }}>
                    {item.year}
                  </span>
                </div>

                {/* Dot */}
                <div className="relative flex-shrink-0 mt-1.5">
                  {item.current ? (
                    <>
                      <div
                        className="w-3.5 h-3.5 rounded-full relative z-10 pulse-dot"
                        style={{ background: item.color, boxShadow: `0 0 10px ${item.color}80` }}
                      />
                    </>
                  ) : (
                    <div
                      className="w-3 h-3 rounded-full border-2 relative z-10"
                      style={{ borderColor: item.color, background: `${item.color}20` }}
                    />
                  )}
                  <motion.div
                    initial={{ scale: 0, opacity: 0.6 }}
                    whileInView={{ scale: 2.4, opacity: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 + 0.15, duration: 0.7 }}
                    className="absolute inset-0 rounded-full"
                    style={{ background: item.color }}
                  />
                </div>

                {/* Content */}
                <div
                  className="flex-1 rounded-xl p-5 border transition-colors"
                  style={{
                    background: item.current ? `${item.color}06` : 'rgba(17,17,24,0.8)',
                    borderColor: item.current ? `${item.color}25` : 'rgba(255,255,255,0.06)',
                    backdropFilter: 'blur(20px)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <h3 className="font-semibold text-[#f0f0f8] text-sm">{item.label}</h3>
                    {item.current && (
                      <span
                        className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold"
                        style={{ background: `${item.color}20`, color: item.color }}
                      >
                        LIVE NOW
                      </span>
                    )}
                    {!item.current && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-[#55556a]">
                        UPCOMING
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[#8888a8] leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold text-[#f0f0f8] mb-8 text-center"
        >
          Common questions
        </motion.h2>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="glass rounded-xl border border-white/5 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left text-sm font-medium text-[#f0f0f8] hover:text-[#C9F028] transition-colors group"
              >
                <span>{faq.q}</span>
                <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={16} className="text-[#55556a] group-hover:text-[#C9F028] transition-colors flex-shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="px-6 pb-5 text-sm text-[#8888a8] leading-relaxed border-t border-white/5 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 sm:p-12 text-center border border-white/5"
        >
          <h2 className="text-2xl font-bold text-[#f0f0f8] mb-3">We build in the open</h2>
          <p className="text-[#8888a8] mb-8 max-w-lg mx-auto text-sm leading-relaxed">
            The full source is MIT licensed and lives on GitHub. Read it, fork it, open issues, submit PRs. This is community infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://github.com/hoodscanworld/hoodscanworld.github.io"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center justify-center gap-2 py-3 px-7"
            >
              <GitFork size={17} />
              View on GitHub
            </a>
            <Link
              to="/login"
              className="btn-secondary flex items-center justify-center gap-2 py-3 px-7"
            >
              Try the App
              <ArrowRight size={17} />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
    </>
  )
}
