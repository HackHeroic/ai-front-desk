# AI Front Desk

> An AI front desk for small real-estate firms. It answers every inquiry in under a minute, books the tour, hands the conversation to a licensed professional, and keeps a verifiable record of every step.

*Working title. This repository will be renamed when the product name is final.*

## The problem

Small brokerages and property managers lose business to slow replies. Inquiries arrive by email, web form, text and phone at all hours, and many are answered late or not at all. Most firms have no way to see how many they miss.

## What it does

- **Captures** every inquiry from email and web forms, with text and phone to follow
- **Answers** in under a minute, using only facts the firm has approved
- **Qualifies and books** tours on a real calendar
- **Hands off** to a licensed professional with a short summary
- **Holds for review** any reply it is unsure about, in a human review queue
- **Records** every step in a ledger: what was said, where each fact came from, and who took over

## Principles

1. Answers come only from facts the firm has approved.
2. The assistant always says it is an AI, and a person is one reply away.
3. No text message is sent without consent.
4. Every conversation leaves a record the firm can audit.

## Architecture

    Email / web form / text
              |
              v
    +---------------------+        +--------------------------+
    |       Backend       | -----> |        PostgreSQL        |
    |  Node.js + NestJS   |        | ledger, facts, contacts  |
    |  engine and rules   |        +--------------------------+
    +---------------------+
              |
              v
    +---------------------+
    |      Frontend       |
    |       Next.js       |
    |  queue, receipts,   |
    |      scorecard      |
    +---------------------+

The backend is a modular monolith: one service with strict internal modules (inbox, engine, ledger, listings, review) that can be split into separate services as the system grows.

## Tech stack

| Layer | Choice |
|---|---|
| Frontend | Next.js, TypeScript, Tailwind CSS |
| Backend | Node.js, NestJS, TypeScript |
| Database | PostgreSQL (managed) |
| Hosting | AWS EC2 for the backend, in Docker |
| AI | Claude API |
| Email | Each firm's own mailbox (Google or Microsoft) |
| Text | A carrier-registered messaging provider |

## Repository structure

    ai-front-desk/
    ├── frontend/   Next.js app: review queue, receipts, weekly scorecard
    ├── backend/    NestJS API: the engine that answers, books and records
    └── docs/       Architecture, data model and roadmap

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

- [ ] Capture: read inquiries from a mailbox and web forms, and record each one
- [ ] Replay: run past inquiries through the engine and compare with what really happened
- [ ] Replies: AI drafts sent through a human review queue
- [ ] Booking and receipts: tour booking, a receipt per conversation, the weekly scorecard
- [ ] Texting: enabled once a firm's number is registered with the carriers

## Status

Early development.

## License

Copyright (c) 2026. All rights reserved.
