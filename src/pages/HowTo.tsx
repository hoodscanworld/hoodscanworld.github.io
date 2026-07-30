import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Terminal, Cpu, BarChart3, Download, ChevronRight, CheckCircle, ArrowRight, Copy } from 'lucide-react'
import { useState } from 'react'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

function CodeBlock({ code, lang = 'bash' }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard?.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="relative group rounded-xl overflow-hidden border border-white/8">
      <div className="flex items-center justify-between px-4 py-2.5 bg-white/3 border-b border-white/5">
        <span className="text-xs font-mono text-[#55556a]">{lang}</span>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 text-xs text-[#55556a] hover:text-[#00ff94] transition-colors"
        >
          <Copy size={12} />
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm font-mono leading-6 bg-[#080810]">
        <code className="text-[#f0f0f8]">{code}</code>
      </pre>
    </div>
  )
}

const sections = [
  {
    id: 'prerequisites',
    icon: <Download size={18} />,
    title: 'Prerequisites',
    color: '#00ff94',
    content: (
      <div className="space-y-4">
        <p className="text-[#8888a8] text-sm leading-relaxed">
          HOODSCAN requires Bun (not Node.js) and Google Chrome for the initial Robinhood authentication. Once authenticated, the session is stored and reused automatically.
        </p>
        <div className="space-y-3">
          {[
            { label: 'Bun v1.3+', desc: 'Runtime for HOODSCAN', link: 'https://bun.sh' },
            { label: 'Google Chrome', desc: 'Required for browser-based Robinhood login (one-time)', link: 'https://google.com/chrome' },
            { label: 'A Robinhood account', desc: 'Any account type works including free tier', link: 'https://robinhood.com' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-3 glass rounded-lg px-4 py-3">
              <CheckCircle size={15} className="text-[#00ff94] flex-shrink-0" />
              <div className="flex-1">
                <span className="font-medium text-[#f0f0f8] text-sm">{item.label}</span>
                <span className="text-[#55556a] text-xs ml-2">{item.desc}</span>
              </div>
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-xs text-[#00ff94] hover:underline font-mono">
                Install
              </a>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <p className="text-xs text-[#55556a] mb-2">Install Bun:</p>
          <CodeBlock code="curl -fsSL https://bun.sh/install | bash" />
        </div>
      </div>
    ),
  },
  {
    id: 'install',
    icon: <Terminal size={18} />,
    title: 'Install and Onboard',
    color: '#7b61ff',
    content: (
      <div className="space-y-4">
        <p className="text-[#8888a8] text-sm leading-relaxed">
          The onboard command handles everything: agent detection, MCP registration, skill installation (where supported), and Robinhood login. Run it once per machine.
        </p>
        <div>
          <p className="text-xs text-[#55556a] mb-2">Guided onboarding (recommended):</p>
          <CodeBlock code="npx robinhood-for-agents onboard" />
        </div>
        <div>
          <p className="text-xs text-[#55556a] mb-2">Or target your agent directly:</p>
          <CodeBlock code={`npx robinhood-for-agents onboard --agent claude-code\nnpx robinhood-for-agents onboard --agent codex\nnpx robinhood-for-agents onboard --agent openclaw`} />
        </div>
        <div className="glass-green rounded-xl p-4">
          <p className="text-xs font-semibold text-[#00ff94] mb-1">What onboard does</p>
          <ul className="text-xs text-[#8888a8] space-y-1.5">
            <li className="flex items-start gap-2"><ChevronRight size={12} className="text-[#00ff94] mt-0.5 flex-shrink-0" />Detects your agent and writes the correct MCP server config</li>
            <li className="flex items-start gap-2"><ChevronRight size={12} className="text-[#00ff94] mt-0.5 flex-shrink-0" />Installs the unified trading skill (Claude Code and OpenClaw)</li>
            <li className="flex items-start gap-2"><ChevronRight size={12} className="text-[#00ff94] mt-0.5 flex-shrink-0" />Opens Chrome for a one-time Robinhood login</li>
            <li className="flex items-start gap-2"><ChevronRight size={12} className="text-[#00ff94] mt-0.5 flex-shrink-0" />Stores tokens in your OS keychain (or encrypted file for Docker)</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 'agents',
    icon: <Cpu size={18} />,
    title: 'Configure Your Agent',
    color: '#00d4ff',
    content: (
      <div className="space-y-5">
        <p className="text-[#8888a8] text-sm leading-relaxed">
          After onboarding, restart your agent to pick up the MCP server. Manual configuration is only needed if you skip onboard.
        </p>
        {[
          {
            name: 'Claude Code',
            code: `# Registered automatically by onboard.\n# Verify with:\nclaude mcp list`,
          },
          {
            name: 'Codex',
            code: `# Registered automatically by onboard.\n# Or manually:\ncodex mcp add robinhood-for-agents -- bunx robinhood-for-agents`,
          },
          {
            name: 'Claude Desktop (manual)',
            code: `// ~/Library/Application Support/Claude/claude_desktop_config.json\n{\n  "mcpServers": {\n    "robinhood-for-agents": {\n      "command": "bunx",\n      "args": ["robinhood-for-agents"]\n    }\n  }\n}`,
          },
        ].map(item => (
          <div key={item.name}>
            <p className="text-xs font-semibold text-[#f0f0f8] mb-2">{item.name}</p>
            <CodeBlock code={item.code} lang="bash" />
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'tools',
    icon: <BarChart3 size={18} />,
    title: 'Using the 50 MCP Tools',
    color: '#00ff94',
    content: (
      <div className="space-y-4">
        <p className="text-[#8888a8] text-sm leading-relaxed">
          Once the MCP server is running, your agent has access to 50 tools. Here are the most commonly used:
        </p>
        <div className="space-y-3">
          {[
            { tool: 'robinhood_get_portfolio()', desc: 'Returns equity, day P&L, total return, and buying power.' },
            { tool: 'robinhood_get_positions()', desc: 'All current equity positions with unrealized P&L.' },
            { tool: 'robinhood_get_quote("AAPL")', desc: 'Real-time quote including ask, bid, volume, IV.' },
            { tool: 'robinhood_place_order({ ticker, side, quantity })', desc: 'Market or limit order placement. Supports fractional shares.' },
            { tool: 'robinhood_scan_options("NVDA", expiry: "2025-08")', desc: 'Full options chain with Greeks, IV, and open interest.' },
            { tool: 'robinhood_get_earnings_calendar()', desc: 'Upcoming earnings dates for watchlist tickers.' },
          ].map(item => (
            <div key={item.tool} className="glass rounded-xl p-4">
              <code className="text-[#00ff94] text-xs font-mono block mb-1">{item.tool}</code>
              <p className="text-xs text-[#8888a8]">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-2">
          <p className="text-xs text-[#55556a] mb-2">TypeScript client (programmatic use):</p>
          <CodeBlock lang="typescript" code={`import { RobinhoodClient } from 'robinhood-for-agents'\n\nconst rh = new RobinhoodClient()\nawait rh.restoreSession()\n\nconst portfolio = await rh.getPortfolio()\nconsole.log(portfolio.equity) // "$124,832.40"\n\nconst positions = await rh.getPositions()\nconst options = await rh.getOptionsChain('AAPL', { expiry: '2025-08' })`} />
        </div>
      </div>
    ),
  },
  {
    id: 'docker',
    icon: <Terminal size={18} />,
    title: 'Docker / Headless Deployment',
    color: '#7b61ff',
    content: (
      <div className="space-y-4">
        <p className="text-[#8888a8] text-sm leading-relaxed">
          For servers and CI environments, use encrypted file storage instead of the OS keychain. Onboard interactively first, then copy the encrypted token file to the container.
        </p>
        <CodeBlock lang="bash" code={`# Onboard with encrypted file storage\nROBINHOOD_TOKEN_STORE=file npx robinhood-for-agents onboard\n\n# Copy the token file to your server / CI secrets\n# Default path: ~/.robinhood-for-agents/tokens.enc`} />
        <div>
          <p className="text-xs text-[#55556a] mb-2">docker-compose.yml:</p>
          <CodeBlock lang="yaml" code={`services:\n  agent:\n    image: your-agent-image\n    environment:\n      ROBINHOOD_TOKEN_STORE: file\n      ROBINHOOD_TOKEN_PATH: /run/secrets/rh_tokens\n    secrets:\n      - rh_tokens\n\nsecrets:\n  rh_tokens:\n    file: ./secrets/tokens.enc`} />
        </div>
        <p className="text-xs text-[#55556a] mt-2">
          See <a href="https://github.com/hoodscanworld/hoodscanworld.github.io" target="_blank" rel="noopener noreferrer" className="text-[#00ff94] hover:underline">docs/DOCKER.md</a> for a full walkthrough including token rotation and health checks.
        </p>
      </div>
    ),
  },
]

export default function HowTo() {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  return (
    <div className="min-h-screen pt-16 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-[#00ff94] opacity-[0.02] blur-[100px] pointer-events-none" />

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 relative">
        <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 glass-green rounded-full px-4 py-1.5 mb-6">
            <Terminal size={13} className="text-[#00ff94]" />
            <span className="text-xs font-mono text-[#00ff94]">Documentation</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#f0f0f8] mb-5">
            Getting started with
            <br />
            <span className="gradient-text-green">HOODSCAN</span>
          </h1>
          <p className="text-base sm:text-lg text-[#8888a8] max-w-2xl leading-relaxed mb-8">
            From zero to a fully operational AI trading agent in under 5 minutes. This guide covers prerequisites, installation, agent configuration, and the 50 MCP tools.
          </p>
          {/* Jump links */}
          <div className="flex flex-wrap gap-2">
            {sections.map(s => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-xs font-mono text-[#8888a8] hover:text-[#00ff94] glass px-3 py-1.5 rounded-lg transition-colors"
              >
                {s.title}
              </a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Sections */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-6">
        {sections.map((section, i) => (
          <motion.div
            key={section.id}
            id={section.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: i * 0.04 }}
            className="glass rounded-2xl overflow-hidden"
          >
            <button
              onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
              className="w-full flex items-center gap-4 p-6 text-left hover:bg-white/2 transition-colors"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${section.color}12`, color: section.color }}
              >
                {section.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-[#55556a]">0{i + 1}</span>
                  <h2 className="font-semibold text-[#f0f0f8] text-base sm:text-lg">{section.title}</h2>
                </div>
              </div>
              <ChevronRight
                size={18}
                className={`text-[#55556a] transition-transform ${
                  activeSection === section.id ? 'rotate-90' : ''
                }`}
              />
            </button>
            <div
              className={`transition-all duration-300 ${
                activeSection !== section.id && i !== 0 ? 'hidden' : ''
              }`}
            >
              <div className="px-6 pb-6 border-t border-white/5 pt-5">
                {section.content}
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 text-center"
        >
          <h2 className="text-xl font-bold text-[#f0f0f8] mb-3">Ready to run?</h2>
          <p className="text-[#8888a8] text-sm mb-6">Connect your wallet and explore the live dashboard, or head straight to GitHub.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/login"
              className="btn-primary flex items-center justify-center gap-2 py-3 px-7"
            >
              Launch App
              <ArrowRight size={16} />
            </Link>
            <a
              href="https://github.com/hoodscanworld/hoodscanworld.github.io"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center justify-center gap-2 py-3 px-7"
            >
              GitHub Repo
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
