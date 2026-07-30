import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Target, Cpu, Users, ArrowRight, GitFork, Zap, Shield, Globe } from 'lucide-react'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const values = [
  {
    icon: <Cpu size={20} />,
    title: 'Agent-First Architecture',
    description: 'Every tool, every API, every data structure is designed for programmatic consumption by AI agents. Human interfaces are secondary to machine interfaces.',
    color: '#00ff94',
  },
  {
    icon: <Shield size={20} />,
    title: 'No Trust, Full Verify',
    description: 'Self-renewing sessions, OS keychain storage, encrypted file modes for Docker. We take zero shortcuts on authentication and credential safety.',
    color: '#7b61ff',
  },
  {
    icon: <Globe size={20} />,
    title: 'Open by Default',
    description: 'MIT licensed. The full source is on GitHub. Forkable, auditable, and extensible. We build in the open because the technology works better that way.',
    color: '#00d4ff',
  },
  {
    icon: <Zap size={20} />,
    title: 'Zero Friction Uptime',
    description: 'Token refresh happens proactively. 401 recovery is automatic. An agent running HOODSCAN never hits a re-auth wall mid-strategy.',
    color: '#00ff94',
  },
]

const timeline = [
  { year: '2024', label: 'Core MCP server', desc: '50 tools covering equity trading, options, and portfolio management. Pluggable token storage with OS keychain and encrypted file modes.' },
  { year: '2025 Q1', label: 'TypeScript client library', desc: '70+ async methods expose the full Robinhood API surface to code. Full Zod validation on every response shape.' },
  { year: '2025 Q2', label: 'Multi-agent rollout', desc: 'Native support for Claude Code, Codex, OpenClaw, and generic MCP clients. Unified trading skill for guided workflows.' },
  { year: '2025 Q3', label: 'HOODSCAN rebrand', desc: 'Wallet-native authentication (MetaMask, Phantom), a full web dashboard, and a public-facing demo platform for the next generation of autonomous traders.' },
]

export default function About() {
  return (
    <div className="min-h-screen pt-16 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#7b61ff] opacity-[0.025] blur-[120px] pointer-events-none" />

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center relative">
        <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 glass-green rounded-full px-4 py-1.5 mb-6">
            <Users size={13} className="text-[#00ff94]" />
            <span className="text-xs font-mono text-[#00ff94]">About HOODSCAN</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#f0f0f8] mb-6">
            The AI-native trading layer
            <br />
            <span className="gradient-text-green">built for agents, not dashboards.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#8888a8] max-w-2xl mx-auto leading-relaxed">
            HOODSCAN started as a technical answer to a simple question: why can't an AI agent just trade? Not via some bloated middleware, not via screen scraping, not via brittle browser extensions. Via a clean, typed, self-authenticating API that any MCP-compatible agent can call in milliseconds.
          </p>
        </motion.div>
      </section>

      {/* Mission */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 sm:p-12 border border-[#00ff94]/10"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#00ff94]/10 flex items-center justify-center">
              <Target size={20} className="text-[#00ff94]" />
            </div>
            <h2 className="text-xl font-bold text-[#f0f0f8]">Our mission</h2>
          </div>
          <p className="text-[#8888a8] leading-relaxed text-base sm:text-lg max-w-3xl">
            We build the infrastructure that makes autonomous financial agents practical. That means solving the hard problems: session management under continuous load, type-safe API contracts that don't break on Robinhood schema changes, and credential storage models that work in every deployment environment from a developer's MacBook to a headless Docker container.
          </p>
          <p className="text-[#8888a8] leading-relaxed text-base sm:text-lg max-w-3xl mt-4">
            The trading decision belongs to the agent. The market access belongs to HOODSCAN.
          </p>
        </motion.div>
      </section>

      {/* Values */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-[#f0f0f8] mb-3">What we stand for</h2>
          <p className="text-[#8888a8]">The principles that shape every design decision.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 gap-5">
          {values.map((val, i) => (
            <motion.div
              key={val.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-xl p-6"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ background: `${val.color}12`, color: val.color }}
              >
                {val.icon}
              </div>
              <h3 className="font-semibold text-[#f0f0f8] mb-2">{val.title}</h3>
              <p className="text-sm text-[#8888a8] leading-relaxed">{val.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-[#f0f0f8] mb-3">How we got here</h2>
        </motion.div>
        <div className="relative">
          <div className="absolute left-4 sm:left-[calc(120px+1px)] top-0 bottom-0 w-px bg-gradient-to-b from-[#00ff94]/20 via-[#7b61ff]/20 to-transparent" />
          <div className="space-y-8">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 sm:gap-0"
              >
                <div className="hidden sm:block w-28 text-right pr-8 pt-0.5">
                  <span className="text-xs font-mono text-[#00ff94]">{item.year}</span>
                </div>
                <div className="relative flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#00ff94] mt-1.5 relative z-10 sm:ml-[-1px]" />
                </div>
                <div className="flex-1 sm:pl-8 pb-2">
                  <div className="sm:hidden text-xs font-mono text-[#00ff94] mb-1">{item.year}</div>
                  <h3 className="font-semibold text-[#f0f0f8] mb-1.5 text-sm">{item.label}</h3>
                  <p className="text-sm text-[#8888a8] leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 sm:p-12 text-center border border-white/5"
        >
          <h2 className="text-2xl font-bold text-[#f0f0f8] mb-3">We build in the open</h2>
          <p className="text-[#8888a8] mb-6 max-w-lg mx-auto">
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
  )
}
