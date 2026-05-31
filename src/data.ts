// Static content for the Cloud Native Platform showcase.
// No secrets, tokens, or real .env values are present here by design.

export const LINKS = {
  frontend: "https://cnp.mindsept.fr",
  api: "https://cnp-api.mindsept.fr/api/v1",
  docs: "https://cnp-api.mindsept.fr/docs",
  youtube: "https://youtu.be/oktI_UPA9Bk",
  youtubeEmbed: "https://www.youtube.com/embed/oktI_UPA9Bk",
  youtubeThumb: "https://i.ytimg.com/vi/oktI_UPA9Bk/maxresdefault.jpg",
  youtubeThumbFallback: "https://i.ytimg.com/vi/oktI_UPA9Bk/hqdefault.jpg",
};

export const NAV = [
  { id: "overview", label: "Overview" },
  { id: "flow", label: "Flow" },
  { id: "architecture", label: "Architecture" },
  { id: "cicd", label: "CI/CD" },
  { id: "security", label: "Security" },
  { id: "roadmap", label: "Roadmap" },
  { id: "demo", label: "Demo" },
];

// ── Section 1: hero pipeline strip ──────────────────────────────
export const PIPELINE = [
  { key: "repo", label: "GitHub repo", kind: "external" },
  { key: "analysis", label: "Stack analysis", kind: "platform" },
  { key: "ci", label: "CI Pull Request", kind: "approval" },
  { key: "ghcr", label: "GHCR image", kind: "external" },
  { key: "cd", label: "CD Pull Request", kind: "approval" },
  { key: "aks", label: "AKS deploy", kind: "external" },
  { key: "url", label: "Public URL", kind: "validated" },
] as const;

// ── Section 2: MVP outcome checklist ────────────────────────────
export const OUTCOMES: { code: string; label: string }[] = [
  { code: "github.app.connect", label: "GitHub App connection" },
  { code: "repo.import", label: "Repository import" },
  { code: "stack.analyze", label: "Deterministic stack analysis" },
  { code: "ci.pull_request", label: "CI Pull Request generation" },
  { code: "ghcr.image.push", label: "GHCR image push" },
  { code: "cd.pull_request", label: "CD Pull Request generation" },
  { code: "aks.deploy", label: "Azure AKS deployment" },
  { code: "lb.url.refresh", label: "LoadBalancer URL refresh" },
];

// ── Section 3: product flow ─────────────────────────────────────
export type FlowKind = "platform" | "external" | "approval" | "validated";
export const PRODUCT_FLOW: { label: string; kind: FlowKind; note?: string }[] = [
  { label: "Developer logs in", kind: "platform" },
  { label: "Creates project", kind: "platform" },
  { label: "Connects GitHub App", kind: "external" },
  { label: "Imports repository", kind: "external" },
  { label: "Runs stack analysis", kind: "platform" },
  { label: "Reviews detected stack & env vars", kind: "platform" },
  { label: "Generates CI preview", kind: "platform" },
  { label: "Approves CI", kind: "approval", note: "human gate" },
  { label: "Opens CI Pull Request", kind: "external" },
  { label: "Actions runs tests & Docker build", kind: "external" },
  { label: "Image pushed to GHCR", kind: "external" },
  { label: "Generates CD preview", kind: "platform" },
  { label: "Approves CD", kind: "approval", note: "human gate" },
  { label: "Opens CD Pull Request", kind: "external" },
  { label: "Actions deploys to AKS", kind: "external" },
  { label: "CNP refreshes deployment status", kind: "platform" },
  { label: "Developer opens public URL", kind: "validated" },
];

// ── Section 5: CI generation — stack → template map ─────────────
export const STACK_TEMPLATES: { stack: string; template: string }[] = [
  { stack: "Python / FastAPI", template: "python_fastapi.yml.j2" },
  { stack: "Node.js", template: "node.yml.j2" },
  { stack: "Java Maven", template: "java_maven.yml.j2" },
  { stack: "Go", template: "go.yml.j2" },
  { stack: "Dockerfile only", template: "generic_docker.yml.j2" },
];

export const CI_POINTS = [
  "Supported stacks: Python/FastAPI, Node.js, Java Maven, Go, generic Docker.",
  "A Dockerfile is the baseline requirement for the V1 flow.",
  "Tests are detected and included in the workflow when present.",
  "Existing CI workflows are detected to avoid clobbering them.",
  "`.env.example` is analyzed to detect required runtime variables.",
  "CI can push images to GHCR when registry push is enabled.",
  "Images are tagged with the commit SHA for reproducible CD.",
];

// ── Section 7: generated CD files, shown as a GitHub-style repo tree ──
const CD_COMMIT = "chore(cnp): add generated CD workflow";
const CD_AGE = "19 hours ago";
export const CD_REPO: {
  folder: string;
  files: { name: string; msg: string; age: string }[];
}[] = [
  {
    folder: ".github/workflows",
    files: [{ name: "cd.yml", msg: CD_COMMIT, age: CD_AGE }],
  },
  {
    folder: "k8s",
    files: [
      { name: "namespace.yaml", msg: CD_COMMIT, age: CD_AGE },
      { name: "secret.yaml", msg: CD_COMMIT, age: CD_AGE },
      { name: "deployment.yaml", msg: CD_COMMIT, age: CD_AGE },
      { name: "service.yaml", msg: CD_COMMIT, age: CD_AGE },
    ],
  },
];

export const CD_FILES: { path: string; role: string }[] = [
  { path: ".github/workflows/cd.yml", role: "Login to Azure, pull AKS creds, apply manifests, roll out, print endpoint." },
  { path: "k8s/namespace.yaml", role: "Creates / configures the target namespace." },
  { path: "k8s/secret.yaml", role: "Documents the runtime secret object shape." },
  { path: "k8s/deployment.yaml", role: "App deployment: image tag, replicas, port, env refs, pull secret." },
  { path: "k8s/service.yaml", role: "Exposes the app via a Kubernetes LoadBalancer for the demo." },
];

// ── Section 8: security control matrix ──────────────────────────
export const SECURITY: { title: string; detail: string }[] = [
  { title: "JWT auth", detail: "Access / refresh token pair for every authenticated session." },
  { title: "Email allowlist", detail: "Production sign-in restricted to an explicit allowlist." },
  { title: "Platform admin", detail: "Dedicated admin account owns global infrastructure settings." },
  { title: "Installation tokens", detail: "GitHub App installation tokens replace permanent user PATs." },
  { title: "Webhook verification", detail: "Inbound GitHub webhooks are signature-verified (HMAC)." },
  { title: "Encrypted secrets", detail: "Secrets are Fernet-encrypted at rest; values never leave the DB." },
  { title: "Audit logs", detail: "Critical actions are recorded for traceability." },
  { title: "Approval gates", detail: "Generated CI/CD requires human approval before any PR." },
  { title: "No direct main commits", detail: "Changes land through Pull Requests, never pushed to main by default." },
];

// ── Section 9: roadmap iterations ───────────────────────────────
export const ITERATIONS: { tag: string; title: string; body: string; done: boolean }[] = [
  { tag: "01", title: "Foundation", body: "FastAPI backend, PostgreSQL, auth, projects, members, Docker Compose, OpenAPI.", done: true },
  { tag: "02", title: "GitHub App Integration", body: "Install flow, repository listing, repository import, installation token usage, webhooks.", done: true },
  { tag: "03", title: "Stack Analysis & CI", body: "Deterministic stack detection, tests & Dockerfile detection, CI template rendering, AI explanation/adaptation, PR creation.", done: true },
  { tag: "04", title: "Secrets & Registry", body: ".env.example detection, project secret mapping, GitHub Actions secret sync, shared GHCR registry token.", done: true },
  { tag: "05", title: "AKS Demo CD", body: "Global Cloud Nodes, Azure credentials, Kubernetes manifest generation, generated CD workflow, AKS deployment.", done: true },
  { tag: "06", title: "Deployment Status", body: "AKS service refresh, public LoadBalancer URL storage, project-level deployment overview.", done: true },
];

export const PROVIDERS: {
  name: string; target: string; logo: string; status: "validated" | "planned"; note: string;
}[] = [
  { name: "Microsoft Azure", target: "AKS", logo: "/azure.png", status: "validated", note: "Validated CD target" },
  { name: "Amazon Web Services", target: "EKS", logo: "/aws.png", status: "planned", note: "Planned provider" },
  { name: "Google Cloud", target: "GKE", logo: "/gcp.png", status: "planned", note: "Planned provider" },
];

export const FUTURE = [
  "AWS EKS and GCP GKE providers",
  "Ingress and DNS automation",
  "ArgoCD integration",
  "Cloud provisioning integrations",
  "Deployment history and rollback",
  "Observability and cost views",
];

// ── Section 10: technical stack ─────────────────────────────────
export const TECH_STACK: { group: string; items: string[] }[] = [
  { group: "Backend", items: ["Python 3.12", "FastAPI", "Pydantic v2", "SQLAlchemy async", "Alembic"] },
  { group: "Database", items: ["PostgreSQL"] },
  { group: "Security", items: ["JWT", "bcrypt", "Fernet encryption", "Webhook HMAC verification"] },
  { group: "Integrations", items: ["GitHub App", "GitHub Actions", "GHCR", "Azure AKS", "OpenAI (optional)"] },
  { group: "Infrastructure", items: ["Docker Compose", "OVH VPS", "Host Nginx", "Certbot", "Vercel frontend"] },
  { group: "Testing / quality", items: ["pytest", "ruff"] },
];

// ── Section 11: demo proof receipt ──────────────────────────────
export const DEMO_RECEIPT: { step: string; status: string }[] = [
  { step: "GitHub authentication completed", status: "ok" },
  { step: "Repository imported", status: "ok" },
  { step: "CI Pull Request merged", status: "ok" },
  { step: "GitHub Actions CI succeeded", status: "ok" },
  { step: "Docker image pushed to GHCR", status: "ok" },
  { step: "CD Pull Request merged", status: "ok" },
  { step: "GitHub Actions CD succeeded", status: "ok" },
  { step: "AKS service exposed a public URL", status: "ok" },
  { step: "CNP displayed deployment status & public URL", status: "ok" },
];

// ── Code preview tabs ───────────────────────────────────────────
export const CODE_SAMPLES: { id: string; label: string; lang: string; code: string }[] = [
  {
    id: "ci",
    label: "ci.yml",
    lang: "yaml",
    code: `name: CI

on:
  push:
    branches: [ main ]
  pull_request:

permissions:
  contents: read
  packages: write

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
      - run: pip install -r requirements.txt
      - run: pytest -q          # included only when tests are detected

  build-and-push:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Log in to GHCR
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: \${{ github.actor }}
          password: \${{ secrets.GHCR_TOKEN }}
      - name: Build and push
        uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          tags: ghcr.io/\${{ github.repository }}:\${{ github.sha }}`,
  },
  {
    id: "cd",
    label: "cd.yml",
    lang: "yaml",
    code: `name: CD

on:
  push:
    branches: [ main ]
    paths:
      - "k8s/**"
      - ".github/workflows/cd.yml"

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Azure login
        uses: azure/login@v2
        with:
          creds: \${{ secrets.AZURE_CREDENTIALS }}
      - name: Get AKS credentials
        run: az aks get-credentials -g \${{ secrets.AKS_RG }} -n \${{ secrets.AKS_NAME }}
      - name: Apply manifests
        run: kubectl apply -f k8s/
      - name: Sync runtime secret
        run: kubectl -n demo create secret generic demo-app-env --from-env-file=.runtime.env --dry-run=client -o yaml | kubectl apply -f -
      - name: Update image
        run: kubectl -n demo set image deploy/demo-app demo-app=ghcr.io/\${{ github.repository }}:\${{ github.sha }}
      - name: Wait for rollout
        run: kubectl -n demo rollout status deploy/demo-app
      - name: Print service endpoint
        run: kubectl -n demo get svc demo-app -o wide`,
  },
  {
    id: "deployment",
    label: "deployment.yaml",
    lang: "yaml",
    code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo-app
  namespace: demo
spec:
  replicas: 2
  selector:
    matchLabels:
      app: demo-app
  template:
    metadata:
      labels:
        app: demo-app
    spec:
      imagePullSecrets:        # added only for a private GHCR image
        - name: ghcr-pull
      containers:
        - name: demo-app
          image: ghcr.io/org/demo-app:<commit-sha>
          ports:
            - containerPort: 8000
          envFrom:
            - secretRef:
                name: demo-app-env`,
  },
];
