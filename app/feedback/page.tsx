import { FeedbackForm } from "@/components/feedback/FeedbackForm";

export default function FeedbackPage() {
  return (
    <section className="space-y-4">
      <header className="space-y-2">
        <h2 className="text-3xl font-semibold text-white">Feedback</h2>
        <p className="text-slate-300">
          Local-only iteration notes for thesis refinement. This is not a production feedback system.
        </p>
      </header>
      <FeedbackForm />
    </section>
  );
}
