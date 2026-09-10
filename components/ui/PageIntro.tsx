import type { ReactNode } from "react";

export function PageIntro({ number, label, title, children }: { number: string; label: string; title: string; children: ReactNode }) {
  return (
    <header className="page-intro">
      <div className="page-intro-orbit" aria-hidden="true"><span /><span /><span /></div>
      <p className="eyebrow"><span className="text-teal-300">{number}</span><span className="text-slate-600">/</span>{label}</p>
      <h2 className="relative mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">{title}</h2>
      <div className="relative mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">{children}</div>
    </header>
  );
}
