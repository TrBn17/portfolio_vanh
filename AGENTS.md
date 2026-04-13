# AGENTS.md

## Objective

You are given **3 source files** and a folder of **pre-extracted images (one per PDF page)**. Your job is to:

1. **Describe each image in detail as structured JSON**
2. Save one JSON file per image into `/data`
3. Merge them into a unified portfolio dataset
4. Build a **complete responsive portfolio website**
5. Add an **AI chatbot** that can answer questions about the portfolio using the user's **OpenRouter API key**

The final result must be a polished portfolio site built with **Next.js + TypeScript + Tailwind CSS**, plus a portfolio-aware chatbot grounded in the extracted JSON data.

---

## Source Files

### 1. `Pham Thi Van Anh_Portfolio(1).pdf`

Primary visual/storytelling source (already converted to images).

* Contains layout, sections, campaigns, metrics, visuals.
* Use images as the **ground truth for structure and design intent**.

### 2. `CV.docx`

Primary factual source for:

* Experience, dates, roles, bullets, skills
* Use as **source of truth** for correctness and clarity

### 3. `Profile.pdf`

Secondary supporting source for:

* Summary wording, top skills, awards
* Use to enrich but **do not override CV.docx**

---

## Image Input

You already have extracted images.

Assumptions:

* Images are located in: `/assets/pages/` (or similar)
* Naming convention: `page_01.png`, `page_02.png`, ...

**Do NOT re-extract PDF pages.**

---

## Core Task (NEW REQUIREMENT)

### For EACH image:

You MUST:

1. Read the image
2. Infer content + layout
3. Cross-reference with text sources (PDF text, CV, Profile)
4. Output a **high-detail JSON description**
5. Save it to `/data/page_XX.json`

---

## Required JSON Schema (per image)

Each image must produce ONE JSON file:

```json
{
  "page": 1,
  "file": "page_01.png",

  "section_type": "introduction | education | skills | experience | results | campaign | other",

  "title": "",
  "subtitle": "",

  "content": {
    "paragraphs": [],
    "bullets": [],
    "labels": [],
    "metrics": [
      { "label": "", "value": "" }
    ]
  },

  "entities": {
    "companies": [],
    "brands": [],
    "people": [],
    "locations": [],
    "dates": []
  },

  "campaign": {
    "name": "",
    "objective": "",
    "target_audience": "",
    "insight": "",
    "strategy": [],
    "channels": [],
    "results": []
  },

  "design": {
    "layout": "",
    "components": [],
    "visual_style": "",
    "color_palette": [],
    "typography": "",
    "image_type": "hero | infographic | mockup | collage | text-heavy"
  },

  "summary": "Short human-readable summary of this page"
}
```

---

## Quality Requirements for JSON

Each JSON must be:

* Clean (no broken OCR text)
* Deduplicated
* Structured (no raw dumps)
* Interpreted (NOT just copied text)

You MUST:

* Fix broken words from OCR
* Merge split sentences
* Normalize bullet points
* Extract meaning, not just text

---

## Folder Output Structure

```
/data/
  page_01.json
  page_02.json
  page_03.json
  ...
```

Optional aggregated file:

```
/data/portfolio.json
```

---

## Source Priority Rules

When extracting meaning:

1. **Images (layout + intent)** → structure
2. **CV.docx** → factual correctness
3. **Profile.pdf** → enrichment

---

## After JSON Extraction

Once all page JSON files are created:

### Step: Merge into unified data

Create:

```json
/data/portfolio.json
```

Containing:

* profile
* education
* skills
* experience
* results
* campaigns
* awards
* activities
* contact

Also create a chatbot-ready knowledge file:

```json
/data/portfolio_knowledge.json
```

This file should:

* flatten and normalize the most important portfolio facts
* contain clean Q&A-friendly summaries
* include campaign summaries, metrics, dates, companies, skills, and biography
* be optimized for retrieval / prompt grounding

Suggested top-level structure:

```json
{
  "profile": {},
  "timeline": [],
  "skills": [],
  "highlights": [],
  "campaigns": [],
  "faq_seed": [
    { "question": "Who is Van Anh?", "answer": "..." },
    { "question": "What experience does she have at UNIQLO?", "answer": "..." }
  ]
}
```

---

## AI Chatbot Requirement

Add an AI chatbot to the portfolio website so a visitor can ask questions such as:

* "Tell me about Van Anh"
* "What campaigns has she worked on?"
* "What did she do at Dell?"
* "What are her strongest skills?"
* "Summarize her experience in retail / digital marketing / brand strategy"

### Chatbot requirements

* Use the user's **OpenRouter API key**
* Build the chatbot into the website UI
* The chatbot must answer **only from portfolio data**
* Ground responses using `/data/portfolio_knowledge.json` and `/data/portfolio.json`
* Do not hallucinate facts not present in the source files
* If the answer is unknown, say so clearly

### Recommended implementation

* Create a server route such as:

  * `app/api/chat/route.ts`
* Read portfolio data from local JSON files
* Construct a grounded prompt with:

  * system instruction
  * portfolio knowledge context
  * user question
* Send request to OpenRouter chat completion API
* Return the model response to the frontend chat widget

### Environment variables

Use environment variables such as:

```bash
OPENROUTER_API_KEY=
OPENROUTER_MODEL=
```

### Chat UI

Include a clean portfolio-themed chatbot panel or floating assistant.
It should feel premium and integrated with the site.

Suggested labels:

* "Ask about Van Anh"
* "Portfolio Assistant"

### Safety / grounding behavior

The chatbot must:

* stay on topic
* answer from portfolio context only
* avoid making up achievements
* prefer concise, recruiter-friendly answers
* support follow-up questions

---

## Website Build

Use the structured data to build:

* Next.js
* TypeScript
* Tailwind CSS

### Sections:

* Hero
* About
* Education
* Skills
* Experience
* Results
* Campaigns
* Contact

---

## Design Direction

Derived from portfolio images:

* Editorial
* Premium
* Bold typography
* Red / black / off-white palette
* Strong hierarchy
* Modern portfolio feel

DO NOT copy slides literally.
Translate into responsive web design.

---

## Assets

* Reuse images from `/assets/pages`
* Save selected visuals to `/public/assets`
* Use meaningful naming

---

## Documentation

Create `README.md` with:

* setup
* run
* build
* data structure
* how to edit content
* how to configure OpenRouter
* which model is used for the chatbot
* how the chatbot is grounded on local portfolio JSON

---

## Final Instruction

You already have extracted images.

Your job is:

1. Read each image
2. Convert it into detailed structured JSON
3. Save each JSON into `/data`
4. Merge all JSON files into a unified dataset
5. Create a chatbot-ready knowledge JSON file
6. Build a complete responsive portfolio website
7. Add an AI chatbot powered by OpenRouter

Do NOT skip the JSON step.
The JSON layer is the core knowledge base for both the website and the chatbot.
