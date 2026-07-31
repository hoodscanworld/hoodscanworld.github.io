import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HelpCircle, ChevronDown, Shield, Cpu, Lock, Zap, Globe, BarChart3, ArrowRight } from 'lucide-react'

const CATEGORIES = [
  {
    icon: Cpu,
    color: '#C9F028',
    label: 'General',
    items: [
      {
        q: 'What is HOODSCAN?',
        a: 'HOODSCAN is an open-source AI trading intelligence platform. It exposes 50+ MCP (Model Context Protocol) tools that let autonomous AI agents trade stocks, scan markets, manage portfolios, and execute orders on Robinhood without any human intervention.',
      },
      {
        q: 'Is HOODSCAN affiliated with Robinhood?',
        a: 'No. HOODSCAN is an independent open-source project. "Robinhood" is a trademark of Robinhood Markets, Inc. HOODSCAN is not affiliated with, endorsed by, or sponsored by Robinhood.',
      },
      {
        q: 'Is HOODSCAN free to use?',
        a: 'Yes. HOODSCAN is MIT licensed and completely free. The full source code is on GitHub. You can fork it, audit it, and extend it without restriction.',
      },
      {
        q: 'What platforms does HOODSCAN run on?',
        a: 'HOODSCAN runs on Linux, macOS, and Windows. It is designed primarily for server environments and CI pipelines where AI agents operate autonomously, but it works on any machine with Node.js installed.',
      },
    ],
  },
  {
    icon: Shield,
    color: '#7b61ff',
    label: 'Security and Auth',
    items: [
      {
        q: 'How does authentication work?',
        a: 'HOODSCAN uses a browser-based one-time login to obtain a session token, then stores it in your OS keychain (Keychain on macOS, Secret Service on Linux, Credential Manager on Windows). The token is refreshed proactively before expiry so your agent never hits an auth wall mid-trade.',
      },
      {
        q: 'Is it safe to use HOODSCAN with a real account?',
        a: 'HOODSCAN stores credentials locally in your OS keychain and never transmits them to a third-party server. That said, automated trading carries inherent financial risk. Use at your own discretion and always test with small amounts first.',
      },
      {
        q: 'Does HOODSCAN store my Robinhood password?',
        a: 'No. HOODSCAN never stores your Robinhood username or password. It obtains an OAuth session token through the official login flow and stores only that token in your OS keychain.',
      },
      {
        q: 'Can I use HOODSCAN in a Docker container?',
        a: 'Yes. HOODSCAN supports an encrypted file mode for Docker and other containerized environments where OS keychain is unavailable. The session token is AES-256 encrypted and stored in a file you specify.',
      },
    ],
  },
  {
    icon: Zap,
    color: '#00d4ff',
    label: 'AI Agents and MCP',
    items: [
      {
        q: 'What AI agents does HOODSCAN support?',
        a: 'Any MCP-compatible agent works out of the box. Native first-class support is provided for Claude Code, Codex, OpenClaw, and Claude Desktop. The unified MCP interface means any agent following the spec will work.',
      },
      {
        q: 'What is MCP?',
        a: 'MCP (Model Context Protocol) is an open standard that allows AI language models to call external tools and services in a structured, typed way. HOODSCAN implements MCP so AI agents can call trading functions like get_portfolio or place_order the same way they call any other tool.',
      },
      {
        q: 'How many tools does HOODSCAN expose?',
        a: 'HOODSCAN currently exposes 50+ MCP tools across 7 categories: Portfolio, Market Data, Orders, Options, Crypto, Data, and Account. New tools are added with every release.',
      },
      {
        q: 'Can my agent place real orders?',
        a: 'Yes. HOODSCAN tools include place_order, place_options_order, cancel_order, and more. These execute against your live Robinhood account. Always test your agent logic in paper trading mode before going live.',
      },
    ],
  },
  {
    icon: BarChart3,
    color: '#C9F028',
    label: 'Trading and Features',
    items: [
      {
        q: 'Does HOODSCAN support options trading?',
        a: 'Yes. HOODSCAN includes a full options suite: get_options_chain, get_options_positions, place_options_order, find_options_by_expiration, get_options_market_data, and more. Multi-leg strategies are supported.',
      },
      {
        q: 'Does HOODSCAN support crypto trading?',
        a: 'Yes. HOODSCAN supports crypto quotes, crypto orders, and crypto portfolio tracking through Robinhood Crypto. Supported assets include BTC, ETH, SOL, DOGE, and all other coins available on Robinhood.',
      },
      {
        q: 'Can I scan the market for specific signals?',
        a: 'Yes. Tools like get_movers, get_top_gainers, get_top_losers, search_stocks, and get_quotes let your agent scan the full market and filter for any signal your strategy requires.',
      },
      {
        q: 'Does HOODSCAN support portfolio history and analytics?',
        a: 'Yes. get_portfolio_history returns equity snapshots over any time span. get_total_return calculates annualized performance since account inception. get_dividends tracks income history and upcoming payouts.',
      },
    ],
  },
  {
    icon: Globe,
    color: '#7b61ff',
    label: 'Open Source and Roadmap',
    items: [
      {
        q: 'Where is the source code?',
        a: 'The full source is on GitHub at github.com/hoodscanworld. It is MIT licensed, publicly forkable, and open to contributions.',
      },
      {
        q: 'How do I report a bug or request a feature?',
        a: 'Open an issue on the GitHub repository. Pull requests are welcome. For security disclosures, please use the private security advisory feature on GitHub rather than a public issue.',
      },
      {
        q: 'What is on the HOODSCAN roadmap?',
        a: 'Upcoming: Mobile Agent SDK (Q3 2026), Options Strategy Builder with backtesting (Q4 2026), DeFi and cross-chain support via Solana and EVM (Q1 2027), and HOODSCAN Pro with multi-account aggregation and institutional analytics (Q2 2027+).',
      },
    ],
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<string | null>(null)

  const toggle = (key: string) => setOpen(prev => (prev === key ? null : key))

  return (
    <>
      <Helmet>
        <title>FAQ | HOODSCAN AI Trading Intelligence</title>
        <meta name="description" content="Frequently asked questions about HOODSCAN: how it works, security, supported AI agents, MCP tools, options trading, crypto, and the open-source roadmap." />
        <link rel="canonical" href="https://hoodscan.world/faq" />
        <meta property="og:title" content="FAQ | HOODSCAN AI Trading Intelligence" />
        <meta property="og:description" content="Everything you need to know about HOODSCAN: security, AI agent support, MCP tools, trading features, and the open-source roadmap." />
        <meta property="og:url" content="https://hoodscan.world/faq" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://hoodscan.world/og-image.png" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': CATEGORIES.flatMap(cat =>
            cat.items.map(item => ({
              '@type': 'Question',
              'name': item.q,
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': item.a,
              },
            }))
          ),
        })}</script>
      </Helmet>

      <div className="min-h-screen pt-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-25 pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-[#C9F028] opacity-[0.02] blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[#7b61ff] opacity-[0.025] blur-[120px] pointer-events-none" />

        {/* Hero */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 glass-green rounded-full px-4 py-1.5 mb-6">
              <HelpCircle size={13} className="text-[#C9F028]" />
              <span className="text-xs font-mono text-[#C9F028]">Frequently Asked Questions</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#f0f0f8] mb-5 leading-tight">
              Everything you need to know<br />
              <span className="gradient-text-green">about HOODSCAN.</span>
            </h1>
            <p className="text-base sm:text-lg text-[#8888a8] max-w-2xl mx-auto leading-relaxed">
              Answers to the most common questions about security, AI agent support,
              MCP tools, and the open-source roadmap.
            </p>
          </motion.div>
        </section>

        {/* FAQ Categories */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 space-y-10">
          {CATEGORIES.map((cat, ci) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: ci * 0.07 }}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${cat.color}14` }}
                >
                  <cat.icon size={16} style={{ color: cat.color }} />
                </div>
                <h2 className="text-sm font-semibold tracking-widest uppercase text-[#55556a]">
                  {cat.label}
                </h2>
              </div>

              {/* Questions */}
              <div className="space-y-2">
                {cat.items.map((item, ii) => {
                  const key = `${ci}-${ii}`
                  const isOpen = open === key
                  return (
                    <div
                      key={key}
                      className="glass rounded-xl border border-white/5 overflow-hidden"
                      style={isOpen ? { borderColor: `${cat.color}22` } : {}}
                    >
                      <button
                        onClick={() => toggle(key)}
                        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left group"
                      >
                        <span className={`text-sm font-medium transition-colors ${isOpen ? 'text-[#f0f0f8]' : 'text-[#c8c8e0] group-hover:text-[#f0f0f8]'}`}>
                          {item.q}
                        </span>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex-shrink-0"
                        >
                          <ChevronDown
                            size={16}
                            style={{ color: isOpen ? cat.color : '#55556a' }}
                          />
                        </motion.div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22, ease: 'easeInOut' }}
                          >
                            <div className="px-5 pb-5">
                              <div className="h-px bg-white/5 mb-4" />
                              <p className="text-sm text-[#8888a8] leading-relaxed">{item.a}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          ))}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl border border-white/5 p-8 text-center mt-8"
          >
            <Lock size={24} className="text-[#C9F028] mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-[#f0f0f8] mb-2">Still have questions?</h3>
            <p className="text-sm text-[#8888a8] mb-6 max-w-md mx-auto">
              Open an issue on GitHub or explore the How It Works guide for a full walkthrough of setup and usage.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://github.com/hoodscanworld/hoodscanworld.github.io/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm py-2.5 px-6 flex items-center justify-center gap-2"
              >
                Open a GitHub Issue
              </a>
              <Link
                to="/how-to"
                className="btn-primary text-sm py-2.5 px-6 flex items-center justify-center gap-2 group"
              >
                How It Works
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  )
}
