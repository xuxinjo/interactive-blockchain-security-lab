import Link from "next/link";

const modules = [
  { title: "Framework", href: "/framework", description: "Layer x CIA matrix with threats and defences." },
  { title: "Diagrams", href: "/diagrams", description: "Six step-through diagrams." },
  { title: "Cases", href: "/cases", description: "Six incidents using the same five-part template." },
  { title: "Lab", href: "/lab", description: "State visualizer for re-entrancy and bridge scenarios." },
  { title: "Insights", href: "/insights", description: "ML-assisted detection limits across the six cases." },
  { title: "Data", href: "/data", description: "Charts based on thesis Table 6." },
  { title: "About", href: "/about", description: "Thesis details and links." },
  { title: "Feedback", href: "/feedback", description: "Local notes." }
] as const;

export function ModuleTiles() {
  return (
    <section aria-label="Main learning modules" className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {modules.map((module) => (
        <article key={module.href} className="panel group hover:border-cyan-300/60">
          <h3 className="text-lg font-semibold text-white group-hover:text-cyan-200">
            <Link href={module.href}>{module.title}</Link>
          </h3>
          <p className="mt-2 text-sm text-slate-300">{module.description}</p>
        </article>
      ))}
    </section>
  );
}
