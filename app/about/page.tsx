import { MotionSection } from "@/components/ui/MotionSection";
import { researchQuestions, thesisMetadata } from "@/content/thesis";
import { thesisSectionMappings } from "@/lib/thesisMap";

export default function AboutPage() {
  return (
    <MotionSection className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-3xl font-semibold text-white">About</h2>
        <p className="max-w-3xl text-slate-200">
          {thesisMetadata.artefact} is a prototype for the thesis &quot;{thesisMetadata.title}&quot;:
          &quot;{thesisMetadata.subtitle}&quot;.
        </p>
      </header>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="panel space-y-3">
          <h3 className="text-xl font-semibold text-white">Thesis Details</h3>
          <dl className="grid gap-2 text-sm text-slate-200">
            <div>
              <dt className="font-semibold text-cyan-200">Author</dt>
              <dd>{thesisMetadata.author}</dd>
            </div>
            <div>
              <dt className="font-semibold text-cyan-200">University</dt>
              <dd>{thesisMetadata.university}</dd>
            </div>
            <div>
              <dt className="font-semibold text-cyan-200">Supervisor</dt>
              <dd>{thesisMetadata.supervisor}</dd>
            </div>
            <div>
              <dt className="font-semibold text-cyan-200">Degree</dt>
              <dd>{thesisMetadata.degree}</dd>
            </div>
            <div>
              <dt className="font-semibold text-cyan-200">Status</dt>
              <dd>{thesisMetadata.status}</dd>
            </div>
            <div>
              <dt className="font-semibold text-cyan-200">License</dt>
              <dd>{thesisMetadata.license}</dd>
            </div>
          </dl>
        </article>

        <article className="panel space-y-3">
          <h3 className="text-xl font-semibold text-white">Research Questions</h3>
          <ol className="space-y-2 text-sm text-slate-200">
            {researchQuestions.map((question) => (
              <li key={question.id}>
                <span className="font-semibold text-cyan-200">{question.id}:</span> {question.text}
              </li>
            ))}
          </ol>
        </article>
      </section>

      <article className="panel space-y-3">
        <h3 className="text-xl font-semibold text-white">Thesis to Site Map</h3>
        <p className="text-xs text-slate-400 sm:hidden">Swipe sideways inside the table to see all columns.</p>
        <div className="visual-scroll" role="region" aria-label="Thesis to site mapping columns" tabIndex={0}>
          <table className="academic-table">
            <thead>
              <tr>
                <th>Thesis section</th>
                <th>Route</th>
                <th>Status</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              {thesisSectionMappings.map((mapping) => (
                <tr key={`${mapping.thesisSection}-${mapping.route}`}>
                  <td>{mapping.thesisSection}</td>
                  <td>{mapping.route}</td>
                  <td>{mapping.status}</td>
                  <td>{mapping.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <article className="panel space-y-3 text-sm text-slate-200">
        <h3 className="text-xl font-semibold text-white">Links and Reproduction</h3>
        <p>Commands: npm ci, npm run dev, npm run build, npm run test, npm run test:e2e.</p>
        <p>Repository: {thesisMetadata.repositoryUrl}</p>
        <p>Provisional deployment: {thesisMetadata.deploymentUrl}</p>
        <p>Independent external evaluation is planned and has not yet been completed.</p>
      </article>
    </MotionSection>
  );
}
