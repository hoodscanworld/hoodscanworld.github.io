import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Terminal, Home, BookOpen, Zap } from 'lucide-react'
import { useEffect, useRef } from 'react'

function GlitchCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    let W = (canvas.width = canvas.offsetWidth)
    let H = (canvas.height = canvas.offsetHeight)
    let raf = 0
    let t = 0

    const resize = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight }
    window.addEventListener('resize', resize)

    const CHARS = '404HOODSCAN0XDEADBEEF01NOTFOUNDMCP'.split('')
    const cols = Math.floor(W / 18)
    const drops = Array.from({ length: cols }, () => Math.random() * -40)

    const tick = () => {
      t++
      ctx.fillStyle = 'rgba(5,5,8,0.18)'
      ctx.fillRect(0, 0, W, H)
      ctx.font = `12px 'JetBrains Mono', monospace`
      ctx.textAlign = 'left'

      drops.forEach((y, i) => {
        const ch = CHARS[Math.floor(Math.random() * CHARS.length)]
        const alpha = 0.04 + Math.random() * 0.07
        ctx.fillStyle = `rgba(201,240,40,${alpha})`
        ctx.fillText(ch, i * 18 + 4, y * 18)
        drops[i] = y > H / 18 + 5 ? -5 : y + 0.25
      })

      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />
}

const LINKS = [
  { to: '/', icon: Home, label: 'Home', desc: 'Platform overview' },
  { to: '/demo', icon: Terminal, label: 'Demo', desc: 'Live MCP explorer' },
  { to: '/how-to', icon: BookOpen, label: 'How It Works', desc: 'Setup guide' },
  { to: '/login', icon: Zap, label: 'Launch App', desc: 'Connect your wallet' },
]

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 Not Found | HOODSCAN</title>
        <meta name="description" content="Page not found. Return to HOODSCAN, the AI-native trading intelligence platform." />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
        <GlitchCanvas />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(5,5,8,0.6) 0%, rgba(5,5,8,0.92) 100%)' }} />

        <div className="relative z-10 max-w-lg mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* 404 */}
            <div className="inline-flex items-center gap-2 glass-green rounded-full px-4 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
              <span className="text-xs font-mono text-[#ef4444]">ERROR 404</span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-[120px] font-black leading-none text-transparent"
                style={{ WebkitTextStroke: '2px rgba(201,240,40,0.15)' }}>
                404
              </p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl font-bold text-[#f0f0f8] mb-3 -mt-4"
            >
              Signal not found
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm text-[#8888a8] leading-relaxed mb-10 font-mono"
            >
              The route you requested does not exist.<br />
              No position matched. Returning to base.
            </motion.p>

            {/* Quick links */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 gap-3 mb-8"
            >
              {LINKS.map(link => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="glass rounded-xl p-4 border border-white/5 hover:border-[#C9F028]/20 transition-all text-left group"
                  >
                    <Icon size={16} className="text-[#C9F028] mb-2" />
                    <p className="text-sm font-semibold text-[#f0f0f8] group-hover:text-[#C9F028] transition-colors">{link.label}</p>
                    <p className="text-xs text-[#55556a]">{link.desc}</p>
                  </Link>
                )
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                to="/"
                className="btn-primary inline-flex items-center gap-2 py-3 px-7 group"
              >
                Back to HOODSCAN
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
