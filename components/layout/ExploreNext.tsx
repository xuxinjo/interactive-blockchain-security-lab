"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const destinations = [
  { href: "/framework", title: "Map the security layers", detail: "Explore the relationships between trust, threats, and defences.", label: "Framework" },
  { href: "/diagrams", title: "Watch the concepts unfold", detail: "Play through the sequences, one decision at a time.", label: "Diagrams" },
  { href: "/cases", title: "Follow the evidence", detail: "Discover what six real incidents teach us about trust.", label: "Cases" },
  { href: "/lab", title: "Test your understanding", detail: "Compare vulnerable and guarded states in the interactive lab.", label: "Lab" },
  { href: "/insights", title: "Choose the right defence", detail: "Explore where detection methods help and where they fall short.", label: "Insights" },
  { href: "/data", title: "Explore the incident profile", detail: "Filter the sample and inspect the documented values.", label: "Data" },
  { href: "/about", title: "Connect it to the research", detail: "See the questions and thesis behind this learning experience.", label: "About" },
  { href: "/feedback", title: "Capture what you learned", detail: "Keep a private note about a question, insight, or improvement.", label: "Feedback" }
];

export function ExploreNext() {
  const pathname = usePathname();
  const index = destinations.findIndex((item) => pathname === item.href || pathname.startsWith(`${item.href}/`));
  if (index < 0) return null;
  const next = destinations[(index + 1) % destinations.length];
  return (
    <aside className="mt-10 border-t border-slate-800 pt-6" aria-label="Continue exploring">
      <p className="eyebrow mb-3">Keep exploring</p>
      <Link href={next.href} className="journey-link group">
        <div><span className="text-xs font-medium text-teal-300">Up next / {next.label}</span><h3 className="mt-1 text-xl font-semibold text-white">{next.title}</h3><p className="mt-2 text-sm text-slate-400">{next.detail}</p></div>
        <span aria-hidden="true" className="journey-arrow">↗</span>
      </Link>
      <a href="#main-content" className="mt-4 inline-flex min-h-11 items-center text-sm text-slate-400 hover:text-cyan-200">Back to top ↑</a>
    </aside>
  );
}
