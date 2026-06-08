import type { ReactNode } from "react";
import { PRODUCT_FLOW, STACK_TEMPLATES, MCP_SOURCES, type FlowKind } from "../data";
import {
  IconUser, IconGear, IconGit, IconLink, IconAnalyze, IconBox, IconCloud,
  IconServer, IconDb, IconActions, IconBolt, IconArrow,
} from "../components/icons";

/* ---------- shared primitives ---------- */

function Node({
  label, kind, icon, note,
}: { label: string; kind: FlowKind; icon?: ReactNode; note?: string }) {
  return (
    <div className="node" data-kind={kind}>
      <span className="n-edge" aria-hidden="true" />
      <div className="n-top">
        {icon && <span className="n-ic" aria-hidden="true">{icon}</span>}
        <span className="n-label">{label}</span>
      </div>
      {note && <span className="n-note">{note}</span>}
    </div>
  );
}

function ConnV({ tall = false }: { tall?: boolean }) {
  return (
    <div className="conn conn-v" aria-hidden="true" style={tall ? { height: 30 } : undefined}>
      <svg width="14" height="22" viewBox="0 0 14 22">
        <path d="M7 0v15" stroke="currentColor" strokeWidth="1.4" />
        <path d="M3 12l4 5 4-5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

const flowIcons: Record<number, ReactNode> = {
  0: <IconUser />, 1: <IconGear />, 2: <IconGit />, 3: <IconLink />,
  4: <IconAnalyze />, 5: <IconAnalyze />, 6: <IconGear />, 7: <IconBolt />,
  8: <IconGit />, 9: <IconActions />, 10: <IconBox />, 11: <IconGear />,
  12: <IconBolt />, 13: <IconGit />, 14: <IconCloud />, 15: <IconServer />, 16: <IconLink />,
};

/* ======================================================
   1. PRODUCT FLOW — two readable columns, numbered
   ====================================================== */
export function ProductFlowDiagram() {
  const left = PRODUCT_FLOW.slice(0, 9);
  const right = PRODUCT_FLOW.slice(9);
  const renderCol = (items: typeof PRODUCT_FLOW, offset: number) => (
    <div className="flow-col">
      {items.map((s, i) => {
        const n = i + offset;
        return (
          <div className="flow-item" key={n}>
            <div className="node" data-kind={s.kind}>
              <span className="n-edge" aria-hidden="true" />
              <div className="n-top">
                <span className="n-ic" aria-hidden="true">{flowIcons[n]}</span>
                <span className="flow-num">{String(n + 1).padStart(2, "0")}</span>
                <span className="n-label">{s.label}</span>
              </div>
              {s.note && <span className="n-note">{s.note}</span>}
            </div>
            {i < items.length - 1 && <ConnV />}
          </div>
        );
      })}
    </div>
  );
  return (
    <div className="diagram">
      <div className="diagram-bar">
        <span className="diagram-title">Product flow — login to public URL</span>
        <Legend kinds={["platform", "external", "approval", "validated"]} />
      </div>
      <div className="flow-grid">
        {renderCol(left, 0)}
        <div className="flow-mid" aria-hidden="true">
          <svg width="20" height="60" viewBox="0 0 20 60">
            <path d="M2 6v40a8 8 0 0 0 8 8h6" fill="none" stroke="var(--mute)" strokeWidth="1.4" />
            <path d="M12 50l5 4-5 4" fill="none" stroke="var(--mute)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        {renderCol(right, 9)}
      </div>
    </div>
  );
}

/* ======================================================
   2. PRODUCTION ARCHITECTURE — layered lanes
   ====================================================== */
export function ArchitectureDiagram() {
  return (
    <div className="diagram">
      <div className="diagram-bar">
        <span className="diagram-title">Production architecture — control plane</span>
        <Legend kinds={["platform", "external"]} />
      </div>
      <div className="arch">
        <div className="arch-lane">
          <div className="lane-label">Client</div>
          <div className="lane-row">
            <Node label="User Browser" kind="external" icon={<IconUser />} />
          </div>
        </div>
        <ArchMark />
        <div className="arch-lane">
          <div className="lane-label">Edge</div>
          <div className="lane-row">
            <Node label="Vercel React Frontend" kind="platform" icon={<IconBolt />} note="static SPA" />
            <Node label="Host Nginx — OVH VPS" kind="platform" icon={<IconServer />} note="HTTPS termination · cnp-api.mindsept.fr" />
          </div>
          <div style={{ marginTop: 10 }}>
            <span className="edge-note"><IconArrow style={{ width: 14, height: 14 }} /> GitHub App callbacks &amp; webhooks → Nginx</span>
          </div>
        </div>
        <ArchMark />
        <div className="arch-lane">
          <div className="lane-label">Application — Docker Compose</div>
          <div className="lane-row">
            <Node label="FastAPI Backend" kind="platform" icon={<IconServer />} note="container" />
            <Node label="Worker" kind="platform" icon={<IconGear />} note="DB-backed jobs" />
            <Node label="PostgreSQL" kind="platform" icon={<IconDb />} note="state · audit · secrets meta" />
          </div>
        </div>
        <ArchMark />
        <div className="arch-lane">
          <div className="lane-label">External systems</div>
          <div className="lane-row">
            <Node label="GitHub API" kind="external" icon={<IconGit />} note="installation tokens" />
            <Node label="Azure Management API" kind="external" icon={<IconCloud />} />
            <Node label="AKS Kubernetes API" kind="external" icon={<IconCloud />} note="CD target" />
            <Node label="GitHub Actions → GHCR / AKS" kind="external" icon={<IconActions />} note="build · push · deploy" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ArchMark() {
  return (
    <div className="arch-flow-mark" aria-hidden="true">
      <svg width="14" height="20" viewBox="0 0 14 20">
        <path d="M7 0v13" stroke="var(--line-3)" strokeWidth="1.4" />
        <path d="M3 10l4 5 4-5" fill="none" stroke="var(--line-3)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/* ======================================================
   3. CI GENERATION — deterministic analyzer fan-out
   ====================================================== */
export function CIDiagram() {
  return (
    <div className="diagram">
      <div className="diagram-bar">
        <span className="diagram-title">CI generation — deterministic first</span>
        <Legend kinds={["platform", "approval", "external"]} />
      </div>
      <div className="branch-top">
        <Node label="Repository tree" kind="external" icon={<IconGit />} />
        <ConnV />
        <Node label="Deterministic analyzer" kind="platform" icon={<IconAnalyze />} note="stack · tests · Dockerfile · .env.example" />
        <ConnV />
        <div className="decision"><span className="dq">?</span> Detected stack</div>
      </div>
      <div className="branch-fan">
        {STACK_TEMPLATES.map((s) => (
          <div className="branch-chip" key={s.template}>
            <span className="stack">{s.stack}</span>
            <span className="arr" aria-hidden="true">↓</span>
            <span className="tpl">{s.template}</span>
          </div>
        ))}
      </div>
      <div className="branch-top">
        <div className="decision" style={{ borderStyle: "solid" }}>Render <code style={{ marginLeft: 4 }}>ci.yml</code></div>
        <ConnV />
        <Node label="Human approval" kind="approval" icon={<IconBolt />} note="required gate" />
        <ConnV />
        <Node label="CI Pull Request" kind="external" icon={<IconGit />} />
      </div>
    </div>
  );
}

/* ======================================================
   4. CD + K8S MANIFEST GENERATION
   ====================================================== */
export function CDDiagram() {
  return (
    <div className="diagram">
      <div className="diagram-bar">
        <span className="diagram-title">CD &amp; Kubernetes manifest generation</span>
        <Legend kinds={["platform", "approval", "external"]} />
      </div>
      <div className="cd-flow">
        <Node label="CD preview request" kind="platform" icon={<IconGear />} />
        <ConnV />
        <Node label="Select global Azure Cloud Node" kind="platform" icon={<IconCloud />} />
        <ConnV />
        <Node label="Resolve namespace & service type" kind="platform" icon={<IconGear />} />
        <ConnV />
        <Node label="Resolve app, image, tag, port, replicas" kind="platform" icon={<IconBox />} />
        <ConnV />
        <Node label="Resolve runtime secret mappings" kind="platform" icon={<IconGear />} />
        <ConnV />
        <div className="decision"><span className="dq">?</span> Private GHCR image</div>
        <div className="cd-split" style={{ margin: "16px 0" }}>
          <Node label="yes → add imagePullSecrets" kind="platform" />
          <Node label="no → no image pull secret" kind="external" />
        </div>
        <Node label="Render k8s manifests" kind="platform" icon={<IconBox />} note="namespace · secret · deployment · service" />
        <ConnV />
        <Node label="Render .github/workflows/cd.yml" kind="platform" icon={<IconActions />} />
        <ConnV />
        <Node label="Human approval" kind="approval" icon={<IconBolt />} note="required gate" />
        <ConnV />
        <Node label="CD Pull Request" kind="external" icon={<IconGit />} />
      </div>
    </div>
  );
}

/* ======================================================
   6. MCP DOCUMENTATION SERVER — docs Q&A
   ====================================================== */
export function MCPDiagram() {
  return (
    <div className="diagram">
      <div className="diagram-bar">
        <span className="diagram-title">MCP documentation server — sourced answers</span>
        <Legend kinds={["external", "platform", "validated"]} />
      </div>
      <div className="branch-top">
        <Node label="AI agent" kind="external" icon={<IconUser />} />
        <ConnV />
        <Node label="CNP docs MCP server" kind="platform" icon={<IconServer />} note="local documentation index" />
        <ConnV />
        <div className="decision"><span className="dq">?</span> Documentation sources</div>
      </div>
      <div className="branch-fan four">
        {MCP_SOURCES.map((s) => (
          <div className="branch-chip" key={s.path}>
            <span className="stack">{s.path.split("/")[0]}</span>
            <span className="arr" aria-hidden="true">↓</span>
            <span className="tpl">{s.path.split("/").slice(1).join("/")}</span>
          </div>
        ))}
      </div>
      <div className="branch-top">
        <div className="decision" style={{ borderStyle: "solid" }}>Sourced answer</div>
        <ConnV />
        <Node label="Explains API · frontend · CI/CD · secrets · k8s · troubleshooting" kind="validated" icon={<IconBolt />} />
      </div>
    </div>
  );
}

/* ======================================================
   5. SECRET & REGISTRY — sequence
   ====================================================== */
export function SecretSequenceDiagram() {
  const actors = ["Admin", "CNP", "DB", "GitHub"];
  const msgs = [
    { from: "Admin", to: "CNP", txt: "Configure shared GHCR registry token" },
    { from: "CNP", to: "DB", txt: "Store encrypted platform secret (Fernet)" },
    { from: "CNP", to: "GitHub", txt: "Sync GHCR_TOKEN as an Actions secret when the PR is created" },
    { from: "CNP", to: "GitHub", txt: "Generated workflow references secrets.GHCR_TOKEN" },
  ];
  return (
    <div className="diagram">
      <div className="diagram-bar">
        <span className="diagram-title">Secret &amp; registry handling — no values exposed</span>
      </div>
      <div className="seq" style={{ marginBottom: 18 }}>
        {actors.map((a) => (
          <div className="seq-actor" data-role={a === "CNP" ? "cnp" : undefined} key={a}>
            <span className="a-name">{a}</span>
          </div>
        ))}
      </div>
      <div className="seq-msgs">
        {msgs.map((m, i) => (
          <div className="seq-msg" key={i}>
            <div className="meta">
              <span className="from">{m.from}</span>
              <span className="arr" aria-hidden="true">→</span>
              <span className="to">{m.to}</span>
            </div>
            <span className="txt">{m.txt}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- legend ---------- */
function Legend({ kinds }: { kinds: FlowKind[] }) {
  const labels: Record<FlowKind, string> = {
    platform: "platform process",
    external: "external system",
    approval: "human approval",
    validated: "validated",
  };
  return (
    <div className="legend">
      {kinds.map((k) => (
        <span className="lg" key={k}>
          <span className={`sw ${k}`} /> {labels[k]}
        </span>
      ))}
    </div>
  );
}
