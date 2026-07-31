# HOODSCAN

**AI-Native Trading Intelligence**

[![Live](https://img.shields.io/badge/live-hoodscan.world-C9F028?style=flat-square&logo=googlechrome&logoColor=black)](https://hoodscan.world)
[![License: MIT](https://img.shields.io/badge/license-MIT-7b61ff?style=flat-square)](LICENSE)
[![React](https://img.shields.io/badge/React-19-00d4ff?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-C9F028?style=flat-square&logo=vite&logoColor=black)](https://vitejs.dev)

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
- **70+ async TypeScript client methods** with full type safety
- **Wallet-native authentication** via MetaMask and Phantom
- **Self-renewing Robinhood sessions** — agents never hit an auth wall mid-trade
- **OS keychain storage** on macOS, Linux, and Windows; encrypted file mode for Docker
- **Native support** for Claude Code, Codex, OpenClaw, and Claude Desktop
- **Real-time market scanning** — quotes, movers, gainers, losers, search
- **Full options suite** — chains, positions, multi-leg orders, Greeks
- **Crypto trading** — BTC, ETH, SOL, DOGE, and all Robinhood Crypto assets
- **Portfolio analytics** — history, total return, dividends, watchlist

---

## MCP Tool Categories

| Category | Tools | Examples |
|----------|-------|---------|
| Portfolio | 9 | `get_portfolio`, `get_positions`, `get_portfolio_history`, `get_dividends` |
| Market | 8 | `get_quote`, `get_quotes`, `search_stocks`, `get_movers`, `get_top_gainers` |
| Orders | 7 | `place_order`, `cancel_order`, `get_open_orders`, `get_order_history` |
| Options | 10 | `get_options_chain`, `place_options_order`, `get_options_positions` |
| Crypto | 6 | `get_crypto_quote`, `place_crypto_order`, `get_crypto_positions` |
| Data | 8 | `get_historical_data`, `get_fundamentals`, `get_earnings` |
| Account | 6 | `get_account_info`, `get_cash`, `get_total_return` |

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
| Animation | Framer Motion |
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
│   ├── sitemap.xml               # 6 public pages
│   └── 404.html                  # SPA redirect fallback
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Logo.tsx
│   │   └── ...
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── HowTo.tsx
│   │   ├── Demo.tsx
│   │   ├── FAQ.tsx
│   │   ├── Cookies.tsx
│   │   ├── Login.tsx
│   │   └── Dashboard.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx
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
- **OG image** 1200x630 at [hoodscan.world/og-image.png](https://hoodscan.world/og-image.png)
- **PWA-ready** — manifest.json, apple-touch-icon, theme-color

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

| Timeline | Milestone |
|----------|-----------|
| Jul 2026 | HOODSCAN v2.0 — live at hoodscan.world |
| Q3 2026 | Mobile Agent SDK (iOS + Android) |
| Q4 2026 | Options Strategy Builder with backtesting |
| Q1 2027 | DeFi and cross-chain (Solana, EVM) |
| Q2 2027+ | HOODSCAN Pro — multi-account, institutional analytics |

---

## License

MIT — see [LICENSE](LICENSE)

---

## Disclaimer

HOODSCAN is not affiliated with, endorsed by, or sponsored by Robinhood Markets, Inc. "Robinhood" is a trademark of Robinhood Markets, Inc. Automated trading involves financial risk. Use at your own discretion.
