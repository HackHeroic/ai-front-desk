# Docs

The design documents the code follows. They were written before the name was picked: wherever they say [NAME], read Wynsley.

| Document | What it covers |
|---|---|
| [System design](system-design.pdf) | How the system is built, in five parts with 74 diagrams: high-level design, low-level design (UML class diagrams), sequence diagrams for each main flow, the ER diagram of the tested database schema, and the engineering principles the code follows. Includes the 23 Nov update for rentals, payments, sign-in and the two apps. |
| [Product spec](product-spec.pdf) | The V1 spec: the six modules and the screens in detail (landing, replay report, queue, conversation and receipt, morning brief and monthly letter, customer chat, fact sheet, setup and health, person and property record, pipeline, website and SEO health), plus the 23 Nov additions (sign-in and invites, rentals, rent and payments). |
| [Design notes](design-notes.pdf) | Design notes for the screens added on 23 Nov: sign-in and invites, rentals, rent and payments, and the tenant's pay page. |

The landing page and the clickable product prototype in `frontend/` are built from the Claude Design project made from these documents.
