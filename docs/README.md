# Docs

The design documents the code follows. Each one is here as Markdown, to read on GitHub, and as the original PDF.

| Document | Markdown | PDF | What it covers |
|---|---|---|---|
| System design | [system-design/](system-design/README.md) | [system-design.pdf](system-design.pdf) | How the system is built, in five documents with 74 diagrams: high-level design, low-level design (UML class diagrams), sequence diagrams for each main flow, the ER diagrams of the tested database schema, and the engineering principles the code follows. Plus the 23 Nov update for rentals, payments, sign-in and the two apps, with three more diagrams. |
| Product spec | [product-spec.md](product-spec.md) | [product-spec.pdf](product-spec.pdf) | The V1 spec: the six modules and the screens in detail (landing, Replay report, queue, conversation and receipt, morning brief and monthly letter, customer chat, fact sheet, set-up and health, person and property record, pipeline, website and SEO health). The 23 Nov changes come first: sign-in and invites, rentals, rent and payments. |
| Design notes | [design-notes.md](design-notes.md) | [design-notes.pdf](design-notes.pdf) | Notes that sharpen the screens: the 23 Nov notes for sign-in, rentals, rent and the tenant's pay page, then the 18 Nov notes for the receipt, monthly letter, Replay, set-up, customer chat and more. |

The documents were written before the name was picked. The PDFs say [NAME] where the name goes; the Markdown versions say Wynsley.

The landing page and the clickable product prototype in `frontend/` are built from the Claude Design project made from these documents.
