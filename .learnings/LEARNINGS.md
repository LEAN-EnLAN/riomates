# Learnings Log

## [LRN-20260413-001] best_practice

**Logged**: 2026-04-13T03:00:00Z
**Priority**: high
**Status**: pending
**Area**: infra

### Summary
Vercel deploy + env vars workflow should be proactive: create vercel.json upfront, always check git remote before pushing.

### Details
When deploying a Next.js project to Vercel, the framework detection can fail and look for a `dist/` directory instead of `.next/`. Adding `vercel.json` with `{"framework": "nextjs"}` prevents this. Also, always verify `git remote -v` before attempting to push for deploy.

### Suggested Action
When user says "deploy to Vercel", do these steps in order:
1. Check `git remote -v` — if empty, ask for GitHub repo URL
2. Ensure `vercel.json` exists with `{"framework": "nextjs"}`
3. Remind user to set Environment Variables in Vercel dashboard
4. Push code, trigger deploy

### Metadata
- Source: conversation
- Related Files: vercel.json
- Tags: vercel, deploy, nextjs, workflow
- Pattern-Key: infra.vercel_deploy_workflow

---

## [LRN-20260413-002] best_practice

**Logged**: 2026-04-13T02:40:00Z
**Priority**: high
**Status**: pending
**Area**: infra

### Summary
Always create a supabase client guard that returns null instead of throwing, and use a data layer with static fallback.

### Details
`@supabase/supabase-js` throws immediately if URL is missing. This crashes the build when pages call supabase at build time. The pattern that works: wrap client creation in a conditional, export `null` if env vars are missing, and have a `products-db.ts` layer that checks `if (!supabase) return staticProducts`.

### Suggested Action
Standard pattern for any Supabase + Next.js project:
```ts
// src/lib/supabase.ts
export const supabase = url && key ? createClient(url, key) : null;
```
Never call supabase directly in pages — always go through a data layer that checks for null.

### Metadata
- Source: error, best_practice
- Related Files: src/lib/supabase.ts, src/lib/products-db.ts
- Tags: supabase, nextjs, graceful-fallback, build-safety
- Pattern-Key: harden.supabase_client_guard

---

## [LRN-20260413-003] best_practice

**Logged**: 2026-04-13T02:00:00Z
**Priority**: medium
**Status**: pending
**Area**: frontend

### Summary
Admin routes must explicitly hide global layout components (nav, footer, floating buttons) using `usePathname()` checks.

### Details
When creating an admin dashboard at `/admin`, the global `Navigation`, `Footer`, and floating widgets (WhatsApp button, back-to-top) still render because they're in `layout.tsx`. This creates a double-navbar visual bug. Fix: make these components client components, use `usePathname()`, and return `null` if path starts with `/admin`.

### Suggested Action
When creating admin pages, always add this guard to global UI components:
```tsx
const pathname = usePathname();
if (pathname?.startsWith('/admin')) return null;
```

### Metadata
- Source: user_feedback, error
- Related Files: src/components/Navigation.tsx, src/components/Footer.tsx
- Tags: admin, layout, navigation, nextjs, usePathname
- Pattern-Key: frontend.admin_route_isolation

---

## [LRN-20260413-004] best_practice

**Logged**: 2026-04-13T03:20:00Z
**Priority**: medium
**Status**: pending
**Area**: config

### Summary
Always add `.env.local` to `.gitignore` before creating env files to prevent accidental secret commits.

### Details
Created `.env.local` with Supabase keys before checking `.gitignore`. If the file wasn't already ignored, secrets would have been committed to the repo. Should always verify or add `.env.local` to `.gitignore` FIRST.

### Suggested Action
Before writing any `.env.*` file, run: `grep -q ".env.local" .gitignore || echo ".env.local" >> .gitignore`

### Metadata
- Source: conversation
- Tags: security, gitignore, env-vars, secrets
- Pattern-Key: harden.env_gitignore

---

## [LRN-20260413-005] frontend.navbar_hero_contrast

**Logged**: 2026-04-13T04:00:00Z
**Priority**: high
**Status**: promoted
**Promoted**: AGENTS.md (Page Hero Rules section)
**Area**: frontend

### Summary
All page hero sections MUST use dark backgrounds (`bg-rio-oscuro text-white`) for fixed navbar visibility. Light heroes make white navbar text invisible.

### Details
Navbar is `position: fixed` with transparent background and white text by default. Pages with `bg-arena`, `bg-off-white`, or any light hero had invisible nav. Fixed on `/el-origen`, `/coleccion`, `/coleccion/[slug]`.

### Suggested Action
Rule added to AGENTS.md. No page hero should ever use a light background.

### Metadata
- Source: user_feedback
- Related Files: src/app/el-origen/page.tsx, src/app/coleccion/page.tsx, src/app/coleccion/[slug]/page.tsx
- Tags: navbar, contrast, hero, visibility
- Pattern-Key: frontend.hero_dark_bg

---
