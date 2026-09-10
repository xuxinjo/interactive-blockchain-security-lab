import { FeedbackForm } from "@/components/feedback/FeedbackForm";
import { PageIntro } from "@/components/ui/PageIntro";

export default function FeedbackPage() {
  return (
    <section className="space-y-4">
      <PageIntro number="08" label="Your learning notebook" title="Keep the thought. Follow the question.">
        Capture an insight, a question, or something that could be clearer. Your notes stay in this browser.
      </PageIntro>
      <FeedbackForm />
    </section>
  );
}
