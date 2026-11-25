# Design notes (23 Nov 2026)

These notes are for the three screens added on 23 Nov (sign-in and invites, rentals, rent and payments) and for what changes on the screens around them. They come from research into how rent apps and property-management software handle payments. The spec, with its 23 Nov pages, stays the brief; these notes sharpen it. Anything here can be beaten. If you find a better way, label it "Upgrade".

## Sign-in and invites (screen 12)
- There is no sign-up page. The owner's first sign-in from an invite is the firm's sign-up, and it flows straight into the "Live in a day" checklist (screen 8).
- An email code or Google comes first; a password is optional.
- An invite says who sent it, for which firm and role, and when it expires.
- Removing someone shows that it took effect at once, everywhere.
- Most agents rarely open the console: alerts with signed links and reply codes (1 Send, 2 Edit, 3 I'll call) do the work.

## Rentals (screen 13)
- One timeline per unit, like the receipt: the lease, payments, repairs and messages, in order.
- Where the data lives is always visible: "from AppFolio, synced 9:40 a.m." or "kept here". Fields owned by the firm's PMS look read-only.
- Repairs route by issue, urgency and time of day, the way AppFolio routes emergencies. The tenant gets a text at each step, and an emergency after hours always reaches a person.
- Lease renewals surface early, as tasks in the queue, not as a report.

## Rent and payments (screen 14a)
- Each payment reads like the receipt's delivery tracker: started, pending, cleared, in the trust account, with Stripe's reference at each step.
- Pending and cleared look different everywhere, including in what the AI says. Every balance says "as of".
- A return or a dispute after the money was paid out becomes an item in the queue that says what happens next; it is never a silent change.
- What rent apps treat as standard:
  - autopay;
  - a partial-payment block for each lease;
  - a lock after a returned payment, so the tenant must pay with certified funds;
  - receipts;
  - what the owner can see;
  - a choice of who pays the fee.
- Automatic late fees stay out of V1.
- The broker signs off each month, which locks it; a later correction goes into the open month.
- Test mode looks unmistakably different from live.

## The tenant's pay page (screen 14b)
- Paying takes under a minute on a phone, with no account.
- Fees show before the tenant commits, cheapest way first. Rent apps charge tenants $0–$2.50 for a bank payment and about 3–3.5% for a card.
- The page says where the money goes: to the brokerage's trust account, through Stripe.
- Before a bank payment, the page says it takes about four business days to clear.
- Failures are in plain words, with the next step: "Your bank returned this payment. Call the office at …".
- Scam guard: the page and every rent text name the brokerage, and never ask for payment by gift card or wire transfer.
- Spanish from day one.

## Customer chat (screen 6)
- "What do I owe?" gets an answer only through a signed link. Otherwise the AI sends the pay link to the phone or email on file.

*The 18 Nov notes follow, unchanged.*

---

# Design notes (18 Nov 2026)

These are the newest ideas for the screens, from research done after the spec was written. The spec stays the brief; these notes sharpen it. Anything here can be beaten. If you find a better way, label it "Upgrade".

## Receipt (screen 4)
- It should read like a delivery tracker: a timeline of every step, from "inquiry arrived" to "agent took over".
- It has two clocks: time to the first useful reply, and time to the first licensed person.
- Each step shows who stamped it: our system, Google (email) or Twilio (texts and calls).
- Each fact the AI stated shows its source: a fact-sheet entry or a listing field.
- A small "sealed" mark shows the log was locked that hour and can't be changed.

## Monthly letter (screen 5)
- One page, built around three numbers. Each number sits beside last month and beside "before us", the baseline from the firm's Replay.
- The guarantee appears as a calendar strip, one square per day, met or missed.
- It ends with three suggested actions.
- Every number can be tapped to open the receipts behind it.
- No chart dashboards, leaderboards or streaks.

## Replay (screen 2)
- It splits "what really happened" (measured from the firm's own data) from "what we would have sent" (clearly labelled as a simulation).
- In the sales meeting, the broker grades 10 of our drafts, and those grades become the bar for going live.

## Set-up and health (screen 8)
- **"Live in a day" checklist for the one-hour kickoff:**
  1. Approve the profile the AI drafted.
  2. Turn on email forwarding.
  3. Turn on call forwarding.
  4. Switch the chat on.
  5. File the texting registration.
  6. Run the exports.
- **Import receipt:** "1,289 rows: 1,240 ready, 37 need a look (about 6 minutes), 12 can't import", each with its reason.
  - People review only the doubtful rows.
  - Every batch can be undone for 30 days.
  - An "Export everything" button is there from day one.

## Holds and step-ups (new, next to the queue)
- **Which inquiries appear:** the ones the risk score flagged, each with a "Why" card that gives its reason codes.
- **One proof rule per sensitive action, the same for everyone:** texting, booking, self-tour access, owner or seller claims. A higher-risk tier only adds a person's approval.
- **The excluded list:** every excluded item shows its evidence, and the firm can restore it with one tap.

## Customer chat (screen 6)
- It lives on each firm's own website, so it takes the firm's brand, not ours.
- **Texting:** a "Tap to text us" link opens the person's own messaging app. A separate texting tick-box is the fallback.
- **Reaching a person:** "Reply AGENT" always reaches a person.
- **Same for everyone:** everyone gets the same first reply, and seeing a home never requires an ID scan; an agent-led showing is always offered.
- **Scams:** rental replies carry a short payment warning. A possible scam victim gets a safety reply, and a person is alerted.

## Support
- The firm gets one named contact and a shared message thread.
- The monthly letter shows our own reply times as "support receipts".

## Mood and motion
- **Palette mood:** take it from the GTA VI world: Vice City sunsets, neon over the ocean, Florida heat. Bold on the landing page and the big moments, calm on the daily screens.
- **Motion:**
  - direct manipulation takes 80–120 ms;
  - section changes and reveals take 700–900 ms;
  - one easing curve: cubic-bezier(0.22, 1, 0.36, 1).
