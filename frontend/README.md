# Van Anh Portfolio — README

A complete, responsive portfolio website for **Pham Thi Van Anh** — Digital Marketing Leader & Campaign Strategist. Built with Next.js 15, TypeScript, and Tailwind CSS. Includes a portfolio-aware AI chatbot powered by OpenRouter.

---

## Project Structure

```
site_vananh/
├── AGENTS.md                        # Full project brief
├── CV.docx                          # Primary factual source (experience, education, skills)
├── Profile.pdf                      # Secondary source (summary, top skills, awards)
├── Pham Thi Van Anh_Portfolio.pdf   # Original PDF (reference)
│
├── data/                            # Structured data layer
│   ├── page_01.json – page_20.json # Per-image JSON descriptions
│   ├── portfolio.json               # Merged, full portfolio dataset
│   └── portfolio_knowledge.json     # Chatbot-ready knowledge base
│
├── extracted_images/               # PDF pages extracted as images
│   └── (20 PNG images + 1 JPEG)
│
└── frontend/                       # Next.js application
    ├── app/
    │   ├── api/chat/route.ts        # OpenRouter chat API endpoint
    │   ├── layout.tsx
    │   ├── page.tsx
    │   └── globals.css
    ├── components/
    │   ├── Navbar.tsx
    │   ├── Hero.tsx
    │   ├── About.tsx
    │   ├── Education.tsx
    │   ├── Skills.tsx
    │   ├── Experience.tsx
    │   ├── Campaigns.tsx
    │   ├── Awards.tsx
    │   ├── Contact.tsx
    │   ├── Footer.tsx
    │   └── ChatbotWidget.tsx        # AI chatbot UI
    ├── lib/
    │   └── portfolio-data.ts        # Prompt building & grounding logic
    ├── data/
    │   ├── portfolio.json           # Copied from ../data
    │   └── portfolio_knowledge.json # Copied from ../data
    └── public/assets/              # Portfolio images (20 PNG + 1 JPEG)
```

---

## Setup

### 1. Install dependencies

```bash
cd frontend
npm install
```

### 2. Configure environment variables

Copy the example env file and add your OpenRouter API key:

```bash
cp .env.local.example .env.local
```

Open `.env.local` and fill in:

```bash
OPENROUTER_API_KEY=your_api_key_here
OPENROUTER_MODEL=gpt-oss-120b
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> Get your OpenRouter API key at [openrouter.ai/keys](https://openrouter.ai/keys)

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Build for production

```bash
npm run build
npm start
```

---

## Data Structure

### `/data/portfolio.json`

The canonical, fully-merged portfolio dataset. Contains:

| Field | Description |
|-------|-------------|
| `profile` | Name, headline, contact, availability, bio |
| `education` | 7 entries from bachelor's to MSc (ESSEC, DAV) |
| `skills` | Categorized: marketing, product, data, business, tools, soft skills |
| `experience` | 5 roles: Ferrero, DarkHorseStocks, UNIQLO, Dell, US-ASEAN Council |
| `results` | 9 key metrics with context |
| `awards` | 6 awards including Vietnam Young Lion Top 3/1,200 |
| `activities` | Leadership roles, community involvement |
| `campaigns` | 9 campaign projects with brand, category, strategy, channels, results |

### `/data/portfolio_knowledge.json`

Flattened, Q&A-optimized knowledge base for the chatbot. Contains:

- **profile** — bio, photo, contact
- **timeline** — chronological career/education entries
- **skills** — grouped by category
- **highlights** — key metrics with full context
- **campaigns** — 9 campaigns with summaries and audience/insight
- **faq_seed** — 11 pre-seeded Q&A pairs covering the most common questions

### `/data/page_01.json` – `/data/page_20.json`

Per-image JSON descriptions for each slide. Schema:

- `page`, `file`, `section_type`
- `title`, `subtitle`
- `content`: paragraphs, bullets, labels, metrics
- `entities`: companies, brands, people, locations, dates
- `campaign`: objective, target_audience, insight, strategy, channels, results
- `design`: layout, components, visual_style, color_palette, typography, image_type
- `summary`: short human-readable description

---

## Editing Content

All content is in TypeScript component files in `/frontend/components/`. To update:

| What to edit | File to change |
|---|---|
| Hero / intro text | `components/Hero.tsx` |
| About section | `components/About.tsx` |
| Education entries | `components/Education.tsx` |
| Skills list | `components/Skills.tsx` |
| Work experience | `components/Experience.tsx` |
| Campaigns | `components/Campaigns.tsx` |
| Awards | `components/Awards.tsx` |
| Contact info | `components/Contact.tsx` |
| Portfolio data | `data/portfolio.json` |
| Chatbot knowledge | `data/portfolio_knowledge.json` |

---

## Chatbot Configuration

### How it works

1. User submits a question via the floating chat widget
2. `POST /api/chat` is called with the message
3. The route builds a grounded prompt by injecting all portfolio data from `portfolio_knowledge.json` into the system prompt
4. The prompt is sent to OpenRouter with `gpt-oss-120b` (or your configured model)
5. The AI responds using only the grounded portfolio data
6. Response is returned to the widget

### Grounding behavior

- The chatbot **only answers from the portfolio data** — no hallucinations
- If a question falls outside the portfolio data, it will say so
- The prompt includes 11 pre-seeded FAQ Q&A pairs for consistent answers
- Temperature is set to 0.4 to balance coherence and creativity

### Changing the model

Edit `.env.local`:

```bash
OPENROUTER_MODEL=anthropic/claude-3-haiku
# or
OPENROUTER_MODEL=google/gemini-2.0-flash
# or any model available on openrouter.ai
```

### Safety rules

- No hallucination: the model can only answer from the grounded portfolio context
- Stays on-topic: the system prompt restricts answers to portfolio questions
- Fallback: if the model doesn't know, it clearly says so

---

## Design System

**Color palette:**
- `#C8102E` — Brand Red
- `#0D0D0D` — Brand Black
- `#FAFAF8` — Brand White
- `#F5F4F0` — Off-white (section backgrounds)
- `#6B6B6B` — Grey (body text)
- `#E8E6E1` — Light grey (borders)

**Typography:**
- Headings: Playfair Display (serif)
- Body: Inter (sans-serif)

**Layout:**
- Max content width: `1280px` (7xl)
- Section padding: `py-24` (6rem vertical)
- Mobile-first responsive

---

## Image Assets

All portfolio images are in `/frontend/public/assets/`. They are 4K resolution (3840×2160) and are used as background assets within the design.

To replace the profile photo, replace `Van_Anh.png` with your preferred image (square ratio recommended).

---

## Source Priority

When facts conflict across sources, priority is:

1. **CV.docx** — source of truth for experience, dates, roles, skills
2. **Profile.pdf** — enrichment (awards, summary, top skills)
3. **Extracted images** — structure and design intent

---

## Dependencies

- **Next.js 15** — framework
- **React 18** — UI library
- **TypeScript 5** — type safety
- **Tailwind CSS 3** — styling
- **OpenRouter API** — AI chatbot

No additional UI libraries or external component kits required.