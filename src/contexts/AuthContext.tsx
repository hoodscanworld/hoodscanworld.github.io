import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  email?: string
  walletAddress?: string
  walletType?: 'metamask' | 'phantom' | 'email'
  displayName: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  loginWithEmail: (email: string, password: string) => Promise<void>
  loginWithMetaMask: () => Promise<void>
  loginWithPhantom: () => Promise<void>
  logout: () => void
  error: string | null
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('hoodscan_user')
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch {
        localStorage.removeItem('hoodscan_user')
      }
    }
    setIsLoading(false)
  }, [])

  const saveUser = (u: User) => {
    setUser(u)
    localStorage.setItem('hoodscan_user', JSON.stringify(u))
  }

  const loginWithEmail = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)
    try {
      await new Promise(r => setTimeout(r, 900))
      if (!email.includes('@')) throw new Error('Please enter a valid email address.')
      if (password.length < 6) throw new Error('Password must be at least 6 characters.')
      saveUser({
        id: `email-${Date.now()}`,
        email,
        walletType: 'email',
        displayName: email.split('@')[0],
      })
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Login failed. Please try again.')
      throw e
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithMetaMask = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const ethereum = (window as Window & { ethereum?: { request: (args: { method: string }) => Promise<string[]> } }).ethereum
      if (!ethereum) {
        throw new Error('MetaMask is not installed. Please install it at metamask.io')
      }
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      const address = accounts[0]
      if (!address) throw new Error('No accounts found in MetaMask.')
      saveUser({
        id: `mm-${address}`,
        walletAddress: address,
        walletType: 'metamask',
        displayName: `${address.slice(0, 6)}...${address.slice(-4)}`,
      })
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'MetaMask connection failed.'
      setError(msg)
      throw e
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithPhantom = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const solana = (window as Window & { solana?: { isPhantom?: boolean; connect: () => Promise<{ publicKey: { toString: () => string } }> } }).solana
      if (!solana?.isPhantom) {
        throw new Error('Phantom Wallet is not installed. Please install it at phantom.app')
      }
      const response = await solana.connect()
      const address = response.publicKey.toString()
      saveUser({
        id: `ph-${address}`,
        walletAddress: address,
        walletType: 'phantom',
        displayName: `${address.slice(0, 6)}...${address.slice(-4)}`,
      })
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Phantom connection failed.'
      setError(msg)
      throw e
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('hoodscan_user')
  }

  const clearError = () => setError(null)

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      loginWithEmail,
      loginWithMetaMask,
      loginWithPhantom,
      logout,
      error,
      clearError,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
