import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Terminal, Cpu, BarChart3, Download, CheckCircle,
  ArrowRight, Copy, Check, ChevronDown, ExternalLink,
} from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

/* ─── Code Block ─────────────────────────────────────────────────────── */
function CodeBlock({ code, lang = 'bash' }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard?.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="relative rounded-xl overflow-hidden border border-white/8 group">
      <div className="flex items-center justify-between px-4 py-2.5 bg-white/3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#C9F028]/40" />
          </div>
          <span className="text-xs font-mono text-[#55556a] ml-2">{lang}</span>
        </div>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 text-xs text-[#55556a] hover:text-[#C9F028] transition-colors"
        >
          {copied ? <Check size={12} className="text-[#C9F028]" /> : <Copy size={12} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm font-mono leading-6 bg-[#060610]">
        <code className="text-[#f0f0f8]">{code}</code>
      </pre>
    </div>
  )
}

/* ─── Progress Bar ───────────────────────────────────────────────────── */
function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="flex-1 h-1 bg-white/8 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#C9F028] to-[#7b61ff]"
          initial={{ width: 0 }}
          animate={{ width: `${(current / total) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>
      <span className="text-xs font-mono text-[#55556a] flex-shrink-0">
        {current} / {total} steps
      </span>
    </div>
  )
}

/* ─── Step Indicator ─────────────────────────────────────────────────── */
function StepBadge({ n, active, done, color }: { n: number; active: boolean; done: boolean; color: string }) {
  return (
    <motion.div
      animate={{ scale: active ? 1.1 : 1 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm border transition-all"
      style={{
        background: done ? `${color}20` : active ? `${color}18` : 'rgba(255,255,255,0.04)',
        borderColor: done || active ? `${color}40` : 'rgba(255,255,255,0.07)',
        color: done || active ? color : '#55556a',
      }}
    >
      {done ? <Check size={15} /> : n}
    </motion.div>
  )
}

/* ─── Sections ───────────────────────────────────────────────────────── */
const SECTIONS = [
  {
    id: 'prerequisites',
    Icon: Download,
    title: 'Prerequisites',
    color: '#C9F028',
    short: 'Install Bun + Chrome',
    content: () => (
      <div className="space-y-5">
        <p className="text-[#8888a8] text-sm leading-relaxed">
          HOODSCAN requires <strong className="text-[#f0f0f8]">Bun</strong> (not Node.js) and <strong className="text-[#f0f0f8]">Google Chrome</strong> for the initial Robinhood authentication. Once authenticated, the session is stored and reused automatically.
        </p>
        <div className="space-y-2.5">
          {[
            { label: 'Bun v1.3+', desc: 'Runtime for HOODSCAN', link: 'https://bun.sh' },
            { label: 'Google Chrome', desc: 'Required for browser-based Robinhood login (one-time)', link: 'https://google.com/chrome' },
            { label: 'A Robinhood account', desc: 'Any account type works including free tier', link: 'https://robinhood.com' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-3 glass rounded-xl px-4 py-3">
              <CheckCircle size={15} className="text-[#C9F028] flex-shrink-0" />
              <div className="flex-1">
                <span className="font-medium text-[#f0f0f8] text-sm">{item.label}</span>
                <span className="text-[#55556a] text-xs ml-2">{item.desc}</span>
              </div>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-[#C9F028] hover:underline font-mono"
              >
                Install <ExternalLink size={10} />
              </a>
            </div>
          ))}
        </div>
        <div>
          <p className="text-xs text-[#55556a] mb-2 font-mono">Install Bun:</p>
          <CodeBlock code="curl -fsSL https://bun.sh/install | bash" />
        </div>
      </div>
    ),
  },
  {
    id: 'install',
    Icon: Terminal,
    title: 'Install & Onboard',
    color: '#7b61ff',
    short: 'Run the onboard command',
    content: () => (
      <div className="space-y-5">
        <p className="text-[#8888a8] text-sm leading-relaxed">
          The <code className="font-mono text-[#f0f0f8] bg-white/6 px-1.5 py-0.5 rounded">onboard</code> command handles everything: agent detection, MCP registration, skill installation (where supported), and Robinhood login. Run it once per machine.
        </p>
        <div>
          <p className="text-xs text-[#55556a] mb-2 font-mono">Guided onboarding (recommended):</p>
          <CodeBlock code="npx robinhood-for-agents onboard" />
        </div>
        <div>
          <p className="text-xs text-[#55556a] mb-2 font-mono">Or target your agent directly:</p>
          <CodeBlock
            code={`npx robinhood-for-agents onboard --agent claude-code\nnpx robinhood-for-agents onboard --agent codex\nnpx robinhood-for-agents onboard --agent openclaw`}
          />
        </div>
        <div className="glass rounded-xl p-4 border border-[#7b61ff]/20">
          <p className="text-xs text-[#7b61ff] font-mono mb-2">What onboard does:</p>
          <ul className="space-y-1.5 text-xs text-[#8888a8]">
            {[
              'Detects installed AI agents on your system',
              'Registers the MCP server in each agent\'s config',
              'Installs the HOODSCAN trading skill (where supported)',
              'Opens Chrome for one-time Robinhood authentication',
              'Stores the session in your OS keychain',
            ].map(s => (
              <li key={s} className="flex items-start gap-2">
                <CheckCircle size={12} className="text-[#7b61ff] mt-0.5 flex-shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 'agents',
    Icon: Cpu,
    title: 'Configure Your Agent',
    color: '#00d4ff',
    short: 'Add to Claude, Codex, etc.',
    content: () => (
      <div className="space-y-5">
        <p className="text-[#8888a8] text-sm leading-relaxed">
          If the onboard wizard didn't cover your agent, or you prefer manual configuration, here's how to add HOODSCAN to common agents:
        </p>
        <div>
          <p className="text-xs text-[#55556a] mb-2 font-mono">Claude Desktop (claude_desktop_config.json):</p>
          <CodeBlock
            lang="json"
            code={`{
  "mcpServers": {
    "hoodscan": {
      "command": "npx",
      "args": ["robinhood-for-agents", "mcp"]
    }
  }
}`}
          />
        </div>
        <div>
          <p className="text-xs text-[#55556a] mb-2 font-mono">Claude Code / Codex:</p>
          <CodeBlock code="npx robinhood-for-agents mcp &  # run as background MCP server" />
        </div>
        <div className="glass rounded-xl p-4 border border-[#00d4ff]/20">
          <p className="text-xs text-[#00d4ff] font-mono mb-1">All supported agents</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {['Claude Code', 'Claude Desktop', 'Codex', 'OpenClaw', 'Any MCP client'].map(a => (
              <span key={a} className="text-xs font-mono px-2 py-1 rounded-full bg-[#00d4ff]/8 text-[#00d4ff]">{a}</span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'trade',
    Icon: BarChart3,
    title: 'Start Trading',
    color: '#C9F028',
    short: 'Use the 50 MCP tools',
    content: () => (
      <div className="space-y-5">
        <p className="text-[#8888a8] text-sm leading-relaxed">
          Once configured, your agent has access to 50 MCP tools. Here are some common commands to get started:
        </p>
        <div>
          <p className="text-xs text-[#55556a] mb-2 font-mono">Get your portfolio:</p>
          <CodeBlock lang="typescript" code={`// Ask your agent:
"Get my current portfolio and today's P&L"

// Agent calls:
robinhood_get_portfolio()
// → { equity: "$124,832", day_pnl: "+$2,341" }`} />
        </div>
        <div>
          <p className="text-xs text-[#55556a] mb-2 font-mono">Scan options:</p>
          <CodeBlock lang="typescript" code={`// Ask your agent:
"Scan AAPL options expiring next month"

// Agent calls:
robinhood_scan_options({ ticker: "AAPL", expiry: "2025-09" })
// → 847 contracts scanned, top call/put suggestions`} />
        </div>
        <div>
          <p className="text-xs text-[#55556a] mb-2 font-mono">Stream quotes:</p>
          <CodeBlock lang="typescript" code={`// Agent calls:
robinhood_get_quote({ ticker: "NVDA" })
// → { price: "$131.20", bid: "$131.18", ask: "$131.22" }`} />
        </div>
        <div className="glass rounded-xl p-4 border border-[#C9F028]/15">
          <p className="text-xs text-[#C9F028] font-mono mb-2">50 available tools include:</p>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              'get_portfolio', 'get_positions', 'get_quote',
              'place_order', 'cancel_order', 'get_orders',
              'scan_options', 'get_options_chain', 'place_options_order',
              'get_account', 'stream_quotes', '+ 39 more',
            ].map(t => (
              <span key={t} className="text-xs font-mono text-[#8888a8] flex items-center gap-1">
                <span className="text-[#C9F028]">›</span> {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
]

/* ─── Main ────────────────────────────────────────────────────────────── */
export default function HowTo() {
  const [active, setActive] = useState(0)
  const [completed, setCompleted] = useState<Set<number>>(new Set())
  const contentRef = useRef<HTMLDivElement>(null)

  const toggle = (i: number) => {
    if (active === i) return
    setActive(i)
    setCompleted(prev => { const n = new Set(prev); n.add(active); return n })
    setTimeout(() => contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100)
  }

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') toggle(Math.min(active + 1, SECTIONS.length - 1))
      if (e.key === 'ArrowUp') toggle(Math.max(active - 1, 0))
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [active])

  return (
    <>
      <Helmet>
        <title>How to Use HOODSCAN | MCP Tools Setup Guide</title>
        <meta name="description" content="Step-by-step guide to install and configure HOODSCAN MCP tools for your AI agent. Works with Claude Code, Codex, and any MCP-compatible autonomous agent." />
        <link rel="canonical" href="https://hoodscan.world/how-to" />
        <meta property="og:title" content="How to Use HOODSCAN | MCP Tools Setup Guide" />
        <meta property="og:description" content="Step-by-step guide to install and configure HOODSCAN MCP tools for your AI agent. Works with Claude Code, Codex, and any MCP-compatible autonomous agent." />
        <meta property="og:url" content="https://hoodscan.world/how-to" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://hoodscan.world/og-image.png" />
      </Helmet>
    <div className="min-h-screen pt-16 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-25 pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-[#7b61ff] opacity-[0.025] blur-[120px] pointer-events-none" />

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 glass-green rounded-full px-4 py-1.5 mb-6">
            <Terminal size={13} className="text-[#C9F028]" />
            <span className="text-xs font-mono text-[#C9F028]">Setup Guide</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#f0f0f8] mb-4">
            Up and running in <span className="gradient-text-green">minutes.</span>
          </h1>
          <p className="text-[#8888a8] max-w-xl mx-auto text-base">
            One command installs and connects HOODSCAN to your AI agent. Follow these steps to get started.
          </p>
        </motion.div>
      </section>

      {/* Steps */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20" ref={contentRef}>
        <ProgressBar current={completed.size + (completed.size > 0 ? 1 : 0)} total={SECTIONS.length} />

        {/* Step tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {SECTIONS.map((s, i) => (
            <motion.button
              key={s.id}
              onClick={() => toggle(i)}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all flex-shrink-0"
              style={{
                background: active === i ? `${s.color}10` : 'rgba(255,255,255,0.03)',
                borderColor: active === i ? `${s.color}35` : 'rgba(255,255,255,0.07)',
                color: active === i ? s.color : '#55556a',
              }}
            >
              <StepBadge n={i + 1} active={active === i} done={completed.has(i)} color={s.color} />
              <span className="hidden sm:block">{s.short}</span>
            </motion.button>
          ))}
        </div>

        {/* Active section */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="glass rounded-2xl overflow-hidden border border-white/6"
          >
            {/* Header */}
            <div
              className="flex items-center gap-4 px-6 py-5 border-b border-white/5"
              style={{ background: `linear-gradient(135deg, ${SECTIONS[active].color}06, transparent)` }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: `${SECTIONS[active].color}15` }}
              >
                {(() => { const Icon = SECTIONS[active].Icon; return <Icon size={20} style={{ color: SECTIONS[active].color }} /> })()}
              </div>
              <div>
                <div className="text-xs font-mono mb-0.5" style={{ color: SECTIONS[active].color }}>
                  Step {active + 1} of {SECTIONS.length}
                </div>
                <h2 className="text-lg font-bold text-[#f0f0f8]">{SECTIONS[active].title}</h2>
              </div>
              <div className="ml-auto flex gap-2">
                <button
                  onClick={() => toggle(Math.max(active - 1, 0))}
                  disabled={active === 0}
                  className="px-3 py-1.5 rounded-lg text-xs border border-white/8 text-[#55556a] hover:text-[#f0f0f8] hover:border-white/15 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Prev
                </button>
                <button
                  onClick={() => toggle(Math.min(active + 1, SECTIONS.length - 1))}
                  disabled={active === SECTIONS.length - 1}
                  className="px-3 py-1.5 rounded-lg text-xs border border-white/8 text-[#55556a] hover:text-[#f0f0f8] hover:border-white/15 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-6">
              {SECTIONS[active].content()}
            </div>

            {/* Footer nav */}
            <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs text-[#55556a]">
                Use ↑↓ arrow keys to navigate
              </span>
              {active < SECTIONS.length - 1 ? (
                <button
                  onClick={() => toggle(active + 1)}
                  className="flex items-center gap-2 text-sm font-medium text-[#C9F028] hover:text-[#f0f0f8] transition-colors"
                >
                  Next: {SECTIONS[active + 1].short}
                  <ArrowRight size={14} />
                </button>
              ) : (
                <Link to="/login" className="flex items-center gap-2 text-sm font-medium text-[#C9F028]">
                  Launch App <ArrowRight size={14} />
                </Link>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* All steps collapsed overview */}
        <div className="mt-6 space-y-2">
          {SECTIONS.map((s, i) => (
            i !== active && (
              <motion.button
                key={s.id}
                onClick={() => toggle(i)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="w-full flex items-center gap-4 glass rounded-xl px-5 py-3.5 border border-white/5 hover:border-white/10 transition-all text-left"
              >
                <StepBadge n={i + 1} active={false} done={completed.has(i)} color={s.color} />
                <div className="flex-1">
                  <span className="text-sm font-medium text-[#8888a8]">{s.title}</span>
                </div>
                <ChevronDown size={15} className="text-[#55556a]" />
              </motion.button>
            )
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 text-center border border-white/5"
        >
          <h2 className="text-xl font-bold text-[#f0f0f8] mb-3">Ready to run?</h2>
          <p className="text-[#8888a8] text-sm mb-6">
            Connect your wallet and explore the live dashboard, or head straight to GitHub.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/login" className="btn-primary flex items-center justify-center gap-2 py-3 px-7">
              Launch App <ArrowRight size={16} />
            </Link>
            <a
              href="https://github.com/hoodscanworld/hoodscanworld.github.io"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center justify-center gap-2 py-3 px-7"
            >
              GitHub Repo <ExternalLink size={14} />
            </a>
          </div>
        </motion.div>
      </section>
    </div>
    </>
  )
}
