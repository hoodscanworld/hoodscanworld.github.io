import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Cookie, Info, ToggleLeft, Mail, ArrowRight } from 'lucide-react'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const cookieTypes = [
  {
    name: 'Strictly Necessary Cookies',
    badge: 'Always Active',
    badgeColor: '#C9F028',
    description: 'These cookies are required for the HOODSCAN platform to function. They enable core features such as page navigation, session management, and secure authentication. Without these cookies, the services you have requested cannot be provided.',
    examples: [
      { name: 'hoodscan_user', purpose: 'Stores your authentication state (wallet address or email session). Cleared on sign-out.', duration: 'Session / Until sign-out' },
      { name: '__cf_bm', purpose: 'Cloudflare bot management cookie used to distinguish between humans and automated traffic.', duration: '30 minutes' },
    ],
  },
  {
    name: 'Functional Cookies',
    badge: 'Optional',
    badgeColor: '#7b61ff',
    description: 'These cookies allow us to remember choices you have made (such as your preferred tab or theme) and provide enhanced, personalized features. The information collected is anonymized and cannot track browsing activity on other websites.',
    examples: [
      { name: 'hs_prefs', purpose: 'Remembers your UI preferences such as active dashboard tab and terminal scroll position.', duration: '90 days' },
    ],
  },
  {
    name: 'Analytics Cookies',
    badge: 'Optional',
    badgeColor: '#00d4ff',
    description: 'We use privacy-first analytics to understand how visitors interact with HOODSCAN. All data is anonymized and aggregated. No personal identifiers are stored. You can opt out at any time.',
    examples: [
      { name: 'hs_session_id', purpose: 'Anonymous session identifier for page-level analytics. Not linked to any account or identity.', duration: '24 hours' },
    ],
  },
]

export default function Cookies() {
  return (
    <div className="min-h-screen pt-16 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 relative">
        <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 glass-green rounded-full px-4 py-1.5 mb-6">
            <Cookie size={13} className="text-[#C9F028]" />
            <span className="text-xs font-mono text-[#C9F028]">Legal</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#f0f0f8] mb-5">Cookie Policy</h1>
          <p className="text-base text-[#8888a8] leading-relaxed">
            Last updated: July 30, 2025
          </p>
        </motion.div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-8">
        {/* What are cookies */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-7"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-[#C9F028]/10 flex items-center justify-center">
              <Info size={17} className="text-[#C9F028]" />
            </div>
            <h2 className="text-lg font-bold text-[#f0f0f8]">What are cookies?</h2>
          </div>
          <div className="text-sm text-[#8888a8] leading-relaxed space-y-3">
            <p>
              Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work efficiently and to provide information to the website owner.
            </p>
            <p>
              HOODSCAN uses cookies to remember your authentication state, store UI preferences, and gather anonymized usage analytics. We do not use cookies for advertising, cross-site tracking, or third-party profiling.
            </p>
          </div>
        </motion.section>

        {/* How we use cookies */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-lg bg-[#7b61ff]/10 flex items-center justify-center">
              <Cookie size={17} className="text-[#7b61ff]" />
            </div>
            <h2 className="text-lg font-bold text-[#f0f0f8]">Cookies we use</h2>
          </div>
          <div className="space-y-5">
            {cookieTypes.map((type, i) => (
              <motion.div
                key={type.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="glass rounded-xl overflow-hidden"
              >
                <div className="p-5 border-b border-white/5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-semibold text-[#f0f0f8] text-sm">{type.name}</h3>
                    <span
                      className="text-xs px-2 py-0.5 rounded font-mono flex-shrink-0"
                      style={{ background: `${type.badgeColor}14`, color: type.badgeColor }}
                    >
                      {type.badge}
                    </span>
                  </div>
                  <p className="text-sm text-[#8888a8] leading-relaxed">{type.description}</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-white/5 bg-white/2">
                        <th className="text-left px-5 py-2.5 text-[#55556a] font-medium">Cookie Name</th>
                        <th className="text-left px-5 py-2.5 text-[#55556a] font-medium">Purpose</th>
                        <th className="text-left px-5 py-2.5 text-[#55556a] font-medium whitespace-nowrap">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {type.examples.map(ex => (
                        <tr key={ex.name} className="border-b border-white/3">
                          <td className="px-5 py-3 font-mono text-[#C9F028]">{ex.name}</td>
                          <td className="px-5 py-3 text-[#8888a8] leading-relaxed">{ex.purpose}</td>
                          <td className="px-5 py-3 text-[#55556a] whitespace-nowrap">{ex.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Managing cookies */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-7"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-[#00d4ff]/10 flex items-center justify-center">
              <ToggleLeft size={17} className="text-[#00d4ff]" />
            </div>
            <h2 className="text-lg font-bold text-[#f0f0f8]">Managing your cookie preferences</h2>
          </div>
          <div className="text-sm text-[#8888a8] leading-relaxed space-y-3">
            <p>
              You can control and delete cookies through your browser settings. Most browsers allow you to refuse cookies, delete existing cookies, and set preferences for cookies from specific websites.
            </p>
            <p>
              Note that disabling strictly necessary cookies will prevent HOODSCAN from functioning correctly. Your authentication state is stored in <code className="font-mono text-[#8888a8] bg-white/5 px-1.5 py-0.5 rounded text-xs">localStorage</code> under the key <code className="font-mono text-[#8888a8] bg-white/5 px-1.5 py-0.5 rounded text-xs">hoodscan_user</code>. You can clear this at any time by signing out or clearing your browser's local storage.
            </p>
            <div className="mt-4 space-y-2">
              <p className="font-medium text-[#f0f0f8] text-xs uppercase tracking-wider">Browser cookie settings:</p>
              {[
                { browser: 'Chrome', url: 'https://support.google.com/chrome/answer/95647' },
                { browser: 'Firefox', url: 'https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences' },
                { browser: 'Safari', url: 'https://support.apple.com/en-gb/guide/safari/sfri11471/mac' },
                { browser: 'Edge', url: 'https://support.microsoft.com/en-us/windows/manage-cookies-in-microsoft-edge' },
              ].map(b => (
                <a
                  key={b.browser}
                  href={b.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-[#C9F028] hover:underline"
                >
                  <ArrowRight size={11} />
                  Manage cookies in {b.browser}
                </a>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Third parties */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-7"
        >
          <h2 className="text-lg font-bold text-[#f0f0f8] mb-4">Third-party services</h2>
          <div className="text-sm text-[#8888a8] leading-relaxed space-y-3">
            <p>
              HOODSCAN is a static web application hosted on GitHub Pages. We do not embed third-party advertising networks, social media tracking pixels, or behavioral analytics tools.
            </p>
            <p>
              When you connect a MetaMask or Phantom wallet, your wallet extension may store data locally on your device according to its own privacy policy. HOODSCAN only receives your public wallet address and uses it solely for session identification.
            </p>
            <p>
              GitHub Pages may collect server-side access logs (IP addresses, user agents, timestamps) as part of their standard infrastructure operation. This is governed by the{' '}
              <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer" className="text-[#C9F028] hover:underline">
                GitHub Privacy Statement
              </a>.
            </p>
          </div>
        </motion.section>

        {/* Updates */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-7"
        >
          <h2 className="text-lg font-bold text-[#f0f0f8] mb-4">Updates to this policy</h2>
          <p className="text-sm text-[#8888a8] leading-relaxed">
            We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Changes will be noted by updating the "Last updated" date at the top of this page. Continued use of HOODSCAN after any modification constitutes your acceptance of the updated policy.
          </p>
        </motion.section>

        {/* Contact */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-7"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-[#C9F028]/10 flex items-center justify-center">
              <Mail size={17} className="text-[#C9F028]" />
            </div>
            <h2 className="text-lg font-bold text-[#f0f0f8]">Contact us</h2>
          </div>
          <p className="text-sm text-[#8888a8] leading-relaxed mb-4">
            If you have any questions about our use of cookies, please open an issue on GitHub or reach out directly.
          </p>
          <a
            href="https://github.com/hoodscanworld/hoodscanworld.github.io/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2 py-2.5 px-5 text-sm"
          >
            Open a GitHub Issue
            <ArrowRight size={14} />
          </a>
        </motion.section>

        {/* Back nav */}
        <div className="text-center pt-4">
          <Link to="/" className="text-sm text-[#55556a] hover:text-[#C9F028] transition-colors">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
