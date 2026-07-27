# Kevin Hatcher Excavation — website

Next.js (App Router) + Supabase + Resend, deployed on Vercel.
A clone of the Squeegeez template — see `BUILD-GUIDE.md` for the full backstory.

## Pages
- `/` — Home (hero, services, before/after showcase, project highlights, reviews, service areas, CTA)
- `/services` — Full service list + photo folders from Supabase
- `/contact` — Lead form → saves to Supabase `exc_leads` + emails (once Resend is set up)
- `/admin` — hidden admin login (the faint "." in the footer links here)

## One-time setup (in order)

### 1. Supabase (database)
This site **shares** the Squeegeez Supabase project. All data lives in prefixed
tables (`exc_projects`, `exc_folders`, `exc_leads`, `exc_comparisons`) and a
separate `excavation` storage bucket.
1. Open the Squeegeez Supabase project → **SQL Editor → New query**.
2. Paste all of `supabase-excavation-schema.sql`, click **Run**.
3. The Project URL + anon key are the **same** ones Squeegeez uses.

### 2. Admin user
**Supabase → Authentication → Users → Add user** (email + password).
Log in via the hidden "." link in the site footer.

### 3. Vercel (hosting)
1. Import the GitHub repo as a new project.
2. **Framework Preset must be `Next.js`** (if it says "Other", every route 404s).
3. Add **Environment Variables**, then **Redeploy** (they don't apply until you redeploy):
   ```
   NEXT_PUBLIC_SUPABASE_URL       = same as Squeegeez
   NEXT_PUBLIC_SUPABASE_ANON_KEY  = same as Squeegeez
   ```
4. Later, for email (see below), also add:
   ```
   RESEND_API_KEY   = your Resend API key
   LEAD_TO_EMAIL    = Khatcher40@yahoo.com (or wherever leads should go)
   LEAD_FROM_EMAIL  = leads@<the excavation domain>  (must be a verified domain in Resend)
   ```

### 4. Google Analytics
Create a new GA4 property → Web stream, then paste the `G-XXXX` id into
`components/Analytics.tsx` (`GA_ID`). Analytics is disabled while `GA_ID` is empty.

### 5. Resend (form emails) — can be last
1. Sign up at resend.com, verify the domain (add the DNS records it shows).
2. Create an API key, add the three env vars above in Vercel, redeploy.
The form **saves the lead even if email isn't set up yet** — email is best-effort.

## Business details baked into the code
- Phone `(208) 920-3352` — search `PHONE` to change it.
- Email `Khatcher40@yahoo.com` — in `app/contact/page.tsx` (and README above).
- Areas: Sandpoint, Sagle, Cocolalla, Athol, Ponderay, Kootenai.

## Local development (optional)
```
npm install
cp .env.local.example .env.local   # then fill in the Supabase keys
npm run dev
```
Open http://localhost:3000
