# Wynsley

> A growth partner with its own software inside, for small US real-estate firms that sell, rent and manage homes. Six modules run on one system, around one record per person, in each firm's own name.

*The repository is still called `ai-front-desk`, the working title from when the plan was only an AI front desk. The AI desk is now one of six modules.*

## The problem

A small brokerage runs its website, its Google profile, its CRM, its inbox and its property software as separate tools from separate vendors. None of them know the firm's clients. Inquiries arrive by email, web form, text and phone at all hours, and many are answered late or not at all. The same person ends up as five records with no shared history, and most firms can't see how many clients they lose in the gaps.

## What it does

Six modules, set up and run for the firm, on one record:

| # | Module | What it covers |
|---|---|---|
| 1 | Website care | IDX listing search, hosting, uptime, backups; forms tested every morning |
| 2 | Local SEO | Google Business Profile, reviews, citations, area pages |
| 3 | CRM and lead automation | One record per person across buy, sell, rent and own; pipeline, routing, drip email and text |
| 4 | AI assistants | Chat, text and email in English and Spanish, answered on a promised reply time; inbound voice as an add-on |
| 5 | Monthly report and compliance | A plain-language monthly letter; fair housing, MLS display, brokerage-name and accessibility checks |
| 6 | Rentals | Connects to the firm's property software (AppFolio, Buildium, Rentvine, DoorLoop) first; its own rentals tools and online rent through the broker's own Stripe account come in stages |

Every inquiry gets a draft built only from facts the firm approved. It is sent within the promised time, held for review, or handed to a licensed agent with a short summary. Every step lands in a ledger that can't be edited, so each conversation has a receipt: consent, the AI disclosure, each fact with its source, a timeline, and who took over.

## Principles

1. Answers come only from facts the firm has approved, and every fact shows its source.
2. The assistant says it is an AI in its first message, and a person is one reply away ("Talk to a person", Reply AGENT).
3. No text message is sent without consent.
4. Everything a customer sees happens in the firm's name and under its license.
5. Wynsley never holds rent money.
6. Every conversation leaves a record the firm can audit.

## What's in the frontend today

The frontend is ported from the Wynsley Claude Design project, matching the design pixel for pixel.

| Route | What it is |
|---|---|
| `/` | The landing page: golden-hour hero with the animated phone, "Five vendors" problem section, "One partner runs all six" product section, how it starts, pricing, questions, the free-check form and the footer. **Sign in** opens the product prototype over the page. |
| `/prototype` | The clickable product prototype on its own: the web console (sign-in and invites, today, queue, receipts, rentals, payments, setup), the iPhone app, the tenant's pay page, the firm-branded customer chat and the flow map. The firm in it is fictional. |

How the port is put together:

- `src/components/wynsley/sections/`: one React component per design section. Inline styles are carried over verbatim through `sx()` (`src/lib/sx.ts`), so layout and spacing match the design exactly; each section's own CSS (media queries, keyframes, hover rules) sits next to it.
- `src/components/wynsley/`: the page shell (`Landing.tsx`), the animated logo (`WynLogo.tsx`) and two small layout helpers from the design (`FitBox.tsx`, `ImageSlot.tsx`).
- `src/prototype/wy-proto.js`: the product prototype, carried over unchanged from the design as a self-contained script, loaded on demand by `src/prototype/load.ts`.
- `public/assets/`: logos, app icons, palm illustrations and photos from the brand folder.
- Fonts are the design's own: Sora, Instrument Sans, Newsreader and IBM Plex Mono, from Google Fonts. Tailwind is available, without its preflight reset, so the ported pages render on the same browser defaults as the design.

## Design documents

The plan the code follows lives in [`docs/`](docs/README.md):

- [System design](docs/system-design.pdf): high-level and low-level design, sequence diagrams, the ER diagram and the engineering principles (74 diagrams).
- [Product spec](docs/product-spec.pdf): the six modules and every V1 screen in detail.
- [Design notes](docs/design-notes.pdf): sign-in and invites, rentals, rent and payments.

## Architecture

    Email / web form / text / phone
              |
              v
    +---------------------+        +------------------------------+
    |       Backend       | -----> |          PostgreSQL          |
    |  Node.js + NestJS   |        | record, ledger, facts, leads |
    |  engine and rules   |        +------------------------------+
    +---------------------+
              |
              v
    +---------------------+        +---------------------+
    |      Web app        |        |     Phone app       |
    |       Next.js       |        |  (same backend)     |
    | console, receipts,  |        | queue, hand-offs,   |
    |   monthly letter    |        |   voice notes       |
    +---------------------+        +---------------------+

The backend is a modular monolith: one service with strict internal modules (inbox, engine, ledger, listings, review, rentals) that can be split into separate services as the system grows. One MLS sync feeds both the AI and the firm's website.

## Tech stack

| Layer | Choice |
|---|---|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS |
| Backend | Node.js, NestJS, TypeScript |
| Database | PostgreSQL (managed) |
| Hosting | AWS EC2 for the backend, in Docker |
| AI | Claude API |
| Email | Each firm's own mailbox (Google or Microsoft) |
| Text | A carrier-registered messaging provider |
| Payments | Stripe, on each broker's own account, paid into its trust account |

## Repository structure

    ai-front-desk/
    ├── frontend/   Next.js app: landing page and product prototype (console, receipts, monthly letter to come)
    ├── backend/    NestJS API: the engine that answers, books and records
    └── docs/       System design, product spec and design notes

## Getting started

Requires Node.js 20 or later.

    # frontend, on http://localhost:3000
    cd frontend
    npm install
    npm run dev

    # backend, in a second terminal, on http://localhost:4000
    cd backend
    npm install
    PORT=4000 npm run start:dev

## Roadmap

- [x] Landing page and clickable product prototype, ported from the design
- [ ] Capture: read inquiries from a mailbox and web forms, and record each one
- [ ] Replay: run a firm's past inquiries through the engine and compare with what really happened
- [ ] Replies: AI drafts sent through a human review queue, then on the promised clock
- [ ] Booking and receipts: tour booking, a receipt per conversation, the morning brief and monthly letter
- [ ] Rentals: connect to the firm's property software; then units, leases and repairs; then online rent through Stripe
- [ ] Texting: enabled once a firm's number is registered with the carriers

## Status

Early development. The free-check form on the landing page shows its confirmation in the browser only; it isn't wired to email or the backend yet.

## License

Copyright (c) 2026. All rights reserved.
