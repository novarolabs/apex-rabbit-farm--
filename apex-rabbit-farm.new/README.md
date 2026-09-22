# Apex Rabbit Farm — Website

Raising Quality. Growing Opportunity.

This is a plain HTML/CSS/JS website with a free admin panel built in
(no coding needed to use it day-to-day). Getting the admin panel working
needs a one-time setup — follow Part 1 below. If you'd rather skip the
admin panel for now and just get the site live, jump to "Quick deploy
without the admin panel" instead.

---

## Part 1 — One-time setup (gets you the admin panel)

This connects the site to a free GitHub account so Netlify can rebuild
it automatically every time you (or the admin panel) change something.
It's mostly clicking through free sign-ups — no code.

### Step 1: Create a GitHub account and upload the site

1. Go to https://github.com and sign up (free).
2. Click the **+** in the top right → **New repository**.
3. Name it `apex-rabbit-farm`, keep it **Public** or **Private** (either
   is fine), and click **Create repository**.
4. On the new repo's page, click **"uploading an existing file"**.
5. Open this `apex-rabbit-farm` folder on your computer, select
   **everything inside it** (not the folder itself — its contents:
   `index.html`, `styles.css`, `admin/`, `assets/`, `data/`, etc.) and
   drag them all into the GitHub upload box.
6. Scroll down, click **Commit changes**. Your site's code is now on
   GitHub.

### Step 2: Connect Netlify to that GitHub repo

1. Go to https://app.netlify.com and log in (or sign up free).
2. Click **"Add new site" → "Import an existing project"**.
3. Choose **GitHub**, authorize it, and select the `apex-rabbit-farm`
   repo you just created.
4. Leave the build settings empty (no build command, publish directory
   `/`) and click **Deploy**.
5. Netlify gives you a live link, e.g. `random-name-123.netlify.app`.

From now on, any change pushed to GitHub — by you, or by the admin
panel — automatically redeploys the live site within a minute or two.

### Step 3: Turn on Identity (the admin login)

1. In your Netlify site, go to **Site configuration → Identity** and
   click **Enable Identity**.
2. Under **Registration**, set it to **Invite only** (so strangers can't
   sign themselves up as admin).
3. Scroll to **Services → Git Gateway** and click **Enable Git Gateway**.
   This is what lets the admin panel save changes back to GitHub.

### Step 4: Invite yourself as the admin

1. Still on the Identity tab, click **Invite users**, and enter your own
   email address.
2. Check your email for the invite, click the link, and set a password.
3. It'll drop you at your site's homepage — from there, go to
   `your-site.netlify.app/admin/` and log in.

You're in. From now on, `your-site.netlify.app/admin/` is your control
panel — bookmark it.

---

## Part 2 — Using the admin panel

Once logged in at `/admin/`, you'll see four sections:

- **Rabbits** — add a new rabbit, upload its photo, and set its
  category, sex, age, price and **status** (Available / Reserved /
  Sold) from a dropdown. Change the status any time — it updates on
  the live site as soon as you click **Publish**, no coding.
- **Farm Products** — the same, for manure and urine listings.
- **Farm Updates** — write a new post (title, category, date, a photo,
  and the story/description text), the same way you'd write a Facebook
  post. It appears on the Updates page and homepage automatically.
- **Gallery** — add or remove photos from the gallery page. Each entry
  is just a photo plus a short description.

Every change you publish through the admin panel commits straight to
GitHub, which triggers Netlify to rebuild the live site automatically.

---

## Quick deploy without the admin panel

If you'd rather skip Part 1 for now: go to
https://app.netlify.com → **"Add new site" → "Deploy manually"** and
drag this whole folder in. The site works exactly the same for
visitors — you just won't have the `/admin/` login, and you'll edit
the content by hand instead (see below).

### Editing content by hand (if not using the admin panel)

All the site's content lives in `data/*.json`. Each file holds one
named list:

- `data/rabbits.json` → `{ "rabbits": [ ... ] }`
- `data/products.json` → `{ "products": [ ... ] }`
- `data/updates.json` → `{ "updates": [ ... ] }`
- `data/gallery.json` → `{ "images": [ ... ] }`
- `data/guides.json` → a plain list of farming-guide topics

**A rabbit entry looks like:**
```json
{
  "id": "ARF-007",
  "name": "White Young Rabbit",
  "photo": "assets/rabbits/ARF-007.jpg",
  "category": "young",
  "sex": "female",
  "age": "3 months",
  "colour": "White",
  "breed": "Not yet confirmed",
  "price": 1500,
  "priceLabel": "KSh 1,500",
  "status": "available",
  "description": "Healthy young doe."
}
```
- `category` is `"young"` or `"breeding"`; `sex` is `"male"` or
  `"female"`; `status` is `"available"`, `"reserved"`, or `"sold"`.
- `price` is a plain number (for sorting/cart totals); `priceLabel` is
  what's actually shown (e.g. `"Price on enquiry"`).
- Add the matching photo file to `assets/rabbits/`.

**Products** (`data/products.json`) follow the same idea —
`category` is `"manure"` or `"urine"`.

**Updates** (`data/updates.json`):
```json
{
  "id": "update-003",
  "title": "New Litter of Kits",
  "category": "Rabbits",
  "date": "2026-10-01",
  "photo": "assets/updates/update-003.jpg",
  "excerpt": "A short summary of the update."
}
```
Newest updates (by `date`) show first automatically.

**Gallery** (`data/gallery.json`):
```json
{ "photo": "assets/farm/new-photo.jpg", "alt": "A short description", "caption": "" }
```

After editing, re-upload the folder to Netlify (if using manual
deploy), or push the change to GitHub (if using Part 1's setup) — no
other steps needed either way.

---

## 🔎 Getting found on Google

- Once your site is live, go to https://search.google.com/search-console,
  add your site, and submit `sitemap.xml` (already included).
- If you buy a real domain, update the web address inside
  `sitemap.xml`, `robots.txt`, and the `<link rel="canonical">` /
  `<meta property="og:url">` tags in every `.html` file — they currently
  point at a placeholder: `https://apexrabbitfarm.co.ke/`.

## ⭐ Customer reviews — how this version works

The review form on `gallery.html` currently saves submitted reviews in
the visitor's own browser only (a placeholder), not a shared public
list. Turning it into genuinely public, moderated reviews would need
its own small addition on top of the admin panel — ask any time if
you'd like that built.

## 📁 Folder structure

```
apex-rabbit-farm/
├── index.html, rabbits.html, products.html, breeding.html,
│   farming-guide.html, updates.html, gallery.html, about.html,
│   contact.html, 404.html
├── styles.css, script.js
├── admin/
│   ├── index.html   — the admin panel itself
│   └── config.yml   — defines what admin can edit (Rabbits/Products/Updates/Gallery)
├── data/
│   ├── rabbits.json, products.json, updates.json, gallery.json, guides.json
├── assets/
│   ├── logo/     — logo + favicon (placeholder — no logo yet)
│   ├── rabbits/  — one photo per rabbit, named by ID
│   ├── products/ — manure & urine photos
│   ├── farm/     — general farm/gallery photography
│   ├── updates/  — one photo per farm update
│   └── uploads/  — where photos you add via the admin panel are stored
├── robots.txt, sitemap.xml, _headers
```

## ⚠️ A few honest notes

- Prices in `data/*.json` are starting placeholders — edit them (by
  hand or via the admin panel) to what Apex Rabbit Farm actually wants
  to charge.
- Rabbits are listed by colour, not breed, since breeds haven't been
  confirmed yet — update `"breed"` once you know them.
- There's no logo yet, so `assets/logo/apex-rabbit-farm-logo.png` and
  the favicon are simple placeholders — replace them any time.
- No rabbit meat is listed for sale anywhere on the site, per your
  instructions.
- The 3D-style icons load from a public icon CDN; if any single one
  ever shows as a plain flat emoji instead of the glossy version, it
  just means that one image didn't load — everything else keeps
  working, and it's a quick fix if you flag which icon it was.
