import { useMemo, useState } from "react";
import { CODE_SAMPLES } from "../data";

// Escape then apply a few coarse YAML highlight passes. Order matters:
// comments first (rest of line), then ${{ }} expressions, keys, and strings.
function highlight(raw: string): string {
  const esc = raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return esc
    .split("\n")
    .map((line) => {
      // full-line / trailing comments
      const cm = line.indexOf("#");
      let code = line;
      let comment = "";
      if (cm >= 0) {
        code = line.slice(0, cm);
        comment = `<span class="cm">${line.slice(cm)}</span>`;
      }
      code = code
        // "double quoted" strings first, so later passes don't re-match the
        // quotes inside inserted class="…" attributes
        .replace(/("[^"]*")/g, '<span class="st">$1</span>')
        // ${{ ... }} expressions
        .replace(/(\$\{\{[^}]*\}\})/g, '<span class="vr">$1</span>')
        // leading key:
        .replace(/^(\s*-?\s*)([A-Za-z0-9_./-]+)(:)(\s|$)/, '$1<span class="ky">$2</span>$3$4');
      return code + comment;
    })
    .join("\n");
}

export default function CodePreview() {
  const [active, setActive] = useState(CODE_SAMPLES[0].id);
  const sample = CODE_SAMPLES.find((s) => s.id === active)!;
  const html = useMemo(() => highlight(sample.code), [sample]);

  return (
    <div className="code-card">
      <div className="code-tabs" role="tablist" aria-label="Generated files">
        <div className="code-win" aria-hidden="true">
          <span className="d" style={{ background: "#ff5f57" }} />
          <span className="d" style={{ background: "#febc2e" }} />
          <span className="d" style={{ background: "#28c840" }} />
        </div>
        {CODE_SAMPLES.map((s) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={active === s.id}
            className={`code-tab ${active === s.id ? "active" : ""}`}
            onClick={() => setActive(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>
      <pre className="code-body" tabIndex={0} aria-label={`${sample.label} generated file`}>
        <code dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
      <div className="code-foot">
        <span>generated · previewed · approved</span>
        <span>{sample.lang}</span>
      </div>
    </div>
  );
}
