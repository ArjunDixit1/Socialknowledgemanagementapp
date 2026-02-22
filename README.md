# 🧠 Social Saver — Second Brain via WhatsApp

> Send any social media link on WhatsApp → AI analyzes it → Saved to your personal dashboard with summaries, takeaways, and action steps.

---

## Architecture

```
WhatsApp → Twilio Webhook → FastAPI
                               ├── Extractor (yt-dlp → OpenGraph → User fallback)
                               ├── AI (Gemini / OpenAI) → JSON analysis
                               └── Supabase (Postgres + pgvector)
                                        ↑
                               Next.js Dashboard
```

---

## Quick Start

### 1. Clone & install

```bash
git clone <repo>
cd social-saver
```

### 2. Backend setup

```bash
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
```

Copy `.env.example` → `.env` and fill in:

```env
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_KEY=eyJ...         # Settings → API → service_role
TWILIO_ACCOUNT_SID=ACxxx
TWILIO_AUTH_TOKEN=xxx
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
GEMINI_API_KEY=AIza...
AI_PROVIDER=gemini
```

```bash
uvicorn app.main:app --reload --port 8000
```

### 3. Database

Open Supabase Dashboard → SQL Editor → paste `sql/schema.sql` → Run.

### 4. Frontend setup

```bash
cd frontend
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...   # anon key (safe for client)
BACKEND_URL=http://localhost:8000
NEXT_PUBLIC_DEMO_PHONE=+15550001234
```

```bash
npm run dev
```

### 5. Expose backend for Twilio (dev)

```bash
ngrok http 8000
```

In Twilio Console → WhatsApp Sandbox → set webhook URL:
```
https://<ngrok-id>.ngrok.io/webhook/whatsapp
```

---

## Content Extraction — 3-Tier Fallback

| Tier | Method | Works for |
|------|--------|-----------|
| 1 | `yt-dlp --dump-json` | IG Reels, YouTube, TikTok, Twitter video |
| 2 | OpenGraph / meta tags | Most websites, articles, blogs |
| 3 | Ask user | Anything that fails — bot asks "what is this about?" |

---

## AI Output Schema

```json
{
  "title": "...",
  "summary": "...",
  "tags": ["fitness", "core", "routine"],
  "bucket": "Fitness",
  "key_takeaways": ["...", "...", "..."],
  "action_steps": ["...", "..."],
  "search_keywords": ["abs", "plank", "routine"]
}
```

---

## Search — 2 Levels

| Level | Method | How |
|-------|--------|-----|
| 1 | Keyword | Postgres full-text search (tsvector) on title/summary/tags |
| 2 | Semantic | pgvector cosine similarity on embedding vectors |

Both run in parallel; results are merged and deduplicated.

---

## WhatsApp Commands

| Message | Action |
|---------|--------|
| `https://...` | Extract, analyze, save link |
| `find core workouts` | Semantic + keyword search |
| `plan` / `make a workout` | Generate plan from saved items |
| `show me fitness` | Browse a bucket |

---

## Deployment

### Backend → Railway / Render
```bash
# Procfile
web: uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

### Frontend → Vercel
```bash
cd frontend && vercel --prod
```

Set all env vars in each platform's dashboard.

---

## Buckets

- 🏃 Fitness
- 🤖 Deep Learning
- ⏳ Try Soon
- 🍳 Recipes I'll Actually Cook
- 🎨 Aesthetic UI
- 💰 Finance
- ✈️ Travel
- ⚡ Productivity
- 🧠 Mindset
- 💼 Business

---

## Stack

| Layer | Tech |
|-------|------|
| Backend | FastAPI + Python 3.12 |
| WhatsApp | Twilio WhatsApp API |
| AI | Gemini 1.5 Flash (or GPT-4o-mini) |
| DB | Supabase (Postgres + pgvector) |
| Extraction | yt-dlp + BeautifulSoup |
| Frontend | Next.js 14 + Tailwind CSS |
| Deploy | Railway (backend) + Vercel (frontend) |
