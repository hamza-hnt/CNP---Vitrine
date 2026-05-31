// Minimal stroke icons (16px grid). Stroke inherits from CSS via currentColor.
import type { SVGProps } from "react";

type I = SVGProps<SVGSVGElement>;
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const IconGit = (p: I) => (
  <svg {...base} {...p}><circle cx="12" cy="6" r="2.4" /><circle cx="6" cy="18" r="2.4" /><circle cx="18" cy="15" r="2.4" /><path d="M12 8.4v4.2a3 3 0 0 0 3 3h.6M6 8.4v7.2" /></svg>
);
export const IconAnalyze = (p: I) => (
  <svg {...base} {...p}><circle cx="11" cy="11" r="6" /><path d="m20 20-3.5-3.5M9 11h4M11 9v4" /></svg>
);
export const IconPR = (p: I) => (
  <svg {...base} {...p}><circle cx="6" cy="6" r="2.2" /><circle cx="6" cy="18" r="2.2" /><circle cx="18" cy="18" r="2.2" /><path d="M6 8.2v7.6M15.8 18H10a2 2 0 0 1-2-2M18 15.8V9.5A2.5 2.5 0 0 0 15.5 7H13l2-2m-2 2 2 2" /></svg>
);
export const IconBox = (p: I) => (
  <svg {...base} {...p}><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" /><path d="m4 7.5 8 4.5 8-4.5M12 12v9" /></svg>
);
export const IconCloud = (p: I) => (
  <svg {...base} {...p}><path d="M7 18a4 4 0 0 1-.5-7.97A5 5 0 0 1 16 9.5a3.5 3.5 0 0 1 .5 6.96" /><path d="M9 18h8" /></svg>
);
export const IconLink = (p: I) => (
  <svg {...base} {...p}><path d="M10 13a4 4 0 0 0 5.7.4l2.6-2.6A4 4 0 0 0 12.6 5l-1.5 1.5" /><path d="M14 11a4 4 0 0 0-5.7-.4L5.7 13.2A4 4 0 0 0 11.4 19l1.5-1.5" /></svg>
);
export const IconServer = (p: I) => (
  <svg {...base} {...p}><rect x="3" y="4" width="18" height="7" rx="1.5" /><rect x="3" y="13" width="18" height="7" rx="1.5" /><path d="M7 7.5h.01M7 16.5h.01" /></svg>
);
export const IconDb = (p: I) => (
  <svg {...base} {...p}><ellipse cx="12" cy="6" rx="7" ry="3" /><path d="M5 6v12c0 1.66 3.13 3 7 3s7-1.34 7-3V6M5 12c0 1.66 3.13 3 7 3s7-1.34 7-3" /></svg>
);
export const IconUser = (p: I) => (
  <svg {...base} {...p}><circle cx="12" cy="8" r="3.4" /><path d="M5 20a7 7 0 0 1 14 0" /></svg>
);
export const IconGear = (p: I) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="3" /><path d="M12 3v2.5M12 18.5V21M21 12h-2.5M5.5 12H3M18 6l-1.8 1.8M7.8 16.2 6 18M18 18l-1.8-1.8M7.8 7.8 6 6" /></svg>
);
export const IconShield = (p: I) => (
  <svg {...base} {...p}><path d="M12 3 5 6v5c0 4 2.8 7.5 7 9 4.2-1.5 7-5 7-9V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></svg>
);
export const IconBolt = (p: I) => (
  <svg {...base} {...p}><path d="M13 3 5 13h6l-1 8 8-10h-6l1-8Z" /></svg>
);
export const IconCheck = (p: I) => (
  <svg {...base} {...p}><path d="m5 12 4 4 10-10" /></svg>
);
export const IconWarn = (p: I) => (
  <svg {...base} {...p}><path d="M12 4 3 19h18L12 4Z" /><path d="M12 10v4M12 17h.01" /></svg>
);
export const IconClose = (p: I) => (
  <svg {...base} {...p}><path d="m6 6 12 12M18 6 6 18" /></svg>
);
export const IconPlay = (p: I) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M8 5v14l11-7L8 5Z" /></svg>
);
export const IconArrow = (p: I) => (
  <svg {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const IconActions = (p: I) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="8.5" /><path d="m8.5 12 2.3 2.3 4.7-4.6" /></svg>
);
export const IconLock = (p: I) => (
  <svg {...base} {...p} className={"lock " + (p.className ?? "")}><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
);
export const IconFolder = (p: I) => (
  <svg {...base} {...p}><path d="M4 7a1.5 1.5 0 0 1 1.5-1.5h3.4a1.5 1.5 0 0 1 1.2.6l.8 1.1H18.5A1.5 1.5 0 0 1 20 8.7V17a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17V7Z" /></svg>
);
export const IconFile = (p: I) => (
  <svg {...base} {...p}><path d="M7 3.5h7l4 4V20a.5.5 0 0 1-.5.5h-11A.5.5 0 0 1 6 20V4a.5.5 0 0 1 .5-.5Z" /><path d="M14 3.5V8h4" /></svg>
);
export const IconBranch = (p: I) => (
  <svg {...base} {...p}><circle cx="7" cy="6" r="2.2" /><circle cx="7" cy="18" r="2.2" /><circle cx="17" cy="8" r="2.2" /><path d="M7 8.2v7.6M17 10.2c0 3-2.4 4-4.5 4.4-1.6.3-3 .7-3.3 2.2" /></svg>
);
