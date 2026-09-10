"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header className="border-b border-slate-800/90 bg-slate-950/85 backdrop-blur-md" onKeyDown={(event) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    }}>
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
        <button
          ref={menuButton}
          type="button"
          className="flex min-h-11 items-center justify-between rounded-lg border border-slate-700 bg-slate-900/70 px-3 text-sm text-cyan-200 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Close menu" : "Menu"}
          <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span>
        </button>
        <nav id="primary-navigation" aria-label="Primary" className={menuOpen ? "block" : "hidden md:block"}>
          <ul className="grid grid-cols-2 gap-2 text-sm md:flex md:flex-wrap">
            {links.map(([label, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={(href === "/" ? pathname === href : pathname.startsWith(href)) ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex min-h-11 w-full items-center rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-slate-100 hover:border-teal-300 hover:text-teal-200 aria-[current=page]:border-cyan-300 aria-[current=page]:text-cyan-200"
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
