import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, LogOut, LayoutDashboard, ChevronRight } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import Logo from './Logo'

const navLinks = [
  { label: 'Features', to: '/features' },
  { label: 'Demo', to: '/demo' },
  { label: 'How It Works', to: '/how-to' },
  { label: 'About', to: '/about' },
]

const X_ICON = (
  <svg width="14" height="14" viewBox="0 0 1200 1227" fill="currentColor" aria-hidden="true">
    <path d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284zM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854z" />
  </svg>
)

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [barVisible, setBarVisible] = useState(() => {
    try { return localStorage.getItem('x-bar-dismissed') !== '1' } catch { return true }
  })
  const { isAuthenticated, user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const handleLogout = () => {
    logout()
    navigate('/')
    setMenuOpen(false)
  }

  const dismissBar = () => {
    setBarVisible(false)
    try { localStorage.setItem('x-bar-dismissed', '1') } catch {}
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'bg-[rgba(5,5,8,0.95)] backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      {/* ─── X Follow Bar ─────────────────────────────────────────── */}
      {barVisible && (
        <div className="relative flex items-center justify-center gap-3 px-4 py-1.5 bg-[#0d0d14] border-b border-white/8 text-sm">
          <span className="flex items-center gap-2">
            <span className="text-[#55556a]">{X_ICON}</span>
            <span className="hidden sm:inline text-[#8888a8] text-xs">Follow us on X —</span>
            <span className="font-semibold text-[#f0f0f8] text-xs">@hoodscanworld</span>
          </span>
          <a
            href="https://x.com/hoodscanworld"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-[#C9F028] transition-colors duration-200"
          >
            {X_ICON}
            Follow
          </a>
          <button
            onClick={dismissBar}
            aria-label="Dismiss"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#55556a] hover:text-[#f0f0f8] transition-colors p-1"
          >
            <X size={13} />
          </button>
        </div>
      )}

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo size="sm" />

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? 'text-[#C9F028]'
                    : 'text-[#8888a8] hover:text-[#f0f0f8]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 text-sm text-[#8888a8] hover:text-[#C9F028] transition-colors"
                >
                  <LayoutDashboard size={16} />
                  Dashboard
                </Link>
                <div className="h-4 w-px bg-white/10" />
                <span className="text-xs text-[#55556a] font-mono">
                  {user?.displayName}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 text-sm text-[#55556a] hover:text-red-400 transition-colors"
                >
                  <LogOut size={15} />
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm text-[#8888a8] hover:text-[#f0f0f8] transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  to="/login"
                  className="btn-primary text-sm py-2 px-5 flex items-center gap-1.5"
                >
                  Launch App
                  <ChevronRight size={14} />
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="md:hidden p-2 text-[#8888a8] hover:text-[#f0f0f8] transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden mobile-menu-enter border-t border-white/5 pb-4 pt-2">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`block py-3 px-2 text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? 'text-[#C9F028]'
                    : 'text-[#8888a8]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t border-white/5 flex flex-col gap-3">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 py-2 px-2 text-sm text-[#8888a8]"
                  >
                    <LayoutDashboard size={16} />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 py-2 px-2 text-sm text-red-400"
                  >
                    <LogOut size={16} />
                    Sign out ({user?.displayName})
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-center py-3 text-sm text-[#8888a8] border border-white/10 rounded-lg"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/login"
                    className="btn-primary text-sm py-3 text-center"
                  >
                    Launch App
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
