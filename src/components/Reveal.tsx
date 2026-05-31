import { useEffect, useRef, useState, type ReactNode } from "react";

/** Wraps children and fades/translates them in once they scroll into view. */
export default function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Show immediately if already within (or near) the viewport on mount —
    // guarantees above-the-fold content paints without waiting on the observer.
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < vh * 0.92) {
      setShown(true);
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(el);

    // Safety net: never leave content permanently hidden.
    const fallback = window.setTimeout(() => setShown(true), 1600);
    return () => {
      obs.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  const Comp = Tag as any;
  return (
    <Comp
      ref={ref}
      className={`reveal ${shown ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Comp>
  );
}
