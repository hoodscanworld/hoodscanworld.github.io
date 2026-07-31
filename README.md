# HOODSCAN

**AI-Native Trading Intelligence**

[![Live](https://img.shields.io/badge/live-hoodscan.world-C9F028?style=flat-square&logo=googlechrome&logoColor=black)](https://hoodscan.world)
[![License: MIT](https://img.shields.io/badge/license-MIT-7b61ff?style=flat-square)](LICENSE)
[![React](https://img.shields.io/badge/React-19-00d4ff?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-C9F028?style=flat-square&logo=vite&logoColor=black)](https://vitejs.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-00d4ff?style=flat-square&logo=typescript&logoColor=black)](https://www.typescriptlang.org)

HOODSCAN is the web platform and demo interface for the [robinhood-for-agents](https://github.com/kevin1chun/robinhood-for-agents) MCP server. It exposes 50+ Model Context Protocol (MCP) tools that allow autonomous AI agents to trade stocks, scan markets, manage portfolios, and execute orders on Robinhood without human intervention.

---

## Live Site

**[hoodscan.world](https://hoodscan.world)**

| Page | URL | Description |
|------|-----|-------------|
| Home | [hoodscan.world](https://hoodscan.world) | Platform overview and feature highlights |
| How It Works | [hoodscan.world/how-to](https://hoodscan.world/how-to) | Step-by-step setup guide for AI agents |
| Demo | [hoodscan.world/demo](https://hoodscan.world/demo) | Interactive explorer for all 50+ MCP tools |
| FAQ | [hoodscan.world/faq](https://hoodscan.world/faq) | Answers to common questions |
| About | [hoodscan.world/about](https://hoodscan.world/about) | Mission, values, and roadmap |

---

## Features

- **50+ MCP tools** across 7 categories: Portfolio, Market, Orders, Options, Crypto, Data, Account
- **Agent-First Architecture** — every tool, API, and data structure designed for programmatic consumption by AI agents
- **Wallet-native authentication** via MetaMask and Phantom
- **Self-renewing Robinhood sessions** — agents never hit an auth wall mid-trade; 401 recovery is fully automatic
- **OS keychain storage** on macOS, Linux, and Windows; encrypted file mode for Docker
- **Native support** for Claude Code, Codex, OpenClaw, and Claude Desktop
- **Real-time market scanning** — quotes, movers, gainers, losers, search
- **Full options suite** — chains, positions, multi-leg orders, Greeks
- **Crypto trading** — BTC, ETH, SOL, DOGE, and all Robinhood Crypto assets
- **Portfolio analytics** — history, total return, dividends, watchlist
- **Deep data tools** — technical indicators (RSI, MACD, Bollinger Bands), analyst ratings, institutional holdings, short interest, insider trades
- **Zero-friction uptime** — token refresh is proactive; agents never re-authenticate mid-strategy

---

## Core Values

| Value | Description |
|-------|-------------|
| Agent-First | Every tool is designed for machine consumption; human UIs are secondary |
| No Trust, Full Verify | OS keychain + encrypted Docker mode; zero shortcuts on auth safety |
| Open by Default | MIT licensed, fully auditable on GitHub — community infrastructure |
| Zero Friction Uptime | Proactive token refresh; automatic 401 recovery mid-strategy |

---

## MCP Tool Categories

| Category | Tools | Key Tools |
|----------|-------|-----------|
| Portfolio | 9 | `get_portfolio`, `get_positions`, `get_position`, `get_cash`, `get_portfolio_history`, `get_total_return`, `get_dividends`, `get_watchlist`, `add_to_watchlist` |
| Market | 9 | `get_quote`, `get_quotes`, `search_stocks`, `get_fundamentals`, `get_news`, `get_top_movers` + more |
| Orders | 5 | `place_order`, `cancel_order`, `get_open_orders`, `get_order_history` + more |
| Options | 4 | `get_options_chain`, `place_options_order`, `get_options_positions` + more |
| Crypto | 4 | `get_crypto_quote`, `buy_crypto`, `sell_crypto`, `get_crypto_positions` |
| Data | 6 | `get_historical_data`, `get_technical_indicators`, `get_analyst_ratings`, `get_institutional_holdings`, `get_short_interest`, `get_insider_trades` |
| Account | 4 | `get_account_info`, `get_tax_documents`, `get_notifications`, `get_transfer_history` |

---

## MCP Quick Start

```bash
npx robinhood-for-agents onboard
```

Then connect your MCP-compatible agent to the HOODSCAN server and call any tool:

```json
{
  "tool": "get_portfolio",
  "arguments": {}
}
```

Response:

```json
{
  "equity": 124832.14,
  "cash": 8421.50,
  "invested": 116410.64,
  "day_change": 1.84,
  "total_return": 18.2
}
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Build | Vite 8 |
| Language | TypeScript 6 |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion 12 |
| Routing | React Router v7 |
| SEO | react-helmet-async |
| Auth | Wallet (MetaMask, Phantom) |
| Hosting | GitHub Pages |
| Domain | hoodscan.world (via Hostinger DNS) |
| CI/CD | GitHub Actions |

---

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

```bash
npm run build    # production build to dist/
npm run preview  # preview the production build locally
```

---

## Project Structure

```
hoodscanworld.github.io/
├── public/
│   ├── favicon.svg
│   ├── apple-touch-icon.png
│   ├── og-image.png              # 1200x630 social share image
│   ├── manifest.json             # PWA manifest
│   ├── robots.txt
│   ├── sitemap.xml               # public pages
│   └── 404.html                  # SPA redirect fallback
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Logo.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── ScrollToTop.tsx
│   │   └── WalletIcons.tsx
│   ├── pages/
│   │   ├── Home.tsx              # Live candlestick chart background, platform overview
│   │   ├── About.tsx             # Mission, values, roadmap, FAQ
│   │   ├── HowTo.tsx             # Step-by-step setup guide
│   │   ├── Demo.tsx              # Interactive MCP tool explorer + live scanner
│   │   ├── FAQ.tsx               # Common questions
│   │   ├── Cookies.tsx           # Cookie policy
│   │   ├── Login.tsx             # Wallet authentication
│   │   └── Dashboard.tsx         # Authenticated agent dashboard
│   ├── contexts/
│   │   └── AuthContext.tsx       # Wallet auth state
│   ├── App.tsx
│   └── main.tsx
├── .github/
│   └── workflows/
│       └── deploy.yml            # build + per-route static HTML generation
└── index.html                    # global SEO meta, JSON-LD, PWA
```

---

## SEO

The site is fully optimized for search engines and social sharing:

- **Per-page meta tags** via `react-helmet-async` (title, description, canonical, og, twitter)
- **JSON-LD structured data** — Organization, WebSite, SoftwareApplication, FAQPage schemas
- **Static HTML per route** — GitHub Actions generates `dist/<route>/index.html` with correct meta for each page so crawlers receive 200 responses with the right content
- **Sitemap** at [hoodscan.world/sitemap.xml](https://hoodscan.world/sitemap.xml)
- **OG image** 1200×630 at [hoodscan.world/og-image.png](https://hoodscan.world/og-image.png)
- **PWA-ready** — manifest.json, apple-touch-icon, theme-color `#050508`
- **Google Search Console** verified

---

## Deploy

Deployment is automatic. Every push to `main` triggers the GitHub Actions workflow:

1. Install dependencies (`npm install --legacy-peer-deps`)
2. Build with Vite (`npm run build`)
3. Generate per-route static HTML for `/about`, `/how-to`, `/demo`, `/faq`, `/cookies`, `/login`
4. Deploy `dist/` to GitHub Pages

The custom domain `hoodscan.world` is configured via:
- `public/CNAME` — points GitHub Pages to the domain
- Hostinger DNS — A records to GitHub Pages IPs + CNAME for www

---

## Roadmap

| Timeline | Milestone | Status |
|----------|-----------|--------|
| Jul 2026 | HOODSCAN v2.0 — live at hoodscan.world | ✅ Live |
| Q3 2026 | Mobile Agent SDK (iOS + Android) — push alerts, biometric session unlock | 🔜 Upcoming |
| Q4 2026 | Options Strategy Builder — visual multi-leg constructor, AI Greeks optimization, backtesting | 🔜 Upcoming |
| Q1 2027 | DeFi & Cross-Chain — Solana DEX, EVM protocols, unified CEX + on-chain portfolio | 🔜 Upcoming |
| Q2 2027+ | HOODSCAN Pro — multi-account, institutional analytics, agent marketplace | 🔜 Upcoming |

---

## FAQ

**Is HOODSCAN affiliated with Robinhood?**
No. HOODSCAN is an independent open-source project. "Robinhood" is a trademark of Robinhood Markets, Inc. HOODSCAN is not affiliated with, endorsed by, or sponsored by Robinhood.

**What AI agents does HOODSCAN support?**
Any MCP-compatible agent works out of the box. Native first-class support for Claude Code, Codex, OpenClaw, and Claude Desktop. Any agent following the MCP spec will work.

**How does authentication work?**
HOODSCAN uses a browser-based one-time login to obtain a session token, then stores it in your OS keychain. The token is refreshed proactively before expiry — agents never hit a re-auth wall mid-strategy.

**Is it safe to use HOODSCAN with a real account?**
HOODSCAN stores credentials locally in your OS keychain and never transmits them to a third-party server. Automated trading carries inherent financial risk. Use at your own discretion.

---

## License

MIT — see [LICENSE](LICENSE)

---

## Disclaimer

HOODSCAN is not affiliated with, endorsed by, or sponsored by Robinhood Markets, Inc. "Robinhood" is a trademark of Robinhood Markets, Inc. Automated trading involves financial risk. Use at your own discretion.
