# Cloud Native Platform — Showcase Site

Showcase site for the **MVP** of Cloud Native Platform (CNP), a repository-first
internal developer platform. The single-page site presents what the MVP does, how
it works, and what was validated end to end.

🔗 Demo: [cnp.mindsept.fr](https://cnp.mindsept.fr) · Video: [youtu.be/oktI_UPA9Bk](https://youtu.be/oktI_UPA9Bk)

## What the site shows

- **Hero** — product pitch, MVP badge, and a video preview (thumbnail) that opens
  the full demo in a modal.
- **MVP outcome** — the 8 steps validated end to end, shown as a validation ledger.
- **Product flow** — the full journey: login → analysis → CI → GHCR image → CD →
  AKS deployment → public URL, with every change going through a Pull Request.
- **Architecture** — the production architecture (Vercel frontend, OVH Nginx,
  FastAPI, PostgreSQL, worker, GitHub / Azure integrations).
- **CI / CD** — deterministic CI generation (stack detection → template), a preview
  of the generated files (`ci.yml`, `cd.yml`, `deployment.yaml`), and the generated
  `k8s/` folder shown as a GitHub-style file tree.
- **Secrets & registry** — how secrets are encrypted and synced without ever being
  exposed.
- **Security** — the control model (JWT auth, GitHub installation tokens, human
  approvals, audit logs, etc.).
- **MCP documentation server** — an MCP server that lets an AI agent
  (e.g. Codex / Claude Code) explain and use CNP from its own docs — API, frontend,
  CI/CD, secrets, Kubernetes and troubleshooting.
- **Roadmap** — the 6 MVP iterations and what comes next (multi-cloud Azure / AWS /
  GCP), clearly separating what is validated from what is planned.
- **Stack & demo** — the product's technical stack and a recap of the validated
  deployment.

## Run the site

```bash
npm install
npm run dev      # development
npm run build    # production build → dist/
```
