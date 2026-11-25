# System design

How Wynsley is built. Five short documents and 74 diagrams describe the whole system, from the first offer's big picture down to single classes. The AI desk is one of its six modules. They are the plan the code will follow.

The diagrams are written in [Mermaid](https://mermaid.js.org/), which describes a diagram as text; GitHub draws them when a file is opened. The same documents, typeset with every diagram, are in [`../system-design.pdf`](../system-design.pdf).

| # | Document | What it covers |
|---|---|---|
| 1 | [High-level design](01-high-level-design.md) | The big picture: who talks to what, where it runs, and why each choice was made. |
| 2 | [Low-level design](02-low-level-design.md) | The classes inside the backend as UML class diagrams, with their patterns and states. |
| 3 | [Sequence diagrams](03-sequence-diagrams.md) | Step-by-step drawings of who calls whom in each main flow. |
| 4 | [ER diagrams](04-er-diagrams.md) | The database tables and how they link, drawn from the tested schema. |
| 5 | [Engineering principles](05-engineering-principles.md) | SOLID and the other rules the code follows, each with a real example. |
| 6 | [23 Nov update](06-update-23-nov.md) | Rentals, payments, sign-in and two apps: what changed, the new modules, three new diagrams and the planned tables. |

## Updated 23 Nov 2026

- CRM and PMS become one product, built in stages. Online rent runs through Stripe, charged on each broker's own account and paid into its trust account; Wynsley never holds it.
- A web app and a phone app on one API. Staff sign in by invitation through a managed provider; customers never sign in.
- Where the five documents differ, [the 23 Nov update](06-update-23-nov.md) wins.

## Where it stood on 14 Nov 2026

- Database: built and tested. 42 tables, and all 171 checks pass.
- Application code: not written yet. The repository held only the two starter projects.
