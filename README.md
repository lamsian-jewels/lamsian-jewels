# Lamsian Jewels 💛
> Artistic charm and aesthetics — Next.js 14 jewelry e-commerce website

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router) |
| Styling | Tailwind CSS + Framer Motion |
| Database | Supabase (PostgreSQL) |
| Image Storage | Cloudinary |
| Auth (Admin) | Supabase Auth |
| Hosting | Vercel |

---

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.local.example .env.local
```
Then fill in your actual values in `.env.local`.

### 3. Set up Supabase
1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and paste + run the contents of `supabase/schema.sql`
3. Copy your **Project URL** and **anon key** into `.env.local`
4. Create an admin user: go to **Authentication → Users → Add user**

### 4. Set up Cloudinary
1. Create an account at [cloudinary.com](https://cloudinary.com)
2. Go to **Settings → Upload → Upload presets**
3. Create a preset named `lamsian_jewels` (set to **Unsigned**)
4. Copy your cloud name, API key, and API secret into `.env.local`

### 5. Set WhatsApp number
In `.env.local`, set `NEXT_PUBLIC_WHATSAPP_NUMBER` to Esther's number in international format, e.g. `254712345678`

### 6. Run locally
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000)

---

## Pages

| Route | Description |
|---|---|
| `/` | Homepage — hero, categories, featured products, brand story, testimonials |
| `/shop` | Full product catalog with category filters and sort |
| `/shop/[slug]` | Product detail page with WhatsApp order button |
| `/about` | Esther's story and brand values |
| `/contact` | Contact info, social links, WhatsApp CTA |
| `/admin` | Admin login |
| `/admin/dashboard` | Manage products & orders (authenticated only) |

---

## Admin Panel

1. Go to `/admin`
2. Sign in with the email/password you created in Supabase Auth
3. **Products tab** — add, edit, delete products; toggle stock status
4. **Orders tab** — view orders and update their status

### Adding a product
- Fill in name, price, category, description, material
- Paste Cloudinary image URLs (comma-separated for multiple images)
- Check "New Arrival" or "Featured" as needed

---

## Deployment (Vercel)

```bash
# Push to GitHub first, then:
# 1. Connect repo to Vercel
# 2. Add all env variables from .env.local to Vercel's environment settings
# 3. Deploy
```

---

## Customising

### Update Esther's social handles
Search for `lamsianjewels` across the codebase and replace with the actual Instagram/TikTok usernames.

### Update WhatsApp number
Just update `NEXT_PUBLIC_WHATSAPP_NUMBER` in `.env.local` (and Vercel env vars).

### Brand colors
Edit `tailwind.config.ts` — the `gold` and `cream` color scales.

### Fonts
Edit `src/app/layout.tsx` — currently using **Cormorant Garamond** (display) + **Jost** (body).

---

## Project Structure

```
lamsian-jewels/
├── public/
│   └── logo.jpeg
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout, fonts, navbar, footer
│   │   ├── globals.css         # Global styles, animations, custom cursor
│   │   ├── page.tsx            # Homepage
│   │   ├── shop/
│   │   │   ├── page.tsx        # Shop listing (server)
│   │   │   ├── ShopClient.tsx  # Shop with filters (client)
│   │   │   └── [slug]/         # Product detail pages
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   └── admin/              # Admin panel
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── PageTransition.tsx
│   │   ├── ProductCard.tsx
│   │   └── home/               # Homepage section components
│   ├── hooks/
│   │   └── useReveal.ts        # Scroll-triggered reveal animations
│   └── lib/
│       └── supabase.ts         # Supabase client + types
├── supabase/
│   └── schema.sql              # Run this in Supabase SQL Editor
├── .env.local.example
├── tailwind.config.ts
└── package.json
```

---

Built with ❤️ for Lamsian Jewels
