# Arrivia Agent Assist

A conceptual sales demo of a next-generation agent console for [Arrivia](https://www.arrivia.com), built for Cloudstaff. This is **not** a working product. It is a polished interface intended to sell the concept of an "intelligent operating system" for travel contact centres, in line with the public direction set by Arrivia CEO Mike Nelson.

> **Conceptual demo only.** No live integrations, no real PII, no real credentials. Anything that looks dynamic is in-memory mock data.

## What you see

**Screen 1, Agent Console (`/`)**
A full-width agent workspace built around a sample inbound call from a Platinum cruise member named Margaret Chen.

- Member profile, preferences, and trip history on the left.
- Symphony AI talk track on the right, with six contextual prompts a real cruise agent would actually say.
- Three recommended offers ranked against the member's history.
- A strip of live data sources that route to the connector admin.

**Screen 2, Connectors (`/connectors`)**
The admin surface for the agent platform. Shows sixteen pre-seeded connectors across cruise, air, hotel, AI, payments, and telephony, including one in an error state and one disconnected, plus a recommended Arrivia CRM MCP connector that exposes a discoverable tool list for the Symphony AI agent.

- Add connector catalogue modal.
- Config drawer with conditional fields by auth type, including a Discover Tools flow for MCP servers.

## Run locally

```bash
npm install
npm run dev
```

The app boots at [http://localhost:3000](http://localhost:3000).

## Build a static export

```bash
npm run build
```

The static site is emitted to `out/` and is suitable for GitHub Pages, S3, or any static host.

## Live demo

Once GitHub Pages is enabled in repo settings, the live site is at:

**https://leew-cs.github.io/ARRIVIA_AGENT_ASSIST/**

## Deployment

A GitHub Actions workflow at `.github/workflows/deploy.yml` builds and publishes on every push to `main`.

To enable:

1. Repo settings, **Pages**.
2. Source, **GitHub Actions**.
3. Push to `main`, the workflow does the rest.

## Tech stack

- Next.js 14 App Router, TypeScript strict
- Tailwind CSS, with a custom Arrivia palette (`arrivia.blue`, `arrivia.coral`, `arrivia.slate`, `arrivia.cream`)
- shadcn-style component primitives, hand-rolled to keep the project lean
- `lucide-react` icons
- `sonner` for toasts

## Brand

- **arrivia** lowercase wordmark, rendered as text in Inter
- Primary blue, `#0B3D6B` to `#0E4D8A`
- Accent coral, `#F26B3A` to `#FF7A45`
- Warm cream backgrounds, premium whitespace

## Scope

Nothing here calls a backend. Buttons either route, open a drawer, or fire a toast. The Symphony AI brand is fictional for the purposes of the demo and is intended to evoke the agentic platform direction Arrivia leadership have publicly described.
