import Link from "next/link";

const links = [
  ["Home", "/"],
  ["Framework", "/framework"],
  ["Diagrams", "/diagrams"],
  ["Cases", "/cases"],
  ["Lab", "/lab"],
  ["Insights", "/insights"],
  ["Data", "/data"],
  ["About", "/about"]
] as const;

export function SiteHeader() {
  return (
    <header className="border-b border-slate-800/90 bg-slate-950/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 lg:px-8">
        <a href="#main-content" className="sr-only-focusable text-sm text-cyan-300">
          Skip to main content
        </a>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">Bachelor thesis</p>
            <h1 className="text-xl font-semibold text-white">Interactive Blockchain Security Lab</h1>
          </div>
          <p className="max-w-xl text-sm text-slate-300">A small web lab for studying blockchain security layers.</p>
        </div>
        <nav aria-label="Primary">
          <ul className="flex flex-wrap gap-2 text-sm">
            {links.map(([label, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="inline-flex rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-slate-100 hover:border-teal-300 hover:text-teal-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
