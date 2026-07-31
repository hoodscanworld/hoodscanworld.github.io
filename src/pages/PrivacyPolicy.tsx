import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Shield, Database, Eye, Globe, UserCheck, Mail, ChevronRight, Lock } from 'lucide-react'

const LAST_UPDATED = 'July 31, 2026'

const SECTIONS = [
  {
    icon: Eye,
    color: '#C9F028',
    title: 'Information we collect',
    body: null,
    list: [
      { heading: 'Wallet address', detail: 'When you authenticate via MetaMask or Phantom, we receive your public wallet address. This is your identifier within HOODSCAN. We never receive your private key or seed phrase.' },
      { heading: 'Session data', detail: 'A session token is stored in your browser\'s localStorage to keep you signed in. This token is local to your device and is not transmitted to any third-party server.' },
      { heading: 'Usage data', detail: 'We do not run analytics. We do not track which pages you visit, how long you stay, or what you click. No behavioral data is collected or stored.' },
      { heading: 'MCP credentials', detail: 'The robinhood-for-agents MCP server stores your Robinhood session token in your OS keychain (macOS Keychain, Linux Secret Service, Windows Credential Manager) or an encrypted local file for Docker. These credentials never leave your machine.' },
    ],
  },
  {
    icon: Database,
    color: '#7b61ff',
    title: 'How we use information',
    body: null,
    list: [
      { heading: 'Authentication', detail: 'Your wallet address is used solely to identify your session within the HOODSCAN web app. It is not shared, sold, or used for any other purpose.' },
      { heading: 'Service delivery', detail: 'Session tokens stored in localStorage are used to maintain your signed-in state across page loads. They are cleared when you sign out.' },
      { heading: 'No marketing', detail: 'We do not use your data for marketing, advertising, or profiling. We have no email list and send no promotional communications.' },
    ],
  },
  {
    icon: Lock,
    color: '#00d4ff',
    title: 'Data storage and security',
    body: 'HOODSCAN is a client-side application hosted on GitHub Pages. We operate no server that stores personal data. All data relevant to your session (wallet address, session token) lives in your browser\'s localStorage. MCP credentials are stored locally on your machine via your OS keychain or encrypted file. We have no database of user records.',
  },
  {
    icon: Globe,
    color: '#C9F028',
    title: 'Third-party services',
    body: null,
    list: [
      { heading: 'GitHub Pages', detail: 'This site is hosted on GitHub Pages (GitHub, Inc.). GitHub may log server-side request metadata (IP address, user agent, timestamp) as part of standard infrastructure operation. See GitHub\'s Privacy Statement for details.' },
      { heading: 'Google Fonts', detail: 'We load fonts from Google Fonts, which may set a short-lived cache cookie. This contains no personal data and is outside our control.' },
      { heading: 'No analytics', detail: 'We do not use Google Analytics, Mixpanel, Segment, Hotjar, or any other analytics or telemetry service.' },
      { heading: 'No advertising', detail: 'We run no advertising. No Facebook Pixel, no Google Ads tags, no ad network SDKs are embedded in this site.' },
    ],
  },
  {
    icon: UserCheck,
    color: '#7b61ff',
    title: 'Your rights',
    body: 'Because we store no personal data on our own servers, most data subject rights (access, rectification, erasure, portability) are exercised locally by you: clear your localStorage via your browser settings to erase your session data; uninstall the MCP server to remove stored credentials from your OS keychain. If you have questions about data related to GitHub\'s infrastructure logging, contact GitHub directly.',
  },
  {
    icon: Shield,
    color: '#00d4ff',
    title: 'Data retention',
    body: 'Session data in localStorage persists until you sign out or clear your browser storage. We retain no server-side records of your activity. GitHub Pages infrastructure logs are subject to GitHub\'s own retention policy.',
  },
  {
    icon: Shield,
    color: '#C9F028',
    title: 'Changes to this policy',
    body: 'We may update this Privacy Policy from time to time. Changes will be reflected by updating the "Last updated" date above. Continued use of HOODSCAN after any change constitutes acceptance of the updated policy. Material changes will be noted in our GitHub repository.',
  },
]

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | HOODSCAN</title>
        <meta name="description" content="HOODSCAN Privacy Policy: no server-side data storage, no analytics, no advertising. Learn how we handle your wallet address and session data." />
        <link rel="canonical" href="https://hoodscan.world/privacy" />
        <meta property="og:title" content="Privacy Policy | HOODSCAN" />
        <meta property="og:description" content="HOODSCAN Privacy Policy: no server-side data storage, no analytics, no advertising." />
        <meta property="og:url" content="https://hoodscan.world/privacy" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://hoodscan.world/og-image.png" />
      </Helmet>

      <div className="min-h-screen pt-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-[#00d4ff] opacity-[0.015] blur-[120px] pointer-events-none" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-2 glass-green rounded-full px-4 py-1.5 mb-6">
              <Shield size={13} className="text-[#C9F028]" />
              <span className="text-xs font-mono text-[#C9F028]">Legal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#f0f0f8] mb-4">Privacy Policy</h1>
            <p className="text-sm text-[#55556a] font-mono">Last updated: {LAST_UPDATED}</p>
            <p className="text-[#8888a8] text-sm leading-relaxed mt-4">
              HOODSCAN is designed from the ground up to collect as little data as possible. We operate no user database, run no analytics, and sell nothing to advertisers. This policy explains the minimal data that does touch our systems.
            </p>
          </motion.div>

          {/* Sections */}
          <div className="space-y-4">
            {SECTIONS.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.section
                  key={s.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="glass rounded-2xl p-6 border border-white/5"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${s.color}15` }}>
                      <Icon size={17} style={{ color: s.color }} />
                    </div>
                    <h2 className="text-base font-bold text-[#f0f0f8] capitalize">{s.title}</h2>
                  </div>
                  {s.body && (
                    <p className="text-sm text-[#8888a8] leading-relaxed">{s.body}</p>
                  )}
                  {s.list && (
                    <ul className="space-y-3">
                      {s.list.map(item => (
                        <li key={item.heading} className="text-sm">
                          <span className="text-[#f0f0f8] font-medium">{item.heading}: </span>
                          <span className="text-[#8888a8] leading-relaxed">{item.detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.section>
              )
            })}
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
              <h2 className="text-base font-bold text-[#f0f0f8]">Questions</h2>
            </div>
            <p className="text-sm text-[#8888a8] leading-relaxed mb-5">
              Privacy questions or requests? Open a GitHub issue; we respond to everything.
            </p>
            <a
              href="https://github.com/hoodscanworld/hoodscanworld.github.io/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center gap-2 py-2.5 px-5 text-sm"
            >
              Open a GitHub Issue
            </a>
          </motion.section>

          {/* Also see */}
          <div className="mt-6 glass rounded-xl p-5 border border-white/5">
            <p className="text-xs text-[#55556a] mb-3 uppercase tracking-widest font-semibold">Related</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/cookies" className="flex items-center gap-2 text-sm text-[#8888a8] hover:text-[#C9F028] transition-colors">
                <ChevronRight size={14} /> Cookie Policy
              </Link>
              <Link to="/terms" className="flex items-center gap-2 text-sm text-[#8888a8] hover:text-[#C9F028] transition-colors">
                <ChevronRight size={14} /> Terms of Service
              </Link>
            </div>
          </div>

          {/* Back */}
          <div className="text-center pt-8">
            <Link to="/" className="inline-flex items-center gap-1 text-sm text-[#55556a] hover:text-[#C9F028] transition-colors">
              <ChevronRight size={14} className="rotate-180" />
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
