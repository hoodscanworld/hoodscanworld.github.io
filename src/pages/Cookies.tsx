import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Cookie, Shield, BarChart3, Settings, Mail, ArrowRight, ChevronRight } from 'lucide-react'

const SECTIONS = [
  {
    icon: Cookie,
    color: '#C9F028',
    title: 'What are cookies?',
    body: 'Cookies are small text files stored on your device when you visit a website. HOODSCAN uses a minimal set of cookies strictly necessary for the site to function. We do not use advertising, tracking, or third-party analytics cookies.',
  },
  {
    icon: Shield,
    color: '#C9F028',
    title: 'Essential cookies',
    body: 'These cookies are required for the site to work. They store your authentication session so you stay signed in and your wallet connection is maintained. Without them, the site cannot function.',
    table: [
      { name: 'hoodscan_user', purpose: 'Stores your session and wallet connection state', duration: 'Session / localStorage' },
      { name: '__host_session', purpose: 'CSRF protection and session integrity', duration: 'Session' },
    ],
  },
  {
    icon: BarChart3,
    color: '#7b61ff',
    title: 'Analytics cookies',
    body: 'HOODSCAN does not use analytics cookies. We do not collect browsing data, track your behaviour across sites, or share data with advertising networks.',
    highlight: { color: '#7b61ff', text: 'Zero analytics tracking.' },
  },
  {
    icon: Settings,
    color: '#00d4ff',
    title: 'Your choices',
    body: 'Because we only use strictly necessary cookies, there is no opt-out mechanism — removing them would prevent the site from working. You can clear all cookies at any time via your browser settings. Doing so will sign you out of HOODSCAN.',
  },
  {
    icon: Cookie,
    color: '#C9F028',
    title: 'Third-party cookies',
    body: 'HOODSCAN does not embed third-party services that set their own cookies (no Google Analytics, no Facebook Pixel, no advertising SDKs). Our fonts are loaded from Google Fonts, which may set a short-lived cache cookie; we have no control over this but it contains no personal data.',
  },
  {
    icon: Shield,
    color: '#7b61ff',
    title: 'Updates to this policy',
    body: 'We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Changes will be noted by updating the "Last updated" date at the top of this page. Continued use of HOODSCAN after any modification constitutes your acceptance of the updated policy.',
  },
]

export default function Cookies() {
  return (
    <div className="min-h-screen pt-16 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-[#7b61ff] opacity-[0.02] blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 glass-green rounded-full px-4 py-1.5 mb-6">
            <Cookie size={13} className="text-[#C9F028]" />
            <span className="text-xs font-mono text-[#C9F028]">Cookie Policy</span>
          </div>
          <h1 className="text-4xl font-bold text-[#f0f0f8] mb-4">How we use cookies</h1>
          <p className="text-[#8888a8] max-w-lg mx-auto text-sm leading-relaxed">
            Short version: we use only the cookies that make the site work. No ads, no tracking, no third-party surveillance.
          </p>
          <div className="mt-5 text-xs text-[#55556a] font-mono">Last updated: July 2025</div>
        </motion.div>

        {/* Quick summary */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-6 border border-[#C9F028]/10 mb-8"
        >
          <div className="grid sm:grid-cols-3 gap-5 text-center">
            {[
              { label: 'Essential only', desc: 'No optional cookies', color: '#C9F028' },
              { label: 'No tracking', desc: 'Zero analytics', color: '#7b61ff' },
              { label: 'No ads', desc: 'No advertising networks', color: '#00d4ff' },
            ].map(item => (
              <div key={item.label}>
                <div className="text-base font-bold mb-0.5" style={{ color: item.color }}>{item.label}</div>
                <div className="text-xs text-[#55556a]">{item.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Sections */}
        <div className="space-y-5">
          {SECTIONS.map((s, i) => (
            <motion.section
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="glass rounded-2xl p-7 border border-white/5"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${s.color}12` }}>
                  <s.icon size={17} style={{ color: s.color }} />
                </div>
                <h2 className="text-base font-bold text-[#f0f0f8]">{s.title}</h2>
              </div>
              <p className="text-sm text-[#8888a8] leading-relaxed mb-4">{s.body}</p>

              {s.highlight && (
                <div
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold"
                  style={{ background: `${s.highlight.color}10`, color: s.highlight.color }}
                >
                  <Shield size={14} />
                  {s.highlight.text}
                </div>
              )}

              {s.table && (
                <div className="overflow-x-auto mt-2">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-white/6">
                        <th className="text-left py-2.5 pr-4 text-[#55556a] uppercase tracking-wider font-medium">Cookie</th>
                        <th className="text-left py-2.5 pr-4 text-[#55556a] uppercase tracking-wider font-medium">Purpose</th>
                        <th className="text-left py-2.5 text-[#55556a] uppercase tracking-wider font-medium">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {s.table.map(row => (
                        <tr key={row.name} className="border-b border-white/4">
                          <td className="py-3 pr-4 font-mono text-[#C9F028]">{row.name}</td>
                          <td className="py-3 pr-4 text-[#8888a8] leading-relaxed">{row.purpose}</td>
                          <td className="py-3 text-[#55556a]">{row.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.section>
          ))}
        </div>

        {/* Contact */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-7 border border-white/5 mt-5"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-[#C9F028]/10 flex items-center justify-center">
              <Mail size={17} className="text-[#C9F028]" />
            </div>
            <h2 className="text-base font-bold text-[#f0f0f8]">Contact us</h2>
          </div>
          <p className="text-sm text-[#8888a8] leading-relaxed mb-5">
            Questions about cookies or our privacy practices? Open an issue on GitHub — we read everything.
          </p>
          <a
            href="https://github.com/hoodscanworld/hoodscanworld.github.io/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2 py-2.5 px-5 text-sm"
          >
            Open a GitHub Issue <ArrowRight size={14} />
          </a>
        </motion.section>

        {/* Back */}
        <div className="text-center pt-8">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-[#55556a] hover:text-[#C9F028] transition-colors">
            <ChevronRight size={14} className="rotate-180" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
