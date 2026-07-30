import { useState, FormEvent } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, AlertCircle, ArrowRight, Wallet, Mail } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import Logo from '../components/Logo'

type LoginTab = 'email' | 'wallet'

export default function Login() {
  const [tab, setTab] = useState<LoginTab>('email')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState<string | null>(null)
  const { loginWithEmail, loginWithMetaMask, loginWithPhantom, error, clearError } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard'

  const handleEmail = async (e: FormEvent) => {
    e.preventDefault()
    clearError()
    setLoading('email')
    try {
      await loginWithEmail(email, password)
      navigate(from, { replace: true })
    } catch {
      // error shown via AuthContext
    } finally {
      setLoading(null)
    }
  }

  const handleMetaMask = async () => {
    clearError()
    setLoading('metamask')
    try {
      await loginWithMetaMask()
      navigate(from, { replace: true })
    } catch {
      // error shown via AuthContext
    } finally {
      setLoading(null)
    }
  }

  const handlePhantom = async () => {
    clearError()
    setLoading('phantom')
    try {
      await loginWithPhantom()
      navigate(from, { replace: true })
    } catch {
      // error shown via AuthContext
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-16 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#00ff94] opacity-[0.025] blur-[100px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-[#7b61ff] opacity-[0.03] blur-[80px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo + heading */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-5">
            <Logo size="md" linkTo="/" />
          </div>
          <h1 className="text-2xl font-bold text-[#f0f0f8] mb-2">Welcome back</h1>
          <p className="text-sm text-[#8888a8]">
            Sign in to access your HOODSCAN dashboard
          </p>
        </div>

        {/* Card */}
        <div className="glass rounded-2xl p-7 border border-white/8">
          {/* Tabs */}
          <div className="flex rounded-lg p-1 bg-white/4 mb-6">
            {(['email', 'wallet'] as LoginTab[]).map(t => (
              <button
                key={t}
                onClick={() => { setTab(t); clearError() }}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-all ${
                  tab === t
                    ? 'bg-[#111118] text-[#f0f0f8] shadow-sm'
                    : 'text-[#8888a8] hover:text-[#f0f0f8]'
                }`}
              >
                {t === 'email' ? <Mail size={15} /> : <Wallet size={15} />}
                {t === 'email' ? 'Email' : 'Wallet'}
              </button>
            ))}
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-start gap-2.5 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 mb-4"
              >
                <AlertCircle size={15} className="text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-red-300 leading-relaxed">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {tab === 'email' ? (
              <motion.form
                key="email-form"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleEmail}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-medium text-[#8888a8] mb-1.5">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="input-field"
                    autoComplete="email"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-medium text-[#8888a8]">Password</label>
                    <button
                      type="button"
                      className="text-xs text-[#55556a] hover:text-[#00ff94] transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPw ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      placeholder="Minimum 6 characters"
                      className="input-field pr-11"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#55556a] hover:text-[#8888a8] transition-colors"
                    >
                      {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading === 'email'}
                  className="w-full btn-primary flex items-center justify-center gap-2 py-3 mt-2"
                >
                  {loading === 'email' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#050508]/40 border-t-[#050508] rounded-full spinner" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="wallet-form"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                <p className="text-xs text-[#8888a8] text-center mb-4 leading-relaxed">
                  Connect your Web3 wallet to authenticate. No password required.
                </p>

                {/* MetaMask */}
                <button
                  onClick={handleMetaMask}
                  disabled={!!loading}
                  className="w-full flex items-center gap-3 p-4 rounded-xl border border-white/8 bg-white/2 hover:bg-white/4 hover:border-[#f6851b]/30 transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#f6851b]/10 flex items-center justify-center flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M22 2L13.7 8.2l1.5-3.5L22 2z" fill="#e17726" />
                      <path d="M2 2l8.3 6.2L8.8 4.7 2 2z" fill="#e27625" />
                      <path d="M19.3 17.2l-2.2 3.4 4.7 1.3 1.3-4.6-3.8-.1z" fill="#e27625" />
                      <path d="M1 17.3l1.3 4.6 4.7-1.3-2.2-3.4-3.8.1z" fill="#e27625" />
                      <path d="M6.7 10.7L5.4 12.7l4.7.2-.2-5L6.7 10.7z" fill="#e27625" />
                      <path d="M17.3 10.7l-3.2-2.8-.1 5 4.7-.2-1.4-2z" fill="#e27625" />
                      <path d="M7 21.6l2.8-1.4-2.4-1.9L7 21.6z" fill="#e27625" />
                      <path d="M14.2 20.2l2.8 1.4.4-3.3-2.4 1.9h-.8z" fill="#e27625" />
                    </svg>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-semibold text-[#f0f0f8] group-hover:text-[#f6851b] transition-colors">
                      MetaMask
                    </div>
                    <div className="text-xs text-[#55556a]">Ethereum wallet</div>
                  </div>
                  {loading === 'metamask' ? (
                    <div className="w-4 h-4 border-2 border-[#f6851b]/40 border-t-[#f6851b] rounded-full spinner" />
                  ) : (
                    <ArrowRight size={15} className="text-[#55556a] group-hover:text-[#f6851b] transition-colors" />
                  )}
                </button>

                {/* Phantom */}
                <button
                  onClick={handlePhantom}
                  disabled={!!loading}
                  className="w-full flex items-center gap-3 p-4 rounded-xl border border-white/8 bg-white/2 hover:bg-white/4 hover:border-[#ab9ff2]/30 transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#ab9ff2]/10 flex items-center justify-center flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 128 128" fill="none">
                      <rect width="128" height="128" rx="28" fill="#ab9ff2" />
                      <path d="M110.584 64.993c0 29.529-23.956 53.485-53.485 53.485H36.31c-5.77 0-10.45-4.68-10.45-10.45V77.24c0-26.184 21.23-47.413 47.413-47.413 26.184 0 37.31 9.617 37.31 35.166z" fill="white" />
                      <ellipse cx="80" cy="60" rx="7" ry="7" fill="#ab9ff2" />
                      <ellipse cx="50" cy="60" rx="7" ry="7" fill="#ab9ff2" />
                    </svg>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-semibold text-[#f0f0f8] group-hover:text-[#ab9ff2] transition-colors">
                      Phantom
                    </div>
                    <div className="text-xs text-[#55556a]">Solana wallet</div>
                  </div>
                  {loading === 'phantom' ? (
                    <div className="w-4 h-4 border-2 border-[#ab9ff2]/40 border-t-[#ab9ff2] rounded-full spinner" />
                  ) : (
                    <ArrowRight size={15} className="text-[#55556a] group-hover:text-[#ab9ff2] transition-colors" />
                  )}
                </button>

                <p className="text-[11px] text-[#55556a] text-center mt-3 leading-relaxed px-2">
                  By connecting, you agree to sign a one-time authentication message. No transaction will be submitted.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer links */}
        <p className="text-center text-xs text-[#55556a] mt-6">
          By signing in, you agree to our{' '}
          <Link to="/cookies" className="text-[#8888a8] hover:text-[#00ff94] transition-colors">
            Cookie Policy
          </Link>
          . New to HOODSCAN?{' '}
          <Link to="/how-to" className="text-[#8888a8] hover:text-[#00ff94] transition-colors">
            Read the guide
          </Link>
          .
        </p>
      </motion.div>
    </div>
  )
}
