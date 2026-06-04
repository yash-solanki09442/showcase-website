# Showcase — Luxury Marketplace POC

Static, high-polish demo for client **Showcase**. No backend; cart, wishlist, and currency persist in `sessionStorage`.

## Pages

| Page | File |
|------|------|
| Landing | `index.html` |
| Shop | `shop.html` |
| Product detail | `product.html?id={product-id}` |
| Bag | `cart.html` |
| Wishlist | `wishlist.html` |
| Sign in (mock) | `login.html` |

## Local preview

```bash
cd "C:\Users\Yash Solanki\Projects\showcase-poc"
npm start
```

Or: `npx --yes serve . -p 3000` → open `http://localhost:3000`

**Test flows:** Shop → heart on card (wishlist) → + (cart) → product PDP → bag → toggle USD/EUR in header.

## Deploy to Vercel (free tier)

### 1. Push to GitHub

```bash
cd "C:\Users\Yash Solanki\Projects\showcase-poc"
git init
git add .
git commit -m "Add Showcase luxury marketplace POC"
gh repo create showcase-poc --public --source=. --remote=origin --push
```

If you do not use GitHub CLI, create an empty repo on GitHub, then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/showcase-poc.git
git branch -M main
git push -u origin main
```

### 2. Import in Vercel

1. Sign in at [vercel.com](https://vercel.com) (GitHub account).
2. **Add New… → Project** → import `showcase-poc`.
3. Framework preset: **Other** (static site, no build command).
4. Root directory: `.` (project root).
5. Build command: leave empty. Output directory: `.` (or leave default; Vercel serves static files from root).
6. Deploy.

### 3. Verify

- Home: `/` or `/index.html`
- Shop: `/shop.html`
- Product example: `/product.html?id=signature-diamond-pendant`
- Cart and wishlist persist in the same browser session/tab.

### Custom domain (later)

In Vercel → Project → **Settings → Domains**, add `showcase` (or your real domain) when ready.

## Project structure

- `products.js` — catalog (15 pieces), pricing, categories
- `css/styles.css` — design system
- `js/app.js` — cart, wishlist, currency, page logic
- `PROPOSAL.md` — client proposal (PDF-ready)

## Documentation

| Doc | Purpose |
|-----|---------|
| `PROPOSAL.md` | Full client proposal (PDF-ready) |
| `docs/CLIENT_REVIEW.md` | Stakeholder walkthrough & sign-off checklist |
| `docs/BACKEND_DECISION.md` | Django vs FastAPI — Phase 1 decision |
| `docs/DEPLOYMENT.md` | Vercel / repo strategy (avoid dual-repo drift) |
| `../showcase-platform/` | Phase 1 monorepo (Next.js + Django) |

**Live POC:** https://showcase-website-ochre.vercel.app/

Sync to Vercel deploy repo (if still using two repos): `.\scripts\sync-to-vercel-repo.ps1 -TargetPath "path\to\showcase-website"`
