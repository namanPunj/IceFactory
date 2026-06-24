# Deploy to Vercel — Maa Saraswati Ice Factory

This `deploy/` folder is a ready-to-publish static site:

- `index.html` — the full website (self-contained, fonts/images bundled in)
- `vercel.json` — basic Vercel config (clean URLs + safe headers)

Vercel Web Analytics + Speed Insights are **already wired into `index.html`** — they
start collecting views automatically once the site is live on Vercel and analytics
is switched on (Step 3).

---

## Step 1 — Get the files onto Vercel

Pick whichever is easiest for you:

**A. Drag & drop (fastest, no account setup)**
1. Go to https://vercel.com/new
2. Sign in (GitHub / email).
3. Drag this whole `deploy/` folder onto the page, or zip it and upload.
4. Click **Deploy**. You'll get a live URL in ~30 seconds.

**B. GitHub (best for ongoing updates)**
1. Put these files in a GitHub repo (the `index.html` should be at the repo root, or set the repo's Root Directory to `deploy/` in Vercel).
2. On https://vercel.com/new, **Import** that repo.
3. Framework preset: **Other** (it's plain static HTML — no build command needed).
4. Click **Deploy**.

**C. Vercel CLI**
```
npm i -g vercel
cd deploy
vercel        # follow prompts, then:
vercel --prod
```

## Step 2 — Add your domain (optional)
In your Vercel project → **Settings → Domains** → add your custom domain and follow the DNS instructions.

## Step 3 — Turn on Analytics (for views)
1. Open your project on vercel.com.
2. Go to the **Analytics** tab → **Enable Web Analytics**.
3. (Optional) Go to **Speed Insights** tab → **Enable**.

That's it. After the next visit, the **Analytics** tab shows page views,
visitors, top pages, devices, and referrers. Speed Insights shows real-world
loading performance.

> Note: on Vercel's free (Hobby) plan, Web Analytics is included with a monthly
> event limit. The tracking scripts are already in `index.html`, so nothing else
> to add in the code.

---

### Updating the site later
The site is generated from `Maa Saraswati Ice Factory.dc.html`. When you change the
design, re-export a fresh `index.html`, keep the two `<script defer src="/_vercel/...">`
tags before `</body>`, and redeploy (a GitHub push auto-redeploys if you used option B).
