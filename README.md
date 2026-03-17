# AIT Group Website

**Arla Industri Teknopatih** — AI Driven Data Decision Company

> Production-grade Next.js 15 website with strict TypeScript, Zod validation, CSRF protection, and SOLID architecture.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS 3 |
| Validation | Zod 3 |
| Fonts | Outfit, Plus Jakarta Sans, JetBrains Mono |
| Security | CSRF (HMAC-SHA256), CSP headers, HSTS |
| Animation | CSS keyframes + Canvas API |

---

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy env template
cp .env.example .env.local

# 3. Set your CSRF_SECRET in .env.local (min 32 chars)

# 4. Run development server
npm run dev

# 5. Type check
npm run type-check

# 6. Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000)

---

## Architecture – SOLID Principles

### Single Responsibility
Each file has one clear job:
- `lib/csrf.ts` → CSRF token generation & validation only
- `lib/schemas.ts` → Zod validation schemas only
- `lib/data.ts` → Brand & division data only
- `components/sections/*` → One section per component

### Open/Closed
- `ICON_MAP` in division cards: add new icon keys without modifying existing code
- `colorVariantMap` in utils: extend color variants without changing consumers

### Liskov Substitution
- All page components satisfy `PageProps` interface contract
- All form actions return `ApiResponse<T>` — consistent shape

### Interface Segregation
- `Division`, `Product`, `NavItem`, `StatCounter` — no fat interfaces
- Components receive only the props they need

### Dependency Inversion
- Pages depend on `lib/data` abstractions, not hardcoded arrays
- CSRF logic abstracted behind `lib/csrf.ts` interface

---

## Security Features

### CSRF Protection
- Double-submit cookie pattern with HMAC-SHA256 signature
- `__Host-` cookie prefix (enforces Secure + no Domain + Path=/)
- Timing-safe comparison (`crypto.timingSafeEqual`)
- 1-hour token expiry

### HTTP Security Headers
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
Content-Security-Policy: (strict per-directive)
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

### Input Validation (Zod)
- All form inputs validated server-side before processing
- Enum validation for division slugs
- Length limits on all string fields
- Email normalization (`.toLowerCase()`, `.trim()`)

---

## Pages

| Route | Description |
|---|---|
| `/` | Homepage: Hero, Stats, Divisions, Timeline, Contact |
| `/about` | Company story, Vision, Mission, D.A.T.A. values |
| `/divisions` | All 7 divisions listed by tier |
| `/divisions/[slug]` | Division detail with products |
| `/products` | Full product catalog |
| `/impact` | Social impact dashboard |
| `/contact` | Contact form |

---

## Brand Colors

| Name | Hex | Usage |
|---|---|---|
| Navy Patih | `#0A1628` | Background primary |
| Tech Blue | `#1E5AA8` | Secondary, Tier 1 |
| Teal Intelligence | `#0EA5A0` | Accent, CTA, AI |
| Gold Patih | `#D4A843` | Premium, milestones |

---

## Deployment

```bash
# Vercel (recommended)
vercel deploy

# Set env vars in Vercel dashboard:
# CSRF_SECRET=<strong-random-secret>
# NEXT_PUBLIC_SITE_URL=https://ait.co.id
```

---

*AIT Group © 2026. Built with precision from Pontianak.*
