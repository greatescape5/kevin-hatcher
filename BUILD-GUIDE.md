# Excavation Site — Build Guide (handoff for the next chat)

This site is a **near-identical clone of Squeegeez** (a lead-gen site for a window-
washing company) rebuilt for an **excavation business**. Same stack, same process,
same admin. The design is being **copied from an existing Wix site** (get the URL
from Tyler and mirror its content/colors). Tyler has little coding experience — keep
explanations simple and give exact file paths. Files auto-sync to GitHub on save.

**Squeegeez reference repo:** https://github.com/greatescape5/squeegeez.git
That repo IS the template. Clone/copy it, then make the changes in section 4.

---

## 0. TL;DR for the next chat
1. Look at Tyler's Wix excavation site (ask for the URL) — copy content + colors.
2. Get his **logo** (drop `public/logo.png` + `app/icon.png`), **GA4 ID**, **phone/email**,
   **service areas**, and **domain**.
3. Run `supabase-excavation-schema.sql` in the **shared** Supabase project (SQL Editor).
4. Copy the Squeegeez codebase, apply the changes in section 4 (table names → `exc_*`,
   bucket → `excavation`, GA4 ID, brand, content).
5. New GitHub repo → new Vercel project (**Framework Preset = Next.js!**) → env vars → redeploy.

---

## 1. ⚠️ Supabase sharing — read before you commit to it
Tyler wants to reuse **Squeegeez's Supabase project** (same Project URL + anon key) to
save subscription cost. That works, but understand the trade-off first:

**IMPORTANT COST NOTE:** Supabase's **free tier allows up to 2 free projects** per org.
If Squeegeez's Supabase is on the **free** plan, a **second free project costs $0** and
gives you *complete* isolation — that is cleaner and safer than sharing. Only share one
project if Squeegeez is on a **paid** plan and Tyler wants to avoid a second paid project.
**→ Confirm which tier Squeegeez is on before deciding.**

**If you DO share one project (what the SQL file is built for):**
- Excavation uses **prefixed tables** `exc_folders`, `exc_projects`, `exc_leads`,
  `exc_comparisons` and a **separate storage bucket** `excavation`. It never touches
  Squeegeez's `projects/folders/leads/comparisons` tables or the `gallery` bucket.
- **Caveat (know this):** one Supabase project = **one shared auth system**. With the
  simple RLS we use (`to authenticated ... using (true)`), **any logged-in admin can
  read/write EITHER site's tables** — including reading the other business's leads.
  - Fine if **Tyler** is the only admin for both.
  - If the excavation business is a **different client** who gets their own admin login,
    that client could technically read Squeegeez's leads (and vice-versa). In that case
    prefer a **separate Supabase project** (free), or tighten RLS to specific admin
    user-ids (`auth.uid() in (...)`) per table.

---

## 2. Stack & process (identical to Squeegeez)
- **Next.js 14 (App Router)** on **Vercel**
- **Supabase** — Postgres + Storage (images) + Auth (admin login)
- **Resend** — contact-form emails (best-effort; form saves the lead even if email is off)
- **GA4** — small hardcoded Analytics component

**Process:** Supabase SQL first → build Next.js → push to GitHub → import to Vercel
(**Framework Preset = Next.js**) → set env vars → **redeploy** → connect domain.

---

## 3. Database
Run **`supabase-excavation-schema.sql`** (in this folder) in the shared Supabase project's
**SQL Editor**. It creates the `exc_*` tables + RLS + the `excavation` bucket + seed
services. The Project URL + anon key are the **same** ones Squeegeez uses.

---

## 4. Copy the Squeegeez codebase, then change EXACTLY these things

### 4a. Table + bucket names (the only wiring that matters)
Search-and-replace the Supabase calls in these files:

| File | Change |
|------|--------|
| `lib/supabase.ts` | `.from('projects')`→`.from('exc_projects')`, `.from('folders')`→`.from('exc_folders')`, `.from('comparisons')`→`.from('exc_comparisons')` |
| `app/api/lead/route.ts` | `.from('leads')`→`.from('exc_leads')` |
| `app/admin/dashboard/page.tsx` | `.from('folders')`→`exc_folders`, `.from('projects')`→`exc_projects`, `.from('leads')`→`exc_leads`, `.from('comparisons')`→`exc_comparisons`, `.storage.from('gallery')`→`.storage.from('excavation')` |

> Tip: it's worth centralizing these as constants (e.g. a `lib/tables.ts`) so a future
> third site is even easier, but a plain find/replace is fine.

### 4b. Analytics
- `components/Analytics.tsx` → replace `GA_ID = 'G-J9DM83X36E'` with the **excavation GA4 ID**
  (create a new GA4 property → Web stream → `G-XXXX`).

### 4c. Brand
- `public/logo.png` (header) + `app/icon.png` (favicon) → excavation logo.
- `app/globals.css` `:root` color variables (`--navy`, `--teal`, `--orange`, `--gold`, etc.)
  → pull from the excavation logo/Wix colors. (Excavation brands are often earthy —
  e.g. charcoal + safety-orange/amber + a steel blue. Match the Wix site.)
- Update `ServiceIcon.tsx` keyword→icon mapping for excavation services (dig, grade,
  clear, trench, demo, drainage). Add simple line SVGs like the existing ones.

### 4d. Content (copy from the Wix site)
Replace copy in: `app/page.tsx` (hero, `SERVICES`, `WHY`, `REVIEWS`, `AREAS`),
`app/contact/page.tsx` (Our Story, contact info, email/phone), `app/layout.tsx`
(SEO title/description), `components/SiteFooter.tsx` (areas, business name),
`app/services/page.tsx` (`SERVICE_NAMES`, headings). Update the phone constant
(`PHONE` / `PHONE_HREF`) everywhere it appears.

### 4e. Everything else already carries over
Pages (Home, Services + `/services/[slug]`, Contact, hidden `/admin` + dashboard),
before/after slider, folder system, GA4 route tracking, lead API + best-effort Resend,
`HashScroll` (so "Get an Estimate" jumps to the contact form), section band styling,
75vh hero, footer flush to CTA — all inherited from Squeegeez.

---

## 5. Admin login
Create the excavation admin user in **Supabase → Authentication → Users → Add user**
(email + password). Same hidden "." link in the footer → `/admin`. (Re-read the section 1
caveat: in a shared project this user can technically touch Squeegeez data too.)

---

## 6. Resend (emails, can be last)
New env vars for the excavation Vercel project:
`RESEND_API_KEY`, `LEAD_TO_EMAIL` (the excavation business inbox),
`LEAD_FROM_EMAIL` (a verified sender on the excavation domain). The form still saves
leads to `exc_leads` without email configured.

---

## 7. Deploy checklist (Vercel)
1. New GitHub repo, push the code (git push works from Tyler's machine with cached creds —
   see section 8).
2. Vercel → Import repo → **Framework Preset = Next.js** (if it says "Other", every route
   404s even though the build passes — this bit us on Squeegeez).
3. Env vars (then **Redeploy** — they don't apply until you do):
   ```
   NEXT_PUBLIC_SUPABASE_URL       = <same as Squeegeez>
   NEXT_PUBLIC_SUPABASE_ANON_KEY  = <same as Squeegeez>
   # later: RESEND_API_KEY, LEAD_TO_EMAIL, LEAD_FROM_EMAIL
   ```
4. Connect the excavation domain in Settings → Domains.

---

## 8. Gotchas learned on Squeegeez (avoid re-hitting these)
- **Vercel Framework Preset MUST be Next.js** or every route 404s (build still passes).
- **Lazy Supabase client:** `lib/supabase.ts` returns `null` when env vars are missing
  (`getSupabase()`), and all reads are wrapped in try/catch returning `[]`. This prevents
  the `"supabaseUrl is required."` build crash when there are no keys/network at build time.
  Keep this pattern.
- **Env vars → must Redeploy** in Vercel to take effect.
- **Favicon** is `app/icon.png`; browsers cache favicons hard — hard-refresh (Ctrl+F5).
- **next@14.2.35** (patched — 14.2.5 had a security advisory).
- **PowerShell + git commit:** multi-line here-strings (`@'...'@`) frequently mis-parse.
  Use multiple `-m` flags instead: `git commit -m "title" -m "body" -m "Co-Authored-By: ..."`.
- **git push is non-interactive** on Tyler's machine: GitHub cred is cached in Windows
  Credential Manager (system `credential.helper=manager`). Set `$env:GIT_TERMINAL_PROMPT=0`
  and `$env:GCM_INTERACTIVE="never"` so it fails fast instead of hanging if the token expires.
  LF→CRLF warnings on `git add` are harmless.
- **Hash scrolling** in App Router doesn't fire reliably on load → we added a tiny
  `components/HashScroll.tsx` (useEffect + `scrollIntoView`) and `scroll-margin-top` on the
  target section. Keep it for the "Get an Estimate" → contact-form jump.
- **Before/after slider** (`components/BeforeAfter.tsx`): call `updateFromX` BEFORE
  `setPointerCapture` (wrapped in try/catch) so the drag position updates even if capture throws.
- **Local preview** (in-app browser) blocks programmatic scrolling — you can't demo hash
  scroll there; verify on the deployed site.
- **Verify with the dev server** via the Browser preview tools; use `.claude/launch.json`
  with `"autoPort": true` (port 3000 is often taken).

---

## 9. What to hand the next chat / fill in
- [ ] Wix excavation site URL (for design + copy)
- [ ] Business name + tagline
- [ ] Logo file (→ `public/logo.png` + `app/icon.png`)
- [ ] Brand colors (from logo/Wix)
- [ ] Services list (excavation, land clearing, grading, trenching, demolition, drainage/septic, …)
- [ ] Phone, email, service areas, physical location
- [ ] GA4 measurement ID (new property)
- [ ] Domain
- [ ] Decision from section 1: **share Squeegeez's Supabase, or spin up a 2nd free project?**

---

## 10. Squeegeez reference values
- Repo: https://github.com/greatescape5/squeegeez.git
- Supabase project ref: `coxbtqzyftixtjzvdkdh` (URL `https://coxbtqzyftixtjzvdkdh.supabase.co`)
- Squeegeez GA4: `G-J9DM83X36E` (the excavation site needs its OWN id)
- Squeegeez brand: navy `#0f3a56`, teal `#2ba6a0`, orange `#e8481f`, gold `#f5a623`
- File map (what to copy): `app/` (page.tsx, services/, contact/, admin/, api/lead/,
  layout.tsx, globals.css), `components/` (SiteHeader, SiteFooter, Analytics, ServiceIcon,
  BeforeAfter, HashScroll), `lib/` (supabase.ts, supabaseBrowser.ts), `next.config.mjs`,
  `package.json`, `tsconfig.json`, `.gitignore`.
