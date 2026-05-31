import { useEffect, useState } from "react";
import { NAV } from "../data";

export default function Nav({ onWatch }: { onWatch: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`} aria-label="Primary">
      <div className="shell nav-inner">
        <div className="nav-left">
          <a href="#top" className="brand" aria-label="Cloud Native Platform — home">
            <img src="/mind7-logo.png" alt="" className="brand-logo" width={30} height={30} />
            <span className="brand-text">
              <span>CNP</span>
              <span className="b-sub">Control Plane</span>
            </span>
          </a>
          <span className="mvp-chip" aria-label="Minimum Viable Product">MVP · v1</span>
        </div>
        <div className="nav-links">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`}>
              {n.label}
            </a>
          ))}
        </div>
        <button type="button" className="nav-cta" onClick={onWatch}>
          ▶ Watch the demo
        </button>
      </div>
    </nav>
  );
}
