# V1 spec: what changed on 23 Nov 2026

**Read this first.** These pages update the V1 spec that follows, dated 14 Nov. Where they differ, these pages win; everything else stands. The labels mean what they mean in the spec: **Fixed** keep as written, **Current thinking** beat it if you can, **Open** yours to decide. The "Upgrade" rule is unchanged: if you see a better way, design it and label it "Upgrade", with one line on why.

### In short

- CRM and PMS become one product, built in stages. Module 6 is now "Rentals: our PMS, in stages". **Fixed.**
- Online rent goes through Stripe, charged on each broker's own Stripe account and paid straight into the broker's trust account. Wynsley never holds rent money. **Fixed.**
- Staff sign in by invitation; customers never make an account. **Current thinking.**
- Two apps on one backend: a web app and a phone app. **Fixed.**
- Three new screens: 12 Sign-in and invites, 13 Rentals, 14 Rent and payments (with the tenant's pay page). **Current thinking.**
- One MLS sync feeds both the AI and the firm's website. **Fixed.**

## 1. CRM and PMS, one product, in stages. Fixed.

Three terms first. A **PMS** (property-management software) is the system that holds units, leases, rent and repair orders, such as AppFolio, Buildium, Rentvine or DoorLoop. A **trust account** (also called an escrow account) is the broker's own bank account for other people's money, such as rent; Florida law controls it. A **licensed processor** is a payment company licensed to move money; for us, that is Stripe.

Until 23 Nov, Wynsley only connected to a firm's PMS. Now it builds its own rentals tools, in three stages:

| Stage | What Wynsley does | For which firms |
|---|---|---|
| **1 · Connect** | Reads owners, tenants, units and leases from the firm's PMS into the record. Sends repair requests to it where it accepts them, and links residents to its payment page. Read-only access is enough; an export works when there is no API. | Firms that keep their PMS |
| **2 · Rentals tools** | Units, leases and renewals, repair requests routed to the firm's own people, and owner updates, all on the same record. No money moves. | Firms without a PMS come first |
| **3 · Online rent** | Tenants pay through Stripe, on the broker's own Stripe account, straight into its trust account. Wynsley keeps the payment record: what is due, paid, pending, failed and late. Sold as the Rentals tier, at a flat monthly fee, never a share of rent. | Firms that choose it. Moving a firm off its PMS comes last |

Two rules hold at every stage. Wynsley never holds rent money. And nothing Wynsley sells may depend on a PMS's API (the door through which one program reads or writes another's data): Follow Up Boss cut text and call content from its partner API in May 2025, and RealPage paused EliseAI's activations in October 2026.

### The module table, row 6, now reads

| # | Module | What it does for the firm | Backend modules |
|---|---|---|---|
| 6 | Rentals: our PMS, in stages | Connects to the firm's PMS where it has one. Our own rentals tools come in stages: units, leases and renewals, repair requests routed to the firm's own people, and owner updates; then online rent through Stripe into the broker's trust account, with the payment record. Answers leasing and owner questions. Never holds rent money. | `RentalsModule`, `PaymentsModule`, `IntegrationsModule` |

### Section 6, "Not in V1", changes

- **Now in**, as part of module 6 and in stages: a tenant pay page, online rent (always through Stripe, never held by us), repair requests and owner updates. These were left out on 14 Nov.
- **Still out:** paying owners their share (owner payouts), owner statements, security deposits, management-fee figures, anything called a reconciliation, 1099 tax forms, automatic late fees, refunds (none in the pilot), and storing bank account numbers (Stripe holds them). A resident or owner portal with its own log-in stays out: tenants use signed links. Two-way sync with another CRM or PMS stays out.

## 2. Who signs in. Current thinking.

- **Staff only.** The roles stay as they are in `app_user`: owner, admin, agent, reviewer. Customers (buyers, sellers, tenants and owners) never make an account.
- **By invitation only.** There is no public sign-up. Our team creates the firm at the kickoff and invites its owner; the owner invites the team. An invite names the firm, the role and who sent it. The owner's first sign-in is the firm's sign-up, and it leads straight into set-up (screen 8).
- A managed sign-in service handles passwords, email codes, Google sign-in and the phone app; Clerk is the recommendation. Each firm is one "organization" in it. The firm comes from the session, so a person sees one firm at a time, and someone in two firms switches between them.
- **Acting without signing in.** Alerts carry signed links (time-limited links that work only for the one item) and reply codes (1 Send, 2 Edit, 3 I'll call), so an agent can act from a text. A tenant pays from a signed link.
- Removing someone takes effect at once, on every device.

## 3. Two apps on one backend. Fixed.

- **Web (Next.js):** the landing page, the customer chat, the Replay report, the tenant pay page, and the desktop console, which has every screen.
- **Phone app (Expo, iPhone first, then Android):** alerts with action buttons, the queue, conversations, records and booking. Which rentals and payment views belong on the phone is **Open**.
- Both call the same API, and every business rule lives in the API, never in an app.

## 4. The new screens. Current thinking.

As in section 5 of the spec, each list says what the screen needs to carry. How it is arranged is open.

### Screen 12. Sign-in and invites
**For:** firm staff, and our own team. **Goal:** the right people get in fast, and nobody else does.

Carries:
- Sign-in: an email code, a password or Google. Once in, the firm's name, and a firm switcher for anyone in more than one firm.
- Accepting an invite: the firm, the role and who sent it. The owner's first sign-in leads into set-up (screen 8).
- The team: each person's role, status (invited, active, removed) and last sign-in. Invite by email and role, change a role, remove access.
- For our team: create a firm at the kickoff and invite its owner.

**States:** invite sent; invite expired, with a way to resend it; signed in with the wrong email; no access to this firm; access removed.

### Screen 13. Rentals: units, leases and repairs
**For:** the broker and whoever runs rentals. **Goal:** every unit, lease and open repair in one place, tied to the people on the record.

Carries:
- Units: address and unit, owner, tenants, rent, lease dates and status. Where each comes from: the firm's PMS (read-only, with when it last synced) or Wynsley.
- Leases: start and end, rent, the day it is due, grace days, who is on it, and the renewal status. Leases ending soon.
- Repairs: what is wrong, photos, how urgent, the unit and the tenant, who it went to (the firm's own maintenance person or vendor), when it is scheduled, its status, and every message to the tenant about it.
- Owner updates: what each owner was told and when, alongside the owner note in screen 5.

**States:** connected to a PMS, where edits happen in the PMS; no PMS, where edits happen here; a sync that failed, with its reason; a unit with no lease; an emergency repair after hours.

**Rules:** the firm's own people do the work, and Wynsley routes, reminds and records. An emergency always reaches a person.

### Screen 14a. Rent and payments: the payment record
**For:** the broker and the bookkeeper. **Goal:** know who has paid, who hasn't and what is still clearing, without opening the bank.

Carries:
- This month, by unit: rent due, paid, pending, failed or returned, and late after the grace days, with amounts and dates. Every balance shows the time it is "as of".
- Each payment: who paid, the amount, bank or card, the fee and who paid it, and its timeline: started, pending, cleared, in the trust account on a date, or returned or disputed. Stripe's reference and the receipt.
- Payouts: each deposit into the trust account and the payments inside it, for the bookkeeper. Export as a CSV file.
- Cash, checks and money orders that a person records, with who recorded them.
- Corrections: a reversing entry with a reason, never an edit.
- For each lease: partial payments allowed or blocked; online payments locked after a returned payment (certified funds only); autopay on or off.
- The firm's Stripe account: its set-up status, the trust account it pays into (last four digits only) and whether payouts are on or paused.

**States:** Stripe not connected yet; set-up needs more information; test mode, with no real money; payouts paused; a payment returned after it was paid out; a dispute opened; a month the broker has signed off, which is locked.

### Screen 14b. Rent and payments: the tenant's pay page
**For:** a tenant, on a phone, from a text or email link. **Goal:** pay rent in under a minute and know it worked.

Carries:
- The brokerage's name and brand, the unit, what is due and when, and what is already paid or pending.
- Pay by bank or by card, each with its fee shown before paying, and who receives the money: the brokerage's trust account, through Stripe.
- Autopay, with the authorization wording the tenant agrees to.
- A receipt after paying, and past payments.
- Whom to call, and a way to report a repair.

**States:** nothing due; paid; pending, because a bank payment takes a few business days to clear; failed, with what to do next; partial payments blocked; online payment locked; link expired, with a way to get a new one.

**Rules:** no account or password; Spanish from day one; the firm's brand, not ours.

## 5. Existing screens: what changes. Current thinking.

- **Screen 3, the queue.** Rentals items join it: a repair to route, a failed or returned payment, a lease ending with no renewal.
- **Screen 5, the reports.** Rent collected against rent due, with pending and late shown apart; repairs opened and closed, and how fast. The owner note can carry an owner's rent and repairs.
- **Screen 6, customer chat.** A tenant can ask what they owe or report a repair. A balance is shown only after the tenant is verified through a signed link, and always "as of" a time; otherwise the AI sends the pay link to the phone or email on file.
- **Screen 8, set-up and health.** The PMS connection with its mode (read-only, read and write, or export only), what it syncs and when it last ran. Payments set-up: the Stripe account, the trust account, and test mode or live. The team, from screen 12.
- **Screen 9, person and property record.** A property shows its lease, tenants, owners, rent status and repairs. A person shows their lease and payments, to staff only.

## 6. The money rules. Fixed, except where marked Attorney.

1. Rent is a direct charge on the broker's own Stripe account, paid out to its trust account. Wynsley starts and records each payment and never receives, holds or moves the money.
2. Pending is never shown as paid. A bank payment clears in about four business days and can still be returned after that; a consumer can dispute a bank debit for up to 60 days.
3. No money record is ever edited. A correction is a new, reversing entry. Amounts are stored in cents.
4. "Late" is worked out from the due date and the grace days, in Florida time. Nothing charges a late fee automatically.
5. Fees are shown before the tenant pays, and who pays them is a firm setting. Whether the trust account must receive the full rent, with Stripe's fees billed to the firm's operating account: **Attorney**.
6. The broker blocks or allows partial payments, lease by lease. In Florida, taking partial rent after a three-day notice brings extra duties (Fla. Stat. 83.56(5)).
7. Test mode comes first. Everything runs on Stripe's test data until the company, its tax ID (EIN) and bank account, Stripe's platform review and the attorney's answers are in. Test mode is unmistakable on every screen that shows money.
8. No refunds in the pilot.

**The attorney's four questions:** when online rent counts as received for the three-business-day deposit rule (61J2-14.008); whether the trust account must receive the full rent; how returns and chargebacks that debit the trust account are handled; and whether direct charges keep Wynsley outside Florida's money-transmitter law (560.103).

## 7. Values added on 23 Nov. Current thinking.

These are not in `schema.sql` yet. A screen may use them without the "needs new data" label.

| Thing | Values |
|---|---|
| Staff access | invited, active, removed. Roles as before: owner, admin, agent, reviewer |
| PMS connection mode | read-only, read and write, export only |
| Lease | upcoming, active, notice given, ended. Renewal: not started, offered, signed, moving out |
| Unit | vacant, leased, notice given (from its lease) |
| Repair | new, routed, scheduled, done, closed. Urgency: emergency, urgent, routine. Came in by text, chat, call, the pay page or staff |
| Rent for a month | due, partly paid, paid, late |
| Payment | started, pending, cleared, failed, returned, disputed. Method: bank, card, or recorded by staff (cash, check, money order) |
| Payout | in transit, in the trust account, failed |
| The firm's Stripe account | not started, needs information, active, payouts paused; test or live |
| Payment rules for a lease | partial payments allowed or blocked; online payments open or locked; autopay on or off |

Planned tables: `lease`, `rent_charge`, `payment`, `allocation`, `reversal`, `payout`, `webhook_inbox`, `repair_request` and `stripe_account`. The firm gains its sign-in organization, and `app_user` its sign-in user. Every new table carries its firm under the same row-level security. The [System Design's 23 Nov update](system-design/06-update-23-nov.md) draws them.

## 8. The MLS: one sync for the AI and the website. Fixed.

- Module 1 now includes the listing search and listing pages, built on the firm's synced copy of its MLS listings, with the MLS display rules checked nightly.
- **The synced copy** is Wynsley's own copy of a firm's MLS listings, kept up to date from the MLS feed. The AI reads it, and the website is built on it: one sync, two uses.
- **MLS display.** BeachesMLS's "at least every 12 hours" (rule 20.2.5) is its deadline, not our schedule. We sync every hour, and every run checks the full list of active listings. By our own rule, the 12-hour clock covers what a visitor sees: the listing page, the site's cache and its sitemap. A dropped listing's page says the listing is no longer available.
- **MLS data agreement.** Each firm signs its own, naming Wynsley as "Consultant", with its website domains on Exhibit A, marked IDX. When a firm leaves, its listing pages come down when the license ends, the listing copy is deleted except the firm's own listings, and an officer certifies that within five days.
- **Still open:** the job that removes dropped listings within 12 hours; the website's own listing view; an alert when an hourly sync fails; what the site shows if the feed stays down; the feed route (Spark is likely, Trestle possible); where a firm's own rentals that aren't in the MLS come from (its PMS, or now our rentals tools); and what replaces the pages when a firm leaves.

## 9. Open, for the design. Open.

- How sign-up feels with no public sign-up page: from the invite to a working desk within the one-hour kickoff.
- How "pending" and "cleared" read at a glance, on a phone.
- Which rentals and payment views belong in the phone app.
- How the tenant pay page carries the brokerage's brand while naming Stripe and the trust account.
- How a tenant gets back in to change or stop autopay without an account. Current thinking: a fresh link, by text or email.

*What follows is the V1 spec of 14 Nov 2026, unchanged.*

---

# V1 spec: what version one contains

Updated on 14 Nov 2026 for the new scope. Wynsley is a growth partner with its own software inside, not an AI front desk.

## How to use this document

This is everything we know about version one. Treat it as a starting point to improve on, not a drawing to copy.

| | What it covers | How to treat it |
|---|---|---|
| **Fixed** | What the company is and its six modules (section 1), the trust rules and the rules that become product features (section 4), what is left out (section 6), the data that exists (section 7), and the decided commercial terms (section 8) | Keep as written. |
| **Our current thinking** | The eleven screens and what each one carries (section 5), and our product habits (section 4) | Beat it if you can. |
| **Open** | How anything looks, moves, reads or is arranged. Which screens are merged, split, renamed or reordered. | Yours to decide. |

**Upgrades.** If you see a better way than ours, design it and label it "Upgrade", with one line on why. An upgrade can be a better flow, a screen worth merging or removing, a moment we missed, or a small feature a broker would love. If it needs data that section 7 does not have, add the label "needs new data".

**For building the code:** the scope stays exactly as listed here until the founder accepts an upgrade.

## 1. What the company does

Wynsley is a growth partner with its own software inside. It works for small US brokerages that sell, rent and manage homes, with roughly 5 to 50 agents. It starts in South Florida.

It begins as done-for-you monthly plans, run mostly by software and AI. It grows into the platform these firms run on. Every task we repeat for one firm becomes software for the next.

**In the brokerage's name.** Wynsley is the technology layer between the brokerage, its agents, its landlords and their customers. It is never a party to a deal. Everything a customer sees happens in the brokerage's name and under its license. Never describe Wynsley as "a platform that connects buyers and sellers", or as an AI front desk. The AI desk is one module of six.

### The six modules

| | Module | What it does for the firm | Backend modules |
|---|---|---|---|
| 1 | Website care | Hosting, security updates, backups, uptime and speed checks, small content edits | `SiteCareModule` |
| 2 | Local SEO | Area landing pages, Google Business Profile posts and review links, citations, a ranking report. AI drafts and our team approves. | `LocalSeoModule` |
| 3 | CRM and lead automation | One record per person across buying, selling, renting and owning. The pipeline, routing, an instant reply, drip email and texts, pipeline reports. | `CrmModule`, `CampaignModule` |
| 4 | AI assistants | Website chat and texts for sales, leasing and owner questions. An optional AI voice receptionist answers inbound calls only. | `InboxModule`, `EngineModule`, `ReviewModule`, `BookingModule` |
| 5 | Monthly dashboard and compliance | Leads, cost per lead and response times, read from the ledger and sent each month as a plain-language letter. Checks for accessibility, for the MLS's display rules and for the brokerage's name in its ads, plus a fair-housing review of AI replies and listing text. | `ReportsModule`, `ComplianceModule` |
| 6 | Rentals and residents support | Connects to the firm's property-management software for the resident portal, rent and maintenance. Answers leasing and owner questions. Produces owner reports. Never holds or moves rent money. | `IntegrationsModule` |

The terms in the table, in plain words:
- **SEO** (search engine optimization) is the work of ranking in Google. **Local SEO** is ranking in Google Maps and "near me" searches.
- **Google Business Profile** (GBP) is the firm's listing on Google Maps and Search. **Citations** are the firm's name, address and phone number, listed the same way across online directories.
- **CRM** (customer relationship management) is the record of every person and every exchange with them. The **pipeline** is the deals in progress, each at a stage. **Routing** decides which agent gets a new lead.
- A **drip** is a planned series of emails or texts, sent over days or weeks.
- The **MLS** (multiple listing service) is the shared database where local brokers list homes. **IDX** (Internet Data Exchange) is the license that lets a firm show other brokers' listings on its own website.
- **Property-management software** (PMS) holds leases, rent, owner records and repair orders. AppFolio, Buildium, Rentvine and DoorLoop are examples.
- **Accessibility** means meeting WCAG 2.2 AA, the middle level of the web accessibility guidelines. Scans are automated, and a person reviews them.

The CRM starts focused and is built to grow into a strong one. The benchmarks for its depth are AppFolio's leasing CRM and EliseAI.

**What sets it apart.** One record across buying, selling, renting and owning, and proof of every step. The renter who later buys, and the owner who later sells, stay one person. The proof lives in a ledger: a log that can be added to but never edited. Receipts, the guarantee (a promised reply time, with a credit when it is missed) and every report are read from it. Everyone sells the answer; we sell the proof.

**How each firm feels custom.** Through settings and data, never through code:
- a firm profile: hours, areas, services, team, routing, tone of voice
- a starting template by firm type: sells only; sells and rents; sells, rents and manages
- custom fields
- AI that writes from the firm's own approved facts

**As little manual work as possible.** New ideas go where they remove manual work:
- **Live on new inquiries in a day.** In a one-hour kickoff, chat, email (by forwarding) and calls (by call forwarding) go live for new inquiries, and nothing is switched off. Texting starts once carriers approve the firm's number (usually days, sometimes up to six weeks). The active pipeline comes in during the kickoff, and past records within 30 days, in batches, each with an import receipt that accounts for every row and a 30-day undo. The AI proposes column mappings and flags problems, but never rewrites a name, phone, email or address on its own. Imported contacts get texts only after they say yes. The AI reads the firm's website, Google profile and listings, plus an export or forwarding of past inquiries that the firm provides. It never reads the inbox itself until Google's yearly security assessment is passed (section 3). It drafts the firm's profile, settings and facts. There is one approval path: our team (the founder) reviews the drafted profile and settings before set-up copies them onto the firm, and every fact the AI may say to customers waits for the broker's approval on the fact sheet (screen 7).
- **No manual data entry.** Every email, text and call updates the record.
- **Proof.** Receipts and the ledger.
- **Benchmarks.** Anonymous comparisons across firms, once there are about 10 firms.

Delivery is the founder plus AI. Automation comes first, and the company hires only as it grows.

## 2. The life of one inquiry

This is how the AI assistants (module 4) handle one inquiry. The words in bold are real statuses a screen can show.

1. **It arrives** at one of the firm's doors. A door is a channel: a mailbox, a web form, a text number, a chat or, with the voice add-on, a phone line. The engine finds the person's record, or starts one. The conversation is **open**.
2. **The engine drafts a reply** from approved facts and public listing fields. Then one of three things happens:
   - The rules pass and the door is live: the reply is **sent**, within the promised time. The promise is 60 seconds unless the firm sets another. Email and chat replies go out at any hour. A text reply waits for the firm's texting window, the hours in which texts may be sent.
   - A rule fails or the AI is unsure: the draft is **pending review**, an item appears in the queue, and the conversation is **waiting for review**.
   - The firm is in its silent week: the draft is kept as **not sent**, to compare with what the firm really did.
3. **A person clears the queue item.** A Review takes one of three answers: 1 Send, 2 Edit, 3 I'll call. A Question is answered by typing or by voice note. An FYI is dismissed. Answers can be given with a reply code, in the web app, or by voice note.
4. **The AI books a tour.** It offers three times and the customer picks one. A tour is **booked**, then **completed**, **cancelled** or **no-show**.
5. **The AI hands off** to a licensed person, with a short summary and a clock. A hand-off is **offered**, then **accepted**, **declined** or **expired**. If the clock runs out, it is offered to the next agent. Once accepted, the conversation is **handed off** and the customer is told who is taking over.
6. **Every step is written to the ledger**, a log that can be added to but never edited. The receipt, the morning brief, the weekly letter, the monthly report and the guarantee are all read from it.

A firm moves through modes: **replay** (we run the engine over its past inquiries), **shadow** (the silent week, drafts only), then **live**. It can also be **paused** or **closed**.

"After hours" has one meaning everywhere: the inquiry arrived outside the firm's office hours, which each firm sets.

Follow-ups after the first exchange belong to the CRM, as drips (screen 10).

## 3. Architecture

```
 WHERE PEOPLE REACH THE FIRM
 website and IDX forms · web chat · email · texts · calls (voice add-on)
                                       │
                                       ▼
 ┌──────────────────── Wynsley: one system for every firm ─────────────────────┐
 │ each firm walled off from the others · all in the brokerage's name          │
 │                                                                             │
 │  1 Website care          2 Local SEO             3 CRM and lead automation  │
 │    SiteCareModule          LocalSeoModule          CrmModule                │
 │                                                    CampaignModule           │
 │                                                                             │
 │                 ┌───────────────────────────────────────────┐               │
 │                 │ ONE ENGINE                                │               │
 │                 │ answers from approved facts, follows the  │               │
 │                 │ rules, sends hard cases to human review   │               │
 │                 ├───────────────────────────────────────────┤               │
 │                 │ ONE RECORD                                │               │
 │                 │ people, properties and their roles,       │               │
 │                 │ deals, consent, every conversation, and   │               │
 │                 │ the ledger of every step                  │               │
 │                 └───────────────────────────────────────────┘               │
 │                                                                             │
 │  4 AI assistants         5 Monthly dashboard     6 Rentals and residents    │
 │    InboxModule             and compliance          support                  │
 │    EngineModule            ReportsModule           IntegrationsModule       │
 │    ReviewModule            ComplianceModule                                 │
 │    BookingModule                                                            │
 │                                                                             │
 │ PostgreSQL: one database, every row tagged with its firm                    │
 └──────────────────────────────────────┬──────────────────────────────────────┘
    ┌───────────────────────────────────┴───────┐
    ▼                                           ▼
 HAND-OFF                                   CONNECTED, NOT BUILT
 a named licensed person at the             AWS hosting · the firm's own mailbox
 brokerage, on a clock, logged              Twilio for texts and voice · Claude
                                            Google Business Profile, Search Console
                                            and GA4 · the MLS feed · the firm's
                                            property software · a citation service
```

- **One system for every firm.** Every firm runs on the same code and the same database. There is never a separate CRM or codebase per client. Every row carries its firm, and row-level security (a rule inside the database) hides each firm's rows from every other firm.
- **Custom through settings, not code.** Each firm is shaped by its profile, its starting template, its custom fields and its approved facts (section 1).
- **Stack.** Frontend: Next.js, a framework for web apps. Backend: Node.js (JavaScript on the server) with NestJS, as one service with strict modules. This is a modular monolith: one codebase and one deployment, cut so that a module can be split out later. Database: PostgreSQL.
- **Built in-house:** the record (the CRM), the desk logic and rules, the proof ledger, the consent log, the monthly dashboard, the compliance checkers, and onboarding by AI.
- **Connected, not built.** An API is the door through which one program reads or writes another program's data. We connect to:
  - AWS (Amazon's cloud) for hosting
  - the firm's own Google or Microsoft mailbox
  - Twilio, a texting and calling service, for texts and voice
  - Claude, the AI model
  - Google's Business Profile, Search Console (how a site shows in search) and GA4 (Google Analytics, which counts visits) APIs
  - the MLS feed
  - the firm's property-management software
  - a citation service
- Email goes through each firm's own mailbox. Texts go from a number registered to the firm.
- **Reading mail needs Google's approval.** Reading a client's Gmail needs a security assessment every year. So Replay v0 works from an export or forwarding that the firm sets up, not by reading its inbox. How live mail reaches us is still open: forwarding, or reading the inbox once the assessment is passed.
- The full design, with every diagram, is listed in section 9.

## 4. Rules

### Trust rules. Fixed.

These are legal or honesty requirements.

- The AI always says it is an AI in its first message, on every channel, and answers "yes" whenever someone asks if they're talking to a bot. Chat and SMS keep a short "AI" tag on its messages. New Jersey already requires a bot that sells or advertises real estate to say so at the start (N.J.S.A. 56:18-2), and Florida's SB 482, which would have required periodic notices, passed the Senate in March 2026 before dying in the House.
- "Talk to a person" is always visible to customers, in English and Spanish ("agent", "person", "agente", "persona" all work), and the hand-off names the person taking over.
- A message a staff member genuinely reviews and sends under their own name ("AI drafts, staff sends") is theirs, not a bot's; use it for price, offer, contract and complaint steps. The attorney confirms this reading.
- Every fact the AI states shows where it came from.
- No text message without recorded consent.
- English and Spanish everywhere a customer reads.
- Use placeholders such as `[PRICE]` or `[OUR NUMBER]` where a real figure is not known. Never invent statistics, testimonials or client logos.

### Rules that become product features. Fixed.

These come from Florida and federal law and from the MLS. Each one is built into the product, where a rival without it cannot fake it.

- **The brokerage's name, always.** The AI introduces itself as the brokerage's AI assistant. The brokerage's registered name sits next to every phone number, email and chat button, as the Florida Real Estate Commission's rule 61J2-10.025 requires. The AI never uses a persona that sounds like a licensed agent.
- **Inform, never advise.** The AI informs and schedules from broker-approved facts. Licensed people negotiate price and terms, and give advice.
- **Only an assistant's tasks.** Florida licensing turns on what the AI does, not on how we are paid (the 14 Nov legal brief). The AI stays within what Florida's informal unlicensed-assistant policy allows: answer and forward inquiries, schedule showings for a licensee, and give objective facts the broker approved. Recommended, for the founder to confirm: until a Florida attorney says whether qualifying counts as broker work, the AI's questions are limited to logistics (name, contact details, which property, preferred time). It records anything the person volunteers, and budget and financing questions go to the licensee.
- **The broker's control, written down.** The firm approves the facts and scripts, can read every transcript, and can switch the AI off on any door at any time.
- **Texting.**
  - Consent is recorded.
  - Texts go out only in a texting window: 8 a.m. to 8 p.m. in the recipient's local time. A firm may narrow the window but never widen it. Florida's 8-to-8 limit (Fla. Stat. 501.616) is written for sales calls; whether it covers texts is for the lawyer to confirm, so the product applies it to texts anyway.
  - Each brokerage is registered for business texting under its own tax ID. The carriers call this A2P 10DLC: registration for business texts sent from ordinary 10-digit numbers.
  - From 25 Nov 2026, under a Federal Communications Commission (FCC) order (FCC 26-67), one opt-out from a marketing call or text stops all marketing calls and texts from that sender. Opt-outs must already be honoured within 10 business days; the product honours them within minutes.
- **Calls.** Florida requires every party's consent to record a call (Fla. Stat. 934.03). AI voice answers inbound calls only. There are no outbound AI calls.
- **Chat.** The website chat shows a recording notice before the first message. In 2025 more than 70 near-identical lawsuits in Broward County claimed that recording website chats without notice breaks Florida's wiretap law (Fla. Stat. ch. 934). The attorney confirms the wording.
- **Junk, test and risky inquiries, version 2** (recommended 17 Nov, for the founder to confirm; replaces the earlier three lanes). Everyone gets the same first reply. Risk only decides how much proof a sensitive action needs, and whether a person checks it first.
  - **The fair floor.** Every message from a person gets the same qualifying first reply within 60 seconds, on the channel it came in on, whatever any score says. A qualifying reply names the firm, says it is an AI, answers the question or asks the one question needed to answer it, and offers a person. "We got your message" alone doesn't count. Answers about vouchers, assistance animals and accessibility are identical for everyone. There is always a way to see a home without an ID scan or a smartphone, and "Reply AGENT" always reaches a person.
  - **One guarantee clock, starting when the message arrives.** Nothing is excluded except a closed list decided by rules at arrival:
    - refused by the bot check at the door;
    - a machine sender;
    - email that fails DMARC under a quarantine or reject policy;
    - a duplicate within 10 minutes;
    - a declared test door;
    - an opted-out or blocked sender;
    - a documented provider outage.
    
    Each exclusion shows its evidence and the firm can restore it. Scores and AI labels never exclude anything or move the clock, and missing or unclear records count as missed.
  - **A behaviour-only scorecard** sorts inquiries into four tiers: Clear, Watch, Step-up and Hold. It runs in shadow during the pilot and goes live only after backtests at about 10 firms. It never uses any of these:
    - names, language, zip or area code;
    - device, digital footprint, email-domain type;
    - time of day, typing speed, credit;
    - voucher mentions.
  - **The action broker.** The AI can read but cannot act on its own. Each sensitive action has one proof rule, the same for everyone. A higher tier only adds a person's approval first.
    - **Texting a typed number:** the person texts first through a tap-to-text link, or ticks a separate texting box; then one confirmation only. Twilio's SMS-pumping score is not used on US numbers, because Twilio says it isn't designed for them.
    - **Booking a showing:** a one-time code, when the person asks to book.
    - **Self-tour access:** an ID, selfie and liveness check at every access. Codes are single-use and valid for an hour at most, the AI never handles them, and an agent-led showing is always offered.
    - **Owner or seller claims:** the broker leads. That means an ID check, a match against the property appraiser's record, a call back on an independently found number, and a certified letter for vacant land.
    - **Non-public details, payment instructions, tenant accounts and record changes:** never through the AI alone.
  - **Email safety.** Mail is sent only after the door check passes, and at most one email goes to an address per firm per day. Content is transactional only, forged senders get no reply, and inbound mail is treated as untrusted data.
  - **AI guardrails:**
    - no private data in the model's context;
    - untrusted text passed in as data;
    - an input screen and an output check;
    - answers grounded in approved facts;
    - spending and length limits;
    - a fair-housing guard;
    - a kill switch that fails closed;
    - a monthly red-team test in English, Spanish and Haitian Creole.
  - **Learning.**
    - Label buttons from day one, and a 10-minute daily review queue.
    - A report per rule every week.
    - New rules run in shadow first, then on 10% of inquiries, then on everyone.
    - Any rule that adds friction needs 95% precision.
  - **Tests and scams.** Tests are declared at the door, never guessed afterwards. Someone who may have been scammed by a fake listing gets a safety reply and a person paged at once, and every rental reply carries a payment warning.
- **Fair housing.** The AI follows fair-housing law, which bans discrimination in housing. That includes Broward County's protection for a renter's lawful source of income, such as a housing voucher.
- **Buyer agreements.** Under NAR and MLS rules since August 2024, an agent needs a written agreement with a buyer before touring a home for sale. Florida Realtors' guidance says this applies to sales only, so rental showings don't need one. The AI books a sales tour with a flag, so the agent confirms an agreement is in place.
- **MLS display.** BeachesMLS rules apply: listings are refreshed at least every 12 hours, and each one credits the listing firm.
- **Accessibility.** Every site and screen we build is built and tested to WCAG 2.2 AA: automated scans, then a person's review. We never promise full conformance in writing, and we never use an accessibility overlay.
- **Money.** Wynsley never holds or moves rent money. Rent goes through the firm's property-management software.
- **Sign-off.** A Florida real-estate attorney confirms pricing, contract wording and the AI's limits before texts or voice go live.

### Product habits. Our current thinking.

Challenge any of these if you have something better.

- Broker screens are designed for the phone first.
- No dashboards of charts. Show what happened in plain words. The monthly dashboard is a report in words and numbers.
- One queue with three kinds of item, cleared with 1, 2, 3 or a voice note.
- A morning brief that is five lines long and then ends.
- Nobody types to keep the record current. Emails, texts, calls and tours update it.
- A drip stops the moment the person replies, books a tour, or a person takes over.

## 5. The eleven screens

Each list says what the screen needs to carry. How it is arranged is open. Screens 1 to 8 are the first eight, adjusted for the new scope, and screen 5 now also carries the monthly report. Screens 9 to 11 are new.

| Module | Where it shows |
|---|---|
| 1. Website care | Screen 11, and the monthly report in screen 5 |
| 2. Local SEO | Screen 11, and the monthly report in screen 5 |
| 3. CRM and lead automation | Screens 9 and 10, and the contact card in screen 4 |
| 4. AI assistants | Screens 2, 3, 4, 6 and 7 |
| 5. Monthly dashboard and compliance | The monthly report in screen 5, and the checks in screen 11 |
| 6. Rentals and residents support | Owner and resident answers in screen 6, the connection in screen 8, the owner note in screen 5 |

Screens 1 and 8 serve every module: the landing page sells the whole offer, and set-up connects it.

### Screen 1. Landing page
**For:** a brokerage owner. **Goal:** book a call or request a Replay.

Carries:
- The promise, with two actions: "See what you missed" (request a Replay) and "Book a call". The promise is growth, not technology: more closed deals and more kept owners, from the leads and agents the firm already has.
- The hidden leak: inquiries that never get answered, and basics that quietly break (a dead button, a listing search that never went live, a Google profile nobody manages), with `[OUR NUMBER]` placeholders.
- What the firm gets: the six modules, one plain line each.
- How it starts: a one-hour kickoff, live on new inquiries in a day, then a 90-day pilot in three stages. Fix the basics; switch on the desk after one silent week; prove it in the monthly reports.
- The proof: Replay, a receipt for every conversation, the seller log and owner note, the monthly report, the guarantee.
- Trust: everything happens in the firm's own name and under its license; the AI says it is the firm's AI assistant; a person is one reply away; consent comes first; the AI uses approved facts only; rent money never passes through us.
- Done for you: a named person for set-up and support.
- Pricing: a 90-day paid pilot at `[PILOT PRICE]`, then one flat monthly price per firm, `[PRICE]`, month to month. Never per lead or per deal.
- Questions and answers, then contact details.

**States:** after a Replay request, what happens next and when; after a call is booked, its confirmation.

### Screen 2. Replay report
**For:** a firm that has not bought yet. **Goal:** show them their own missed inquiries. This is the sales demo.

The Replay runs on an export or forwarding of the firm's past inquiries, not on its inbox (see section 3).

Carries:
- Firm name, the period covered, the date it was run.
- Headline numbers: inquiries received; answered within 5 minutes, within 1 hour, within 24 hours; never answered; typical first reply; share that arrived after hours; doors that failed.
- One row per inquiry: when it arrived, the channel, the listing, who asked, what really happened (reply time or "no reply"), and what we would have sent and how fast. The draft opens on tap.
- Filters: all, never answered, after hours.
- One action at the end: start the 90-day pilot.

**States:** still running; no inquiries found; partial data; the run failed.

### Screen 3. The queue
**For:** the broker, every day, on a phone. **Goal:** clear what needs a person in under a minute.

Carries:
- A count for each kind of item: FYI, Question, Review.
- Each item: its kind, who it concerns and their role, the listing or property, a one-line summary, how long it has waited.
- **Review** items: the drafted reply and its sources, with three actions: 1 Send, 2 Edit, 3 I'll call.
- **Question** items: what the AI needs to know, answered by typing or by voice note.
- **FYI** items: dismiss.
- A voice-note button that is always available, to teach the desk something new.

**States:** items waiting; "all clear" when nothing is waiting.

### Screen 4. Conversation and receipt
**For:** the broker or agent. **Goal:** see one conversation and prove what happened in it.

Carries:
- The thread, in order. Each message is labelled Customer, AI assistant, or a named person, with its channel and time.
- A listing card: address, price or rent, status, beds and baths. For an owner or a resident, the property instead.
- A contact card: name, role (buyer, seller, renter, owner, tenant), language, consent for each channel, and a link to the person's full record (screen 9).
- The receipt:
  - consent: how and when it was given;
  - the moment the customer was told it is an AI;
  - each fact stated, with its source (a fact-sheet entry or a listing field);
  - a timeline with durations: received, first reply after N seconds, booked, handed off, accepted;
  - who took over;
  - whether the guarantee was met.
- A way to share the receipt as a page.

**States:** open, waiting for review, handed off, closed. A "silent week" label when a reply was drafted but not sent.

### Screen 5. Morning brief, weekly letter and monthly report
**For:** the broker; the monthly report is also for the firm's owner. **Goal:** know what happened without opening the app, and see each month what the firm got. The brief and the letter are messages, not app screens. The monthly report is a message and also a page in the app.

**Morning brief:** five lines, then it ends.
1. New inquiries since yesterday, and how many were answered.
2. Tours today: time, listing, agent.
3. Items waiting for you and tasks due today, with links to the queue and the pipeline.
4. Anything broken: a door that failed its daily test, or a website check that failed.
5. One win.

**Weekly letter:** plain language, printable, safe to forward.
- Totals: inquiries, answered within a minute, typical first reply, after-hours inquiries answered, tours booked, hand-offs accepted on time.
- The guarantee: days met out of days in the week, and any credit.
- Per agent: hand-offs offered and accepted, typical time to accept.
- **Seller log**, per listing: inquiries, typical reply time, tours booked. The agent forwards this to the seller.
- **Owner note**, per rental: inquiries, typical reply time, tours booked. The manager forwards this to the owner.

**Monthly report:** a plain-language letter with a few key numbers, each beside last month's, not a wall of charts. Printable and safe to forward. It is the firm's before-and-after story, and its reason to stay.
- Leads: inquiries by channel and source. Cost per lead appears only for the sources where the firm has entered that month's spend (screen 8). The other sources show inquiries alone.
- Speed: typical first reply, by channel and by office hours versus after hours; the share answered within the promise; hand-offs accepted, and how fast; tours booked.
- Pipeline: deals opened and won, by kind: sale, lease, management.
- Local search: area pages live, Google posts published, and the latest ranking snapshot.
- Website: uptime, speed, backups and security updates.
- Compliance: each accessibility, MLS display, brokerage-name and fair-housing check, with its result; texting consent and opt-outs honored.
- The guarantee: days met out of days in the month, and any credit.

**States:** a quiet day, when the brief still shows its five lines; the first monthly report, with no earlier month to compare; a section with nothing in it yet, such as rankings before the first snapshot.

### Screen 6. Customer chat
**For:** a buyer, seller, renter, owner or resident on the firm's website. **Goal:** get an answer, a tour or a person, without feeling tricked.

Carries:
- The brokerage's registered name beside the chat button.
- Before the first message, a short notice that the chat is recorded, with `[RECORDING NOTICE]` wording from the attorney.
- A first message with the firm's name, "I'm `[firm name]`'s AI assistant", and what it can help with.
- "Talk to a person", always visible.
- A language switch: English and Spanish.
- A listing card when a home is being discussed.
- Quick-reply buttons as well as free typing.
- A tour picker: three offered times, plus "another time".
- Contact capture: name, phone or email, and a consent tick-box for texts with `[CONSENT TEXT]`. The box starts unticked.
- For an owner thinking about management: a few questions about the home for the firm's proposal, then a hand-off.
- For a resident: a link to the firm's resident portal for rent and repairs. The chat never takes a payment.
- The hand-off message: "`[Agent name]` will take it from here."
- For another broker's listing: a short answer and a link to the full listing page, when the firm's website has one.

**States:** after hours; an error; a person has taken over.

### Screen 7. Fact sheet
**For:** the broker. **Goal:** see and approve what the AI is allowed to say.

Carries:
- Facts grouped by topic: fees, pets, showings, applications, hours, areas served.
- Each fact: the question, the answer, what it applies to (the firm, one listing, one building), language, status (draft, approved, retired), who approved it and when.
- Facts the AI drafted at set-up, from the firm's website, Google profile and listings. They stay drafts until the broker approves them.
- Pending changes from voice notes: "You said ... so the proposed fact is ...", with Approve, Edit, Discard.
- The building book. Each building: name, whether approval is needed, how many days approval takes, application fee, minimum lease in days, leases allowed per year, pet policy, date verified.

**States:** no approved facts yet; changes waiting for approval.

### Screen 8. Set-up and health
**For:** the broker and our own team. **Goal:** finish set-up, then see that every door and connection works.

Carries:
- Set-up by AI: the profile and settings the AI drafted from the firm's website, Google profile, listings and an export of past inquiries, for our team to review before set-up copies them onto the firm. Drafted facts go to the fact sheet (screen 7) for the broker instead.
- The firm profile: its starting template (sells only; sells and rents; sells, rents and manages), areas served, services, routing, tone of voice.
- Doors: mailbox, web form, text number, chat and, with the voice add-on, a phone line. Each with its status and its last daily test (sent, arrived, replied).
- Connections to the firm's other systems: property-management software, MLS feed, mailbox, texting, voice, calendar. Each with its status.
- Listing source: its name, when it last synced, and the split between the firm's own listings and other brokers' listings.
- Team: name, role, languages, hours available for tours, and whether alerts reach them by email or text.
- Custom fields: the firm's own fields on people and properties.
- Mode: silent week or live, with the date it changed.
- Hours: the firm's office hours, and the hours in which texts may be sent.
- The guarantee: the promised reply time.
- Marketing spend: what the firm spent each month on each lead source, such as a listing portal, Google ads or yard signs. Entered by the firm. It is what makes cost per lead possible.

**States:** set-up in progress; a door or connection failing, with its reason; waiting on an outside approval, such as texting registration.

### Screen 9. Person and property record
**For:** the broker and agents. **Goal:** see everything about one person, or one home, in one place, with nothing typed in by hand.

Carries:
- Search by name, phone, email or address.
- A person: name, phone, email, language, consent for each channel, and the firm's custom fields.
- The person's roles, each tied to a property: owner, tenant, landlord, seller, wants to buy, wants to rent. One person can hold several, across buying, selling, renting and owning.
- Their history, newest first: conversations, tours, hand-offs and deals, all logged without typing.
- Their open deals and tasks, and any drip they are on, with a way to stop it.
- A property: address and unit, its building and its listing when known, the firm's custom fields, and everyone tied to it, with their role.
- The property's deals and history.

**States:** a new person known only by a phone number or an email; no consent for texts yet; a property with no listing.

### Screen 10. Pipeline and follow-ups
**For:** the broker and agents. **Goal:** see every open deal and today's follow-ups, so nothing falls through.

Carries:
- Deals by kind (sale, lease, management), each at its stage: the person, the property, the agent, and how long it has been at that stage.
- Tasks due today and overdue: what to do, for whom, and who owns it. Done in one tap.
- Drips: each sequence of emails and texts, its steps and waits, and who is on it. A drip stops the moment the person replies, books a tour, or a person takes over. Texts wait for consent and the texting window. One opt-out stops all marketing to that person.
- Pipeline report: deals opened, moved and won this month, by kind and by agent.

**States:** no deals yet; nothing due today; a person taken off a drip because they opted out.

### Screen 11. Website and SEO health
**For:** the broker and our own team. **Goal:** see that the website is up, fast, safe and within the rules, and that the firm is easy to find on Google.

Carries:
- Site checks: uptime, speed, security updates and backups. Each with its latest result and when it ran.
- Compliance checks, each with its latest result and what failed:
  - accessibility, to WCAG 2.2 AA: automated scans, then a person's review;
  - MLS display: the disclaimer, the listing firm's credit, and listings no older than 12 hours;
  - the brokerage's name beside every point of contact and in ads;
  - fair housing: a review of AI replies and listing text for wording that could discriminate, including against a renter's lawful source of income, such as a housing voucher.
- Google Business Profile: whether it is verified, recent and scheduled posts, and the review link the firm sends to its clients.
- Area pages: one per area served, each live or waiting for approval.
- Ranking snapshot: where the firm shows up for its key local searches, against last month.
- For our team only: drafts waiting for approval (area pages, posts, review replies). Review replies are automated only once the firm has authorized it. A negative review always goes to a person.

**States:** no Google profile yet (only the owner can start verification, and automated posting needs the profile verified for at least 60 days); a failed check, with its reason; the first scans still running.

## 6. Not in V1. Fixed.

These were left out on purpose, to keep version one small. An upgrade may add to the eleven screens, but it may not bring these back.

**Left out of the first offer.** These are later add-ons at most: paid ads, landlord acquisition funnels, agent recruiting, resident newsletters, building microsites, social and video content, and reputation management beyond Google review links.

**Left out of the product.** WhatsApp. Two-way sync with another CRM. A general workflow builder: drips use a fixed set of steps. A dashboard of charts. A billing portal. Our own resident portal, owner portal, rent payments or repair orders: these stay in the firm's property-management software, which we connect to and link to. Separate screens for calls: a call shows as a conversation. Developer or SDK pages.

## 7. Data model. Fixed.

The full schema is the file `schema.sql`: 42 tables. It was run on a real PostgreSQL engine (version 18.6, in the PGlite build, which is PostgreSQL compiled to run inside Node) with sample data for two firms, and all 171 checks pass. It has not yet been run on a server database or at real data volumes.

Every table except `firm` and the shared `firm_template` carries its firm, and the database itself stops one firm from reading or writing another firm's rows. Every firm can read the shared templates, and only our own team can change them.

| Group | Tables | What they hold |
|---|---|---|
| Who | `firm`, `app_user`, `contact`, `consent` | The customer firm and its profile, its staff, one record per person, and consent for each channel |
| Doors | `channel`, `heartbeat_check` | Each mailbox, form, number or chat, and its daily test |
| Listings | `mls_source`, `listing`, `listing_private`, `building` | Listing feeds, public listing fields under their standard names from RESO (the industry's data standard), private fields the AI never reads, and the building book |
| Knowledge | `fact`, `fact_version`, `voice_note` | Approved answers with their versions, and the voice notes that propose them |
| Conversations | `conversation`, `message`, `message_source` | Threads, every message and draft, and the source of each stated fact |
| Human steps | `review_item`, `tour`, `handoff` | The queue, booked tours, and hand-offs with their clock |
| Proof | `event`, `guarantee_day`, `report` | The ledger that cannot be edited, the daily guarantee result, and reports sent, now including the monthly report |
| Sales | `replay_run`, `replay_item` | A Replay over a firm's past inquiries |
| CRM (new) | `property`, `person_property_role`, `deal`, `task`, `custom_field` | A real-world home or unit, linked to its listing and building when known; each person's role on a property; the deals in the pipeline; tasks; and each firm's own field definitions, whose values sit in a jsonb column (a flexible PostgreSQL field) on `contact` and `property` |
| Campaigns (new) | `sequence`, `sequence_step`, `enrollment` | Drips by email and text, their steps, and who is on each one |
| Website care (new) | `site`, `site_check` | Each website we look after, and its checks |
| Local SEO (new) | `seo_page`, `gbp_profile`, `gbp_post`, `ranking_snapshot` | Area landing pages, the Google Business Profile and its posts, and ranking snapshots |
| Compliance (new) | `compliance_check` | Accessibility, MLS display, brokerage-name and fair-housing checks |
| Integrations (new) | `integration` | Each connection to an outside system |
| Firm configuration (new) | `firm_template` | Starting set-ups by firm type, shared by every firm. Set-up copies one onto the firm, and the firm profile itself stays on `firm`. |
| Marketing spend (new) | `lead_source_spend` | What each firm spent on each lead source each month, entered by the firm. Cost per lead is shown only where it exists. |

### Statuses and values that exist

A screen can show any of these, and nothing outside them without the "needs new data" label.

| Thing | Values |
|---|---|
| Firm mode | replay, shadow (the silent week), live, paused, closed. The date of the last change is stored. |
| Firm hours | Office hours: weekly opening times in the firm's time zone, Monday to Friday 9 to 6 unless changed. Texting window: 8 am to 8 pm in the recipient's local time; a firm may narrow it, never widen it. |
| Firm profile | Areas served, services, routing and tone of voice, kept on the firm. Each firm starts from one shared template (`firm_template`): sells only; sells and rents; sells, rents and manages. |
| Door | Kind: email, web form, text, chat, phone (for the voice add-on). Mode: live, shadow, off. |
| Daily door test | pending, pass, fail, with a reason on failure. Times stored: sent, arrived, replied. |
| Connection (`integration`) | Kind: `property_management`, `mls`, `mailbox`, `sms` (texting), `voice`, `calendar` |
| Conversation | open, waiting for review, handed off, closed |
| Message | Inbound: received. Outbound: draft, pending review, sent, not sent, discarded. |
| Message author | the customer, the AI, a named person, the system |
| Source of a stated fact | a fact-sheet entry, or a listing field with its value |
| Queue item | Kind: FYI, question, review. Status: open, resolved, cancelled. Answers: a review takes approve (1), edit (2) or take over (3); a question takes an answer, typed or spoken; an FYI takes dismiss. Given through: a reply code, the web app, a voice note. |
| Tour | booked, completed, cancelled, no-show. Booked by the AI or by a person. |
| Hand-off | offered, accepted, declined, expired. Times stored: offered, expires, accepted. |
| Fact wording | draft, approved, retired. Language: English or Spanish. Applies to: the firm, one listing, one building. |
| Lead source | Set on each inquiry when it arrives, and on each deal: lower case, digits and underscores, such as `zillow`, `google_ads` or `yard_sign`. Spend entries use the same names. |
| Contact time zone | Taken from the address or the phone's area code. When it is unknown, the firm's time zone is used for the texting window. |
| Consent | active or revoked, for each of email, text, chat and phone, with how and when it was given or revoked |
| Contact role | buyer, seller, renter, owner, tenant. One person can hold several. |
| Person–property role (`person_property_role`) | `owner`, `tenant`, `landlord`, `seller`, `buyer_interest` (wants to buy), `renter_interest` (wants to rent). One person can hold several roles, on several properties. |
| Property | A real-world home or unit, linked to its listing and its building when known |
| Deal | Kind: `sale`, `lease`, `management`. Each deal has a stage, a contact, a property and an agent. |
| Task | A to-do for someone at the firm |
| Drip | A `sequence` of steps (`sequence_step`) by email or text. An `enrollment` puts one person on it. |
| Custom field | Each firm defines its own fields. Values are kept with the contact or the property. |
| Staff role | owner, agent, reviewer, admin. Each person has languages, weekly tour hours, and a choice of alerts by email or by text. |
| Listing | The firm's own or another broker's. Fields: address, unit, city, price or rent, status, property type, beds, baths, living area, pets allowed, association fee, date available, public remarks, listing agent and office, and a link to its public page when the firm's website has one. |
| Website check (`site_check`) | Kind: `uptime`, `speed`, `security`, `backup` |
| Compliance check (`compliance_check`) | Kind: `accessibility`, `idx_display` (the MLS's display rules), `brokerage_name` (the brokerage's name beside every point of contact and in ads), `fair_housing` (a review of AI replies and listing text) |
| Local search | Area pages (`seo_page`), the Google Business Profile (`gbp_profile`) and its posts (`gbp_post`), and ranking snapshots (`ranking_snapshot`) |
| Replay run | running, done, failed. Covers 30 to 92 days of past inquiries. |
| Replay item | When it arrived, the channel, the listing, who asked (the name only), an excerpt, when the firm replied or that it never did, the reply we would have sent, and how many seconds that took. |
| Guarantee day | inquiries received, inquiries answered within the promise, the share met, and whether a credit applies |
| Report | morning brief, weekly scorecard (the weekly letter), seller log, owner note, monthly report (`monthly_report`) |

### Which data each screen reads

| Screen | Reads from |
|---|---|
| 2. Replay report | `replay_run`, `replay_item`, `firm`, `heartbeat_check` |
| 3. The queue | `review_item`, `conversation`, `message`, `message_source`, `voice_note`, `property` |
| 4. Conversation and receipt | `conversation`, `message`, `message_source`, `consent`, `handoff`, `tour`, `event`, `listing`, `contact`, `property` |
| 5. Morning brief, weekly letter and monthly report | `event`, `guarantee_day`, `report`, `tour`, `handoff`, `heartbeat_check`, `task`, `deal`, `consent`, `site_check`, `compliance_check`, `seo_page`, `gbp_post`, `ranking_snapshot`, `lead_source_spend` |
| 6. Customer chat | `conversation`, `message`, `tour`, `consent`, `firm`, `integration`, and the public view of `listing` |
| 7. Fact sheet | `fact`, `fact_version`, `voice_note`, `building` |
| 8. Set-up and health | `firm`, `firm_template`, `app_user`, `channel`, `heartbeat_check`, `integration`, `mls_source`, `custom_field`, `lead_source_spend` |
| 9. Person and property record | `contact`, `consent`, `property`, `person_property_role`, `deal`, `task`, `enrollment`, `conversation`, `tour`, `handoff`, `listing`, `building`, `custom_field` |
| 10. Pipeline and follow-ups | `deal`, `task`, `sequence`, `sequence_step`, `enrollment`, `contact`, `property`, `app_user`, `consent` |
| 11. Website and SEO health | `site`, `site_check`, `compliance_check`, `gbp_profile`, `gbp_post`, `seo_page`, `ranking_snapshot` |

Screen 1, the landing page, reads no product data.

### Rules the database enforces by itself

- One firm can never read or write another firm's rows.
- The ledger cannot be edited or deleted.
- The first AI message in a conversation must say it is an AI.
- A message can only cite an approved fact.
- A silent-week message can never be marked as sent.
- The AI reads listings only through a view that contains no private fields.
- The same incoming message cannot be stored twice.
- Each fact has at most one approved wording per language.
- Each kind of queue item accepts only its own answers, and an answer to a question must carry the typed text or a voice note.
- Deleting a firm's listing feed removes its listings in one statement.
- A firm's texting window can't start before 8 a.m. or end after 8 p.m. One function, `is_in_text_window`, says whether a moment is inside it, read in the recipient's local time (the contact's time zone, or the firm's when the contact's is unknown).
- Every firm can read the shared starting templates (`firm_template`), and no firm can change them.
- Website-check and compliance-check results can be added but never edited or deleted, like the ledger.
- Spend entries and inquiry sources follow one spelling rule, so cost per lead always matches the right inquiries.

### Still open

- Speed at real data volumes has not been tested, and the schema has not yet run on a server database.
- Removing one person's data needs a redaction procedure, because the ledger cannot be edited.
- Removing dropped listings within 12 hours (BeachesMLS rule 20.2.5, the 12-hour refresh) needs a scheduled job.
- The guarantee is modelled as a daily percentage target with a flat credit. The real commercial terms are not confirmed.
- How the chat records that a person saw the recording notice (for example as `chat` consent with the notice version) is not modelled yet, and it waits for the attorney's wording.
- The list of private listing fields must be extended for each new MLS.
- Whether Florida's 8-to-8 limit covers texts must be confirmed by a lawyer; the product applies it to texts regardless. How the guarantee treats a text that waited for the window is not decided.
- The database says whether a moment is inside the texting window (`is_in_text_window`), but it doesn't block a send by itself. Every path that sends a text, including the review queue, must call it. This must be built and tested before texting goes live.
- Office hours are one set per firm, not per door or per agent.

## 8. Commercial terms

This section is context. No screen shows a real price: screens use `[PILOT PRICE]` and `[PRICE]`.

**Decided by the founder on 14 Nov.**
- A 90-day paid pilot, then month to month.
- Flat pricing per firm, or per agent seat, or per door.
- Never per lead, per tour, per lease, per closing, or as a share of commission. Florida licensing law makes that risky: paying an unlicensed vendor for bringing in business can cost the broker its license, and procuring buyers, sellers or tenants for pay without a license is a felony (Fla. Stat. 475.01, 475.25(1)(h), 475.42). A flat fee does not settle the law by itself, though. 475.01(1)(a) covers any compensation, and 475.25(1)(h) also covers paying an unlicensed person for broker services. So both rules turn on one question: are the AI's tasks broker work? The strongest position, per the 14 Nov legal brief, combines three things: the AI does only unlicensed-assistant tasks; the broker's control is real and written down; and the fee has nothing to do with outcomes. A formal ruling from the Florida Real Estate Commission (a declaratory statement, due within 90 days of a petition) is an option to discuss with the attorney. Per-lead or success pricing would need a licensed affiliate brokerage.
- A third-party tool is resold only when a client asks for something we won't build, with a one-time set-up fee.

**Recommended by the research, for the founder to confirm.**
- The pilot at $500–$750 a month, with no set-up fee.
- Then about $995 a month, month to month, flat per firm, with unlimited logins and add-ons extra.
- The tiers in the earlier growth plan: Growth at $1,495 is in line with the market. Care at $249 sits above generic website care plans ($75–$200 a month), so it must be justified by what it adds (the MLS display and brokerage-name checks, uptime watching, the monthly letter) or priced lower. Scale at $3,495 is high for firms this size today. The voice add-on fits better at $299–$449 than at $599.

**The first client.** Anthony & Anthony Real Estate Group (A&A), a South Florida brokerage, is the first client, as a paying client from the start. Its agent count, managed doors and monthly inquiry volume are not known yet. They will set its final price.

**Recommended by the 14 Nov legal brief, for the attorney to confirm.**
- The contract describes the fee as payment for technology and services. It lists the plainly non-brokerage services (website care, SEO, the CRM, reporting, the property-management connection), so the rest of the contract still stands if any one function is ever held to need a license.
- Any guarantee credit is tied only to software measures such as response time and uptime, never to leads, tours, leases or closings.
- Federal law (RESPA) also bans referral fees on home purchases between settlement-service providers, and a broker is one. A flat fee for services actually performed keeps this risk low, and rentals aren't covered.

**Still open.** The guarantee's terms (see "Still open" in section 7). Whether to ask the Florida Real Estate Commission for a declaratory statement.

## 9. Deeper reference

Everything below is background. Nothing in it overrides this document.

| What | Where in the repository |
|---|---|
| System design: five documents and their diagrams | `docs/system-design/` |
| The schema, sample data, the 171 checks and their results | `docs/database/` |

The five design documents are: high-level design, low-level design (UML class and state diagrams; UML is a standard way to draw software), sequence diagrams for the main flows, entity-relationship diagrams, and engineering principles (SOLID, five rules for clean object-oriented code, and the rest). Their diagrams are written in Mermaid, which describes a diagram as text. GitHub draws them when a file is opened.

## 10. Repository

- Repository: https://github.com/HackHeroic/ai-front-desk, with a `frontend` folder (Next.js), a `backend` folder (NestJS) and a `docs` folder.
- The working name `ai-front-desk` dates from before the 14 Nov scope. The repository is renamed once the product name is chosen.
- Hosting plan: the backend on AWS EC2 (Amazon's rented servers) in Docker (which packages the app so it runs the same anywhere), with a managed PostgreSQL database.
- The application code is not written yet. The two folders hold starter projects.
