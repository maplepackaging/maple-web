# Maple Packaging — Premium Gifting & Packaging E-commerce

A modern, high-performance e-commerce website for Maple Packaging, built with Next.js 16, TypeScript, Tailwind CSS 4, Supabase, and Groq AI.

## Features

- **29 Routes**: Landing, categories, products, blog, contact, customize, testimonials
- **AI Chatbot**: Groq-powered product recommendation assistant
- **Supabase Backend**: PostgreSQL database with RLS policies
- **Advanced Caching**: Next.js 16 `use cache` with tiered expiration (hours/days/weeks)
- **Partial Prerendering**: Static HTML shells with dynamic server-streamed content
- **Form Submissions**: Newsletter, contact, custom enquiries → Supabase
- **WhatsApp Integration**: Floating button for instant customer support
- **Responsive Design**: Mobile-first with Framer Motion animations

## Tech Stack

- **Framework**: Next.js 16.2.1 (App Router, Turbopack)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 with custom `@theme` tokens
- **Database**: Supabase (PostgreSQL)
- **AI**: Groq (llama-3.1-8b-instant)
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd maplepackaging
npm install
```

### 2. Set Up Environment Variables

Copy `env.example` to `.env.local` and fill in your credentials:

```bash
cp env.example .env.local
```

Required variables:
- `NEXT_PUBLIC_SUPABASE_URL` — Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anon/public key
- `GROQ_API_KEY` — Groq AI API key
- `REVALIDATION_SECRET` — Random secret for cache invalidation

### 3. Set Up Supabase Database

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Run the schema in Supabase SQL Editor:
   ```bash
   # Copy contents of supabase/schema.sql and run in SQL Editor
   ```
3. Seed the database with sample data:
   ```bash
   # Copy contents of supabase/seed.sql and run in SQL Editor
   ```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
maplepackaging/
├── app/                      # Next.js App Router pages
│   ├── (routes)/            # Main routes
│   ├── api/                 # API routes (chat, revalidate)
│   └── globals.css          # Tailwind + custom tokens
├── components/
│   ├── chat/                # ChatWidget, WhatsAppButton
│   ├── forms/               # Newsletter, Contact, Customize
│   ├── layout/              # Header, Footer, MobileMenu
│   ├── pages/               # CategoryDetail, ProductDetail
│   ├── popups/              # EngagementPopup
│   ├── sections/            # Hero, Categories, Featured, etc.
│   └── ui/                  # Button, ProductCard, SectionHeading
├── lib/
│   ├── supabase.ts          # Supabase client
│   ├── supabase-data.ts     # Cached data fetchers
│   ├── supabase-helpers.ts  # Form submission helpers
│   ├── types.ts             # TypeScript interfaces
│   └── utils.ts             # Utility functions
├── supabase/
│   ├── schema.sql           # Database schema
│   └── seed.sql             # Sample data
└── public/                  # Static assets

```

## Caching Strategy

All data fetchers use Next.js 16 `use cache` with tiered expiration:

| Data | Cache Life | Revalidate → Expire | Rationale |
|------|-----------|---------------------|-----------|
| Categories | `hours` | 1h → 1d | Navigation structure, rarely changes |
| Products | `hours` | 1h → 1d | Prices/inventory may update |
| Blog Posts | `days` | 1d → 1w | Content changes infrequently |
| Testimonials | `weeks` | 1w → 30d | Almost never changes |

### Manual Cache Invalidation

When you update data in Supabase, purge the cache:

```bash
curl -X POST https://yoursite.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"tag": "products", "secret": "your-secret"}'
```

Valid tags: `categories`, `products`, `blog`, `testimonials`

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Other Platforms

Build the production bundle:

```bash
npm run build
npm start
```

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm start` — Start production server
- `npm run lint` — Run ESLint

## Database Schema

See `supabase/schema.sql` for full schema. Key tables:

- `categories`, `subcategories`, `sub_subcategories` — Product taxonomy
- `products` — Product catalog with pricing, images, tags
- `blog_posts` — Blog content
- `testimonials` — Customer reviews
- `newsletter_subscribers` — Email list
- `contact_submissions` — Contact form data
- `custom_enquiries` — Custom order requests

## License

Private — All rights reserved.
