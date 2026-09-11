import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-800/90 bg-slate-950/80">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-slate-400 sm:px-6 lg:px-8">
        <p>Interactive Blockchain Security Lab - MIT License.</p>
        <p>Educational artefact: contains no exploit code, wallet connections, RPC calls, or live-chain actions.</p>
        <p>
          <Link href="/feedback" className="text-cyan-300 underline hover:text-cyan-200">
            Local feedback notes
          </Link>
        </p>
      </div>
    </footer>
  );
}
