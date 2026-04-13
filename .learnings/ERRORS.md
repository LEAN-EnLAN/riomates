# Errors Log

## [ERR-20260413-001] Vercel framework detection failure

**Logged**: 2026-04-13T03:00:00Z
**Priority**: high
**Status**: resolved
**Area**: infra

### Summary
Vercel deploy failed with "No Output Directory named 'dist' found" — framework was not auto-detected for Next.js project.

### Error
```
No Output Directory named "dist" found after the Build completed.
Configure the Output Directory in your Project Settings.
```

### Context
- Vercel auto-detected project as "Other" instead of Next.js
- Looked for `dist/` (Vite/SPA default) instead of `.next/`
- No `vercel.json` present to force framework detection

### Suggested Fix
Create `vercel.json` with `"framework": "nextjs"` in project root.

### Resolution
- **Resolved**: 2026-04-13T03:05:00Z
- **Notes**: Added `vercel.json` with `{"framework": "nextjs"}`

### Metadata
- Reproducible: yes
- Related Files: vercel.json
- Tags: vercel, deploy, nextjs, framework-detection
- Pattern-Key: infra.vercel_framework_detection

---

## [ERR-20260413-002] Supabase client crash without env vars

**Logged**: 2026-04-13T02:30:00Z
**Priority**: critical
**Status**: resolved
**Area**: infra

### Summary
`createClient()` from `@supabase/supabase-js` throws "supabaseUrl is required" when env vars are missing, crashing Next.js build at static generation time.

### Error
```
Error: supabaseUrl is required.
```

### Context
- Happened during `npm run build` when `NEXT_PUBLIC_SUPABASE_URL` was undefined
- Crashed page generation for `/coleccion` because it calls supabase at build time
- No `.env.local` file existed yet

### Suggested Fix
Wrap supabase client creation in a guard that checks env vars before calling `createClient()`. Return `null` if missing so calling code can fallback to static data.

### Resolution
- **Resolved**: 2026-04-13T02:40:00Z
- **Notes**: `src/lib/supabase.ts` exports `null` when env vars are missing, and `src/lib/products-db.ts` checks for `null` before any supabase call, falling back to `products.ts` static data.

### Metadata
- Reproducible: yes
- Related Files: src/lib/supabase.ts, src/lib/products-db.ts
- Tags: supabase, build-error, env-vars, graceful-degradation
- Pattern-Key: harden.supabase_client_guard

---

## [ERR-20260413-003] No git remote configured

**Logged**: 2026-04-13T03:10:00Z
**Priority**: medium
**Status**: resolved
**Area**: infra

### Summary
Local git repo had no remote configured, preventing push to GitHub. Had to ask user for repo URL.

### Error
```
fatal: No se ha configurado un destino para el empuje.
```

### Context
- `git remote -v` returned empty
- User had created repo on GitHub but never linked it locally
- Required manual `git remote add origin <url>`

### Suggested Fix
Before deploy steps, always run `git remote -v` and check if origin exists. If not, prompt user immediately or check `gh repo list` for matching repos.

### Resolution
- **Resolved**: 2026-04-13T03:15:00Z
- **Notes**: Used user-provided URL `https://github.com/LEAN-EnLAN/riomates.git`

### Metadata
- Reproducible: yes
- Tags: git, remote, deploy-prep
- Pattern-Key: infra.git_remote_check

---
