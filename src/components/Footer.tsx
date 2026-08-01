import { Link } from 'react-router-dom'
import { GitFork, ExternalLink } from 'lucide-react'
import Logo from './Logo'

const footerLinks = {
  Product: [
    { label: 'How It Works', to: '/how-to' },
    { label: 'Demo', to: '/demo' },
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Launch App', to: '/login' },
  ],
  Company: [
    { label: 'About', to: '/about' },
    { label: 'FAQ', to: '/faq' },
    { label: 'GitHub', href: 'https://github.com/hoodscanworld/hoodscanworld.github.io', external: true },
  ],
  Legal: [
    { label: 'Terms of Service', to: '/terms' },
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Cookie Policy', to: '/cookies' },
  ],
}

const socials = [
  { icon: <GitFork size={18} />, href: 'https://github.com/hoodscanworld/hoodscanworld.github.io', label: 'GitHub' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0d0d14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Logo size="sm" />
            <p className="mt-4 text-sm text-[#8888a8] leading-relaxed max-w-xs">
              The AI-native trading intelligence layer. 50+ MCP tools, real-time market scanning, autonomous portfolio management.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg border border-white/8 flex items-center justify-center text-[#55556a] hover:text-[#C9F028] hover:border-[#C9F028]/30 transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-xs font-semibold tracking-widest uppercase text-[#55556a] mb-4">
                {heading}
              </h3>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link.label}>
                    {'href' in link && link.href ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-[#8888a8] hover:text-[#f0f0f8] transition-colors"
                      >
                        {link.label}
                        {link.external && <ExternalLink size={11} className="opacity-60" />}
                      </a>
                    ) : (
                      <Link
                        to={link.to!}
                        className="text-sm text-[#8888a8] hover:text-[#f0f0f8] transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-[#55556a]">
            &copy; {new Date().getFullYear()} HOODSCAN. All rights reserved.
          </p>
          <p className="text-xs text-[#55556a] max-w-sm">
            Not affiliated with Robinhood Markets, Inc. "Robinhood" is a trademark of Robinhood Markets, Inc. Use at your own risk.
          </p>
        </div>
      </div>
    </footer>
  )
}
