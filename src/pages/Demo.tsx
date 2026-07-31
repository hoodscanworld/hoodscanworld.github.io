import { Helmet } from 'react-helmet-async'
import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Terminal, Search, Zap, BarChart3, TrendingUp, TrendingDown,
  Play, ChevronRight, Copy, Check, Activity, DollarSign,
  Shield, Cpu, Globe, BookOpen, RefreshCw, Filter,
  ArrowUpRight, ArrowDownRight, Radio, Package,
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────

type ToolCategory = 'portfolio' | 'market' | 'orders' | 'options' | 'crypto' | 'data' | 'account'

interface McpTool {
  name: string
  description: string
  category: ToolCategory
  params: string
  exampleOutput: string
}

interface ScanRow {
  ticker: string
  price: number
  change: number
  changePct: number
  volume: string
  signal: 'BUY' | 'SELL' | 'HOLD' | 'WATCH'
  strength: number
  rsi: number
  updated: boolean
}

// ─── MCP Tools Data ───────────────────────────────────────────────────

const CATEGORY_META: Record<ToolCategory, { label: string; color: string; icon: typeof Cpu }> = {
  portfolio:  { label: 'Portfolio',  color: '#C9F028', icon: BarChart3 },
  market:     { label: 'Market',     color: '#00d4ff', icon: Globe },
  orders:     { label: 'Orders',     color: '#7b61ff', icon: Zap },
  options:    { label: 'Options',    color: '#f97316', icon: Activity },
  crypto:     { label: 'Crypto',     color: '#a78bfa', icon: RefreshCw },
  data:       { label: 'Data',       color: '#34d399', icon: BookOpen },
  account:    { label: 'Account',    color: '#f43f5e', icon: Shield },
}

const MCP_TOOLS: McpTool[] = [
  // Portfolio
  { name: 'get_portfolio', category: 'portfolio', description: 'Fetch full portfolio snapshot including equity, cash, and return metrics.', params: '{}', exampleOutput: '{"equity": 124832.14, "cash": 8421.50, "invested": 116410.64, "day_change": +1.84, "total_return": +18.2}' },
  { name: 'get_positions', category: 'portfolio', description: 'List all open positions with current P&L, cost basis, and quantity.', params: '{}', exampleOutput: '{"positions": [{"symbol":"NVDA","qty":12,"avg_cost":410.20,"current":891.40,"pnl":+5785.0},...]}' },
  { name: 'get_position', category: 'portfolio', description: 'Get a single position by ticker symbol.', params: '{"symbol": "NVDA"}', exampleOutput: '{"symbol":"NVDA","qty":12,"avg_cost":410.20,"current_price":891.40,"pnl":+5785.0,"pnl_pct":140.4}' },
  { name: 'get_cash', category: 'portfolio', description: 'Return available buying power and settled cash balance.', params: '{}', exampleOutput: '{"buying_power": 8421.50, "settled_cash": 6200.00, "unsettled_cash": 2221.50}' },
  { name: 'get_portfolio_history', category: 'portfolio', description: 'Return portfolio equity history over a given time window.', params: '{"span": "week", "interval": "day"}', exampleOutput: '{"history": [{"begins_at":"2026-07-24","equity":118200},...], "span":"week"}' },
  { name: 'get_total_return', category: 'portfolio', description: 'Calculate total and annualised return since account inception.', params: '{}', exampleOutput: '{"total_return_pct": 18.2, "annualized_pct": 34.6, "inception_date": "2024-01-12"}' },
  { name: 'get_dividends', category: 'portfolio', description: 'Retrieve dividend payment history and upcoming payouts.', params: '{}', exampleOutput: '{"total_received": 1240.50, "upcoming": [{"symbol":"AAPL","amount":12.40,"pay_date":"2026-08-15"}]}' },
  { name: 'get_watchlist', category: 'portfolio', description: 'Fetch all symbols on the current watchlist with latest quotes.', params: '{}', exampleOutput: '{"watchlist": [{"symbol":"PLTR","price":28.44,"change":+2.3},{"symbol":"SOFI","price":8.12,"change":-0.8}]}' },
  { name: 'add_to_watchlist', category: 'portfolio', description: 'Add one or more tickers to the watchlist.', params: '{"symbols": ["HOOD", "ARM"]}', exampleOutput: '{"added": ["HOOD","ARM"], "watchlist_size": 14}' },
  // Market
  { name: 'get_quote', category: 'market', description: 'Get real-time NBBO quote for a stock or ETF.', params: '{"symbol": "NVDA"}', exampleOutput: '{"symbol":"NVDA","bid":891.00,"ask":891.40,"last":891.20,"volume":18420300,"market_cap":"2.19T"}' },
  { name: 'get_quotes', category: 'market', description: 'Batch real-time quotes for up to 50 symbols.', params: '{"symbols": ["AAPL","MSFT","NVDA"]}', exampleOutput: '{"quotes": {"AAPL":{"last":218.24,"change":+1.2},"MSFT":{"last":445.30,"change":+0.6},...}}' },
  { name: 'search_stocks', category: 'market', description: 'Full-text search across all tradeable equities by name or ticker.', params: '{"query": "nvidia", "limit": 5}', exampleOutput: '{"results": [{"symbol":"NVDA","name":"NVIDIA Corporation","type":"stock","exchange":"NASDAQ"}]}' },
  { name: 'get_fundamentals', category: 'market', description: 'Fetch PE ratio, market cap, 52-week range, and other fundamentals.', params: '{"symbol": "AAPL"}', exampleOutput: '{"pe_ratio": 32.4, "market_cap":"3.28T", "52w_high":237.23, "52w_low":164.08, "dividend_yield":0.52}' },
  { name: 'get_news', category: 'market', description: 'Retrieve latest news articles for a ticker from curated sources.', params: '{"symbol": "TSLA", "limit": 5}', exampleOutput: '{"articles": [{"title":"Tesla Q2 deliveries beat estimates","source":"Reuters","published":"2026-07-02T14:00:00Z"},...]}' },
  { name: 'get_top_movers', category: 'market', description: 'Return top gainers and losers for the current session.', params: '{"count": 10}', exampleOutput: '{"gainers": [{"symbol":"SMCI","change_pct":+14.2},...], "losers": [{"symbol":"INTC","change_pct":-5.8},...]}' },
  { name: 'get_market_hours', category: 'market', description: 'Return market open/close times and current session status.', params: '{"exchange": "XNAS"}', exampleOutput: '{"is_open": true, "opens_at":"09:30:00","closes_at":"16:00:00","extended_hours":true}' },
  { name: 'get_sector_performance', category: 'market', description: 'Return today\'s performance by GICS sector.', params: '{}', exampleOutput: '{"sectors": [{"name":"Technology","change_pct":+1.8},{"name":"Energy","change_pct":-0.4},...]}' },
  { name: 'get_earnings_calendar', category: 'market', description: 'Return upcoming earnings dates for a watchlist or single ticker.', params: '{"symbol": "NVDA"}', exampleOutput: '{"earnings": [{"symbol":"NVDA","report_date":"2026-08-28","eps_estimate":0.72,"time":"AMC"}]}' },
  // Orders
  { name: 'place_buy_order', category: 'orders', description: 'Submit a market or limit buy order for an equity.', params: '{"symbol":"AAPL","qty":5,"order_type":"market"}', exampleOutput: '{"order_id":"ord_9x2k1","status":"confirmed","symbol":"AAPL","qty":5,"est_cost":1091.20,"time":"14:32:05"}' },
  { name: 'place_sell_order', category: 'orders', description: 'Submit a market or limit sell order for an equity.', params: '{"symbol":"TSLA","qty":2,"order_type":"limit","limit_price":248.00}', exampleOutput: '{"order_id":"ord_7m4p2","status":"pending","symbol":"TSLA","qty":2,"limit_price":248.00}' },
  { name: 'cancel_order', category: 'orders', description: 'Cancel a pending order by order ID.', params: '{"order_id": "ord_7m4p2"}', exampleOutput: '{"cancelled": true, "order_id":"ord_7m4p2","refunded_buying_power":496.00}' },
  { name: 'get_order_history', category: 'orders', description: 'Return order history with filters for status and date range.', params: '{"status":"filled","days":7}', exampleOutput: '{"orders": [{"symbol":"NVDA","side":"buy","qty":3,"filled_price":887.40,"date":"2026-07-28"},...]}' },
  { name: 'get_open_orders', category: 'orders', description: 'List all open (pending) orders.', params: '{}', exampleOutput: '{"open_orders": [{"order_id":"ord_7m4p2","symbol":"TSLA","side":"sell","qty":2,"limit_price":248.00}]}' },
  // Options
  { name: 'get_options_chain', category: 'options', description: 'Fetch full options chain for a given expiration date.', params: '{"symbol":"AAPL","expiration":"2026-08-15"}', exampleOutput: '{"calls":[{"strike":220,"bid":3.40,"ask":3.60,"iv":0.28,"delta":0.48}],"puts":[...]}' },
  { name: 'get_options_positions', category: 'options', description: 'List all open options positions with Greeks.', params: '{}', exampleOutput: '{"positions":[{"symbol":"NVDA","type":"call","strike":900,"exp":"2026-09-20","qty":2,"pnl":+840}]}' },
  { name: 'place_options_order', category: 'options', description: 'Buy or sell options contracts with strategy type.', params: '{"symbol":"SPY","strike":550,"exp":"2026-08-01","type":"call","qty":1,"side":"buy"}', exampleOutput: '{"order_id":"opt_4k9r1","status":"confirmed","premium_paid":180.00}' },
  { name: 'get_implied_volatility', category: 'options', description: 'Get IV rank and IV percentile for a ticker.', params: '{"symbol": "TSLA"}', exampleOutput: '{"iv_rank": 72.4, "iv_percentile": 68.1, "current_iv": 0.68, "iv_30d_avg": 0.54}' },
  // Crypto
  { name: 'get_crypto_quote', category: 'crypto', description: 'Get real-time price and 24h stats for a cryptocurrency.', params: '{"symbol": "BTC"}', exampleOutput: '{"symbol":"BTC","price":67842.10,"change_24h":+2.4,"volume_24h":"28.4B","market_cap":"1.34T"}' },
  { name: 'buy_crypto', category: 'crypto', description: 'Place a crypto buy order by dollar amount or quantity.', params: '{"symbol":"ETH","amount_usd":500}', exampleOutput: '{"order_id":"cry_2h8n3","symbol":"ETH","qty":0.1402,"price":3565.20,"total":499.84}' },
  { name: 'sell_crypto', category: 'crypto', description: 'Place a crypto sell order by quantity or percentage of holding.', params: '{"symbol":"ETH","qty":0.07}', exampleOutput: '{"order_id":"cry_5k1m9","symbol":"ETH","qty":0.07,"price":3565.20,"proceeds":249.56}' },
  { name: 'get_crypto_positions', category: 'crypto', description: 'List all open crypto holdings with current value.', params: '{}', exampleOutput: '{"positions":[{"symbol":"BTC","qty":0.082,"value":5563.06,"pnl":+1240.50},...]}' },
  // Data
  { name: 'get_historical_data', category: 'data', description: 'Return OHLCV candle data for any timeframe.', params: '{"symbol":"NVDA","interval":"5min","span":"day"}', exampleOutput: '{"candles":[{"t":"09:30","o":887.0,"h":893.4,"l":885.2,"c":891.2,"v":420000},...]}' },
  { name: 'get_technical_indicators', category: 'data', description: 'Calculate RSI, MACD, Bollinger Bands, and EMA for a ticker.', params: '{"symbol":"AAPL","indicators":["rsi","macd","bb"]}', exampleOutput: '{"rsi":58.4,"macd":{"line":1.24,"signal":0.98,"hist":0.26},"bb":{"upper":222,"mid":215,"lower":208}}' },
  { name: 'get_analyst_ratings', category: 'data', description: 'Aggregate analyst buy/hold/sell ratings and price target consensus.', params: '{"symbol": "MSFT"}', exampleOutput: '{"buy":28,"hold":8,"sell":2,"consensus":"Strong Buy","avg_target":512.00,"high_target":600}' },
  { name: 'get_institutional_holdings', category: 'data', description: 'Return top institutional holders and recent 13F changes.', params: '{"symbol": "NVDA"}', exampleOutput: '{"holders":[{"name":"Vanguard","shares":"180.2M","pct":7.3,"change":"↑ 2.1M"},...]}' },
  { name: 'get_short_interest', category: 'data', description: 'Return short interest ratio, short float percentage, and days to cover.', params: '{"symbol": "GME"}', exampleOutput: '{"short_float":22.4,"short_ratio":4.2,"days_to_cover":4.2,"shares_short":"42.1M"}' },
  { name: 'get_insider_trades', category: 'data', description: 'Return recent insider buy/sell filings from SEC Form 4.', params: '{"symbol":"META","days":30}', exampleOutput: '{"trades":[{"name":"Mark Zuckerberg","type":"sell","shares":20000,"value":"11.2M","date":"2026-07-15"}]}' },
  // Account
  { name: 'get_account_info', category: 'account', description: 'Return account tier, margin details, and option level.', params: '{}', exampleOutput: '{"account_type":"margin","option_level":2,"day_trades_used":1,"pdt_status":false,"margin_used":0}' },
  { name: 'get_tax_documents', category: 'account', description: 'List available tax forms (1099-B, 1099-DIV, etc.) with download links.', params: '{}', exampleOutput: '{"documents":[{"year":2025,"type":"1099-B","url":"https://..."},{"year":2025,"type":"1099-DIV","url":"https://..."}]}' },
  { name: 'get_notifications', category: 'account', description: 'Return unread account alerts and price notifications.', params: '{}', exampleOutput: '{"unread":3,"notifications":[{"type":"price_alert","symbol":"NVDA","msg":"NVDA crossed $900","ts":"14:28:01"}]}' },
  { name: 'get_transfer_history', category: 'account', description: 'Return ACH transfer and deposit history.', params: '{}', exampleOutput: '{"transfers":[{"type":"deposit","amount":2000,"status":"completed","date":"2026-07-01"}]}' },
]

// ─── Agent Terminal Commands ──────────────────────────────────────────

interface TerminalEntry {
  id: number
  type: 'input' | 'output' | 'error' | 'info'
  text: string
  streaming?: boolean
}

const PRESETS = [
  { label: 'scan_portfolio', cmd: 'hoodscan.portfolio.scan()' },
  { label: 'top_movers', cmd: 'hoodscan.market.top_movers({ count: 5 })' },
  { label: 'quote NVDA', cmd: 'hoodscan.market.get_quote({ symbol: "NVDA" })' },
  { label: 'my positions', cmd: 'hoodscan.portfolio.get_positions()' },
  { label: 'RSI + MACD', cmd: 'hoodscan.data.get_technical_indicators({ symbol: "AAPL", indicators: ["rsi","macd"] })' },
  { label: 'options chain', cmd: 'hoodscan.options.get_options_chain({ symbol: "SPY", expiration: "2026-08-01" })' },
]

const CMD_RESPONSES: Record<string, string[]> = {
  'hoodscan.portfolio.scan()': [
    '⟳ Authenticating session...',
    '⟳ Fetching portfolio snapshot...',
    '✓ Portfolio loaded: $124,832.14 equity',
    '⟳ Scanning 12 positions for signals...',
    '✓ NVDA  +140.4% unrealised  →  HOLD  (RSI 61, trend intact)',
    '✓ AAPL  +12.8% unrealised  →  HOLD  (near resistance $220)',
    '✓ TSLA  -4.2% unrealised   →  WATCH (volume spike, monitor)',
    '✓ MSFT  +28.1% unrealised  →  HOLD  (earnings beat priced in)',
    '─────────────────────────────────',
    '→  4 HOLD  |  1 WATCH  |  0 BUY  |  0 SELL',
    '→  Portfolio health: 92/100  ✓',
  ],
  'hoodscan.market.top_movers({ count: 5 })': [
    '⟳ Fetching top movers from NASDAQ + NYSE...',
    '',
    '  GAINERS ▲',
    '  SMCI  +14.2%   $912.40   Vol: 18.4M',
    '  PLTR  +8.7%    $28.44    Vol: 64.2M',
    '  ARM   +6.1%    $152.30   Vol: 12.8M',
    '',
    '  LOSERS ▼',
    '  INTC  -5.8%    $28.14    Vol: 88.1M',
    '  SNAP  -4.2%    $11.06    Vol: 42.7M',
  ],
  'hoodscan.market.get_quote({ symbol: "NVDA" })': [
    '⟳ Fetching real-time quote for NVDA...',
    '',
    '  NVIDIA Corporation  [NASDAQ: NVDA]',
    '  ─────────────────────────────────',
    '  Last    $891.20',
    '  Bid     $891.00  ·  Ask  $891.40',
    '  Change  +$18.40  (+2.11%)',
    '  Volume  18,420,300',
    '  Mkt Cap $2.19T',
    '  52w H   $974.00  ·  52w L  $402.80',
    '',
    '✓ Quote as of 14:32:05 EDT',
  ],
  'hoodscan.portfolio.get_positions()': [
    '⟳ Loading positions...',
    '',
    '  SYMBOL   QTY    AVG COST    CURRENT    P&L',
    '  ──────────────────────────────────────────',
    '  NVDA      12    $410.20     $891.20  +$5,772 (+140.4%)',
    '  AAPL      18    $192.80     $217.40    +$443 (+12.8%)',
    '  MSFT       8    $348.20     $445.30  +$777  (+27.9%)',
    '  TSLA      10    $248.10     $237.80   -$103   (-4.2%)',
    '  SPY        4    $492.40     $548.20  +$223  (+11.3%)',
    '',
    '  Total P&L: +$7,112  (+7.1% on cost)',
  ],
  'hoodscan.data.get_technical_indicators({ symbol: "AAPL", indicators: ["rsi","macd"] })': [
    '⟳ Computing RSI + MACD for AAPL...',
    '',
    '  RSI (14)          58.4   [neutral zone]',
    '  MACD Line          1.24',
    '  MACD Signal        0.98',
    '  MACD Histogram    +0.26  [bullish crossover]',
    '',
    '  Interpretation:',
    '  → RSI below 70, no overbought concern',
    '  → MACD histogram positive → upward momentum',
    '  → Bias: BULLISH short-term',
  ],
  'hoodscan.options.get_options_chain({ symbol: "SPY", expiration: "2026-08-01" })': [
    '⟳ Fetching SPY options chain (exp: 2026-08-01)...',
    '',
    '  CALLS  [SPY @ $548.20]',
    '  Strike   Bid     Ask     IV     Delta',
    '  545      5.80    5.90    0.18   0.62',
    '  550      2.80    2.90    0.16   0.48',
    '  555      0.95    1.02    0.15   0.31',
    '',
    '  PUTS',
    '  Strike   Bid     Ask     IV     Delta',
    '  545      2.40    2.50    0.18  -0.38',
    '  540      1.10    1.18    0.17  -0.22',
    '  535      0.44    0.50    0.17  -0.12',
  ],
}

function getResponse(cmd: string): string[] {
  const key = Object.keys(CMD_RESPONSES).find(k => cmd.trim() === k)
  if (key) return CMD_RESPONSES[key]
  return [
    `⟳ Executing: ${cmd}`,
    '⟳ Routing to HOODSCAN MCP engine...',
    '✓ Tool resolved successfully',
    `→ Result: { "status": "ok", "timestamp": "${new Date().toISOString()}" }`,
  ]
}

// ─── Live Scanner Data ────────────────────────────────────────────────

const BASE_SCANNER: Omit<ScanRow, 'updated'>[] = [
  { ticker: 'NVDA', price: 891.20, change: 18.40, changePct: 2.11, volume: '18.4M', signal: 'BUY',  strength: 84, rsi: 61 },
  { ticker: 'AAPL', price: 217.40, change:  2.60, changePct: 1.21, volume: '32.1M', signal: 'HOLD', strength: 58, rsi: 58 },
  { ticker: 'MSFT', price: 445.30, change:  2.80, changePct: 0.63, volume: '14.2M', signal: 'HOLD', strength: 62, rsi: 54 },
  { ticker: 'TSLA', price: 237.80, change: -8.20, changePct:-3.33, volume: '62.8M', signal: 'WATCH',strength: 38, rsi: 42 },
  { ticker: 'PLTR', price: 28.44,  change:  2.28, changePct: 8.72, volume: '64.2M', signal: 'BUY',  strength: 91, rsi: 67 },
  { ticker: 'META', price: 592.10, change:  6.40, changePct: 1.09, volume: '9.8M',  signal: 'HOLD', strength: 60, rsi: 57 },
  { ticker: 'AMD',  price: 178.40, change: -3.10, changePct:-1.71, volume: '28.4M', signal: 'WATCH',strength: 44, rsi: 45 },
  { ticker: 'SMCI', price: 912.40, change:129.40, changePct:16.53, volume: '18.4M', signal: 'BUY',  strength: 96, rsi: 74 },
  { ticker: 'SOFI', price: 8.12,   change: -0.24, changePct:-2.87, volume: '22.1M', signal: 'SELL', strength: 28, rsi: 34 },
  { ticker: 'HOOD', price: 21.84,  change:  0.64, changePct: 3.02, volume: '18.6M', signal: 'BUY',  strength: 76, rsi: 63 },
  { ticker: 'INTC', price: 28.14,  change: -1.74, changePct:-5.82, volume: '88.1M', signal: 'SELL', strength: 18, rsi: 28 },
  { ticker: 'SPY',  price: 548.20, change:  4.80, changePct: 0.88, volume: '44.8M', signal: 'HOLD', strength: 55, rsi: 52 },
]

const SIGNAL_STYLE: Record<ScanRow['signal'], string> = {
  BUY:   'bg-[#C9F028]/12 text-[#C9F028] border-[#C9F028]/25',
  HOLD:  'bg-white/5 text-[#8888a8] border-white/10',
  WATCH: 'bg-[#f97316]/10 text-[#f97316] border-[#f97316]/25',
  SELL:  'bg-red-500/10 text-red-400 border-red-500/25',
}

// ─── Sub-components ───────────────────────────────────────────────────

function StatBadge({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="glass rounded-xl px-5 py-4 flex flex-col gap-1 min-w-[130px]">
      <span className="text-xs text-[#55556a] uppercase tracking-widest">{label}</span>
      <span className="text-xl font-bold font-mono" style={{ color }}>{value}</span>
    </div>
  )
}

function SignalBar({ strength, color }: { strength: number; color: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="h-1.5 rounded-full bg-white/8 flex-1 overflow-hidden" style={{ width: 56 }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: color, width: `${strength}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${strength}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
      <span className="text-[10px] font-mono text-[#55556a] w-6 text-right">{strength}</span>
    </div>
  )
}

// ─── Main Demo Page ───────────────────────────────────────────────────

export default function Demo() {
  // ── Tab state ─────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<'scanner' | 'tools' | 'terminal'>('scanner')

  // ── Live Scanner ──────────────────────────────────────────────────
  const [scanRows, setScanRows] = useState<ScanRow[]>(BASE_SCANNER.map(r => ({ ...r, updated: false })))
  const [scanPaused, setScanPaused] = useState(false)
  const [scanFilter, setScanFilter] = useState<ScanRow['signal'] | 'ALL'>('ALL')
  const scanRef = useRef(scanRows)
  scanRef.current = scanRows

  useEffect(() => {
    if (scanPaused) return
    const id = setInterval(() => {
      setScanRows(prev => prev.map(row => {
        if (Math.random() > 0.3) return { ...row, updated: false }
        const delta = (Math.random() - 0.48) * row.price * 0.004
        const newPrice = Math.max(0.01, row.price + delta)
        const newChange = row.change + delta
        const newPct = (newChange / (row.price - row.change)) * 100
        const newRsi = Math.max(10, Math.min(90, row.rsi + (Math.random() - 0.5) * 2))
        const newStrength = Math.max(5, Math.min(99, row.strength + (Math.random() - 0.5) * 3))
        let newSignal = row.signal
        if (newRsi > 70 && newPct > 0) newSignal = 'BUY'
        else if (newRsi < 35) newSignal = 'SELL'
        else if (Math.random() < 0.02) {
          const opts: ScanRow['signal'][] = ['BUY','HOLD','WATCH','SELL']
          newSignal = opts[Math.floor(Math.random() * opts.length)]
        }
        return { ...row, price: newPrice, change: newChange, changePct: newPct, rsi: Math.round(newRsi), strength: Math.round(newStrength), signal: newSignal, updated: true }
      }))
    }, 1200)
    return () => clearInterval(id)
  }, [scanPaused])

  const filteredRows = scanFilter === 'ALL' ? scanRows : scanRows.filter(r => r.signal === scanFilter)

  // ── MCP Tools ─────────────────────────────────────────────────────
  const [toolSearch, setToolSearch] = useState('')
  const [toolCategory, setToolCategory] = useState<ToolCategory | 'all'>('all')
  const [activeTool, setActiveTool] = useState<McpTool | null>(null)
  const [toolRunning, setToolRunning] = useState(false)
  const [toolOutput, setToolOutput] = useState<string | null>(null)
  const [copiedTool, setCopiedTool] = useState<string | null>(null)

  const filteredTools = MCP_TOOLS.filter(t => {
    const matchQ = toolSearch === '' || t.name.toLowerCase().includes(toolSearch.toLowerCase()) || t.description.toLowerCase().includes(toolSearch.toLowerCase())
    const matchC = toolCategory === 'all' || t.category === toolCategory
    return matchQ && matchC
  })

  const runTool = (tool: McpTool) => {
    setActiveTool(tool)
    setToolOutput(null)
    setToolRunning(true)
    setTimeout(() => {
      setToolRunning(false)
      setToolOutput(tool.exampleOutput)
    }, 900 + Math.random() * 600)
  }

  const copyTool = (tool: McpTool) => {
    navigator.clipboard?.writeText(`await hoodscan.${tool.category}.${tool.name}(${tool.params})`)
    setCopiedTool(tool.name)
    setTimeout(() => setCopiedTool(null), 2000)
  }

  // ── Terminal ──────────────────────────────────────────────────────
  const [termInput, setTermInput] = useState('')
  const [termEntries, setTermEntries] = useState<TerminalEntry[]>([
    { id: 0, type: 'info', text: 'HOODSCAN MCP Terminal v2.0. Type a command or click a preset above.' },
    { id: 1, type: 'info', text: 'Session authenticated. 50 tools loaded. Ready.\n' },
  ])
  const [termBusy, setTermBusy] = useState(false)
  const termRef = useRef<HTMLDivElement>(null)
  const entryId = useRef(2)

  const scrollTerm = useCallback(() => {
    setTimeout(() => {
      if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight
    }, 50)
  }, [])

  const runCommand = useCallback((cmd: string) => {
    if (!cmd.trim() || termBusy) return
    const lines = getResponse(cmd)
    setTermBusy(true)
    setTermEntries(prev => [...prev, { id: entryId.current++, type: 'input', text: `> ${cmd}` }])
    scrollTerm()
    lines.forEach((line, i) => {
      setTimeout(() => {
        setTermEntries(prev => [...prev, { id: entryId.current++, type: 'output', text: line }])
        scrollTerm()
        if (i === lines.length - 1) {
          setTimeout(() => {
            setTermEntries(prev => [...prev, { id: entryId.current++, type: 'output', text: '' }])
            setTermBusy(false)
            scrollTerm()
          }, 120)
        }
      }, i * 80)
    })
  }, [termBusy, scrollTerm])

  const submitTerm = (e: React.FormEvent) => {
    e.preventDefault()
    if (!termInput.trim()) return
    runCommand(termInput)
    setTermInput('')
  }

  return (
    <>
      <Helmet>
        <title>Live Demo | HOODSCAN 50+ MCP Tools Explorer</title>
        <meta name="description" content="Explore all 50+ HOODSCAN MCP tools interactively. Live demo of portfolio management, real-time market scanning, options trading, and crypto tools for AI agents." />
        <link rel="canonical" href="https://hoodscan.world/demo" />
        <meta property="og:title" content="Live Demo | HOODSCAN 50+ MCP Tools Explorer" />
        <meta property="og:description" content="Explore all 50+ HOODSCAN MCP tools interactively. Live demo of portfolio management, real-time market scanning, options trading, and crypto tools for AI agents." />
        <meta property="og:url" content="https://hoodscan.world/demo" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://hoodscan.world/og-image.png" />
      </Helmet>
    <div className="min-h-screen pt-16">
      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div className="absolute inset-0 grid-pattern pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-[#C9F028]/4 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-[#7b61ff]/4 blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <div className="inline-flex items-center gap-2 glass-green rounded-full px-3 py-1 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9F028] pulse-dot" />
            <span className="text-[11px] font-mono text-[#C9F028]">Live Demo · All Data Simulated</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#f0f0f8] mb-4 leading-tight">
            See HOODSCAN
            <span className="block gradient-text-green">in Action</span>
          </h1>
          <p className="text-[#8888a8] text-lg max-w-2xl mx-auto mb-10">
            Interact with the full MCP toolkit live: market scanner, 50 AI tools, and the agent terminal.
            No login required.
          </p>

          {/* Live stats */}
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <StatBadge label="MCP Tools" value="50" color="#C9F028" />
            <StatBadge label="Latency" value="~40ms" color="#00d4ff" />
            <StatBadge label="Uptime" value="99.97%" color="#C9F028" />
            <StatBadge label="Session" value="Active" color="#7b61ff" />
          </div>
        </motion.div>
      </section>

      {/* ── Tab bar ────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex gap-1 p-1 glass rounded-2xl w-fit mx-auto">
          {[
            { id: 'scanner', label: 'Live Scanner', icon: Radio },
            { id: 'tools',   label: 'MCP Tools',    icon: Package },
            { id: 'terminal',label: 'Agent Terminal',icon: Terminal },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as typeof activeTab)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === id
                  ? 'bg-[#C9F028] text-[#050508]'
                  : 'text-[#8888a8] hover:text-[#f0f0f8]'
              }`}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Content ────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <AnimatePresence mode="wait">

          {/* ── LIVE SCANNER ──────────────────────────────────────── */}
          {activeTab === 'scanner' && (
            <motion.div key="scanner"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              {/* Controls */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#C9F028]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9F028] pulse-dot" />
                  LIVE
                </div>
                <div className="flex gap-1 ml-auto flex-wrap">
                  {(['ALL', 'BUY', 'HOLD', 'WATCH', 'SELL'] as const).map(s => (
                    <button key={s} onClick={() => setScanFilter(s)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono border transition-all ${
                        scanFilter === s
                          ? s === 'ALL' ? 'bg-white/10 border-white/20 text-[#f0f0f8]' : SIGNAL_STYLE[s as ScanRow['signal']] + ' opacity-100'
                          : 'border-white/8 text-[#55556a] hover:text-[#8888a8]'
                      }`}
                    >{s}</button>
                  ))}
                  <button onClick={() => setScanPaused(p => !p)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs border transition-all ${
                      scanPaused ? 'border-[#C9F028]/30 text-[#C9F028]' : 'border-white/8 text-[#55556a]'
                    }`}
                  >
                    {scanPaused ? <Play size={11} /> : <RefreshCw size={11} className="animate-spin" style={{ animationDuration: '3s' }} />}
                    {scanPaused ? 'Resume' : 'Pause'}
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="glass rounded-2xl overflow-hidden border border-white/7">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/7">
                        {['Symbol', 'Price', 'Change', 'Volume', 'Signal', 'Strength', 'RSI'].map(h => (
                          <th key={h} className="px-4 py-3 text-left text-[10px] font-mono text-[#55556a] uppercase tracking-wider first:pl-6 last:pr-6">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <AnimatePresence initial={false}>
                        {filteredRows.map(row => (
                          <motion.tr key={row.ticker}
                            layout
                            className={`border-b border-white/4 last:border-0 transition-colors ${row.updated ? 'bg-[#C9F028]/2' : 'hover:bg-white/2'}`}
                          >
                            <td className="px-4 py-3 pl-6">
                              <span className="font-mono font-bold text-[#f0f0f8]">{row.ticker}</span>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`font-mono font-semibold transition-colors ${row.updated ? 'text-[#C9F028]' : 'text-[#f0f0f8]'}`}>
                                ${row.price.toFixed(2)}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-1">
                                {row.changePct >= 0
                                  ? <ArrowUpRight size={13} className="text-[#C9F028]" />
                                  : <ArrowDownRight size={13} className="text-red-400" />}
                                <span className={`font-mono text-sm ${row.changePct >= 0 ? 'text-[#C9F028]' : 'text-red-400'}`}>
                                  {row.changePct >= 0 ? '+' : ''}{row.changePct.toFixed(2)}%
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3 font-mono text-[#8888a8] text-xs">{row.volume}</td>
                            <td className="px-4 py-3">
                              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${SIGNAL_STYLE[row.signal]}`}>
                                {row.signal}
                              </span>
                            </td>
                            <td className="px-4 py-3" style={{ minWidth: 100 }}>
                              <SignalBar strength={row.strength}
                                color={row.signal === 'BUY' ? '#C9F028' : row.signal === 'SELL' ? '#ef4444' : row.signal === 'WATCH' ? '#f97316' : '#55556a'} />
                            </td>
                            <td className="px-4 py-3 pr-6">
                              <span className={`font-mono text-sm ${row.rsi > 65 ? 'text-[#C9F028]' : row.rsi < 35 ? 'text-red-400' : 'text-[#8888a8]'}`}>
                                {row.rsi}
                              </span>
                            </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>
              </div>

              <p className="mt-3 text-xs text-[#55556a] text-center">
                Prices update every ~1.2s. Signal strength and RSI computed in real-time. Data is simulated for demo purposes.
              </p>
            </motion.div>
          )}

          {/* ── MCP TOOLS ─────────────────────────────────────────── */}
          {activeTab === 'tools' && (
            <motion.div key="tools"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
              className="grid lg:grid-cols-[1fr_380px] gap-6"
            >
              {/* Left: tool list */}
              <div>
                {/* Search + filter */}
                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="flex-1 min-w-[200px] flex items-center gap-2 glass rounded-xl px-4 py-2.5 border border-white/8">
                    <Search size={14} className="text-[#55556a] flex-shrink-0" />
                    <input
                      value={toolSearch} onChange={e => setToolSearch(e.target.value)}
                      placeholder="Search 50 tools…"
                      className="bg-transparent text-sm text-[#f0f0f8] placeholder-[#55556a] outline-none flex-1 min-w-0"
                    />
                    {toolSearch && (
                      <button onClick={() => setToolSearch('')} className="text-[#55556a] hover:text-[#8888a8] text-xs">✕</button>
                    )}
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    <button onClick={() => setToolCategory('all')}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs border transition-all ${toolCategory === 'all' ? 'bg-white/10 border-white/20 text-[#f0f0f8]' : 'border-white/8 text-[#55556a] hover:text-[#8888a8]'}`}>
                      <Filter size={11} /> All
                    </button>
                    {(Object.keys(CATEGORY_META) as ToolCategory[]).map(cat => {
                      const meta = CATEGORY_META[cat]
                      return (
                        <button key={cat} onClick={() => setToolCategory(cat)}
                          className={`px-3 py-2 rounded-xl text-xs border transition-all ${toolCategory === cat ? 'text-[#050508] border-transparent' : 'border-white/8 text-[#55556a] hover:text-[#8888a8]'}`}
                          style={toolCategory === cat ? { background: meta.color } : {}}
                        >
                          {meta.label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Tool count */}
                <p className="text-xs text-[#55556a] mb-3 font-mono">{filteredTools.length} tools</p>

                {/* Tool list */}
                <div className="space-y-2 max-h-[560px] overflow-y-auto pr-1 scrollbar-thin">
                  {filteredTools.map(tool => {
                    const meta = CATEGORY_META[tool.category]
                    const isActive = activeTool?.name === tool.name
                    return (
                      <motion.div key={tool.name} layout
                        onClick={() => runTool(tool)}
                        className={`glass rounded-xl px-4 py-3 cursor-pointer border transition-all group ${isActive ? 'border-[#C9F028]/30 bg-[#C9F028]/4' : 'border-white/6 hover:border-white/12'}`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1" style={{ background: meta.color }} />
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-sm text-[#f0f0f8] font-medium">{tool.name}</span>
                                <span className="text-[10px] px-1.5 py-0.5 rounded font-mono border" style={{ color: meta.color, borderColor: meta.color + '30', background: meta.color + '10' }}>
                                  {meta.label}
                                </span>
                              </div>
                              <p className="text-xs text-[#8888a8] mt-0.5 leading-relaxed truncate">{tool.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            <button onClick={e => { e.stopPropagation(); copyTool(tool) }}
                              className="p-1.5 rounded-lg text-[#55556a] hover:text-[#C9F028] transition-colors opacity-0 group-hover:opacity-100">
                              {copiedTool === tool.name ? <Check size={12} className="text-[#C9F028]" /> : <Copy size={12} />}
                            </button>
                            <ChevronRight size={14} className={`text-[#55556a] transition-all ${isActive ? 'text-[#C9F028] rotate-90' : 'group-hover:translate-x-0.5'}`} />
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Right: tool detail */}
              <div className="lg:sticky lg:top-20 h-fit">
                <AnimatePresence mode="wait">
                  {!activeTool ? (
                    <motion.div key="empty"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="glass rounded-2xl p-8 text-center border border-white/7 flex flex-col items-center gap-4"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                        <Cpu size={22} className="text-[#55556a]" />
                      </div>
                      <div>
                        <p className="text-[#f0f0f8] font-medium mb-1">Select a tool</p>
                        <p className="text-xs text-[#55556a] leading-relaxed">Click any tool on the left to see its signature and run a live example.</p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key={activeTool.name}
                      initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="glass rounded-2xl border border-white/7 overflow-hidden"
                    >
                      {/* Header */}
                      <div className="px-5 py-4 border-b border-white/7 flex items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-[#f0f0f8]">{activeTool.name}</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded font-mono border"
                              style={{ color: CATEGORY_META[activeTool.category].color, borderColor: CATEGORY_META[activeTool.category].color + '30', background: CATEGORY_META[activeTool.category].color + '10' }}>
                              {CATEGORY_META[activeTool.category].label}
                            </span>
                          </div>
                          <p className="text-xs text-[#8888a8] mt-0.5">{activeTool.description}</p>
                        </div>
                        <button onClick={() => runTool(activeTool)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C9F028]/10 border border-[#C9F028]/25 text-[#C9F028] text-xs font-mono hover:bg-[#C9F028]/20 transition-colors flex-shrink-0">
                          <Play size={11} />
                          Run
                        </button>
                      </div>

                      {/* Params */}
                      <div className="px-5 py-3 border-b border-white/7">
                        <p className="text-[10px] font-mono text-[#55556a] uppercase tracking-wider mb-1.5">Parameters</p>
                        <div className="rounded-lg overflow-hidden border border-white/8">
                          <div className="flex items-center px-3 py-1.5 bg-white/3 border-b border-white/5 gap-2">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 rounded-full bg-red-500/40" />
                              <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
                              <div className="w-2 h-2 rounded-full bg-[#C9F028]/40" />
                            </div>
                            <span className="text-[10px] font-mono text-[#55556a]">params.json</span>
                          </div>
                          <pre className="px-4 py-3 text-xs font-mono text-[#f0f0f8] bg-[#060610] overflow-x-auto leading-relaxed">
                            {activeTool.params}
                          </pre>
                        </div>
                      </div>

                      {/* Output */}
                      <div className="px-5 py-3">
                        <p className="text-[10px] font-mono text-[#55556a] uppercase tracking-wider mb-1.5">Output</p>
                        {toolRunning ? (
                          <div className="flex items-center gap-2 py-4">
                            <RefreshCw size={13} className="text-[#C9F028] animate-spin" />
                            <span className="text-xs font-mono text-[#8888a8]">Executing via MCP…</span>
                          </div>
                        ) : toolOutput ? (
                          <div className="rounded-lg overflow-hidden border border-[#C9F028]/15">
                            <div className="flex items-center px-3 py-1.5 bg-[#C9F028]/5 border-b border-[#C9F028]/10 gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#C9F028]" />
                              <span className="text-[10px] font-mono text-[#C9F028]">200 OK</span>
                              <button onClick={() => { navigator.clipboard?.writeText(toolOutput) }}
                                className="ml-auto text-[#55556a] hover:text-[#C9F028] transition-colors">
                                <Copy size={11} />
                              </button>
                            </div>
                            <pre className="px-4 py-3 text-xs font-mono text-[#C9F028]/90 bg-[#060610] overflow-x-auto leading-relaxed whitespace-pre-wrap">
                              {toolOutput}
                            </pre>
                          </div>
                        ) : (
                          <p className="text-xs text-[#55556a] py-2">Click Run to execute this tool.</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* ── AGENT TERMINAL ────────────────────────────────────── */}
          {activeTab === 'terminal' && (
            <motion.div key="terminal"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              {/* Presets */}
              <div className="flex flex-wrap gap-2 mb-4">
                {PRESETS.map(p => (
                  <button key={p.label} onClick={() => { setTermInput(p.cmd); setTimeout(() => runCommand(p.cmd), 50); setTermInput('') }}
                    disabled={termBusy}
                    className="flex items-center gap-1.5 px-3 py-1.5 glass rounded-lg text-xs font-mono text-[#8888a8] border border-white/8 hover:border-[#C9F028]/30 hover:text-[#C9F028] transition-all disabled:opacity-50">
                    <ChevronRight size={10} />
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Terminal */}
              <div className="glass rounded-2xl border border-white/7 overflow-hidden">
                {/* Title bar */}
                <div className="flex items-center gap-2 px-5 py-3 border-b border-white/7 bg-white/2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-[#C9F028]/50" />
                  </div>
                  <span className="ml-2 text-xs font-mono text-[#55556a]">hoodscan.mcp / agent terminal</span>
                  <div className="ml-auto flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9F028] pulse-dot" />
                    <span className="text-xs font-mono text-[#C9F028]">connected</span>
                  </div>
                </div>

                {/* Output area */}
                <div ref={termRef} className="p-5 font-mono text-sm space-y-1 h-96 overflow-y-auto bg-[#040408]">
                  {termEntries.map(entry => (
                    <div key={entry.id}
                      className={`leading-relaxed ${
                        entry.type === 'input' ? 'text-[#C9F028]' :
                        entry.type === 'info'  ? 'text-[#55556a]' :
                        entry.type === 'error' ? 'text-red-400' :
                        'text-[#8888a8]'
                      }`}
                      style={{ whiteSpace: 'pre' }}
                    >
                      {entry.text || '\u00A0'}
                    </div>
                  ))}
                  {termBusy && (
                    <div className="flex items-center gap-2 text-[#C9F028]/50">
                      <span className="inline-block w-1.5 h-4 bg-[#C9F028] opacity-80 cursor-blink" />
                    </div>
                  )}
                </div>

                {/* Input */}
                <form onSubmit={submitTerm} className="flex items-center gap-3 px-5 py-3 border-t border-white/7 bg-[#040408]">
                  <span className="font-mono text-[#C9F028] text-sm flex-shrink-0">{'>'}</span>
                  <input
                    value={termInput}
                    onChange={e => setTermInput(e.target.value)}
                    placeholder="hoodscan.portfolio.get_positions()"
                    className="flex-1 bg-transparent text-sm font-mono text-[#f0f0f8] placeholder-[#2a2a3a] outline-none"
                    disabled={termBusy}
                    autoComplete="off"
                    spellCheck={false}
                  />
                  <button type="submit" disabled={termBusy || !termInput.trim()}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C9F028]/10 border border-[#C9F028]/25 text-[#C9F028] text-xs font-mono hover:bg-[#C9F028]/20 transition-colors disabled:opacity-30">
                    <Play size={11} />
                    Run
                  </button>
                </form>
              </div>

              <p className="mt-3 text-xs text-[#55556a] text-center">
                All commands return simulated data. Connect a real session with{' '}
                <code className="font-mono text-[#8888a8]">npx robinhood-for-agents onboard</code> for live data.
              </p>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
    </>
  )
}
