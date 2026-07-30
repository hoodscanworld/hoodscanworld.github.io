import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, Zap, Shield, Brain, Terminal,
  Globe, Lock, TrendingUp, ChevronRight, Cpu,
} from 'lucide-react'

/* ─── Particle Canvas ─────────────────────────────────────────────────── */
function ParticleCanvas({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let w = (canvas.width = canvas.offsetWidth)
    let h = (canvas.height = canvas.offsetHeight)
    let raf = 0

    const N = 90
    const CONNECT = 140
    const REPEL = 110
    type P = { x: number; y: number; vx: number; vy: number; r: number }
    const pts: P[] = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r: Math.random() * 1.4 + 0.5,
    }))

    const resize = () => {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', resize)

    // Listen on parent section so canvas pointer-events-none doesn't block buttons
    const section = sectionRef.current
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 } }
    if (section) {
      section.addEventListener('mousemove', onMove)
      section.addEventListener('mouseleave', onLeave)
    }

    const tick = () => {
      ctx.clearRect(0, 0, w, h)
      const mx = mouse.current.x, my = mouse.current.y

      for (const p of pts) {
        const dx = p.x - mx, dy = p.y - my
        const d = Math.hypot(dx, dy)
        if (d < REPEL) {
          const f = (REPEL - d) / REPEL * 0.35
          p.vx += (dx / d) * f
          p.vy += (dy / d) * f
        }
        p.vx *= 0.978; p.vy *= 0.978
        const spd = Math.hypot(p.vx, p.vy)
        if (spd > 1.6) { p.vx = p.vx / spd * 1.6; p.vy = p.vy / spd * 1.6 }
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0
      }

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y)
          if (d < CONNECT) {
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(201,240,40,${(1 - d / CONNECT) * 0.13})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      for (const p of pts) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(201,240,40,0.38)'
        ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      if (section) {
        section.removeEventListener('mousemove', onMove)
        section.removeEventListener('mouseleave', onLeave)
      }
    }
  }, [sectionRef])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}

/* ─── Typewriter ──────────────────────────────────────────────────────── */
function useTypewriter(words: string[], speed = 75, pause = 1800) {
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
      let v = 0
      const step = to / 60
      const id = setInterval(() => {
        v = Math.min(v + step, to)
        setN(Math.floor(v))
        if (v >= to) clearInterval(id)
      }, 16)
    })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [to])

  return <span ref={ref}>{n}{suffix}</span>
}

/* ─── Terminal Demo ───────────────────────────────────────────────────── */
const LINES = [
  { t: '$ hoodscan login --agent claude-code', c: '#C9F028' },
  { t: '  Authenticating with Robinhood...', c: '#55556a' },
  { t: '  Session stored in OS keychain ✓', c: '#55556a' },
  { t: '  50 MCP tools registered ✓', c: '#C9F028' },
  { t: '', c: '' },
  { t: '> robinhood_get_portfolio()', c: '#f0f0f8' },
  { t: '  { equity: "$124,832.40", day_pnl: "+$2,341.12" }', c: '#7b61ff' },
  { t: '> robinhood_scan_options("AAPL")', c: '#f0f0f8' },
  { t: '  Scanning 847 contracts...', c: '#55556a' },
  { t: '  Top call: AAPL $225 Aug @ $3.40 (IV: 34.2%)', c: '#7b61ff' },
]

function TerminalDemo() {
  const [n, setN] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      obs.disconnect()
      let i = 0
      const id = setInterval(() => { i++; setN(i); if (i >= LINES.length) clearInterval(id) }, 320)
      return () => clearInterval(id)
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className="glass rounded-2xl overflow-hidden border border-white/8 shadow-2xl">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-[#C9F028]/50" />
        </div>
        <span className="ml-2 text-xs font-mono text-[#55556a]">hoodscan terminal</span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#C9F028] pulse-dot" />
          <span className="text-[10px] font-mono text-[#C9F028]">LIVE</span>
        </div>
      </div>
      <div className="p-5 font-mono text-sm leading-7 min-h-[280px]">
        {LINES.slice(0, n).map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.18 }}
            style={{ color: l.c || 'transparent' }}
          >
            {l.t || '\u00A0'}
          </motion.div>
        ))}
        {n < LINES.length && <span className="text-[#C9F028] cursor-blink">_</span>}
      </div>
    </div>
  )
}

/* ─── Features ────────────────────────────────────────────────────────── */
const FEATURES = [
  { icon: Terminal, title: '50 MCP Tools', desc: 'Full market access from any MCP-compatible agent. Place orders, read portfolios, scan options chains, stream quotes.', color: '#C9F028' },
  { icon: Brain, title: 'Multi-Agent Ready', desc: 'Native support for Claude Code, Codex, OpenClaw, and any MCP client. One install, every agent.', color: '#7b61ff' },
  { icon: TrendingUp, title: 'Options Intelligence', desc: 'Full options chain scanning, Greeks analysis, and multi-leg order construction. AI-native contract selection.', color: '#00d4ff' },
  { icon: Shield, title: 'Self-Renewing Sessions', desc: 'Tokens refresh proactively ahead of expiry and auto-recover on 401. No re-auth interruptions during trading.', color: '#C9F028' },
  { icon: Globe, title: 'Portfolio Scanner', desc: 'Real-time P&L tracking, position aggregation, FIFO realized gains, and risk exposure summaries.', color: '#7b61ff' },
  { icon: Lock, title: 'Pluggable Token Store', desc: 'OS keychain by default. Encrypted file mode for Docker and headless deployments. Zero secrets in plain text.', color: '#00d4ff' },
]

const STATS = [
  { to: 50, suffix: '+', label: 'MCP Tools', Icon: Terminal },
  { to: 70, suffix: '+', label: 'Async Methods', Icon: Zap },
  { to: 4, suffix: '', label: 'AI Platforms', Icon: Cpu },
  { to: 0, suffix: 'ms', label: 'Auth Delay', Icon: Zap },
]

const INTEGRATIONS = [
  { name: 'Claude Code', tag: 'Native MCP', c: '#C9F028' },
  { name: 'Codex', tag: 'Native MCP', c: '#7b61ff' },
  { name: 'OpenClaw', tag: 'Skill + MCP', c: '#00d4ff' },
  { name: 'Claude Desktop', tag: 'MCP Config', c: '#C9F028' },
  { name: 'MetaMask', tag: 'Wallet Auth', c: '#f6851b' },
  { name: 'Phantom', tag: 'Wallet Auth', c: '#ab9ff2' },
]

/* ─── Main ────────────────────────────────────────────────────────────── */
export default function Home() {
  const words = ['Trade autonomously.', 'Scan options chains.', 'Manage portfolios.', 'Build alpha.']
  const typed = useTypewriter(words)
  const heroRef = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 600], [0, -80])
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  return (
    <div className="relative">
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden" ref={heroRef}>
        {/* Canvas is pointer-events-none; mouse events handled on the section */}
        <ParticleCanvas sectionRef={heroRef} />
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-[#C9F028] opacity-[0.022] blur-[160px] pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-[#7b61ff] opacity-[0.03] blur-[120px] pointer-events-none" />

        <motion.div style={{ y: heroY }} className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Left */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 glass-green rounded-full px-4 py-1.5 mb-8"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9F028] pulse-dot" />
                <span className="text-xs font-mono text-[#C9F028]">AI-Native Trading Layer · v2.0</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="text-5xl sm:text-6xl font-bold text-[#f0f0f8] leading-[1.08] mb-6"
              >
                Give your agent<br />
                <span className="gradient-text-green">market superpowers.</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="h-9 mb-6"
              >
                <span className="text-xl text-[#8888a8] font-mono">
                  {typed}
                  <span className="text-[#C9F028] cursor-blink">|</span>
                </span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-[#8888a8] text-base leading-relaxed mb-10 max-w-md"
              >
                HOODSCAN gives any MCP-compatible AI agent full access to Robinhood — 50+ tools, real-time market data, options intelligence, and self-renewing authentication.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  to="/login"
                  className="btn-primary flex items-center justify-center gap-2 text-base py-3.5 px-8 group"
                >
                  Get Started Free
                  <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/how-to"
                  className="btn-secondary flex items-center justify-center gap-2 text-base py-3.5 px-8"
                >
                  View Docs
                  <ChevronRight size={16} />
                </Link>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-6 mt-10"
              >
                <div className="flex items-center gap-1.5">
                  <Shield size={13} className="text-[#C9F028]" />
                  <span className="text-xs text-[#55556a]">MIT Licensed</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap size={13} className="text-[#C9F028]" />
                  <span className="text-xs text-[#55556a]">Zero Auth Delay</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe size={13} className="text-[#C9F028]" />
                  <span className="text-xs text-[#55556a]">Open Source</span>
                </div>
              </motion.div>
            </div>

            {/* Right – Terminal */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
            >
              <TerminalDemo />
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-[#C9F028]/60" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 relative border-y border-white/4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {STATS.map(({ to, suffix, label, Icon }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="flex justify-center mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#C9F028]/8 flex items-center justify-center">
                    <Icon size={18} className="text-[#C9F028]" />
                  </div>
                </div>
                <div className="text-4xl font-bold gradient-text-green mb-1">
                  <Counter to={to} suffix={suffix} />
                </div>
                <div className="text-sm text-[#55556a]">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#f0f0f8] mb-4">
              Everything an agent needs.
              <br />
              <span className="gradient-text-green">Nothing it doesn't.</span>
            </h2>
            <p className="text-[#8888a8] max-w-xl mx-auto text-sm">
              Built from the ground up for programmatic consumption. No bloated middleware, no brittle wrappers.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                onHoverStart={() => setHoveredFeature(i)}
                onHoverEnd={() => setHoveredFeature(null)}
                className="glass rounded-2xl p-6 border border-white/5 cursor-default relative overflow-hidden transition-colors"
                style={{
                  borderColor: hoveredFeature === i ? `${f.color}25` : undefined,
                }}
              >
                <AnimatePresence>
                  {hoveredFeature === i && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: `radial-gradient(ellipse at 20% 20%, ${f.color}08, transparent 70%)` }}
                    />
                  )}
                </AnimatePresence>
                <motion.div
                  animate={{ scale: hoveredFeature === i ? 1.1 : 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${f.color}12` }}
                >
                  <f.icon size={20} style={{ color: f.color }} />
                </motion.div>
                <h3 className="font-semibold text-[#f0f0f8] mb-2">{f.title}</h3>
                <p className="text-sm text-[#8888a8] leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Integrations ── */}
      <section className="py-20 relative border-t border-white/4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-bold text-[#f0f0f8] mb-2">Works with your stack</h2>
            <p className="text-[#55556a] text-sm">Native integration with leading AI platforms and wallets</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {INTEGRATIONS.map((it, i) => (
              <motion.div
                key={it.name}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -3, scale: 1.02 }}
                className="glass rounded-xl p-4 text-center border border-white/5 cursor-default"
              >
                <div
                  className="text-xs font-mono mb-1 px-2 py-0.5 rounded-full inline-block"
                  style={{ background: `${it.c}14`, color: it.c }}
                >
                  {it.tag}
                </div>
                <div className="text-sm font-medium text-[#f0f0f8] mt-2">{it.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#C9F028]/2 to-transparent pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-3xl mx-auto px-4 text-center"
        >
          <div className="glass rounded-3xl p-12 border border-[#C9F028]/12">
            <div className="inline-flex items-center gap-2 glass-green rounded-full px-3 py-1 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9F028] pulse-dot" />
              <span className="text-[11px] font-mono text-[#C9F028]">Open Source · MIT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#f0f0f8] mb-4">
              Ready to give your agent an edge?
            </h2>
            <p className="text-[#8888a8] mb-10 leading-relaxed">
              Join the next generation of autonomous trading. Connect your wallet or sign in to access the full HOODSCAN platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="btn-primary flex items-center justify-center gap-2 text-base py-3.5 px-8 group"
              >
                Get Started Free
                <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="btn-secondary flex items-center justify-center gap-2 text-base py-3.5 px-8"
              >
                Learn More
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
