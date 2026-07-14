<!-- intent-skills:start -->
## Skill Loading

Before editing files for a substantial task:
- Run `npx @tanstack/intent@latest list` from the workspace root to see available local skills.
- If a listed skill matches the task, run `npx @tanstack/intent@latest load <package>#<skill>` before changing files.
- Use the loaded `SKILL.md` guidance while making the change.
- Monorepos: when working across packages, run the skill check from the workspace root and prefer the local skill for the package being changed.
- Multiple matches: prefer the most specific local skill for the package or concern you are changing; load additional skills only when the task spans multiple packages or concerns.
<!-- intent-skills:end -->

# ZadAI — TanStack Start Migration

## Scaffold Command

Fresh app scaffolded via TanStack CLI (scratch dir: `/tmp/my-tanstack-app-scratch`, merged into repo root):

```bash
npx @tanstack/cli@latest create my-tanstack-app-scratch --agent --package-manager pnpm --tailwind --deployment cloudflare --add-ons sentry,better-auth,tanstack-query
```

Follow-up Intent commands (run from project root):

```bash
npx @tanstack/intent@latest install
npx @tanstack/intent@latest list
```

## Stack & Integrations

| Layer | Choice | Status |
|-------|--------|--------|
| Framework | TanStack Start + TanStack Router | Active |
| Package manager | **npm** (converted from CLI pnpm scaffold) | Active |
| Toolchain | **Biome** (lint/format) | Active |
| Deployment | Cloudflare Workers (`wrangler.jsonc`) | Configured |
| Auth | Better Auth | Scaffold/demo routes; legacy had no user auth |
| Observability | Sentry (`instrument.server.mjs`) | Configured |
| Data fetching | TanStack Query | Integrated in router |
| Forms | TanStack Form | Demo at `/demo/tanstack-form`; contact forms use legacy controlled inputs |

## Legacy Source

Reference-only clone (do not copy `.git`):

```bash
git clone https://github.com/mbrichta/zadai_nextjs.git legacy-source
```

Path: `./legacy-source/` — excluded from TypeScript and Biome.

## Route Map (Migrated)

| Legacy (Next.js) | TanStack Start | Status |
|------------------|----------------|--------|
| `/` (en-US) | `src/routes/index.tsx` | Migrated |
| `/contact` | `src/routes/contact.tsx` | Migrated |
| `/de-DE`, `/es-ES` home | `src/routes/$lang/index.tsx` | Migrated |
| `/$lang/contact` | `src/routes/$lang/contact.tsx` | Migrated |
| `/en-US/*` redirect | `src/routes/en-US/` | Migrated |
| `/blog` | `src/routes/blog/index.tsx` | Migrated |
| `/blog/$slug` | `src/routes/blog/$slug.tsx` | Migrated |
| `/api/verify-recaptcha` | `src/routes/api/verify-recaptcha.ts` | Migrated |

Scaffold demo routes retained under `src/routes/demo/` (sentry, better-auth, tanstack-query, tanstack-form).

## i18n Architecture

- Locales: `en-US` (default, clean URLs), `de-DE`, `es-ES`
- Dictionaries: `src/dictionaries/{en,de,es}.json`
- Helpers: `src/lib/i18n/{config,dictionaries,paths,loader}.ts`
- Default locale uses unprefixed paths (`/`, `/contact`); other locales use prefix (`/de-DE/contact`)
- `/en-US/*` routes redirect to unprefixed equivalents

## Environment Variables

See `.env.example`. Key vars:

```bash
# reCAPTCHA
VITE_RECAPTCHA_SITE_KEY=          # client (Vite prefix)
CAPTCHA_SECRET_KEY=               # server only

# Sentry
SENTRY_DSN=

# Better Auth (scaffold, unused by marketing pages)
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
```

Copy env values into `.env.local` as needed.

## Scripts

```bash
npm run dev              # Vite dev server on :3000
npm run build            # Production build
npm run deploy           # Build + wrangler deploy
npm run generate-routes  # Regenerate routeTree.gen.ts after route changes
npm run lint / lint:fix  # Biome
npm run typecheck        # tsc --noEmit
```

## Key Architectural Decisions

1. **Fresh scaffold, not in-place mutation** — Next.js app removed from root; reference kept in `legacy-source/`.
2. **Better Auth** kept from scaffold for future SaaS features; not wired to legacy flows.
3. **Marketing layout** (`MarketingLayout`) wraps Navbar + ThemeProvider per route loader.
4. **Server routes** replace Next.js API routes (`server.handlers` on file routes).
5. **No `"use client"` / `"use server"`** — TanStack Start is isomorphic by default.

## Known Gotchas

- Build script `cp instrument.server.mjs .output/server` may need adjustment for Cloudflare output layout (build artifacts land in `dist/server/`).
- Blog is **not i18n-localized** (same as legacy); blog posts are not loaded from an external datastore.
- Contact forms validate client-side and show success; submissions are not persisted to a backend.
- `@vercel/analytics` not migrated — add alternative or Sentry analytics if needed.
- 45+ unused shadcn components from legacy were **not** copied; only `button` and `card` ported.

## Cannot Migrate 1:1 (Documented)

| Legacy feature | Gap |
|--------------|-----|
| Next.js edge middleware | Replaced with route `beforeLoad` redirects (no global rewrite middleware yet) |
| `generateStaticParams` SSG | Blog uses SSR loaders; add `prerender` in vite config if static slugs needed |
| `next/image` | Replaced with `<img>` + public assets |
| `next/font/google` | Google Fonts via `<link>` in root head |
| Docker `output: standalone` | Use Cloudflare Workers deploy instead |
| Server-only dictionary import | Route loaders run server-side (equivalent behavior) |

## Next Steps

1. Copy real env values into `.env.local` and verify home, contact, blog flows.
2. Run `npm run dev` and test locale switching (en/de/es).
3. Re-enable reCAPTCHA on small contact form if needed.
4. Wire Better Auth when user authentication is needed.
5. Deploy: `npm run deploy` (requires Cloudflare credentials).
6. Continue vertical-slice migration for any remaining legacy behavior (analytics, PWA, unused shadcn components).

## TanStack Intent Skills (Migration)

For further Next.js → Start work:

```bash
npx @tanstack/intent@latest load @tanstack/react-start#lifecycle/migrate-from-nextjs
```

For Cloudflare deployment:

```bash
npx @tanstack/intent@latest load @tanstack/start-client-core#start-core/deployment
```
