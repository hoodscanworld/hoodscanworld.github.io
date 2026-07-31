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

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'bg-[rgba(5,5,8,0.95)] backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
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
