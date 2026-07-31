import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FileText, AlertTriangle, Scale, Shield, GitFork, Zap, Mail, ChevronRight } from 'lucide-react'

const LAST_UPDATED = 'July 31, 2026'

const SECTIONS = [
  {
    icon: FileText,
    color: '#C9F028',
    title: '1. Acceptance of terms',
    body: 'By accessing or using HOODSCAN at hoodscan.world or the robinhood-for-agents MCP server, you agree to be bound by these Terms of Service. If you do not agree, do not use HOODSCAN. These terms apply to all users of the website, dashboard, and MCP tooling.',
  },
  {
    icon: Zap,
    color: '#00d4ff',
    title: '2. Description of service',
    body: null,
    list: [
      { heading: 'Web platform', detail: 'hoodscan.world is an informational and demonstration interface for the robinhood-for-agents MCP server. It provides documentation, an interactive tool explorer, and a demo dashboard.' },
      { heading: 'MCP server', detail: 'robinhood-for-agents is an open-source Model Context Protocol server that enables autonomous AI agents to interact with Robinhood brokerage accounts via typed function calls. It is provided as-is under the MIT License.' },
      { heading: 'No brokerage services', detail: 'HOODSCAN is a software tool, not a registered broker-dealer, investment adviser, or financial institution. We do not execute trades on your behalf; your AI agent does, using credentials you configure.' },
    ],
  },
  {
    icon: AlertTriangle,
    color: '#ef4444',
    title: '3. No affiliation with Robinhood',
    body: '"Robinhood" is a registered trademark of Robinhood Markets, Inc. HOODSCAN is not affiliated with, endorsed by, sponsored by, or in any way officially connected with Robinhood Markets, Inc. or any of its subsidiaries or affiliates. Use of the Robinhood name is solely for descriptive purposes to identify the compatible brokerage platform.',
  },
  {
    icon: AlertTriangle,
    color: '#f97316',
    title: '4. Financial risk disclaimer',
    body: null,
    list: [
      { heading: 'Automated trading risk', detail: 'Automated trading involves substantial financial risk. AI agents operating through HOODSCAN can place real orders with real money. Losses can exceed your initial investment. Past performance of any strategy is not indicative of future results.' },
      { heading: 'No investment advice', detail: 'Nothing in HOODSCAN constitutes investment advice, financial advice, trading advice, or any other type of advice. Tool outputs, example responses, and demo data are for illustrative purposes only.' },
      { heading: 'Your responsibility', detail: 'You are solely responsible for any trading activity conducted through HOODSCAN, including losses incurred by AI agents acting on your behalf. Always test with small amounts before deploying any automated strategy.' },
      { heading: 'No guarantee of accuracy', detail: 'Market data, quotes, and portfolio figures shown in the demo are simulated. Real-time data accuracy depends on the Robinhood API and is subject to delays, errors, and outages beyond our control.' },
    ],
  },
  {
    icon: GitFork,
    color: '#C9F028',
    title: '5. Open source license',
    body: 'HOODSCAN is released under the MIT License. You are free to use, copy, modify, merge, publish, distribute, sublicense, and sell copies of the software, subject to the MIT License terms. The full license text is available in the GitHub repository.',
  },
  {
    icon: Shield,
    color: '#7b61ff',
    title: '6. Acceptable use',
    body: null,
    list: [
      { heading: 'Permitted', detail: 'Using HOODSCAN to automate your own Robinhood account; building, extending, and forking the open-source codebase; connecting compatible AI agents to the MCP server.' },
      { heading: 'Prohibited', detail: 'Using HOODSCAN to access accounts you do not own or are not authorized to access; circumventing Robinhood\'s terms of service; using the platform for market manipulation, front-running, or any illegal trading activity; reverse engineering Robinhood\'s proprietary systems beyond what the public API allows.' },
      { heading: 'Compliance', detail: 'You are responsible for ensuring your use of HOODSCAN complies with all applicable laws, including securities laws, tax laws, and Robinhood\'s own Terms of Service.' },
    ],
  },
  {
    icon: Scale,
    color: '#00d4ff',
    title: '7. Limitation of liability',
    body: 'TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, HOODSCAN AND ITS CONTRIBUTORS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, LOSS OF DATA, OR FINANCIAL LOSSES, ARISING FROM YOUR USE OF OR INABILITY TO USE HOODSCAN, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. IN NO EVENT SHALL OUR TOTAL LIABILITY EXCEED THE AMOUNT YOU PAID FOR HOODSCAN IN THE PAST TWELVE MONTHS (WHICH IS ZERO, AS HOODSCAN IS FREE).',
  },
  {
    icon: Shield,
    color: '#C9F028',
    title: '8. No warranty',
    body: 'HOODSCAN IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF BUGS OR VIRUSES.',
  },
  {
    icon: Scale,
    color: '#7b61ff',
    title: '9. Governing law',
    body: 'These Terms shall be governed by and construed in accordance with applicable law. Any disputes shall be resolved through binding arbitration or the courts of competent jurisdiction. Nothing in these Terms limits rights you may have under consumer protection laws in your jurisdiction.',
  },
  {
    icon: FileText,
    color: '#00d4ff',
    title: '10. Changes to these terms',
    body: 'We may update these Terms of Service at any time. Updated terms will be posted at this URL with a revised "Last updated" date. Continued use of HOODSCAN after changes constitutes acceptance of the new terms. Material changes will be announced in the GitHub repository.',
  },
]

export default function Terms() {
  return (
    <>
      <Helmet>
        <title>Terms of Service | HOODSCAN</title>
        <meta name="description" content="HOODSCAN Terms of Service: open-source MIT-licensed trading intelligence. Read our financial risk disclaimer, acceptable use policy, and limitation of liability." />
        <link rel="canonical" href="https://hoodscan.world/terms" />
        <meta property="og:title" content="Terms of Service | HOODSCAN" />
        <meta property="og:description" content="HOODSCAN Terms of Service: open-source MIT-licensed trading intelligence. Financial risk disclaimer, acceptable use, and limitation of liability." />
        <meta property="og:url" content="https://hoodscan.world/terms" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://hoodscan.world/og-image.png" />
      </Helmet>

      <div className="min-h-screen pt-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
        <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full bg-[#7b61ff] opacity-[0.015] blur-[120px] pointer-events-none" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-2 glass-green rounded-full px-4 py-1.5 mb-6">
              <Scale size={13} className="text-[#C9F028]" />
              <span className="text-xs font-mono text-[#C9F028]">Legal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#f0f0f8] mb-4">Terms of Service</h1>
            <p className="text-sm text-[#55556a] font-mono">Last updated: {LAST_UPDATED}</p>
            <div className="mt-5 p-4 rounded-xl border border-[#f97316]/20 bg-[#f97316]/5 flex items-start gap-3">
              <AlertTriangle size={16} className="text-[#f97316] flex-shrink-0 mt-0.5" />
              <p className="text-sm text-[#f97316] leading-relaxed">
                HOODSCAN enables AI agents to place real trades with real money. Automated trading carries significant financial risk. Read Section 4 carefully before use.
              </p>
            </div>
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
                  transition={{ delay: i * 0.04 }}
                  className="glass rounded-2xl p-6 border border-white/5"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${s.color}15` }}>
                      <Icon size={17} style={{ color: s.color }} />
                    </div>
                    <h2 className="text-base font-bold text-[#f0f0f8]">{s.title}</h2>
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
              <h2 className="text-base font-bold text-[#f0f0f8]">Questions about these terms</h2>
            </div>
            <p className="text-sm text-[#8888a8] leading-relaxed mb-5">
              Open an issue on GitHub. We are transparent about all legal and policy questions.
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

          {/* Related */}
          <div className="mt-6 glass rounded-xl p-5 border border-white/5">
            <p className="text-xs text-[#55556a] mb-3 uppercase tracking-widest font-semibold">Related</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/privacy" className="flex items-center gap-2 text-sm text-[#8888a8] hover:text-[#C9F028] transition-colors">
                <ChevronRight size={14} /> Privacy Policy
              </Link>
              <Link to="/cookies" className="flex items-center gap-2 text-sm text-[#8888a8] hover:text-[#C9F028] transition-colors">
                <ChevronRight size={14} /> Cookie Policy
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
