import { useState } from "react";
import Nav from "./components/Nav";
import Reveal from "./components/Reveal";
import VideoModal from "./components/VideoModal";
import CodePreview from "./components/CodePreview";
import {
  ProductFlowDiagram, ArchitectureDiagram, CIDiagram, CDDiagram, SecretSequenceDiagram, MCPDiagram,
} from "./diagrams";
import {
  LINKS, PIPELINE, OUTCOMES, CI_POINTS, CD_FILES, CD_REPO, SECURITY, MCP_POINTS, ITERATIONS,
  FUTURE, PROVIDERS, TECH_STACK, DEMO_RECEIPT,
} from "./data";
import {
  IconPlay, IconArrow, IconCheck, IconWarn, IconLock, IconBolt,
  IconBox, IconCloud, IconLink, IconGit, IconAnalyze, IconPR, IconActions,
  IconFolder, IconFile, IconBranch,
} from "./components/icons";
import type { ReactNode } from "react";

const pipeIcon: Record<string, ReactNode> = {
  repo: <IconGit />, analysis: <IconAnalyze />, ci: <IconPR />, ghcr: <IconBox />,
  cd: <IconActions />, aks: <IconCloud />, url: <IconLink />,
};

export default function App() {
  const [open, setOpen] = useState(false);
  const watch = () => setOpen(true);

  return (
    <>
      <Nav onWatch={watch} />
      <span id="top" />

      {/* ====================== HERO ====================== */}
      <header className="hero" id="overview">
        <div className="shell hero-grid">
          <div>
            <Reveal>
              <div className="hero-mvp">
                <span className="hero-mvp-badge">MVP</span>
                <span className="hero-mvp-text">
                  Minimum Viable Product — <strong>validated v1</strong>, proven end-to-end
                  <span className="hero-mvp-live"><span className="dot" aria-hidden="true" /> production demo live</span>
                </span>
              </div>
            </Reveal>
            <Reveal delay={60}>
              <h1>
                Cloud Native<br />
                <span className="accent">Platform</span>
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="hero-sub">Repository-first CI/CD onboarding for cloud-native teams.</p>
            </Reveal>
            <Reveal delay={180}>
              <p className="hero-para">
                This validated MVP connects to GitHub through a GitHub App, analyzes application
                repositories, generates CI, publishes Docker images to GHCR, generates Kubernetes CD
                for AKS, and tracks the deployed public URL.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="hero-cta">
                <button className="btn btn-primary" onClick={watch}>
                  <IconPlay style={{ width: 15, height: 15 }} /> Watch the demo
                </button>
                <a className="btn btn-ghost" href="#architecture">
                  Explore the architecture <IconArrow style={{ width: 15, height: 15 }} />
                </a>
              </div>
            </Reveal>
            <Reveal delay={300}>
              <div className="hero-meta">
                <div className="m">
                  <span className="k">Frontend</span>
                  <span className="v"><a href={LINKS.frontend} target="_blank" rel="noreferrer">cnp.mindsept.fr</a></span>
                </div>
                <div className="m">
                  <span className="k">API base</span>
                  <span className="v"><a href={LINKS.api} target="_blank" rel="noreferrer">cnp-api.mindsept.fr/api/v1</a></span>
                </div>
                <div className="m">
                  <span className="k">Swagger</span>
                  <span className="v"><a href={LINKS.docs} target="_blank" rel="noreferrer">/docs</a></span>
                </div>
                <div className="m">
                  <span className="k">CD target</span>
                  <span className="v">Azure AKS · GHCR</span>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={160} className="hero-visual">
            <button className="video-card" onClick={watch} aria-label="Play the demo video">
              <img
                className="vthumb"
                src={LINKS.youtubeThumb}
                alt="Cloud Native Platform demo — video preview"
                loading="lazy"
                onError={(e) => {
                  const t = e.currentTarget;
                  if (!t.dataset.fb) { t.dataset.fb = "1"; t.src = LINKS.youtubeThumbFallback; }
                }}
              />
              <span className="vthumb-shade" aria-hidden="true" />
              <span className="corner tl" aria-hidden="true" /><span className="corner tr" aria-hidden="true" />
              <span className="corner bl" aria-hidden="true" /><span className="corner br" aria-hidden="true" />
              <span className="vlabel"><span className="rec" aria-hidden="true" /> DEMO · END-TO-END WALKTHROUGH</span>
              <span className="play-ring big" aria-hidden="true"><IconPlay /></span>
              <span className="vmeta">youtu.be/oktI_UPA9Bk</span>
            </button>

            <div className="pipeline" aria-label="Delivery pipeline overview">
              <div className="pipeline-title">
                <span className="t">Delivery path</span>
                <span className="live">live</span>
              </div>
              <ol className="pipe-rail">
                {PIPELINE.map((p, i) => (
                  <li className="pipe-step" data-kind={p.kind} key={p.key} style={{ animationDelay: `${i * 70}ms` }}>
                    <span className="pipe-ic" aria-hidden="true">{pipeIcon[p.key]}</span>
                    <span className="pipe-lab">{p.label}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </header>

      {/* ====================== MVP OUTCOME ====================== */}
      <section id="outcome">
        <div className="shell">
          <Reveal className="sect-head">
            <span className="eyebrow"><span className="num">02 /</span> MVP outcome</span>
            <h2 className="sect-title">Eight steps, validated end-to-end</h2>
            <p className="sect-lead">
              A project owner can connect GitHub, import a repository containing a Dockerfile, analyze the
              stack, generate reliable CI, push an image to GHCR, generate Kubernetes CD for a registered AKS
              target, and expose the deployed application URL — all from CNP.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="ledger">
              <div className="ledger-head">
                <span>validation ledger · MVP scope</span>
                <span className="ok-all"><IconCheck style={{ width: 14, height: 14 }} /> 8 / 8 passed</span>
              </div>
              {OUTCOMES.map((o, i) => (
                <div className="ledger-row" key={o.code}>
                  <span className="idx">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="name">{o.label}</span>
                    <span className="code">{o.code}</span>
                  </span>
                  <span className="chk">
                    <span className="box"><svg viewBox="0 0 12 12"><path d="m2 6 3 3 5-6" /></svg></span>
                    validated
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ====================== PRODUCT FLOW ====================== */}
      <section id="flow">
        <div className="shell">
          <Reveal className="sect-head">
            <span className="eyebrow"><span className="num">03 /</span> Product flow</span>
            <h2 className="sect-title">Every change goes through a Pull Request</h2>
            <p className="sect-lead">
              The platform does not silently mutate production. Every generated file is previewed, approved,
              and committed through a Pull Request.
            </p>
          </Reveal>
          <Reveal delay={80}><ProductFlowDiagram /></Reveal>
        </div>
      </section>

      {/* ====================== ARCHITECTURE ====================== */}
      <section id="architecture">
        <div className="shell">
          <Reveal className="sect-head">
            <span className="eyebrow"><span className="num">04 /</span> Architecture</span>
            <h2 className="sect-title">Built as a backend-first platform control plane</h2>
            <p className="sect-lead">
              Vercel serves the React frontend. Host Nginx on OVH terminates HTTPS for
              <code> cnp-api.mindsept.fr</code>. FastAPI runs inside Docker Compose with a worker that
              processes database-backed jobs. GitHub App installation tokens are used instead of permanent
              user PATs.
            </p>
          </Reveal>
          <Reveal delay={80}><ArchitectureDiagram /></Reveal>
          <Reveal delay={120}>
            <div className="split" style={{ marginTop: 28 }}>
              <ul className="points">
                <li><span className="mk">▹</span><span>PostgreSQL stores users, projects, GitHub installations, analyses, pipelines, jobs, audit logs, secrets metadata, and deployment status.</span></li>
                <li><span className="mk">▹</span><span>The worker container processes database-backed jobs asynchronously.</span></li>
              </ul>
              <ul className="points">
                <li><span className="mk">▹</span><span>GitHub App installation tokens are short-lived and scoped — no permanent user PATs are stored.</span></li>
                <li><span className="mk">▹</span><span>Azure AKS is the validated CD target for the MVP demo.</span></li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ====================== CI/CD ====================== */}
      <section id="cicd">
        <div className="shell">
          <Reveal className="sect-head">
            <span className="eyebrow"><span className="num">05 /</span> CI / CD generation</span>
            <h2 className="sect-title">Deterministic generation, human approval, GitHub-native delivery</h2>
            <p className="sect-lead">
              CI is deterministic first. AI is only an assistant for explanation and adaptation — it never
              silently authors what ships. A Dockerfile is the baseline requirement for the V1 flow.
            </p>
          </Reveal>

          <Reveal delay={60}><CIDiagram /></Reveal>

          <Reveal delay={100}>
            <div className="split" style={{ marginTop: 28 }}>
              <ul className="points">
                {CI_POINTS.map((p, i) => (
                  <li key={i}><span className="mk">▹</span><span dangerouslySetInnerHTML={{ __html: inlineCode(p) }} /></li>
                ))}
              </ul>
              <CodePreview />
            </div>
          </Reveal>

          {/* CD + manifests */}
          <Reveal className="sect-head" delay={40} >
            <div style={{ marginTop: 72 }}>
              <span className="eyebrow"><span className="num">05.2 /</span> CD &amp; Kubernetes manifests</span>
              <h2 className="sect-title">Generated CD for a registered AKS target</h2>
            </div>
          </Reveal>
          <Reveal delay={60}>
            <div className="split">
              <CDDiagram />
              <div>
                <div className="ghrepo">
                  <div className="ghrepo-bar">
                    <span className="ghrepo-branch"><IconBranch /> main</span>
                    <span className="ghrepo-meta">opened by the CD Pull Request</span>
                  </div>
                  <div className="ghrepo-head">
                    <span>Name</span>
                    <span>Last commit message</span>
                    <span>Last commit date</span>
                  </div>
                  {CD_REPO.map((dir) => (
                    <div className="ghrepo-group" key={dir.folder}>
                      <div className="ghrepo-folder">
                        <IconFolder /> {dir.folder}/
                      </div>
                      {dir.files.map((f) => (
                        <div className="ghrow" key={f.name}>
                          <span className="ghname"><IconFile /> {f.name}</span>
                          <span className="ghmsg">{f.msg}</span>
                          <span className="ghage">{f.age}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                <ul className="points" style={{ marginTop: 20 }}>
                  {CD_FILES.map((f) => (
                    <li key={f.path}>
                      <span className="mk">▹</span>
                      <span><code>{f.path.split("/").pop()}</code> — {f.role}</span>
                    </li>
                  ))}
                </ul>

                <p className="sect-lead" style={{ marginTop: 20, fontSize: 14 }}>
                  The generated CD workflow runs <code>azure/login</code>, <code>az aks get-credentials</code>,
                  applies manifests, creates Kubernetes secrets, updates the deployment image, waits for
                  rollout, and prints the service endpoint.
                </p>
                <div className="callout" style={{ marginTop: 18 }}>
                  <IconWarn />
                  <span>
                    The LoadBalancer IP is not guaranteed to stay stable after infrastructure recreation.
                    CNP refreshes and stores the current public URL from Kubernetes after deployment.
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ====================== SECRET MODEL ====================== */}
      <section id="secrets">
        <div className="shell">
          <Reveal className="sect-head">
            <span className="eyebrow"><span className="num">06 /</span> Secret &amp; registry model</span>
            <h2 className="sect-title">Secrets stay encrypted, values never returned</h2>
            <p className="sect-lead">
              Project secrets are encrypted with Fernet and are never returned by the API. The GHCR token can be
              configured once globally by an admin and synced into GitHub Actions only when a PR is opened.
            </p>
          </Reveal>
          <Reveal delay={60}><SecretSequenceDiagram /></Reveal>
          <Reveal delay={100}>
            <div className="split" style={{ marginTop: 28 }}>
              <ul className="points">
                <li><span className="mk">▹</span><span>Project secrets are encrypted with Fernet at rest.</span></li>
                <li><span className="mk">▹</span><span>Secret values are never returned by the API — only metadata is exposed.</span></li>
                <li><span className="mk">▹</span><span>The GHCR token can be configured once globally by a platform admin.</span></li>
              </ul>
              <ul className="points">
                <li><span className="mk">▹</span><span>Runtime app variables from <code>.env.example</code> are mapped per project.</span></li>
                <li><span className="mk">▹</span><span>Azure Cloud Node secrets are stored as encrypted platform secrets.</span></li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ====================== SECURITY ====================== */}
      <section id="security">
        <div className="shell">
          <Reveal className="sect-head">
            <span className="eyebrow"><span className="num">07 /</span> Security &amp; control plane</span>
            <h2 className="sect-title">Secrets stay encrypted, changes go through Pull Requests</h2>
            <p className="sect-lead">
              The control and safety model keeps humans in the loop and credentials out of reach. No direct
              commit to <code>main</code> by default.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="matrix">
              {SECURITY.map((s) => (
                <div className="cell" key={s.title}>
                  <span className="ct"><IconLock /> {s.title}</span>
                  <span className="cd">{s.detail}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ====================== MCP DOC SERVER ====================== */}
      <section id="mcp">
        <div className="shell">
          <Reveal className="sect-head">
            <span className="eyebrow"><span className="num">08 /</span> MCP documentation server</span>
            <h2 className="sect-title">An MCP server to explain and use CNP from its own docs</h2>
            <p className="sect-lead">
              Beyond the web app and the backend API, CNP ships a dedicated MCP server that exposes its local
              documentation, the OpenAPI spec, and the frontend routes to MCP-compatible AI agents. An assistant
              can explain how CNP works — architecture, API endpoints, UI journeys, CI/CD generation, secrets,
              Kubernetes deployments, troubleshooting — and use those same sources to work with the platform,
              straight from the project's own documentation.
            </p>
          </Reveal>
          <Reveal delay={60}><MCPDiagram /></Reveal>
          <Reveal delay={100}>
            <div className="split" style={{ marginTop: 28 }}>
              <ul className="points">
                {MCP_POINTS.slice(0, 4).map((p, i) => (
                  <li key={i}><span className="mk">▹</span><span>{p}</span></li>
                ))}
              </ul>
              <ul className="points">
                {MCP_POINTS.slice(4).map((p, i) => (
                  <li key={i}><span className="mk">▹</span><span>{p}</span></li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ====================== ROADMAP ====================== */}
      <section id="roadmap">
        <div className="shell">
          <Reveal className="sect-head">
            <span className="eyebrow"><span className="num">09 /</span> MVP iterations</span>
            <h2 className="sect-title">Validated MVP, clear path to multi-cloud</h2>
            <p className="sect-lead">
              Six iterations took CNP from an empty backend to a deployed application URL. Cloud provisioning
              and ArgoCD are <strong>not</strong> part of the current MVP — they are explicit future direction.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="timeline">
              <div className="track">
                {ITERATIONS.map((it) => (
                  <div className="iter" key={it.tag}>
                    <span className="i-tag">
                      ITERATION {it.tag}
                      <span className="status">· {it.done ? "shipped" : "planned"}</span>
                    </span>
                    <h4>{it.title}</h4>
                    <p>{it.body}</p>
                  </div>
                ))}
              </div>
              <div className="future-panel">
                <h4>Future direction</h4>
                <p className="note">Not in the current MVP.</p>
                <ul className="future-list">
                  {FUTURE.map((f) => (
                    <li key={f}>
                      {f}
                      <span className="tag">planned</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* multi-cloud providers */}
          <Reveal delay={60}>
            <div className="providers">
              <div className="providers-head">
                <span className="t">Cloud targets</span>
                <span className="sub">Azure AKS is validated today · AWS &amp; GCP are on the roadmap</span>
              </div>
              <div className="providers-row">
                {PROVIDERS.map((p) => (
                  <div className="provider" data-status={p.status} key={p.name}>
                    <span className="provider-logo">
                      <img src={p.logo} alt={p.name} loading="lazy" />
                    </span>
                    <span className="provider-info">
                      <span className="provider-name">{p.name}</span>
                      <span className="provider-target">{p.target}</span>
                    </span>
                    <span className={`provider-status ${p.status}`}>
                      {p.status === "validated" ? "● validated" : "○ planned"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* tech stack */}
          <Reveal className="sect-head" delay={40}>
            <div style={{ marginTop: 72 }}>
              <span className="eyebrow"><span className="num">10 /</span> Technical stack</span>
              <h2 className="sect-title">The platform stack</h2>
            </div>
          </Reveal>
          <Reveal delay={60}>
            <div className="stack-grid">
              {TECH_STACK.map((g) => (
                <div className="stack-card" key={g.group}>
                  <div className="sg">{g.group}</div>
                  <div className="tags">
                    {g.items.map((i) => <span key={i}>{i}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ====================== DEMO ====================== */}
      <section id="demo">
        <div className="shell">
          <Reveal className="sect-head">
            <span className="eyebrow"><span className="num">11 /</span> Demo proof</span>
            <h2 className="sect-title">What the validated demo produced</h2>
            <p className="sect-lead">
              A single run, from GitHub authentication to a public URL served by AKS, captured as a deployment
              ledger.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="demo-wrap">
              <div className="terminal">
                <div className="term-bar">
                  <span className="d" style={{ background: "#ff5f57" }} />
                  <span className="d" style={{ background: "#febc2e" }} />
                  <span className="d" style={{ background: "#28c840" }} />
                  <span className="t">cnp · deployment run ledger</span>
                </div>
                <div className="term-body">
                  {DEMO_RECEIPT.map((r, i) => (
                    <div className="term-line" key={i}>
                      <span className="pr">$</span>
                      <span className="step">{r.step}</span>
                      <span className="ok">done</span>
                    </div>
                  ))}
                  <div className="term-final">
                    <div className="term-line">
                      <span className="pr">›</span>
                      <span className="step">public URL refreshed from Kubernetes LoadBalancer</span>
                    </div>
                    <div className="term-line">
                      <span className="pr">↳</span>
                      <span className="url">http://&lt;aks-loadbalancer&gt;/  · status: Running</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="demo-side">
                <button className="btn btn-primary" onClick={watch} style={{ justifyContent: "center" }}>
                  <IconPlay style={{ width: 15, height: 15 }} /> Watch the full walkthrough
                </button>
                <div className="endpoint-card">
                  <h4>Validated production demo</h4>
                  <div className="endpoint-row">
                    <span className="k">Frontend</span>
                    <span className="v"><a href={LINKS.frontend} target="_blank" rel="noreferrer">{LINKS.frontend}</a></span>
                  </div>
                  <div className="endpoint-row">
                    <span className="k">API base</span>
                    <span className="v"><a href={LINKS.api} target="_blank" rel="noreferrer">{LINKS.api}</a></span>
                  </div>
                  <div className="endpoint-row">
                    <span className="k">Swagger UI</span>
                    <span className="v"><a href={LINKS.docs} target="_blank" rel="noreferrer">{LINKS.docs}</a></span>
                  </div>
                  <div className="endpoint-row">
                    <span className="k">Backend</span>
                    <span className="v">OVH VPS · Docker Compose · PostgreSQL · FastAPI</span>
                  </div>
                  <div className="endpoint-row">
                    <span className="k">CD target · registry</span>
                    <span className="v">Azure AKS · GHCR</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ====================== FOOTER ====================== */}
      <footer className="footer">
        <div className="shell">
          <div className="footer-grid">
            <div>
              <h5>Cloud Native Platform</h5>
              <p className="footer-sum">
                A repository-first internal developer platform. From GitHub repository to generated CI, GHCR
                image, AKS deployment, and a tracked public URL — deterministic, approved, GitHub-native.
              </p>
            </div>
            <div>
              <h5>Demo</h5>
              <div className="footer-links">
                <a href={LINKS.youtube} target="_blank" rel="noreferrer"><IconBolt style={{ width: 14, height: 14 }} /> Demo video</a>
                <a href={LINKS.frontend} target="_blank" rel="noreferrer"><IconLink style={{ width: 14, height: 14 }} /> cnp.mindsept.fr</a>
                <a href={LINKS.docs} target="_blank" rel="noreferrer"><IconLink style={{ width: 14, height: 14 }} /> Swagger UI</a>
              </div>
            </div>
            <div>
              <h5>Explore</h5>
              <div className="footer-links">
                <a href="#architecture"><IconCloud style={{ width: 14, height: 14 }} /> Architecture</a>
                <a href="#cicd"><IconBox style={{ width: 14, height: 14 }} /> CI / CD generation</a>
                <a href="#security"><IconLock style={{ width: 14, height: 14 }} /> Security model</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Cloud Native Platform · MVP showcase</span>
            <span className="nx">deterministic-first · human-approved · no secrets exposed</span>
          </div>
        </div>
      </footer>

      {open && <VideoModal onClose={() => setOpen(false)} />}
    </>
  );
}

// turn `code` spans written with backticks in data strings into <code>…</code>
function inlineCode(s: string): string {
  const esc = s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return esc.replace(/`([^`]+)`/g, "<code>$1</code>");
}
